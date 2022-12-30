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
const HEADPHONES = require("../../models/productSpecifications/peripherals/Headphone");
const KEYBOARD = require("../../models/productSpecifications/peripherals/Keyboard");
const MOUSE = require("../../models/productSpecifications/peripherals/Mouse");
const SPEAKER = require("../../models/productSpecifications/peripherals/Speaker");
const WEBCAM = require("../../models/productSpecifications/peripherals/Webcam");

// Accessories/Others

const addSpecification = async (req, res) => {
    try {
        const { category, _id } = req.product;
        req.body._productId = _id;
        const body = req.body;
        let existingSpecification;
        let newSpecification;

        switch (category) {
            // GENERAL
            case "CASE":
                existingSpecification = Case.findOne({ _productId: _id });
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
                existingSpecification = CPU.findOne({ _productId: _id });
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
                existingSpecification = CPU_COOLER.findOne({ _productId: _id });
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
                existingSpecification = MEMORY.findOne({ _productId: _id });
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
                existingSpecification = MONITOR.findOne({ _productId: _id });
                newSpecification = new MONITOR({
                    _productId: body._productId,
                    manufacturer: body.manufacturer,
                    model: body.model,
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
                existingSpecification = MOTHERBOARD.findOne({ _productId: _id });
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
                existingSpecification = OS.findOne({ _productId: _id });
                newSpecification = new OS({
                    _productId: body._productId,
                    manufacturer: body.manufacturer,
                    model: body.model,
                    mode: body.mode,
                    version: body.version,
                    maxSupportedMemory: body.maxSupportedMemory,
                    features: body.features
                })

                break;
            case "POWER_SUPPLY":
                existingSpecification = POWER_SUPPLY.findOne({ _productId: _id });
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
                existingSpecification = STORAGE.findOne({ _productId: _id });
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
                existingSpecification = VIDEO_CARD.findOne({ _productId: _id });
                newSpecification = new VIDEO_CARD({
                    _productId: body._productId,
                    manufacturer: body.manufacturer,
                    model: body.model,
                    chipset: body.chipset,
                    memory: body.memory,
                    memoryType: body.memoryType,
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
                    dviOutputs: body.dviOutputs,
                    hdmiOutputs: body.hdmiOutputs,
                    displayPortOutputs: body.displayPortOutputs,
                })

                break;

            // Expansion Cards
            case "SOUND_CARD":
                existingSpecification = SOUND_CARD.findOne({ _productId: _id });
                newSpecification = new SOUND_CARD({
                    _productId: body._productId,
                    manufacturer: body.manufacturer,
                    model: body.model,
                    channels: body.channels,
                    digitalAudio: body.digitalAudio,
                    signalToNoiseRatio: body.signalToNoiseRatio,
                    sampleRate: body.sampleRate,
                    chipSet: body.chipSet,
                    interface: body.interface,
                    color: body.color,
                })

                break;
            case "WIRED_NETWORK_ADAPTER":
                existingSpecification = WIRED_NA.findOne({ _productId: _id });
                newSpecification = new WIRED_NA({
                    _productId: body._productId,
                    manufacturer: body.manufacturer,
                    interface: body.interface,
                    features: body.features,

                })
                break;
            case "WIRELESS_NETWORK_ADAPTER":
                existingSpecification = WIRELESS_NA.findOne({ _productId: _id });
                newSpecification = new WIRELESS_NA({
                    _productId: body._productId,
                    manufacturer: body.manufacturer,
                    protocol: body.protocol,
                    interface: body.interface,
                    security: body.security,
                    antenna: body.antenna,
                    features: body.features,
                })
                break;

            // Peripherals
            case "HEADPHONES":
                existingSpecification = HEADPHONES.findOne({ _productId: _id });
                newSpecification = new HEADPHONES({
                    _productId: body._productId,
                    manufacturer: body.manufacturer,
                    
                })
                break;
            case "KEYBOARD":
                existingSpecification = KEYBOARD.findOne({ _productId: _id });
                newSpecification = new KEYBOARD({
                    _productId: body._productId,
                    manufacturer: body.manufacturer,

                })
                break;
            case "MOUSE":
                existingSpecification = MOUSE.findOne({ _productId: _id });
                newSpecification = new MOUSE({
                    _productId: body._productId,
                    manufacturer: body.manufacturer,

                })
                break;
            case "SPEAKER":
                existingSpecification = SPEAKER.findOne({ _productId: _id });
                newSpecification = new SPEAKER({
                    _productId: body._productId,
                    manufacturer: body.manufacturer,

                })
                break;
            case "WEBCAM":
                existingSpecification = WEBCAM.findOne({ _productId: _id });
                newSpecification = new WEBCAM({
                    _productId: body._productId,
                    manufacturer: body.manufacturer,
                    
                })
                break;

            // Accessories/Others
            case "":
                break;
        }

        if (existingSpecification)
            return res.status(400).json({
                status: 400,
                message: `Specification of product ID: ${_id} already exists.`
            })

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