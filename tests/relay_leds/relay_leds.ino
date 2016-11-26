/* 
 * DMX Shield RECV on, w/ pins D3 and D4 aside
 * Wire from RX/D0 to D4
 * Wire from TX/D1 to D3
 */

#include <DMXSerial.h>

// connects to DE on the DMX shield -> GND to disable it
#define PIN_DE_GND (5)

// DMX channels used to communicate w/ the relay
#define DMX_CHANNEL_MOD1 (1)
#define DMX_CHANNEL_MOD2 (2)

// DMX values used to communicate w/ the relay
#define DMX_VALUE_BRAKE_ON (1)
#define DMX_VALUE_BRAKE_OFF (2)

// LEDs used to see the state sent for the modules
#define PIN_LED_INFO_MOD1 (11)
#define PIN_LED_INFO_MOD2 (12)

#define PIN_LED_INFO_NO_DATA (13)

void setup() {
  // set DmxShield's DE to GND, to let the shield work as a received
  pinMode(PIN_DE_GND, OUTPUT);
  digitalWrite(PIN_DE_GND, LOW);

  // info leds, off by default
  pinMode(PIN_LED_INFO_MOD1, OUTPUT);
  pinMode(PIN_LED_INFO_MOD2, OUTPUT);
  pinMode(PIN_LED_INFO_NO_DATA, OUTPUT);
  digitalWrite(PIN_LED_INFO_MOD1, LOW);
  digitalWrite(PIN_LED_INFO_MOD2, LOW);
  digitalWrite(PIN_LED_INFO_NO_DATA, LOW);

  DMXSerial.init(DMXReceiver);
}

void loop() {
  // show if no DMX data received for more than 5s
  digitalWrite(PIN_LED_INFO_NO_DATA, (DMXSerial.noDataSince() > 5000)? HIGH : LOW);

  digitalWrite(PIN_LED_INFO_MOD1, (DMXSerial.read(DMX_CHANNEL_MOD1) == DMX_VALUE_BRAKE_ON) ? HIGH : LOW);
  digitalWrite(PIN_LED_INFO_MOD2, (DMXSerial.read(DMX_CHANNEL_MOD2) == DMX_VALUE_BRAKE_ON) ? HIGH : LOW);
}

