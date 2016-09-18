all: preparations send_cmd
development: all openmilight

CPP=g++ -Ofast -mfpu=vfp -mfloat-abi=hard -march=native -I /usr/local/include -L /usr/local/lib


preparations:
	mkdir -p bin

send_cmd:
	$(CPP) -lrf24-bcm src/PL1167_nRF24.cpp src/MiLightRadio.cpp src/send-milight-cmd.cpp -o bin/send-milight-cmd

openmilight:
	$(CPP) -lrf24-bcm src/PL1167_nRF24.cpp src/MiLightRadio.cpp src/openmilight.cpp -o bin/openmilight

create-daemon:
	cp ./src/sunlight-alarm.service /etc/systemd/system/
	systemctl enable sunlight-alarm.service
	systemctl start sunlight-alarm.service
