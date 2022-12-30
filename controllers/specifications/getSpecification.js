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
// Peripherals
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
            // Peripherals
            // Accessories/Others
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