/* 
 * DMX Shield RECV on, w/ pins D3 and D4 aside
 * Wire from RX/D0 to D4
 * Wire from TX/D1 to D3
 */

#include <DMXSerial.h>
#include <SPI.h>
#include <RF24.h>

// connects to DE on the DMX shield -> GND to disable it
#define PIN_DE_GND (5)

// DMX channels used to communicate w/ the relay
#define DMX_CHANNEL_MOD1 (1)
#define DMX_CHANNEL_MOD2 (2)

// DMX values used to communicate w/ the relay
#define DMX_VALUE_BRAKE_ON (1)
#define DMX_VALUE_BRAKE_OFF (2)

// common values for nRF24L01
#define PIN_NRF24L01_CS (9)
#define PIN_NRF24L01_CE (8)
#define MSG_BRAKE (0x42)
#define MSG_FREE  (0x43)
#define ID_REMOTE "telc"
#define ID_MODULE_1 "mod1"
#define ID_MODULE_2 "mod2"

// LEDs used to see the state sent for the modules
#define PIN_LED_INFO_MOD1 (A1)
#define PIN_LED_INFO_MOD1_GND (A0)
#define PIN_LED_INFO_MOD2 (A4)
#define PIN_LED_INFO_MOD2_GND (A5)

// object to control radio
RF24 radio(PIN_NRF24L01_CE,PIN_NRF24L01_CS);

void setup() {
  // set DmxShield's DE to GND, to let the shield work as a received
  pinMode(PIN_DE_GND, OUTPUT);
  digitalWrite(PIN_DE_GND, LOW);

  // configure radio
  radio.begin();
//  radio.setPALevel(RF24_PA_LOW);
  radio.stopListening();

  // info leds, off by default

  pinMode(PIN_LED_INFO_MOD1, OUTPUT);
  pinMode(PIN_LED_INFO_MOD1_GND, OUTPUT);
  pinMode(PIN_LED_INFO_MOD2, OUTPUT);
  pinMode(PIN_LED_INFO_MOD2_GND, OUTPUT);
  digitalWrite(PIN_LED_INFO_MOD1, LOW);
  digitalWrite(PIN_LED_INFO_MOD2, LOW);
  digitalWrite(PIN_LED_INFO_MOD1_GND, LOW);
  digitalWrite(PIN_LED_INFO_MOD2_GND, LOW);

  DMXSerial.init(DMXReceiver);
}

long lastAction = 0;

void loop() {
  // show if no DMX data received for more than 1s
//  digitalWrite(PIN_LED_INFO_NO_DATA, (DMXSerial.noDataSince() > 1000)? HIGH : LOW);
  digitalWrite(PIN_LED_INFO_MOD1, (DMXSerial.read(DMX_CHANNEL_MOD1) == DMX_VALUE_BRAKE_ON) ? HIGH : LOW);
  digitalWrite(PIN_LED_INFO_MOD2, (DMXSerial.read(DMX_CHANNEL_MOD2) == DMX_VALUE_BRAKE_ON) ? HIGH : LOW);

  // update about 3 times / second
  if (millis() - lastAction > 300) {
    lastAction = millis();

    byte msg_mod_1 = (DMXSerial.read(DMX_CHANNEL_MOD1) == DMX_VALUE_BRAKE_ON) ? MSG_BRAKE : MSG_FREE;
    byte msg_mod_2 = (DMXSerial.read(DMX_CHANNEL_MOD2) == DMX_VALUE_BRAKE_ON) ? MSG_BRAKE : MSG_FREE;

    radio.openWritingPipe((byte *)ID_MODULE_1);
    radio.write((byte *)&msg_mod_1, sizeof(byte));

    radio.openWritingPipe((byte *)ID_MODULE_2);
    radio.write((byte *)&msg_mod_2, sizeof(byte));
  }

}

