if (!navigator.bluetooth) {
    alert('You must use a Web Bluetooth enabled browser');
} else {
    const encoder = new TextEncoder('utf-8');
    const decoder = new TextDecoder('utf-8');

    document.querySelector('#connect').addEventListener('click', async () => {
        const serviceUuid = '8b68df30-1cbe-11e8-b151-297a54730e1c';
        const colourCharacteristicUuid = 'a2a88bd0-1cc5-11e8-8202-71882458c124';
        const pixelsCharacteristicUuid = '37126c50-1d7a-11e8-8c35-afb087a93d8a';

        const positionEl = document.querySelector('#position');
        const colourEl = document.querySelector('#color');

        const service = await navigator.bluetooth.requestDevice({ filters: [{ services: [serviceUuid] }] }).then((device) => {
            return device.gatt.connect();
        }).then((server) => {
            return server.getPrimaryService(serviceUuid);
        })

        const pixels = await service.getCharacteristic(pixelsCharacteristicUuid).then((characteristic) => {
            return characteristic.readValue();
        }).then((value) => {
            return parseInt(decoder.decode(value));
        });

        for (let i = 0; i < pixels; i++) {
            let option = document.createElement('option');
            option.value = option.text = i;
            positionEl.add(option);
        }

        const colourCharacteristic = await service.getCharacteristic(colourCharacteristicUuid);

        document.querySelector('#connect').style.display = 'none';
        document.querySelector('#controls').style.display = 'block';

        document.querySelector('#set').addEventListener('click', () => {
            const obj = {
                position: positionEl.value,
                color: colourEl.value
            };

            colourCharacteristic.writeValue(encoder.encode(JSON.stringify(obj)))
            .catch(error => { console.log(error); });
        });
    });
}
