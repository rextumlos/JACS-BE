const Product = require("../../models/Product");
// GENERAL
const { CASE, CPU, CPU_COOLER, MEMORY, MONITOR, MOTHERBOARD, OS, POWER_SUPPLY, STORAGE, VIDEO_CARD } = require("../../models/productSpecifications/general");
// Expansion Cards
const { SOUND_CARD, WIRED_NA, WIRELESS_NA } = require("../../models/productSpecifications/expansionCards");
// Peripherals
const { HEADPHONES, KEYBOARD, MOUSE, SPEAKER, WEBCAM } = require("../../models/productSpecifications/peripherals");
// Accessories/Others
const { CASE_ACCESSORY, CASE_FAN, EXTERNAL_STORAGE, FAN_CONTROLLER, OPTICAL_DRIVE, THERMAL_COMPOUND, UPS } = require("../../models/productSpecifications/accessories");

const getSpecification = async (req, res) => {
    try {
        const { category, _id } = req.product;
        req.body._productId = _id;
        let specification;

        switch (category) {
            // GENERAL
            case "CASE":
                specification = await CASE.findOne({ _productId: _id });
                break;
            case "CPU":
                specification = await CPU.findOne({ _productId: _id });
                break;
            case "CPU_COOLER":
                specification = await CPU_COOLER.findOne({ _productId: _id });
                break;
            case "MEMORY":
                specification = await MEMORY.findOne({ _productId: _id });
                break;
            case "MONITOR":
                specification = await MONITOR.findOne({ _productId: _id });
                break;
            case "MOTHERBOARD":
                specification = await MOTHERBOARD.findOne({ _productId: _id });
                break;
            case "OS":
                specification = await OS.findOne({ _productId: _id });
                break;
            case "POWER_SUPPLY":
                specification = await POWER_SUPPLY.findOne({ _productId: _id });
                break;
            case "STORAGE":
                specification = await STORAGE.findOne({ _productId: _id });
                break;
            case "VIDEO_CARD":
                specification = await VIDEO_CARD.findOne({ _productId: _id });
                break;

            // Expansion Cards
            case "SOUND_CARD":
                specification = await SOUND_CARD.findOne({ _productId: _id });
                break;
            case "WIRED_NETWORK_ADAPTER":
                specification = await WIRED_NA.findOne({ _productId: _id });
                break;
            case "WIRELESS_NETWORK_ADAPTER":
                specification = await WIRELESS_NA.findOne({ _productId: _id });
                break;

            // Peripherals
            case "HEADPHONES":
                specification = await HEADPHONES.findOne({ _productId: _id });
                break;
            case "KEYBOARD":
                specification = await KEYBOARD.findOne({ _productId: _id });
                break;
            case "MOUSE":
                specification = await MOUSE.findOne({ _productId: _id });
                break;
            case "SPEAKER":
                specification = await SPEAKER.findOne({ _productId: _id });
                break;
            case "WEBCAM":
                specification = await WEBCAM.findOne({ _productId: _id });
                break;

            // Accessories/Others
            case "CASE_ACCESSORY":
                specification = await CASE_ACCESSORY.findOne({ _productId: _id });
                break;
            case "CASE_FAN":
                specification = await CASE_FAN.findOne({ _productId: _id });
                break;
            case "EXTERNAL_STORAGE":
                specification = await EXTERNAL_STORAGE.findOne({ _productId: _id });
                break;
            case "FAN_CONTROLLER":
                specification = await FAN_CONTROLLER.findOne({ _productId: _id });
                break;
            case "OPTICAL_DRIVE":
                specification = await OPTICAL_DRIVE.findOne({ _productId: _id });
                break;
            case "THERMAL_COMPOUND":
                specification = await THERMAL_COMPOUND.findOne({ _productId: _id });
                break;
            case "UPS":
                specification = await UPS.findOne({ _productId: _id });
                break;
        

        }

        if (!specification)
            return res.status(400).json({
                status: 400,
                message: `No specification for product ID: ${_id}!`
            })

        return res.status(200).json({
            status: 200,
            message: `Specification of product ID: ${_id} retrieved!`,
            result: specification
        })

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

module.exports = getSpecification;