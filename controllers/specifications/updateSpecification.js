const Product = require("../../models/Product");
// GENERAL
const { CASE, CPU, CPU_COOLER, MEMORY, MONITOR, MOTHERBOARD, OS, POWER_SUPPLY, STORAGE, VIDEO_CARD } = require("../../models/productSpecifications/general");
// Expansion Cards
const { SOUND_CARD, WIRED_NA, WIRELESS_NA } = require("../../models/productSpecifications/expansionCards");
// Peripherals
const { HEADPHONES, KEYBOARD, MOUSE, SPEAKER, WEBCAM } = require("../../models/productSpecifications/peripherals");
// Accessories/Others
const { CASE_ACCESSORY, CASE_FAN, EXTERNAL_STORAGE, FAN_CONTROLLER, OPTICAL_DRIVE, THERMAL_COMPOUND, UPS } = require("../../models/productSpecifications/accessories");

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
                findSpecification = await CASE.findOne({ _productId: _id });
                updatedSpecification = await CASE.findOneAndUpdate(
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
            case "CASE_ACCESSORY":
                findSpecification = await CASE_ACCESSORY.findOne({ _productId: _id });
                updatedSpecification = await CASE_ACCESSORY.findOneAndUpdate(
                    { _productId: _id },
                    {
                        $set: body
                    },
                    { runValidators: true, new: true }
                )
                break;
            case "CASE_FAN":
                findSpecification = await CASE_FAN.findOne({ _productId: _id });
                updatedSpecification = await CASE_FAN.findOneAndUpdate(
                    { _productId: _id },
                    {
                        $set: body
                    },
                    { runValidators: true, new: true }
                )
                break;
            case "EXTERNAL_STORAGE":
                findSpecification = await EXTERNAL_STORAGE.findOne({ _productId: _id });
                updatedSpecification = await EXTERNAL_STORAGE.findOneAndUpdate(
                    { _productId: _id },
                    {
                        $set: body
                    },
                    { runValidators: true, new: true }
                )
                break;
            case "FAN_CONTROLLER":
                findSpecification = await FAN_CONTROLLER.findOne({ _productId: _id });
                updatedSpecification = await FAN_CONTROLLER.findOneAndUpdate(
                    { _productId: _id },
                    {
                        $set: body
                    },
                    { runValidators: true, new: true }
                )
                break;
            case "OPTICAL_DRIVE":
                findSpecification = await OPTICAL_DRIVE.findOne({ _productId: _id });
                updatedSpecification = await OPTICAL_DRIVE.findOneAndUpdate(
                    { _productId: _id },
                    {
                        $set: body
                    },
                    { runValidators: true, new: true }
                )
                break;
            case "THERMAL_COMPOUND":
                findSpecification = await THERMAL_COMPOUND.findOne({ _productId: _id });
                updatedSpecification = await THERMAL_COMPOUND.findOneAndUpdate(
                    { _productId: _id },
                    {
                        $set: body
                    },
                    { runValidators: true, new: true }
                )
                break;
            case "UPS":
                findSpecification = await UPS.findOne({ _productId: _id });
                updatedSpecification = await UPS.findOneAndUpdate(
                    { _productId: _id },
                    {
                        $set: body
                    },
                    { runValidators: true, new: true }
                )
                break;
        
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