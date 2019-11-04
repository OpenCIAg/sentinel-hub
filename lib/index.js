"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cropper_1 = require("./Cropper");
const GetMap_1 = require("./GetMap");
const WMSParameters_1 = require("./WMSParameters");
const colorPiker_1 = require("./colorPiker");
const findStructure_1 = require("./findStructure");
var WMSParameters_2 = require("./WMSParameters");
exports.WMSParameters = WMSParameters_2.WMSParameters;
var SentinelHubWms;
(function (SentinelHubWms) {
    function getShapesFromSentinel(geoJson, uuid, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const PolygonRestrains = SentinelHubWms.latLngToXYTool(geoJson);
                const packageResult = [];
                let packages = [];
                packages = yield new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                    const packagesP = [];
                    for (let i = 0; i < PolygonRestrains.length; i++) {
                        const LatLngXY = PolygonRestrains[i];
                        getImage(uuid, LatLngXY.getBobxConnors(), options).then((data) => __awaiter(this, void 0, void 0, function* () {
                            packagesP.push({ data: URL.createObjectURL(data.blob), latLng: LatLngXY, feature: geoJson.features[i], link: data.link });
                            if (i + 1 === PolygonRestrains.length) {
                                resolve(packagesP);
                            }
                        }), (e) => {
                            throw new Error(e);
                        });
                    }
                }));
                if (packages) {
                    for (const element of packages) {
                        const shape = yield createShapeAsImage(element.feature, element.data, element.latLng);
                        packageResult.push({ img: shape.img, LatLng: shape.LatLng, link: element.link });
                    }
                }
                return packageResult;
            }
            catch (e) {
                throw new Error(e);
            }
        });
    }
    SentinelHubWms.getShapesFromSentinel = getShapesFromSentinel;
    function getShapesFromImage(img, geoJson) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const PolygonRestrains = SentinelHubWms.latLngToXYTool(geoJson);
                const packageResult = [];
                let packages = [];
                packages = yield new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                    const packagesP = [];
                    for (let i = 0; i < PolygonRestrains.length; i++) {
                        const LatLngXY = PolygonRestrains[i];
                        const objImg = { blob: img, link: "" };
                        packagesP.push({ data: URL.createObjectURL(objImg.blob), latLng: LatLngXY, feature: geoJson.features[i], link: objImg.link });
                        if (i + 1 === PolygonRestrains.length) {
                            resolve(packagesP);
                        }
                    }
                }));
                if (packages) {
                    for (const element of packages) {
                        const shape = yield createShapeAsImage(element.feature, element.data, element.latLng);
                        packageResult.push({ img: shape.img, LatLng: shape.LatLng, link: element.link });
                    }
                }
                return packageResult;
            }
            catch (e) {
                throw new Error(e);
            }
        });
    }
    SentinelHubWms.getShapesFromImage = getShapesFromImage;
    function getShapeFromSentinel(feature, uuid, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (options.removeRoof) {
                    return yield new findStructure_1.FindStructure(uuid, feature, options.date).getInvalidPixels();
                }
                else {
                    const latLng = latLngToXYTool(feature);
                    const image = yield getImage(uuid, latLng[0].getBobxConnors(), options);
                    const shape = yield createShapeAsImage(feature, URL.createObjectURL(image.blob), latLng[0]);
                    return { img: shape.img, LatLng: shape.LatLng, link: image.link };
                }
            }
            catch (e) {
                throw new Error(e);
            }
        });
    }
    SentinelHubWms.getShapeFromSentinel = getShapeFromSentinel;
    function getDangerZone(feature, image) {
        return __awaiter(this, void 0, void 0, function* () {
            const geoJson = {
                "type": "FeatureCollection",
                "features": []
            };
            let convertedImage;
            if (typeof image === "string") {
                convertedImage = yield new Promise((resolve, reject) => {
                    const imgConverter = new Image();
                    imgConverter.src = image;
                    imgConverter.onload = () => {
                        resolve(imgConverter);
                    };
                    imgConverter.onerror = () => {
                        reject('fail to convert string to image');
                    };
                });
            }
            else {
                convertedImage = image;
            }
            const points = yield new colorPiker_1.ColorFinder(convertedImage).getfindColor(feature);
            points.forEach(item => {
                geoJson.features.push(item);
            });
            return geoJson;
        });
    }
    SentinelHubWms.getDangerZone = getDangerZone;
    function getShapeFromImage(img, feature) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const latLng = latLngToXYTool(feature);
                const objImg = { blob: img, link: "" };
                const shape = yield createShapeAsImage(feature, URL.createObjectURL(objImg.blob), latLng[0]);
                return { img: shape.img, LatLng: shape.LatLng, link: objImg.link };
            }
            catch (e) {
                throw new Error(e);
            }
        });
    }
    SentinelHubWms.getShapeFromImage = getShapeFromImage;
    /**
     * @param uuid;
     * @param bbox;
     * @param layers
     */
    function getImage(uuid, bbox, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const getMap = new GetMap_1.GetMap(uuid, { DATE: options.date, BBOX: bbox, FORMAT: WMSParameters_1.WMSParameters.Format.image_png, LAYERS: options.layers, WIDTH: "1024", HEIGHT: "780" });
            return yield getMap.request();
        });
    }
    SentinelHubWms.getImage = getImage;
    /**
     * Uses a GeoJSON to an array of objects that can make several transformation to use a GeoJSON features as shapes, just like a GIS system
     * @param geoJson ;
     */
    function latLngToXYTool(geoJson) {
        if (("features" in geoJson)) {
            return Cropper_1.Cropper.getLagLngXY(geoJson);
        }
        else {
            return Cropper_1.Cropper.getLagLngXY({
                features: [geoJson],
                type: "FeatureCollection",
            });
        }
    }
    SentinelHubWms.latLngToXYTool = latLngToXYTool;
    function createShapeAsImage(feature, img, latLongXY) {
        return Cropper_1.Cropper.cropImage(feature, img, latLongXY);
    }
    SentinelHubWms.createShapeAsImage = createShapeAsImage;
})(SentinelHubWms = exports.SentinelHubWms || (exports.SentinelHubWms = {}));
