const Product = require("../../models/Product");
// GENERAL
const { CASE, CPU, CPU_COOLER, MEMORY, MONITOR, MOTHERBOARD, OS, POWER_SUPPLY, STORAGE, VIDEO_CARD } = require("../../models/productSpecifications/general");
// Expansion Cards
const { SOUND_CARD, WIRED_NA, WIRELESS_NA } = require("../../models/productSpecifications/expansionCards");
// Peripherals
const { HEADPHONES, KEYBOARD, MOUSE, SPEAKER, WEBCAM } = require("../../models/productSpecifications/peripherals");
// Accessories/Others
const { CASE_ACCESSORY, CASE_FAN, EXTERNAL_STORAGE, FAN_CONTROLLER, OPTICAL_DRIVE, THERMAL_COMPOUND, UPS } = require("../../models/productSpecifications/accessories");

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
                existingSpecification = await CASE.findOne({ _productId: _id });
                newSpecification = new CASE({
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
                existingSpecification = await CPU.findOne({ _productId: _id });
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
                existingSpecification = await CPU_COOLER.findOne({ _productId: _id });
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
                existingSpecification = await MEMORY.findOne({ _productId: _id });
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
                existingSpecification = await MONITOR.findOne({ _productId: _id });
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
                existingSpecification = await MOTHERBOARD.findOne({ _productId: _id });
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
                existingSpecification = await OS.findOne({ _productId: _id });
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
                existingSpecification = await POWER_SUPPLY.findOne({ _productId: _id });
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
                existingSpecification = await STORAGE.findOne({ _productId: _id });
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
                existingSpecification = await VIDEO_CARD.findOne({ _productId: _id });
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
                existingSpecification = await SOUND_CARD.findOne({ _productId: _id });
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
                existingSpecification = await WIRED_NA.findOne({ _productId: _id });
                newSpecification = new WIRED_NA({
                    _productId: body._productId,
                    manufacturer: body.manufacturer,
                    interface: body.interface,
                    features: body.features,

                })
                break;
            case "WIRELESS_NETWORK_ADAPTER":
                existingSpecification = await WIRELESS_NA.findOne({ _productId: _id });
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
                existingSpecification = await HEADPHONES.findOne({ _productId: _id });
                newSpecification = new HEADPHONES({
                    _productId: body._productId,
                    manufacturer: body.manufacturer,
                    model: body.model,
                    type: body.type,
                    frequencyResponse: body.frequencyResponse,
                    microphone: body.microphone,
                    wireless: body.wireless,
                    enclosureType: body.enclosureType,
                    color: body.color,
                    activeNoiseCancelling: body.activeNoiseCancelling,
                    connection: body.connection,
                    channels: body.channels,
                    impedance: body.impedance,
                    sensitivity: body.sensitivity,
                    sensitivityAt1VRMS: body.sensitivityAt1VRMS,
                })
                break;
            case "KEYBOARD":
                existingSpecification = await KEYBOARD.findOne({ _productId: _id });
                newSpecification = new KEYBOARD({
                    _productId: body._productId,
                    manufacturer: body.manufacturer,
                    model: body.model,
                    style: body.style,
                    mechanical: body.mechanical,
                    switchType: body.switchType,
                    backlit: body.backlit,
                    tenkeyless: body.tenkeyless,
                    connectionType: body.connectionType,
                    color: body.color,
                    mouseIncluded: body.mouseIncluded,
                    features: body.features,
                })
                break;
            case "MOUSE":
                existingSpecification = await MOUSE.findOne({ _productId: _id });
                newSpecification = new MOUSE({
                    _productId: body._productId,
                    manufacturer: body.manufacturer,
                    model: body.model,
                    trackingMethod: body.trackingMethod,
                    connectionType: body.connectionType,
                    maxDPI: body.maxDPI,
                    handOrientation: body.handOrientation,
                    color: body.color,
                    features: body.features,
                })
                break;
            case "SPEAKER":
                existingSpecification = await SPEAKER.findOne({ _productId: _id });
                newSpecification = new SPEAKER({
                    _productId: body._productId,
                    manufacturer: body.manufacturer,
                    model: body.model,
                    configuration: body.configuration,
                    totalWattage: body.totalWattage,
                    frequencyResponse: body.frequencyResponse,
                    color: body.color,
                    powerEachFront: body.powerEachFront,
                    powerCenter: body.powerCenter,
                    powerEachRear: body.powerEachRear,
                    powerSubwoofer: body.powerSubwoofer,
                    features: body.features,
                })
                break;
            case "WEBCAM":
                existingSpecification = await WEBCAM.findOne({ _productId: _id });
                newSpecification = new WEBCAM({
                    _productId: body._productId,
                    manufacturer: body.manufacturer,
                    model: body.model,
                    resolution: body.resolution,
                    connection: body.connection,
                    focusType: body.focusType,
                    operatingSystem: body.operatingSystem,
                    fovAngle: body.fovAngle,
                    fStop: body.fStop,
                    focalLength: body.focalLength,
                    privacyShutter: body.privacyShutter,
                    builtInLightning: body.builtInLightning,
                    automaticLightningAdjust: body.automaticLightningAdjust,

                })
                break;

            // Accessories/Others
            case "CASE_ACCESSORY":
                existingSpecification = await CASE_ACCESSORY.findOne({ _productId: _id });
                newSpecification = new CASE_ACCESSORY({
                    _productId: body._productId,
                    manufacturer: body.manufacturer,
                    model: body.model,
                    type: body.type,
                    formFactor: body.formFactor,
                    features: body.features,
                })
                break;
            case "CASE_FAN":
                existingSpecification = await CASE_FAN.findOne({ _productId: _id });
                newSpecification = new CASE_FAN({
                    _productId: body._productId,
                    manufacturer: body.manufacturer,
                    model: body.model,
                    size: body.size,
                    color: body.color,
                    quantity: body.quantity,
                    rpm: body.rpm,
                    airflow: body.airflow,
                    noiseLevel: body.noiseLevel,
                    pwm: body.pwm,
                    led: body.led,
                    connector: body.connector,
                    controller: body.controller,
                    staticPressure: body.staticPressure,

                })
                break;
            case "EXTERNAL_STORAGE":
                existingSpecification = await EXTERNAL_STORAGE.findOne({ _productId: _id });
                newSpecification = new EXTERNAL_STORAGE({
                    _productId: body._productId,
                    manufacturer: body.manufacturer,
                    model: body.model,
                    type: body.type,
                    interface: body.interface,
                    capacity: body.capacity,
                    color: body.color,
                    rpm: body.rpm,
                })
                break;
            case "FAN_CONTROLLER":
                existingSpecification = await FAN_CONTROLLER.findOne({ _productId: _id });
                newSpecification = new FAN_CONTROLLER({
                    _productId: body._productId,
                    manufacturer: body.manufacturer,
                    model: body.model,
                    channels: body.channels,
                    channelWattage: body.channelWattage,
                    pwm4pin: body.pwm4pin,
                    formFactor: body.formFactor,
                    features: body.features,
                    color: body.color,

                })
                break;
            case "OPTICAL_DRIVE":
                existingSpecification = await OPTICAL_DRIVE.findOne({ _productId: _id });
                newSpecification = new WEBCAM({
                    _productId: body._productId,
                    manufacturer: body.manufacturer,
                    model: body.model,
                    formFactor: body.formFactor,
                    interface: body.interface,
                    bufferCache: body.bufferCache,
                    dvd_romSpeed: body.dvd_romSpeed,
                    cd_romSpeed: body.cd_romSpeed,
                    bd_rSpeed: body.bd_rSpeed,
                    bd_rDualLayerSpeed: body.bd_rDualLayerSpeed,
                    bd_reSpeed: body.bd_reSpeed,
                    bd_reDualLayerSpeed: body.bd_reDualLayerSpeed,
                    dvdRSpeed: body.dvdRSpeed,
                    dvdRWSpeed: body.dvdRWSpeed,
                    dvdRDualLayerSpeed: body.dvdRDualLayerSpeed,
                    dvd_rSpeed: body.dvd_rSpeed,
                    dvd_rwSpeed: body.dvd_rwSpeed,
                    dvd_rDualLayerSpeed: body.dvd_rDualLayerSpeed,
                    dvd_ramSpeed: body.dvd_ramSpeed,
                    cd_rSpeed: body.cd_rSpeed,
                    cd_rwSpeed: body.cd_rwSpeed,
                    features: body.features,

                })
                break;
            case "THERMAL_COMPOUND":
                existingSpecification = await THERMAL_COMPOUND.findOne({ _productId: _id });
                newSpecification = new THERMAL_COMPOUND({
                    _productId: body._productId,
                    manufacturer: body.manufacturer,
                    model: body.model,
                    amount: body.amount,
                    features: body.features,
                })
                break;
            case "UPS":
                existingSpecification = await UPS.findOne({ _productId: _id });
                newSpecification = new UPS({
                    _productId: body._productId,
                    manufacturer: body.manufacturer,
                    capacityW: body.capacityW,
                    capacityVA: body.capacityVA,
                    rackHeight: body.rackHeight,
                    backupRunTimeFullLoad: body.backupRunTimeFullLoad,
                    backupRunTimeHalfLoad: body.backupRunTimeHalfLoad,
                    batteryChemistry: body.batteryChemistry,
                    dataLineProtection: body.dataLineProtection,
                    emergencyPowerOff: body.emergencyPowerOff,
                    formFactor: body.formFactor,
                    hotSwappable: body.hotSwappable,
                    inputVoltage: body.inputVoltage,
                    maxBatteryRechargeTime: body.maxBatteryRechargeTime,
                    outputVoltage: body.outputVoltage,
                    receptacles: body.receptacles,
                    serialPort: body.serialPort,
                    waveformType: body.waveformType,
                    features: body.features,
                })
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