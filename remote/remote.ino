#include <SPI.h>
#include <RF24.h>
#include <Button.h>

// common
#define PIN_NRF24L01_CS (9)
#define PIN_NRF24L01_CE (8)

#define MSG_BRAKE (0x42)
#define MSG_FREE  (0x43)

#define ID_REMOTE "telc"
#define ID_MODULE_1 "mod1"
#define ID_MODULE_2 "mod2"

// remote
#define PIN_PUSHBTN_MODULE_1 (2)
#define PIN_PUSHBTN_MODULE_2 (3)

Button btn_module_1(PIN_PUSHBTN_MODULE_1);
Button btn_module_2(PIN_PUSHBTN_MODULE_2);

RF24 radio(PIN_NRF24L01_CE,PIN_NRF24L01_CS);

void setup(){
  Serial.begin(115200);

  radio.begin();
  radio.setPALevel(RF24_PA_LOW);
  radio.stopListening();

  // start listening to buttons
  btn_module_1.begin();
  btn_module_2.begin();

  Serial.println("WELCOME TO THE REMOTE LOGS"); 
}

long lastAction = 0;

void loop() {
  // update every second
  if (millis() - lastAction > 1000) {
    lastAction = millis();

    byte msg_mod_1 = btn_module_1.read() ? MSG_BRAKE : MSG_FREE;
    byte msg_mod_2 = btn_module_2.read() ? MSG_BRAKE : MSG_FREE;

    Serial.print((char)msg_mod_1);
    Serial.println((char)msg_mod_2);

    radio.openWritingPipe((byte *)ID_MODULE_1);
    radio.write((byte *)&msg_mod_1, sizeof(byte));

    radio.openWritingPipe((byte *)ID_MODULE_2);
    radio.write((byte *)&msg_mod_2, sizeof(byte));
  }

}

