'use strict';

const bleno = require(`bleno`);

class pixelsCharacteristic extends bleno.Characteristic {
    constructor(pixels) {
        super({
            uuid: '37126c50-1d7a-11e8-8c35-afb087a93d8a',
            properties: ['read'],
            descriptors: [
                new bleno.Descriptor({
                    uuid: '2901',
                    value: 'Gets the number of pixels'
                })
            ],
            value: Buffer.from(pixels.toString())
        });
    }
}

module.exports = pixelsCharacteristic;
