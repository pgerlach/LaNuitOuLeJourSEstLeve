#include <SPI.h>
#include <RF24.h>
#include <EEPROM.h>

// timings
#define BRAKE_TIMING (500)
#define RELEASE_TIMING (500)

// common
#define PIN_NRF24L01_CS (9)
#define PIN_NRF24L01_CE (8)

#define MSG_BRAKE (0x42)
#define MSG_FREE  (0x43)

#define ID_REMOTE "telc"
#define ID_MODULE_1 "mod1"
#define ID_MODULE_2 "mod2"

#define DEBUG_MOTORS(msg) Serial.println(msg)
#define DEBUG_MSGS(msg) Serial.println(msg)


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

  // begin listening on the radio
  radio.begin();
  radio.setPALevel(RF24_PA_LOW);
  radio.openReadingPipe(1,(byte*)eepromData.id);
 
  // setup PINS
  for (int i=0; i<3; i++) {
    pinMode(MOTOR_1_PINS[i], OUTPUT);
    pinMode(MOTOR_2_PINS[i], OUTPUT);
  }
  motors_init();

  // debug LED
  pinMode(PIN_LED_RF_OK, OUTPUT);
  pinMode(PIN_LED_RF_OK_GND, OUTPUT);
  digitalWrite(PIN_LED_RF_OK, LOW);
  digitalWrite(PIN_LED_RF_OK_GND, LOW);

  state = E_STATE_FREE;

  lastMessageDisplayTimer = millis();

  radio.startListening();
  Serial.println("WELCOME TO THE MODULE 1 LOGS");
}

void loop() {
  if (radio.available()) {
    digitalWrite(PIN_LED_RF_OK, HIGH);
    lastMessageDisplayTimer = millis();
    byte msg;
    radio.read(&msg, sizeof(byte));

    switch (msg) {
      case MSG_BRAKE:
        DEBUG_MSGS("msg brake");
        msg_brake();
        break;
      case MSG_FREE:
        DEBUG_MSGS("msg release");
        msg_release();
        break;
      default:
        DEBUG_MSGS("msg UNKNOWN");
        DEBUG_MSGS((char)msg);
        break;
    }
  } else {
    if (millis() - lastMessageDisplayTimer > 500) {
      digitalWrite(PIN_LED_RF_OK, LOW);
      DEBUG_MSGS("500 ms w/ no data");
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
  delay(2000);
  motors_stop();
}

void motors_loop() {
  if (state == E_STATE_STOPPED || state == E_STATE_FREE) {
    return ;
  }
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

