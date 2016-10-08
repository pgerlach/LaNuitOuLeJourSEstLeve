#include <SPI.h>
#include <Mirf.h>
#include <nRF24L01.h>
#include <MirfHardwareSpiDriver.h>
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

void setup(){
  Serial.begin(115200);

  // init nRF24L01
  Mirf.cePin = PIN_NRF24L01_CE;
  Mirf.csnPin = PIN_NRF24L01_CS;
  Mirf.spi = &MirfHardwareSpi;
  Mirf.init();

  // telc -> telecommand
  Mirf.setRADDR((byte *)ID_REMOTE);

  // not much info to send
  Mirf.payload = sizeof(byte);

  /*
   * To change channel:
   * 
   * Mirf.channel = 10;
   *
   * NB: Make sure channel is legal in your area.
   */
   
  Mirf.config();

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

    Mirf.setTADDR((byte *)ID_MODULE_1);
    Mirf.send((byte *)&msg_mod_1);
    while(Mirf.isSending()) {}

    Mirf.setTADDR((byte *)ID_MODULE_2);
    Mirf.send((byte *)&msg_mod_2);
    while(Mirf.isSending()) {}
  }

}

