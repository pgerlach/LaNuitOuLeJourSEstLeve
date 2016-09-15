#include <SPI.h>
#include <Mirf.h>
#include <nRF24L01.h>
#include <MirfHardwareSpiDriver.h>

// common
#define PIN_NRF24L01_CS (9)
#define PIN_NRF24L01_CE (8)

#define MSG_BRAKE (0x42)
#define MSG_FREE  (0x43)

#define ID_REMOTE "telc"
#define ID_MODULE_1 "mod1"
#define ID_MODULE_2 "mod2"

// module
const int PIN_ENA = 2;
const int PIN_IN1 = 3;
const int PIN_IN2 = 4;
const int PIN_ENB = 5;
const int PIN_IN3 = 6;
const int PIN_IN4 = 7;

const int MOTOR_1_PINS[] = { PIN_ENA, PIN_IN1, PIN_IN2 };
const int MOTOR_2_PINS[] = { PIN_ENB, PIN_IN4, PIN_IN3 };

enum e_state {
  E_STATE_FREE,
  E_STATE_BRAKING,
  E_STATE_STOPPED,
  E_STATE_RELEASING
} state;

long actionStartTime = millis();

void setup(){
  Serial.begin(9600);

  // init nRF24L01
  Mirf.cePin = PIN_NRF24L01_CE;
  Mirf.csnPin = PIN_NRF24L01_CS;
  Mirf.spi = &MirfHardwareSpi;
  Mirf.init();

  // this is module 1
  Mirf.setRADDR((byte *)ID_MODULE_2);

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

  state = E_STATE_FREE;

  Serial.println("WELCOME TO THE MODULE 2 LOGS");
}

void loop() {
  if (Mirf.dataReady()) {
    byte msg;
    Mirf.getData((byte *) &msg);

    switch (msg) {
      case MSG_BRAKE:
        Serial.println("brake");
        msg_brake();
        break;
      case MSG_FREE:
        Serial.println("release");
        msg_release();
        break;
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
      // nothing to do
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
      // nothing to do
      break;
    case E_STATE_BRAKING:
    case E_STATE_STOPPED:
      state = E_STATE_RELEASING;
      motors_init_release();
      break;
  }
}


void motors_init_brake() {
  Serial.println("init brake");
  actionStartTime = millis();
  motor(MOTOR_1_PINS, MOTOR_GO_FWD);
  motor(MOTOR_2_PINS, MOTOR_GO_FWD);
}

void motors_init_release() {
  Serial.println("init release");
  actionStartTime = millis();
  motor(MOTOR_1_PINS, MOTOR_GO_BCK);
  motor(MOTOR_2_PINS, MOTOR_GO_BCK);
}

void motors_stop() {
  Serial.println("motors stop");
  motor(MOTOR_1_PINS, MOTOR_STOP);
  motor(MOTOR_2_PINS, MOTOR_STOP);
}

void motors_init() {
  motors_init_release();
  delay(5000);
  motors_stop();
}

void motors_loop() {
  if (state == E_STATE_STOPPED || state == E_STATE_FREE) {
    return ;
  }
  // is it time to stop ?
  if (millis() - actionStartTime > 3000) {
    Serial.println("action done -> stop the motors");
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

