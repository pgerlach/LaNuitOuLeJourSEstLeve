#include <SPI.h>
#include <RF24.h>
#include <EEPROM.h>

// timings
#define BRAKE_TIMING (217)
#define RELEASE_TIMING (BRAKE_TIMING + 200)

// RF channel. 76 is default in the library, should be free from interferences
#define RF_CHANNEL (76)

// common
#define PIN_NRF24L01_CS (9)
#define PIN_NRF24L01_CE (8)

#define MSG_BRAKE (0x42)
#define MSG_FREE  (0x43)

#define ID_REMOTE "telc"
#define ID_MODULE_1 "mod1"
#define ID_MODULE_2 "mod2"

#define DEBUG_MOTORS(msg) // Serial.println(msg)
#define DEBUG_MSGS(msg)  Serial.println(msg)
#define DEBUG_MSGS_HEX(msg) // Serial.println(msg, HEX)


// module
const int PIN_ENA = 2;
const int PIN_IN1 = 3;
const int PIN_IN2 = 4;
const int PIN_ENB = 5;
const int PIN_IN3 = 6;
const int PIN_IN4 = 7;

const int MOTOR_1_PINS[] = { PIN_ENA, PIN_IN1, PIN_IN2 };
const int MOTOR_2_PINS[] = { PIN_ENB, PIN_IN4, PIN_IN3 };

const int PIN_LED_RF_OK_GND = A0;
const int PIN_LED_RF_OK = A1;
const int PIN_LED_MOTOR_STATE_GND = A4;
const int PIN_LED_MOTOR_STATE = A5;

enum e_state {
  E_STATE_FREE,
  E_STATE_BRAKING,
  E_STATE_STOPPED,
  E_STATE_RELEASING
} state;

long actionStartTime = millis();

long lastMessageDisplayTimer = 0;

RF24 radio(PIN_NRF24L01_CE,PIN_NRF24L01_CS);

// same structure as in 'set_eeprom_modX'
struct s_module_eeprom_data {
  byte magic = 0x42; // MUST be 0x42
  char id[5];  // 0 terminated string
} eepromData;


void setup(){
  Serial.begin(115200);

  // read the module id (set by running set_eeprom_modX' code)
  memset(&eepromData, 0, sizeof(eepromData));
  EEPROM.get(0, eepromData);
  if (eepromData.magic != 0x42) {
    Serial.println("bad magic");
    Serial.println(eepromData.magic);
    Serial.println("FAIL");
    while (true) ;
  }
  Serial.print("module id: "); Serial.println(eepromData.id);
 
  // setup PINS
  for (int i=0; i<3; i++) {
    pinMode(MOTOR_1_PINS[i], OUTPUT);
    pinMode(MOTOR_2_PINS[i], OUTPUT);
  }
  motors_init();

  // debug LEDs
  pinMode(PIN_LED_RF_OK_GND, OUTPUT);
  pinMode(PIN_LED_RF_OK, OUTPUT);
  pinMode(PIN_LED_MOTOR_STATE_GND, OUTPUT);
  pinMode(PIN_LED_MOTOR_STATE, OUTPUT);
  digitalWrite(PIN_LED_RF_OK_GND, LOW);
  digitalWrite(PIN_LED_RF_OK, LOW);
  digitalWrite(PIN_LED_MOTOR_STATE_GND, LOW);
  digitalWrite(PIN_LED_MOTOR_STATE, LOW);

  state = E_STATE_FREE;

  lastMessageDisplayTimer = millis();

  radio_init();

  Serial.println("WELCOME TO THE MODULE LOGS");
}

// (re)init the radio and begin listening
void radio_init() {
  radio.begin();
  radio.setChannel(RF_CHANNEL);
  radio.setPALevel(RF24_PA_LOW);
  radio.openReadingPipe(1,(byte*)eepromData.id);
  radio.startListening();
}

/*
 * Test if the radio is still configured or if it has been reset / lost / ...
 */
bool checkRadioStillConfigured() {
  return (radio.getChannel() == RF_CHANNEL);
}

