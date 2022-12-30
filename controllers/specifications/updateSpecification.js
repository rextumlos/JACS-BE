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

const updateSpecification = async (req, res) => {
    const { category, _id } = req.product;
    req.body._productId = _id;
    const body = req.body;
    let findSpecification;
    let updatedSpecification;

    try {
        switch (category) {
            // GENERAL
            case "CASE":
                findSpecification = await Case.findOne({ _productId: _id });
                updatedSpecification = await Case.findOneAndUpdate(
                    { _productId: _id },
                    {
                        $set: body
                    },
                    { runValidators: true, new: true }
                );

                break;
            case "CPU":
                findSpecification = await CPU.findOne({ _productId: _id });
                updatedSpecification = await CPU.findOneAndUpdate(
                    { _productId: _id },
                    {
                        $set: body
                    },
                    { runValidators: true, new: true }
                )

                break;
            case "CPU_COOLER":
                findSpecification = await CPU_COOLER.findOne({ _productId: _id });
                updatedSpecification = await CPU_COOLER.findOneAndUpdate(
                    { _productId: _id },
                    {
                        $set: body
                    },
                    { runValidators: true, new: true }
                )

                break;
            case "MEMORY":
                findSpecification = await MEMORY.findOne({ _productId: _id });
                updatedSpecification = await MEMORY.findOneAndUpdate(
                    { _productId: _id },
                    {
                        $set: body
                    },
                    { runValidators: true, new: true }
                )

                break;
            case "MONITOR":
                findSpecification = await MONITOR.findOne({ _productId: _id });
                updatedSpecification = await MONITOR.findOneAndUpdate(
                    { _productId: _id },
                    {
                        $set: body
                    },
                    { runValidators: true, new: true }
                )

                break;
            case "MOTHERBOARD":
                findSpecification = await MOTHERBOARD.findOne({ _productId: _id });
                updatedSpecification = await MOTHERBOARD.findOneAndUpdate(
                    { _productId: _id },
                    {
                        $set: body
                    },
                    { runValidators: true, new: true }
                )

                break;
            case "OS":
                findSpecification = await OS.findOne({ _productId: _id });
                updatedSpecification = await OS.findOneAndUpdate(
                    { _productId: _id },
                    {
                        $set: body
                    },
                    { runValidators: true, new: true }
                )

                break;
            case "POWER_SUPPLY":
                findSpecification = await POWER_SUPPLY.findOne({ _productId: _id });
                updatedSpecification = await POWER_SUPPLY.findOneAndUpdate(
                    { _productId: _id },
                    {
                        $set: body
                    },
                    { runValidators: true, new: true }
                )

                break;
            case "STORAGE":
                findSpecification = await STORAGE.findOne({ _productId: _id });
                updatedSpecification = await STORAGE.findOneAndUpdate(
                    { _productId: _id },
                    {
                        $set: body
                    },
                    { runValidators: true, new: true }
                )

                break;
            case "VIDEO_CARD":
                findSpecification = await VIDEO_CARD.findOne({ _productId: _id });
                updatedSpecification = await VIDEO_CARD.findOneAndUpdate(
                    { _productId: _id },
                    {
                        $set: body
                    },
                    { runValidators: true, new: true }
                )

                break;

            // Expansion Cards
            case "SOUND_CARD":
                findSpecification = await SOUND_CARD.findOne({ _productId: _id });
                updatedSpecification = await SOUND_CARD.findOneAndUpdate(
                    { _productId: _id },
                    {
                        $set: body
                    },
                    { runValidators: true, new: true }
                )
                break;
            case "WIRED_NETWORK_ADAPTER":
                findSpecification = await WIRED_NA.findOne({ _productId: _id });
                updatedSpecification = await WIRED_NA.findOneAndUpdate(
                    { _productId: _id },
                    {
                        $set: body
                    },
                    { runValidators: true, new: true }
                )
                break;
            case "WIRELESS_NETWORK_ADAPTER":
                findSpecification = await WIRELESS_NA.findOne({ _productId: _id });
                updatedSpecification = await WIRELESS_NA.findOneAndUpdate(
                    { _productId: _id },
                    {
                        $set: body
                    },
                    { runValidators: true, new: true }
                )
                break;

            // Peripherals
            case "HEADPHONES":
                findSpecification = await HEADPHONES.findOne({ _productId: _id });
                updatedSpecification = await HEADPHONES.findOneAndUpdate(
                    { _productId: _id },
                    {
                        $set: body
                    },
                    { runValidators: true, new: true }
                )
                break;
            case "KEYBOARD":
                findSpecification = await KEYBOARD.findOne({ _productId: _id });
                updatedSpecification = await KEYBOARD.findOneAndUpdate(
                    { _productId: _id },
                    {
                        $set: body
                    },
                    { runValidators: true, new: true }
                )
                break;
            case "MOUSE":
                findSpecification = await MOUSE.findOne({ _productId: _id });
                updatedSpecification = await MOUSE.findOneAndUpdate(
                    { _productId: _id },
                    {
                        $set: body
                    },
                    { runValidators: true, new: true }
                )
                break;
            case "SPEAKER":
                findSpecification = await SPEAKER.findOne({ _productId: _id });
                updatedSpecification = await SPEAKER.findOneAndUpdate(
                    { _productId: _id },
                    {
                        $set: body
                    },
                    { runValidators: true, new: true }
                )
                break;
            case "WEBCAM":
                findSpecification = await WEBCAM.findOne({ _productId: _id });
                updatedSpecification = await WEBCAM.findOneAndUpdate(
                    { _productId: _id },
                    {
                        $set: body
                    },
                    { runValidators: true, new: true }
                )
                break;
               
            // Accessories/Others
        }

        if (!findSpecification)
            return res.status(400).json({
                status: 400,
                message: `No specification for product ID: ${_id}!`
            })

        return res.status(200).json({
            status: 200,
            message: `Specification of product ID: ${_id} updated!`,
            result: updatedSpecification
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

module.exports = updateSpecification;