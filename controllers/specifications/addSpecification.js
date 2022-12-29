const Product = require("../../models/Product");
// GENERAL
const Case = require("../../models/productSpecifications/general/Case");
const CPU = require("../../models/productSpecifications/general/CPU");
const CPU_COOLER = require("../../models/productSpecifications/general/CPUCooler");
const MEMORY = require("../../models/productSpecifications/general/Memory");
const MOTHERBOARD = require("../../models/productSpecifications/general/Motherboard");
const OS = require("../../models/productSpecifications/general/OS");
const POWER_SUPPLY = require("../../models/productSpecifications/general/PowerSupply");
const STORAGE = require("../../models/productSpecifications/general/Storage");
const VIDEO_CARD = require("../../models/productSpecifications/general/VideoCard");

// Expansion Cards
// Peripherals
// Accessories/Others

const addSpecification = async (req, res) => {
    try {
        const { category, _id } = req.product;
        req.body._productId = _id;
        const body = req.body;
        let newSpecification;

        switch (category) {
            // GENERAL
            case "CASE":
                newSpecification = new Case({
                    _productId: body._productId,
                    manufacturer: body.manufacturer,
                    type: body.type,
                    color: body.color,
                    powerSupply: body.powerSupply,
                    sidePanel: body.sidePanel,
                    powerSupplyShroud: body.powerSupplyShroud,
                    frontPanelUSB: body.frontPanelUSB,
                    motherboardFormFactor: body.motherboardFormFactor,
                    maxLength: body.maxLength,
                    driveBays: body.driveBays,
                    expansionSlots: body.expansionSlots,
                    dimensions: body.dimensions,
                    volume: body.volume
                })

                break;
            case "CPU":
                newSpecification = new CPU({
                    _productId: body._productId,
                    manufacturer: body.manufacturer,
                    core: body.core,
                    performanceCoreClock: body.performanceCoreClock,
                    performanceBoostClock: body.performanceBoostClock,
                    TDP: body.TDP,
                    series: body.series,
                    microArchitechture: body.microArchitechture,
                    coreFamily: body.coreFamily,
                    socket: body.socket,
                    integratedGraphics: body.integratedGraphics,
                    maxSupportedMemory: body.maxSupportedMemory,
                    eccSupport: body.eccSupport,
                    includesCooler: body.includesCooler,
                    packaging: body.packaging,
                    l1Cache: body.l1Cache,
                    l2Cache: body.l2Cache,
                    l3Cache: body.l3Cache,
                    lithography: body.lithography,
                    includesCPUCooler: body.includesCPUCooler,
                    multithreading: body.multithreading,
                    typeOfMultithreading: body.typeOfMultithreading
                })

                break;
            case "CPU_COOLER":
                newSpecification = new CPU_COOLER({
                    _productId: body._productId,
                    manufacturer: body.manufacturer,
                    model: body.model,
                    fanRPM: body.fanRPM,
                    noiseLevel: body.noiseLevel,
                    color: body.color,
                    height: body.height,
                    cpuSocket: body.cpuSocket,
                    waterCooled: body.waterCooled,
                    fanless: body.fanless
                })

                break;
            case "MEMORY":
                newSpecification = new MEMORY({
                    _productId: body._productId,
                    manufacturer: body.manufacturer,
                    speed: body.speed,
                    formFactor: body.formFactor,
                    modules: body.modules,
                    color: body.color,
                    firstWordLatency: body.firstWordLatency,
                    CASLatency: body.CASLatency,
                    voltage: body.voltage,
                    timing: body.timing,
                    ecc_Registered: body.ecc_Registered,
                    heatSpreader: body.heatSpreader,
                })

                break;
            case "MONITOR":
                newSpecification = new MONITOR({
                    _productId: body._productId,
                    manufacturer: body.manufacturer,
                    screenSize: body.screenSize,
                    resolution: body.resolution,
                    refreshRate: body.refreshRate,
                    responseTimeG2G: body.responseTimeG2G,
                    panelType: body.panelType,
                    aspectRatio: body.aspectRatio,
                    color: body.color,
                    brightness: body.brightness,
                    hdrTier: body.hdrTier,
                    widescreen: body.widescreen,
                    curvedScreen: body.curvedScreen,
                    frameSync: body.frameSync,
                    builtInSpeakers: body.builtInSpeakers,
                    viewingAngle: body.viewingAngle,
                    inputs: body.inputs,
                })

                break;
            case "MOTHERBOARD":
                newSpecification = new MOTHERBOARD({
                    _productId: body._productId,
                    manufacturer: body.manufacturer,
                    socketCpu: body.socketCpu,
                    formFactor: body.formFactor,
                    chipset: body.chipset,
                    maxMemory: body.maxMemory,
                    memorySlots: body.memorySlots,
                    memorySpeed: body.memorySpeed,
                    color: body.color,
                    sliCrossfire: body.sliCrossfire,
                    pci16Slots: body.pci16Slots,
                    pci8Slots: body.pci8Slots,
                    pci4Slots: body.pci4Slots,
                    pci1Slots: body.pci1Slots,
                    pciSlots: body.pciSlots,
                    m2Slots: body.m2Slots,
                    miniPCIeSlots: body.miniPCIeSlots,
                    halfMiniPCIeSlots: body.halfMiniPCIeSlots,
                    miniPCIe_mSATASlots: body.miniPCIe_mSATASlots,
                    mSataSlots: body.mSataSlots,
                    sata6Gb: body.sata6Gb,
                    onboardEthernet: body.onboardEthernet,
                    onboardVideo: body.onboardVideo,
                    usb2Headers: body.usb2Headers,
                    singleUsb2Headers: body.singleUsb2Headers,
                    usb3_2Gen1Headers: body.usb3_2Gen1Headers,
                    usb3_2Gen2Headers: body.usb3_2Gen2Headers,
                    usb3_2Gen2x2Headers: body.usb3_2Gen2x2Headers,
                    supportsECC: body.supportsECC,
                    wirelessNetworking: body.wirelessNetworking,
                    raidSupport: body.raidSupport,
                })

                break;
            case "OS":
                newSpecification = new OS({
                    _productId: body._productId,
                    manufacturer: body.manufacturer,
                    model: body.model,
                    mode: body.mode,
                    version: body.version,
                    maxSupportedMemory: body.maxSupportedMemory,
                })

                break;
            case "POWER_SUPPLY":
                newSpecification = new POWER_SUPPLY({
                    _productId: body._productId,
                    manufacturer: body.manufacturer,
                    model: body.model,
                    type: body.type,
                    efficiencyRating: body.efficiencyRating,
                    wattage: body.wattage,
                    length: body.length,
                    modular: body.modular,
                    color: body.color,
                    fanless: body.fanless,
                    atx4pinConnectors: body.atx4pinConnectors,
                    eps8pinConnectors: body.eps8pinConnectors,
                    pcie12_4pin12VHPWRconnectors: body.pcie12_4pin12VHPWRconnectors,
                    pcie12pinConnectors: body.pcie12pinConnectors,
                    pcie8pinConnectors: body.pcie8pinConnectors,
                    pcie6_2pinConnectors: body.pcie6_2pinConnectors,
                    pcie6pinConnectors: body.pcie6pinConnectors,
                    sataConnectors: body.sataConnectors,
                    molex4pinConnectors: body.molex4pinConnectors,
                })

                break;
            case "STORAGE":
                newSpecification = new STORAGE({
                    _productId: body._productId,
                    manufacturer: body.manufacturer,
                    capacity: body.capacity,
                    type: body.type,
                    cache: body.cache,
                    formFactor: body.formFactor,
                    interface: body.interface,
                    nvme: body.nvme,
                })

                break;
            case "VIDEO_CARD":
                newSpecification = new VIDEO_CARD({
                    _productId: body._productId,
                    manufacturer: body.manufacturer,
                    model: body.model,
                    chipset: body.chipset,
                    memory: body.memory,
                    coreClock: body.coreClock,
                    boostClock: body.boostClock,
                    effectiveMemoryClock: body.effectiveMemoryClock,
                    interface: body.interface,
                    color: body.color,
                    frameSync: body.frameSync,
                    length: body.length,
                    TDP: body.TDP,
                    caseExpansionSlotWidth: body.caseExpansionSlotWidth,
                    totalSlotWidth: body.totalSlotWidth,
                    cooling: body.cooling,
                    externalPower: body.externalPower,
                    hdmiOutputs: body.hdmiOutputs,
                    displayPortOutputs: body.displayPortOutputs,
                })

                break;

            // Expansion Cards
            // Peripherals
            // Accessories/Others
        }

        await newSpecification.save();

        return res.status(200).json({
            status: 200,
            message: `Specification added to product ID: ${_id}!`,
            result: newSpecification
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

module.exports = addSpecification;