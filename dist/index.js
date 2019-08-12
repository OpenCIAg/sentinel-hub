var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var SentinelHubWms;
(function (SentinelHubWms) {
    function geoJsonToShapeImgs(geoJson, uuid, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const PolygonRestrains = SentinelHubWms.latLngToXYTool(geoJson);
            let packageResult = [];
            const packages = yield new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                let packages = [];
                for (let i = 0; i < PolygonRestrains.length; i++) {
                    const LatLngXY = PolygonRestrains[i];
                    getImage(uuid, LatLngXY.getBobxConnors(), options).then((data) => __awaiter(this, void 0, void 0, function* () {
                        packages.push({ data: URL.createObjectURL(data), latLng: LatLngXY, feature: geoJson.features[i] });
                        if (i + 1 == PolygonRestrains.length) {
                            resolve(packages);
                        }
                    }));
                }
                ;
            }));
            if (packages) {
                for (const element of packages) {
                    let returning = yield createShapeAsImage(element.feature, element.data, element.latLng);
                    packageResult.push(returning);
                }
                ;
            }
            return packageResult;
        });
    }
    SentinelHubWms.geoJsonToShapeImgs = geoJsonToShapeImgs;
    function geoJsonToShapeImg(feature, uuid, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const latLng = latLngToXYTool(feature);
            let image = yield getImage(uuid, latLng[0].getBobxConnors(), options);
            return yield createShapeAsImage(feature, URL.createObjectURL(image), latLng[0]);
        });
    }
    SentinelHubWms.geoJsonToShapeImg = geoJsonToShapeImg;
    function getImage(uuid, bbox, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let getMap = new GetMap.GetMap(uuid, { DATE: options.date, BBOX: bbox, FORMAT: WMSParameters.Format.image_png, LAYERS: options.layers, WIDTH: "1024", HEIGHT: "780" });
            return yield getMap.request();
        });
    }
    SentinelHubWms.getImage = getImage;
    function latLngToXYTool(geoJson) {
        if (("features" in geoJson)) {
            return Cropper.getLagLngXY(geoJson);
        }
        else {
            return Cropper.getLagLngXY({
                "type": "FeatureCollection",
                "features": [geoJson]
            });
        }
    }
    SentinelHubWms.latLngToXYTool = latLngToXYTool;
    function createShapeAsImage(feature, img, latLongXY) {
        return Cropper.cropImage(feature, img, latLongXY);
    }
    SentinelHubWms.createShapeAsImage = createShapeAsImage;
})(SentinelHubWms || (SentinelHubWms = {}));
//# sourceMappingURL=index.js.map