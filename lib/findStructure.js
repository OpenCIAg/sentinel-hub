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
const moment = require("moment");
const _1 = require(".");
const WMSParameters_1 = require("./WMSParameters");
const colorPiker_1 = require("./colorPiker");
class FindStructure {
    constructor(uuid, shape, dateFromShape) {
        this.uuid = uuid;
        this.shape = shape;
        this.dateFromShape = dateFromShape;
    }
    getmonthAfter() {
        return __awaiter(this, void 0, void 0, function* () {
            const monthAfter = moment(this.dateFromShape).add("months", 1).toDate();
            return yield this.getDangerZoneByDate(monthAfter);
        });
    }
    getYearAfter() {
        return __awaiter(this, void 0, void 0, function* () {
            const monthAfter = moment(this.dateFromShape).add("years", 1).toDate();
            return yield this.getDangerZoneByDate(monthAfter);
        });
    }
    getYearBebore() {
        return __awaiter(this, void 0, void 0, function* () {
            const monthAfter = moment(this.dateFromShape).subtract("years", 1).toDate();
            return yield this.getDangerZoneByDate(monthAfter);
        });
    }
    getSixMonthsBebore() {
        return __awaiter(this, void 0, void 0, function* () {
            const monthAfter = moment(this.dateFromShape).subtract("months", 6).toDate();
            return yield this.getDangerZoneByDate(monthAfter);
        });
    }
    getTowYearAgo() {
        return __awaiter(this, void 0, void 0, function* () {
            const monthAfter = moment(this.dateFromShape).subtract("months", 2).toDate();
            return yield this.getDangerZoneByDate(monthAfter);
        });
    }
    getInvalidPixels() {
        return __awaiter(this, void 0, void 0, function* () {
            const ty = yield this.getTowYearAgo();
            const sm = yield this.getSixMonthsBebore();
            const oy = yield this.getYearBebore();
            let ponts = [];
            ponts.push(ty.features.map((i) => {
                return i.geometry.coordinates;
            }));
            ponts.push(sm.features.map((i) => {
                return i.geometry.coordinates;
            }));
            ponts.push(oy.features.map((i) => {
                return i.geometry.coordinates;
            }));
            ponts = ponts.sort((a, b) => {
                if (a.length > b.length) {
                    return 1;
                }
                if (a.length < b.length) {
                    return -1;
                }
                return 0;
            });
            const validPoints = [];
            ponts[0].forEach((i, index) => {
                const p1HasValue = !!ponts[1].find(i => i == ponts[0][index]);
                const p2HasValue = !!ponts[2].find(i => i == ponts[0][index]);
                if ((!!ponts[0][index]) && p1HasValue && p2HasValue) {
                    const feature = {
                        geometry: {
                            coordinates: [i[0], i[1]],
                            type: "Point",
                        },
                        properties: {},
                        type: "Feature",
                    };
                    validPoints.push(feature);
                }
            });
            const returnGeoJson = {
                features: validPoints,
                type: "FeatureCollection",
            };
            const bbox = _1.SentinelHubWms.latLngToXYTool(this.shape)[0];
            const imgRaw = yield _1.SentinelHubWms.getImage(this.uuid, bbox.getBobxConnors(), { date: this.dateFromShape, layers: [WMSParameters_1.WMSParameters.Sentinel_2.NDVI] });
            const img = yield this.RawToImage(imgRaw.blob);
            const paintedImage = yield this.paintInvalidInDangerZone(img, returnGeoJson);
            const shape = yield _1.SentinelHubWms.createShapeAsImage(this.shape, paintedImage, bbox);
            return { img: paintedImage, link: imgRaw.link, LatLng: shape.LatLng };
        });
    }
    getDangerZoneByDate(date) {
        return __awaiter(this, void 0, void 0, function* () {
            const bbox = _1.SentinelHubWms.latLngToXYTool(this.shape)[0];
            const imgRaw = yield _1.SentinelHubWms.getImage(this.uuid, bbox.getBobxConnors(), { date, layers: [WMSParameters_1.WMSParameters.Sentinel_2.NDVI] });
            const img = yield this.RawToImage(imgRaw.blob);
            return _1.SentinelHubWms.getDangerZone(this.shape, img);
        });
    }
    RawToImage(blob) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                resolve(img);
            };
            img.src = URL.createObjectURL(blob);
            setTimeout(() => {
                reject("FindStructure: fail to load blob");
            }, 5000);
        });
    }
    paintInvalidInDangerZone(img, shape) {
        const colorManager = new colorPiker_1.ColorFinder(img);
        return new Promise((resolve) => {
            Array.from(Array(colorManager.canvas.width).keys()).forEach((x) => {
                Array.from(Array(colorManager.canvas.height).keys()).forEach((y) => {
                    const data = colorManager.canvas.getContext("2d").getImageData(x, y, 1, 1).data;
                    colorManager.canvasContext.fillStyle = "gray";
                    if (data[0] > 100 && data[2] < 72 && data[1] < 100) {
                        const latLong = _1.SentinelHubWms.latLngToXYTool(shape)[0];
                        colorManager.canvasContext.fillRect(x, y, 1, 1);
                    }
                });
            });
            resolve(colorManager.canvas.toDataURL());
        });
    }
}
exports.FindStructure = FindStructure;
