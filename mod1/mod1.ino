#include <SPI.h>
#include <Mirf.h>
#include <nRF24L01.h>
#include <MirfHardwareSpiDriver.h>

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

#define DEBUG_MOTORS(msg) // Serial.println(msg)
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

const int PIN_LED_NO_MSG = A0;

enum e_state {
  E_STATE_FREE,
  E_STATE_BRAKING,
  E_STATE_STOPPED,
  E_STATE_RELEASING
} state;

long actionStartTime = millis();

long lastMessageDisplayTimer = 0;

void setup(){
  Serial.begin(115200);

  // init nRF24L01
  Mirf.cePin = PIN_NRF24L01_CE;
  Mirf.csnPin = PIN_NRF24L01_CS;
  Mirf.spi = &MirfHardwareSpi;
  Mirf.init();

  // this is module 1
  Mirf.setRADDR((byte *)ID_MODULE_1);

  // messages are only 1 byte
  Mirf.payload = sizeof(byte);

  /*
   * To change channel:
   * Mirf.channel = 10;
   */
   
  Mirf.config();

  // setup PINS
  for (int i=0; i<3; i++) {
    pinMode(MOTOR_1_PINS[i], OUTPUT);
    pinMode(MOTOR_2_PINS[i], OUTPUT);
  }
  motors_init();
  pinMode(PIN_LED_NO_MSG, OUTPUT);
  digitalWrite(PIN_LED_NO_MSG, LOW);

  state = E_STATE_FREE;

  lastMessageDisplayTimer = millis();

  Serial.println("WELCOME TO THE MODULE 1 LOGS");
}

int loopsWithNoActions = 0;

void loop() {
  if (Mirf.dataReady()) {
    digitalWrite(PIN_LED_NO_MSG, LOW);
    lastMessageDisplayTimer = millis();
    byte msg;
    Mirf.getData((byte *) &msg);

    actionStartTime = millis();
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
    if (millis() - lastMessageDisplayTimer > 1500) {
      digitalWrite(PIN_LED_NO_MSG, HIGH);
      byte chRegisterValue = 0;
      Mirf.readRegister(RF_CH, &chRegisterValue, 1);
      DEBUG_MSGS("1.5 second w/ no data");
      DEBUG_MSGS((int)chRegisterValue);
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

