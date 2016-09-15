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
#define PIN_BTN_MODULE_1_BRAKE (2)
#define PIN_BTN_MODULE_1_FREE  (3)
#define PIN_BTN_MODULE_2_BRAKE (4)
#define PIN_BTN_MODULE_2_FREE  (5)

Button btn_module_1_brake(PIN_BTN_MODULE_1_BRAKE);
Button btn_module_1_free(PIN_BTN_MODULE_1_FREE);
Button btn_module_2_brake(PIN_BTN_MODULE_2_BRAKE);
Button btn_module_2_free(PIN_BTN_MODULE_2_FREE);

void setup(){
  Serial.begin(9600);

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
  btn_module_1_brake.begin();
  btn_module_1_free.begin();

  btn_module_2_brake.begin();
  btn_module_2_free.begin();

  Serial.println("WELCOME TO THE REMOTE LOGS"); 
}

void loop() {
  byte msg = 0x00;

  if (btn_module_1_brake.pressed()) {
    Serial.println("module 1 brake");
    Mirf.setTADDR((byte *)ID_MODULE_1);
    msg = MSG_BRAKE;
    Mirf.send((byte *)&msg);
    while(Mirf.isSending()) {}
  }

  if (btn_module_1_free.pressed()) {
    Serial.println("module 1 free");
    Mirf.setTADDR((byte *)ID_MODULE_1);
    msg = MSG_FREE;
    Mirf.send((byte *)&msg);
    while(Mirf.isSending()) {}
  }

  if (btn_module_2_brake.pressed()) {
    Serial.println("module 2 brake");
    Mirf.setTADDR((byte *)ID_MODULE_2);
    msg = MSG_BRAKE;
    Mirf.send((byte *)&msg);
    while(Mirf.isSending()) {}
  }

  if (btn_module_2_free.pressed()) {
    Serial.println("module 2 free");
    Mirf.setTADDR((byte *)ID_MODULE_2);
    msg = MSG_FREE;
    Mirf.send((byte *)&msg);
    while(Mirf.isSending()) {}
  }

}

