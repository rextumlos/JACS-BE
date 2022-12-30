// GENERAL
const { CASE, CPU, CPU_COOLER, MEMORY, MONITOR, MOTHERBOARD, OS, POWER_SUPPLY, STORAGE, VIDEO_CARD } = require("../../models/productSpecifications/general");
// Expansion Cards
const { SOUND_CARD, WIRED_NA, WIRELESS_NA } = require("../../models/productSpecifications/expansionCards");
// Peripherals
const { HEADPHONES, KEYBOARD, MOUSE, SPEAKER, WEBCAM } = require("../../models/productSpecifications/peripherals");
// Accessories/Others
const { CASE_ACCESSORY, CASE_FAN, EXTERNAL_STORAGE, FAN_CONTROLLER, OPTICAL_DRIVE, THERMAL_COMPOUND, UPS } = require("../../models/productSpecifications/accessories");

const deleteSpecification = async (id, category) => {
    try {

        for (let i = 0; i < id.length; i++) {
            switch (category[i]) {
                // GENERAL
                case "CASE":
                    specification = await CASE.findOneAndDelete({ _productId: id[i] });
                    break;
                case "CPU":
                    specification = await CPU.findOneAndDelete({ _productId: id[i] });
                    break;
                case "CPU_COOLER":
                    specification = await CPU_COOLER.findOneAndDelete({ _productId: id[i] });
                    break;
                case "MEMORY":
                    specification = await MEMORY.findOneAndDelete({ _productId: id[i] });
                    break;
                case "MONITOR":
                    specification = await MONITOR.findOneAndDelete({ _productId: id[i] });
                    break;
                case "MOTHERBOARD":
                    specification = await MOTHERBOARD.findOneAndDelete({ _productId: id[i] });
                    break;
                case "OS":
                    specification = await OS.findOneAndDelete({ _productId: id[i] });
                    break;
                case "POWER_SUPPLY":
                    specification = await POWER_SUPPLY.findOneAndDelete({ _productId: id[i] });
                    break;
                case "STORAGE":
                    specification = await STORAGE.findOneAndDelete({ _productId: id[i] });
                    break;
                case "VIDEO_CARD":
                    specification = await VIDEO_CARD.findOneAndDelete({ _productId: id[i] });
                    break;

                // Expansion Cards
                case "SOUND_CARD":
                    specification = await SOUND_CARD.findOneAndDelete({ _productId: id[i] });
                    break;
                case "WIRED_NETWORK_ADAPTER":
                    specification = await WIRED_NA.findOneAndDelete({ _productId: id[i] });
                    break;
                case "WIRELESS_NETWORK_ADAPTER":
                    specification = await WIRELESS_NA.findOneAndDelete({ _productId: id[i] });
                    break;

                // Peripherals
                case "HEADPHONES":
                    specification = await HEADPHONES.findOneAndDelete({ _productId: id[i] });
                    break;
                case "KEYBOARD":
                    specification = await KEYBOARD.findOneAndDelete({ _productId: id[i] });
                    break;
                case "MOUSE":
                    specification = await MOUSE.findOneAndDelete({ _productId: id[i] });
                    break;
                case "SPEAKER":
                    specification = await SPEAKER.findOneAndDelete({ _productId: id[i] });
                    break;
                case "WEBCAM":
                    specification = await WEBCAM.findOneAndDelete({ _productId: id[i] });
                    break;

                // Accessories/Others
                case "CASE_ACCESSORY":
                    specification = await CASE_ACCESSORY.findOneAndDelete({ _productId: id[i] });
                    break;
                case "CASE_FAN":
                    specification = await CASE_FAN.findOneAndDelete({ _productId: id[i] });
                    break;
                case "EXTERNAL_STORAGE":
                    specification = await EXTERNAL_STORAGE.findOneAndDelete({ _productId: id[i] });
                    break;
                case "FAN_CONTROLLER":
                    specification = await FAN_CONTROLLER.findOneAndDelete({ _productId: id[i] });
                    break;
                case "OPTICAL_DRIVE":
                    specification = await OPTICAL_DRIVE.findOneAndDelete({ _productId: id[i] });
                    break;
                case "THERMAL_COMPOUND":
                    specification = await THERMAL_COMPOUND.findOneAndDelete({ _productId: id[i] });
                    break;
                case "UPS":
                    specification = await UPS.findOneAndDelete({ _productId: id[i] });
                    break;
            }
        }



    } catch (error) {
        if (error.errors)
            return res.status(400).json({
                status: 400,
                message: error.errors
            });

        console.log(error);
        return res.status(500).json({
            status: 500,
            message: error
        });
    }
}

module.exports = {
    deleteSpecification
}