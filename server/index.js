'use strict';

const bleno = require(`bleno`);
const colourCharacteristic = require(`./colourCharacteristic.js`)

bleno.on(`stateChange`, (state) => {
    if (state === `poweredOn`) {
        bleno.startAdvertising('Pixel Colours', ['8b68df30-1cbe-11e8-b151-297a54730e1c']);
    } else {
        bleno.stopAdvertising();
    }
});

bleno.on(`advertisingStart`, (error) => {
    console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));

    if (!error) {
        bleno.setServices([
            new bleno.PrimaryService({
                uuid: '8b68df30-1cbe-11e8-b151-297a54730e1c',
                characteristics: [
                    new colourCharacteristic()
                ]
            })
        ]);
    }
});
