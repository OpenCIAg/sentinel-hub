var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Cropper;
(function (Cropper) {
    function getLagLngXY(geoJson) {
        let toReturn = [];
        geoJson.features.forEach(element => {
            let lowerLat = element.geometry.coordinates[0].map(r => { return r[1]; }).reduce((e, j) => { return j < e ? e : j; });
            let lowerLng = element.geometry.coordinates[0].map(r => { return r[0]; }).reduce((e, j) => { return j < e ? e : j; });
            let BiggerLat = element.geometry.coordinates[0].map(r => { return r[1]; }).reduce((e, j) => { return j > e ? e : j; });
            let BiggerLng = element.geometry.coordinates[0].map(r => { return r[0]; }).reduce((e, j) => { return j > e ? e : j; });
            toReturn.push(new LagLngXY(lowerLat, lowerLng, BiggerLat, BiggerLng));
        });
        return toReturn;
    }
    Cropper.getLagLngXY = getLagLngXY;
    function cropImage(feature, img, latLongXY) {
        return new Promise((r, f) => {
            const image = document.createElement('img');
            image.src = img;
            image.onload = () => {
                let canvas = document.createElement("canvas");
                canvas.height = 780;
                canvas.width = 1024;
                canvas.style.display = "none";
                document.body.appendChild(canvas);
                if (canvas.getContext) {
                    var ctx = canvas.getContext('2d');
                    ctx.beginPath();
                    let x = [];
                    feature.geometry.coordinates[0].forEach((cord, i) => {
                        let corde = latLongXY.latlngToScreenXY(cord[1], cord[0]);
                        if (!i) {
                            ctx.moveTo(corde.x, corde.y);
                        }
                        else {
                            ctx.lineTo(corde.x, corde.y);
                        }
                    });
                    ctx.stroke();
                    ctx.clip();
                    ctx.drawImage(image, 0, 0);
                    r({ img: canvas.toDataURL(), LatLng: latLongXY.getBobxConnors() });
                }
            };
        });
    }
    Cropper.cropImage = cropImage;
    function getCrop(canvas, offsetX, offsetY, width, height, callback) {
        var buffer = document.createElement('canvas');
        var b_ctx = buffer.getContext('2d');
        buffer.width = width;
        buffer.height = height;
        b_ctx.drawImage(canvas, offsetX, offsetY, width, height, 0, 0, buffer.width, buffer.height);
        callback(buffer.toDataURL());
    }
    Cropper.getCrop = getCrop;
    ;
})(Cropper || (Cropper = {}));
var GetMap;
(function (GetMap_1) {
    class BoxCords {
        constructor(param) {
            this.topLeft = param.top_left;
            this.bottonRight = param.botton_right;
        }
        toString() {
            return `${this.topLeft.lat},${this.topLeft.long},${this.bottonRight.lat},${this.bottonRight.long}`;
        }
    }
    class GetMap {
        constructor(UUID, params) {
            this.BBOX = null;
            this.CRS = "EPSG:4326";
            this.SRS = "EPSG:3857";
            this.FORMAT = WMSParameters.Format.image_png;
            this.WIDTH = null;
            this.HEIGHT = null;
            this.RESX = null;
            this.RESY = null;
            this.BGCOLOR = WMSParameters.BgColor["#AARRGGBB"];
            this.TRANSPARENT = false;
            this.LAYERS = [WMSParameters.Sentinel_2.True_color];
            this.DATE = new Date();
            this.DATE = params.DATE ? params.DATE : this.DATE;
            this.UUID = UUID;
            this.BBOX = new BoxCords({
                top_left: { lat: "" + params.BBOX[1][0], long: "" + params.BBOX[1][1] },
                botton_right: { lat: "" + params.BBOX[0][0], long: "" + params.BBOX[0][1] }
            });
            this.CRS = params.CRS ? params.CRS : this.CRS;
            if (!this.CRS && params.SRS) {
                this.SRS = params.SRS;
            }
            this.FORMAT = params.FORMAT ? params.FORMAT : this.FORMAT;
            if (params.HEIGHT && params.WIDTH) {
                this.WIDTH = params.WIDTH;
                this.HEIGHT = params.HEIGHT;
            }
            else if (params.RESX && params.RESY) {
                this.RESX = params.RESX;
                this.RESY = params.RESY;
            }
            else {
                this.RESX = this.measure(this.BBOX.topLeft.lat, this.BBOX.topLeft.long, this.BBOX.topLeft.lat, this.BBOX.bottonRight.long).toFixed() + "m";
                this.RESY = this.measure(this.BBOX.topLeft.lat, this.BBOX.topLeft.long, this.BBOX.bottonRight.lat, this.BBOX.topLeft.long).toFixed() + "m";
            }
            this.BGCOLOR = params.BGCOLOR ? params.BGCOLOR : this.BGCOLOR;
            this.TRANSPARENT = params.TRANSPARENT ? params.TRANSPARENT : this.TRANSPARENT;
            this.LAYERS = params.LAYERS ? params.LAYERS : this.LAYERS;
            this.EXCEPTIONS = params.EXCEPTIONS;
        }
        request() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    return yield (fetch(this.get_requestLink()).then(res => res.blob()));
                }
                catch (e) {
                    console.log(e);
                }
            });
        }
        get_requestLink() {
            let link = new SentinelHubURL();
            link.addUUID(this.UUID);
            if (this.BBOX) {
                link.addParameter("BBOX", this.BBOX.toString());
            }
            if (this.CRS) {
                link.addParameter("CRS", this.CRS);
            }
            if (this.SRS) {
                link.addParameter("SRS", this.SRS);
            }
            if (this.FORMAT) {
                link.addParameter("FORMAT", this.FORMAT);
            }
            if (this.WIDTH && !this.RESX) {
                link.addParameter("WIDTH", this.WIDTH), link.addParameter("HEIGHT", this.HEIGHT);
            }
            if (!this.WIDTH && this.RESX) {
                link.addParameter("RESX", this.RESX), link.addParameter("RESY", this.RESY);
            }
            if (this.BGCOLOR) {
                link.addParameter("BGCOLOR", this.BGCOLOR);
            }
            if (this.TRANSPARENT) {
                link.addParameter("TRANSPARENT", this.TRANSPARENT);
            }
            if (this.LAYERS) {
                link.addParameter("LAYERS", this.LAYERS);
            }
            if (this.EXCEPTIONS) {
                link.addParameter("EXCEPTIONS", this.EXCEPTIONS);
            }
            link.setTimeFrom(this.DATE);
            return link.toString();
        }
        measure(lat1, lon1, lat2, lon2) {
            var R = 6378.137;
            var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
            var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                    Math.sin(dLon / 2) * Math.sin(dLon / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c;
            return d * 1000;
        }
    }
    GetMap_1.GetMap = GetMap;
    class SentinelHubURL {
        constructor() {
            this.parameters = [];
            this.preset = "http://services.sentinel-hub.com/ogc/wms/";
            this.request = "REQUEST=GetMap";
            this.timeFrom = null;
            this.timeTo = null;
            this.link = this.preset;
        }
        addUUID(uuid) { this.UUID = uuid; }
        addParameter(name, value) {
            this.parameters.push(name + "=" + value);
        }
        setTimeFrom(date) {
            this.timeFrom = "TIME=" + date.toISOString().split("T")[0];
        }
        setTimeTo(date) {
            this.timeTo = "/" + date.toISOString().split("T")[0] + "/P1D";
        }
        getLinkTime() {
            return this.timeFrom ? (this.timeFrom + (this.timeTo ? this.timeTo : "")
                + "&") : "";
        }
        clearTime() {
            this.timeFrom = null;
            this.timeTo = null;
        }
        toString() {
            this.link = this.preset + this.UUID + "?" + this.request + "&" + this.getLinkTime() + this.parameters.join("&");
            return this.link;
        }
    }
})(GetMap || (GetMap = {}));
class LagLngXY {
    constructor(pMinLat, pMinLng, pMaxLat, pMaxLng) {
        this.pMin = {
            scrX: 0,
            scrY: 0,
            lat: null,
            lng: null,
            pos: null,
            perX: null,
            perY: null
        };
        this.pMax = {
            scrX: 1024,
            scrY: 780,
            lat: null,
            lng: null,
            pos: null,
            perX: null,
            perY: null
        };
        this.radius = 6.371;
        this.pMax.lat = pMaxLat;
        this.pMax.lng = pMaxLng;
        this.pMin.lat = pMinLat;
        this.pMin.lng = pMinLng;
        this.pMin.pos = this.latlngToGlobalXY(this.pMin.lat, this.pMin.lng);
        this.pMax.pos = this.latlngToGlobalXY(this.pMax.lat, this.pMax.lng);
    }
    latlngToGlobalXY(lat, lng) {
        let x = this.radius * lng * Math.cos((this.pMin.lat + this.pMax.lat) / 2);
        let y = this.radius * lat;
        return { x: x, y: y };
    }
    latlngToScreenXY(lat, lng) {
        let pos = this.latlngToGlobalXY(lat, lng);
        pos['perX'] = ((pos.x - this.pMin.pos.x) / (this.pMax.pos.x - this.pMin.pos.x));
        pos['perY'] = ((pos.y - this.pMin.pos.y) / (this.pMax.pos.y - this.pMin.pos.y));
        return {
            x: ((this.pMin.scrX + (this.pMax.scrX - this.pMin.scrX) * pos['perX']) - this.pMax.scrX) * -1,
            y: this.pMin.scrY + (this.pMax.scrY - this.pMin.scrY) * pos['perY']
        };
    }
    getBobxConnors() {
        return [[this.pMin.lat, this.pMin.lng], [this.pMax.lat, this.pMax.lng]];
    }
}
var WMSParameters;
(function (WMSParameters) {
    let Format;
    (function (Format) {
        Format["image_png"] = "image/png";
        Format["image_jpeg"] = "image/jpeg";
        Format["image_tiff_8"] = "image/tiff;depth=8";
        Format["image_tiff_16"] = "image/tiff;depth=16";
        Format["image_tiff_32f"] = "image/tiff;depth=32f";
    })(Format = WMSParameters.Format || (WMSParameters.Format = {}));
    let BgColor;
    (function (BgColor) {
        BgColor["FFFFFF"] = "FFFFFF";
        BgColor["xRRGGBB"] = "0xRRGGBB";
        BgColor["xAARRGGBB"] = "0xAARRGGBB";
        BgColor["_RRGGBB"] = "#RRGGBB";
        BgColor["_AARRGGBB"] = "#AARRGGBB";
        BgColor["RRGGBB"] = "RRGGBB";
        BgColor["AARRGGBB"] = "AARRGGBB";
    })(BgColor = WMSParameters.BgColor || (WMSParameters.BgColor = {}));
    let Sentinel_2;
    (function (Sentinel_2) {
        Sentinel_2["True_color"] = "TRUE_COLOR";
        Sentinel_2["False_color"] = "FALSE_COLOR";
        Sentinel_2["False_color_urban"] = "FALSE_COLOR_URBAN";
        Sentinel_2["NDVI"] = "NDVI";
        Sentinel_2["Moisture_index"] = "MOISTURE_INDEX";
        Sentinel_2["SWIR"] = "SWIR";
        Sentinel_2["NDWI"] = "NDWI";
        Sentinel_2["NDSI"] = "NDSI";
    })(Sentinel_2 = WMSParameters.Sentinel_2 || (WMSParameters.Sentinel_2 = {}));
    let Exceptions;
    (function (Exceptions) {
        Exceptions["XML"] = "XML";
        Exceptions["INIMAGE"] = "INIMAGE";
        Exceptions["BLANK"] = "BLANK";
    })(Exceptions = WMSParameters.Exceptions || (WMSParameters.Exceptions = {}));
})(WMSParameters || (WMSParameters = {}));
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
//# sourceMappingURL=sentinel-hub-wms.js.map