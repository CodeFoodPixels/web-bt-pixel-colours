'use strict';

const bleno = require(`bleno`);
const LED = require(`rpi-ws281x-native`);

class colourCharacteristic extends bleno.Characteristic {
    constructor() {
        super({
            uuid: 'a2a88bd0-1cc5-11e8-8202-71882458c124',
            properties: ['write'],
            value: null
        });

        this.pixelData = new Uint32Array(3);

        LED.init(3);

        this.pixelData[0] = 0;
        this.pixelData[1] = 0;
        this.pixelData[2] = 0;
        LED.render(this.pixelData);

        process.on('SIGINT', function () {
            LED.reset();
            process.nextTick(function () { process.exit(0); });
        });
    }

    onWriteRequest(data, offset, withoutResponse, callback) {
        const pixelObj = JSON.parse(data.toString());
        this.pixelData[pixelObj.position] = parseInt(pixelObj.color.replace('#', ''), 16);
        LED.render(this.pixelData);

        callback(this.RESULT_SUCCESS);
    }
}

module.exports = colourCharacteristic;
