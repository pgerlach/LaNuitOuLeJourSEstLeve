/* 
 * DMX Shield SEND on, w/ pins D3 and D4 aside
 * Wire from RX/D0 to D4
 * Wire from TX/D1 to D3
 * 
 * Button 1
 *  - yellow on D8 (button read)
 *  - green on D9 (GND)
 *  - blue on D10 (button LED)
 *  
 * Button 2
 *  - brown on D11 (button read)
 *  - red on D12 (GND)
 *  - orange on D13 (button LED)
 */

#include <DMXSerial.h>
#include <Button.h>

// true/false. Inverts the on/off behaviour of the buttons.
#define INVERT_BUTTONS (false)

// pins for the button 1
#define PIN_BTN_MOD1_IN  (8)
#define PIN_BTN_MOD1_GND (9)
#define PIN_BTN_MOD1_LED (10)

// pins for the button 2
#define PIN_BTN_MOD2_IN  (11)
#define PIN_BTN_MOD2_GND (12)
#define PIN_BTN_MOD2_LED (13)

// DMX channels used to communicate w/ the relay
#define DMX_CHANNEL_MOD1 (1)
#define DMX_CHANNEL_MOD2 (2)

// DMX values used to communicate w/ the relay
#define DMX_VALUE_BRAKE_ON (1)
#define DMX_VALUE_BRAKE_OFF (2)

// buttons
Button btn_mod1(PIN_BTN_MOD1_IN);
Button btn_mod2(PIN_BTN_MOD2_IN);

void setup() {
  // init DMX
  DMXSerial.init(DMXController);

  // those pins are expected to be GND
  pinMode(PIN_BTN_MOD1_GND, OUTPUT);
  digitalWrite(PIN_BTN_MOD1_GND, LOW);
  pinMode(PIN_BTN_MOD2_GND, OUTPUT);
  digitalWrite(PIN_BTN_MOD2_GND, LOW);

  // pins for btns LEDs output
  pinMode(PIN_BTN_MOD1_LED, OUTPUT);
  pinMode(PIN_BTN_MOD2_LED, OUTPUT);

  // begin reading buttons
  btn_mod1.begin();
  btn_mod2.begin();
}

// just loop to update values and update them through DMX
void loop() {

  if (btn_mod1.read() == INVERT_BUTTONS) {
    digitalWrite(PIN_BTN_MOD1_LED, HIGH);
    DMXSerial.write(DMX_CHANNEL_MOD1, DMX_VALUE_BRAKE_ON);
  } else {
    digitalWrite(PIN_BTN_MOD1_LED, LOW);
    DMXSerial.write(DMX_CHANNEL_MOD1, DMX_VALUE_BRAKE_OFF);
  }

  if (btn_mod2.read() == INVERT_BUTTONS) {
    digitalWrite(PIN_BTN_MOD2_LED, HIGH);
    DMXSerial.write(DMX_CHANNEL_MOD2, DMX_VALUE_BRAKE_ON);
  } else {
    digitalWrite(PIN_BTN_MOD2_LED, LOW);
    DMXSerial.write(DMX_CHANNEL_MOD2, DMX_VALUE_BRAKE_OFF);
  }

  delay(5);
}