void loop() {
  if (radio.available()) {
    byte msg = 0x00;
    radio.read(&msg, sizeof(byte));
    switch (msg) {
      case MSG_BRAKE:
        digitalWrite(PIN_LED_RF_OK, HIGH);
        lastMessageDisplayTimer = millis();
        DEBUG_MSGS("msg brake");
        DEBUG_MSGS_HEX(msg);
        msg_brake();
        break;
      case MSG_FREE:
        digitalWrite(PIN_LED_RF_OK, HIGH);
        lastMessageDisplayTimer = millis();
        DEBUG_MSGS("msg release");
        DEBUG_MSGS_HEX(msg);
        msg_release();
        break;
      default:
        digitalWrite(PIN_LED_RF_OK, LOW);
        DEBUG_MSGS("msg UNKNOWN");
        DEBUG_MSGS_HEX(msg);
        radio_init();
        break;
    }
  } else {
    if (millis() - lastMessageDisplayTimer > 500) {
      digitalWrite(PIN_LED_RF_OK, LOW);
      DEBUG_MSGS("500 ms w/ no data");
      if (!checkRadioStillConfigured()) {
        DEBUG_MSGS("radio seems lost -> reset it");
        radio_init();
      }
      lastMessageDisplayTimer = millis();
    }
  }

  motors_loop();
}

// states for EN and both IN pins
const int MOTOR_GO_FWD[] = { 1, 1, 0 };
const int MOTOR_GO_BCK[] = { 1, 0, 1 };
const int MOTOR_STOP[] = { 0, 0, 0 };

// stop all, then set
void motor(const int motor_pins[], const int vals[]) {
  digitalWrite(motor_pins[0], 0);
  digitalWrite(motor_pins[1], vals[1]);
  digitalWrite(motor_pins[2], vals[2]);
  digitalWrite(motor_pins[0], vals[0]);
}

void msg_brake() {
  switch (state) {
    case E_STATE_BRAKING:
    case E_STATE_STOPPED:
      DEBUG_MOTORS("BREAK asked but already stopped");
      break;
    case E_STATE_FREE:
    case E_STATE_RELEASING:
      // do start braking
      actionStartTime = millis();
      state = E_STATE_BRAKING;
      motors_init_brake();
      break;
  }
}

void msg_release() {
  switch (state) {
    case E_STATE_FREE:
    case E_STATE_RELEASING:
      DEBUG_MOTORS("RELEASE asked but already released");
      break;
    case E_STATE_BRAKING:
    case E_STATE_STOPPED:
      actionStartTime = millis();
      state = E_STATE_RELEASING;
      motors_init_release();
      break;
  }
}


void motors_init_brake() {
  DEBUG_MOTORS("init brake");
  motor(MOTOR_1_PINS, MOTOR_GO_FWD);
  motor(MOTOR_2_PINS, MOTOR_GO_FWD);
}

void motors_init_release() {
  DEBUG_MOTORS("init release");
  motor(MOTOR_1_PINS, MOTOR_GO_BCK);
  motor(MOTOR_2_PINS, MOTOR_GO_BCK);
}

void motors_stop() {
  DEBUG_MOTORS("motors stop");
  motor(MOTOR_1_PINS, MOTOR_STOP);
  motor(MOTOR_2_PINS, MOTOR_STOP);
}

void motors_init() {
  motors_init_release();
  // should be enough to rewind whatever length the motor has been to
  delay(RELEASE_TIMING*2);
  motors_stop();
}

void motors_loop() {

  // update motors status LED
  digitalWrite(PIN_LED_MOTOR_STATE, (state == E_STATE_STOPPED || state == E_STATE_BRAKING) ? HIGH : LOW);

  long timing = 0;
  switch (state) {
    case E_STATE_BRAKING:
      timing = BRAKE_TIMING;
      break;
    case E_STATE_RELEASING:
      timing = RELEASE_TIMING;
      break;
  }
  // is it time to stop ?
  if (millis() - actionStartTime > timing) {
    DEBUG_MOTORS("action done -> stop the motors");
    motors_stop();
    switch (state) {
      case E_STATE_BRAKING:
        state = E_STATE_STOPPED;
        break;
      case E_STATE_RELEASING:
        state = E_STATE_FREE;
        break;
    }
  }
}

