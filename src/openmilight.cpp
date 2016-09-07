/**
 * On a Raspberry Pi 2 compile with:
 *
 * g++ -Ofast -mfpu=vfp -mfloat-abi=hard -march=armv7-a -mtune=arm1176jzf-s -I/usr/local/include -L/usr/local/lib -lrf24-bcm PL1167_nRF24.cpp MiLightRadio.cpp openmili.cpp -o openmilight
 *
 * for receiver mode run with:
 * sudo ./openmilight
 *
 * for sender mode run with:
 * sudo ./openmilight "B0 F2 EA 6D B0 02 f0"
 */

#include <cstdlib>
#include <iostream>
#include <string.h>

using namespace std;

#include <RF24/RF24.h>

#include "PL1167_nRF24.h"
#include "MiLightRadio.h"

RF24 radio(RPI_V2_GPIO_P1_22, RPI_V2_GPIO_P1_24, BCM2835_SPI_SPEED_1MHZ);

PL1167_nRF24 prf(radio);
MiLightRadio mlr(prf);

void setup()
{

/*
  Serial.begin(115200);
  printf_begin();
  delay(1000);
  Serial.println("# OpenMiLight Receiver/Transmitter starting");
*/

  mlr.begin();
}


static int dupesPrinted = 0;
static bool receiving = false;
static bool escaped = false;
static uint8_t outgoingPacket[7];
static uint8_t outgoingPacketPos = 0;

static uint8_t nibble;

static enum {
  IDLE,
  HAVE_NIBBLE,
  COMPLETE,
} state;

void loop(const char* newPacketBytes)
{
  if (receiving) {
    if (mlr.available()) {
      printf("\n");
      uint8_t packet[7];
      size_t packet_length = sizeof(packet);
      mlr.read(packet, packet_length);

      for (int i = 0; i < packet_length; i++) {
        printf("%02X ", packet[i]);
      }
    }

    int dupesReceived = mlr.dupesReceived();
    for (; dupesPrinted < dupesReceived; dupesPrinted++) {
      printf(".");
    }
  } else {

    string line = "";
    cout << "please enter string to send" << endl;
    getline(cin, line);
    const char* packetBytes = line.c_str();

    memset(outgoingPacket, 0, 7);

    // convert input into hex
    int index = 0;
    for (int counter = 0; *packetBytes; ++packetBytes) {
      int n = 0;
      if (*packetBytes >= 'a' && *packetBytes <= 'f') {
        n = *packetBytes - 'a' + 10;
      } else if (*packetBytes >= 'A' && *packetBytes <= 'F') {
        n = *packetBytes - 'A' + 10;
      } else if (*packetBytes >= '0' && *packetBytes <= '9') {
        n = *packetBytes - '0';
      } else if (*packetBytes == ' ') {
        index++;
      } else {
        cout << "cannot decode" << endl;
        exit(1);
      }
      outgoingPacket[index] = outgoingPacket[index] * 16 + (unsigned long) n;
    }

    printf("sending packet\n");
    for (int i = 0; i < 7; i++) {
      printf("%02X ", outgoingPacket[i]);
    }
    printf("\n");

    for (int index = 0; index < 1; index++) {
    }

/*
      printf("sending packet\n");
      for (int i = 0; i < 7; i++) {
        printf("%02X ", outgoingPacket[i]);
      }
      printf("\n");
*/

    mlr.write(outgoingPacket, sizeof(outgoingPacket));
    delay(10);
    mlr.resend();
    delay(10);
    outgoingPacket[6] += 8;
  }

/*
  while (Serial.available()) {
    char inChar = (char)Serial.read();
    uint8_t val = 0;
    bool have_val = true;

    if (inChar >= '0' && inChar <= '9') {
      val = inChar - '0';
    } else if (inChar >= 'a' && inChar <= 'f') {
      val = inChar - 'a' + 10;
    } else if (inChar >= 'A' && inChar <= 'F') {
      val = inChar - 'A' + 10;
    } else {
      have_val = false;
    }

    if (!escaped) {
      if (have_val) {
        switch (state) {
          case IDLE:
            nibble = val;
            state = HAVE_NIBBLE;
            break;
          case HAVE_NIBBLE:
            if (outgoingPacketPos < sizeof(outgoingPacket)) {
              outgoingPacket[outgoingPacketPos++] = (nibble << 4) | (val);
            } else {
              Serial.println("# Error: outgoing packet buffer full/packet too long");
            }
            if (outgoingPacketPos >= sizeof(outgoingPacket)) {
              state = COMPLETE;
            } else {
              state = IDLE;
            }
            break;
          case COMPLETE:
            Serial.println("# Error: outgoing packet complete. Press enter to send.");
            break;
        }
      } else {
        switch (inChar) {
          case ' ':
          case '\n':
          case '\r':
          case '.':
            if (state == COMPLETE) {
              mlr.write(outgoingPacket, sizeof(outgoingPacket));
            }
            if(inChar != ' ') {
              outgoingPacketPos = 0;
              state = IDLE;
            }
            if (inChar == '.') {
              mlr.resend();
              delay(1);
            }
            break;
          case 'x':
            Serial.println("# Escaped to extended commands: r - Toggle receiver; Press enter to return to normal mode.");
            escaped = true;
            break;
        }
      }
    } else {
      switch (inChar) {
        case '\n':
        case '\r':
          outgoingPacketPos = 0;
          state = IDLE;
          escaped = false;
          break;
        case 'r':
          receiving = !receiving;
          if (receiving) {
            Serial.println("# Now receiving");
          } else {
            Serial.println("# Now not receiving");
          }
          break;
      }
    }
  }
*/

}

int
main(int argc, char** arguments)
{
  setup();

  char* packetBytes = 0;

  if (argc < 2) {
    receiving = true;
    printf("in listening mode\n");

  } else {
    receiving = false;
    packetBytes = arguments[1];
    printf("sending: %s\n", packetBytes);

  }

  while (true) {
    loop(packetBytes);
/*
    if (receiving == false) {
      // sleep(1);
      break;
    }
*/

  }

  return 0;
}
