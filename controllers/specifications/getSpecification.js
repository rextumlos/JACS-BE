const Product = require("../../models/Product");
// GENERAL
const Case = require("../../models/productSpecifications/general/Case");
const CPU = require("../../models/productSpecifications/general/CPU");
const CPU_COOLER = require("../../models/productSpecifications/general/CPUCooler");
const MEMORY = require("../../models/productSpecifications/general/Memory");
const MONITOR = require("../../models/productSpecifications/general/Monitor");
const MOTHERBOARD = require("../../models/productSpecifications/general/Motherboard");
const OS = require("../../models/productSpecifications/general/OS");
const POWER_SUPPLY = require("../../models/productSpecifications/general/PowerSupply");
const STORAGE = require("../../models/productSpecifications/general/Storage");
const VIDEO_CARD = require("../../models/productSpecifications/general/VideoCard");

// Expansion Cards
const SOUND_CARD = require("../../models/productSpecifications/expansionCards/SoundCard");
const WIRED_NA = require("../../models/productSpecifications/expansionCards/SoundCard");
const WIRELESS_NA = require("../../models/productSpecifications/expansionCards/SoundCard");

// Peripherals
const HEADPHONES = require("../../models/productSpecifications/peripherals/Headphones");
const KEYBOARD = require("../../models/productSpecifications/peripherals/Keyboard");
const MOUSE = require("../../models/productSpecifications/peripherals/Mouse");
const SPEAKER = require("../../models/productSpecifications/peripherals/Speaker");
const WEBCAM = require("../../models/productSpecifications/peripherals/Webcam");

// Accessories/Others

const getSpecification = async (req, res) => {
    try {
        const { category, _id } = req.product;
        req.body._productId = _id;
        let specification;

        switch (category) {
            // GENERAL
            case "CASE":
                specification = await Case.findOne({ _productId: _id });
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
            case "":
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