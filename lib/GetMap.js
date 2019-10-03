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
const WMSParameters_1 = require("./WMSParameters");
const BoxCords_1 = require("./BoxCords");
const SentinelHubURL_1 = require("./SentinelHubURL");
class GetMap {
    constructor(UUID, params) {
        // Specifies the bounding box of the requested image. Coordinates must be in the specified coordinate reference system. The four coordinates representing the top-left and bottom-right of the bounding box must be separated by commas. Required. Example: BBOX=-13152499,4038942,-13115771,4020692
        this.BBOX = null;
        // (when VERSION 1.3.0 or higher) the coordinate reference system in which the BBOX is specified and in which to return the image. Optional, default: "EPSG:3857". For a list of available CRSs see the GetCapabilities result.
        this.CRS = "EPSG:4326";
        // (when VERSION 1.1.1 or lower) the coordinate reference system in which the BBOX is specified and in which to return the image. Optional, default: "EPSG:3857". For a list of available CRSs see the GetCapabilities result.
        this.SRS = "EPSG:3857";
        // The returned image format. Optional, default: "image/png". Detailed information about supported values.
        this.FORMAT = WMSParameters_1.WMSParameters.Format.image_png;
        // Returned image width in pixels. Required, unless RESX is used.
        this.WIDTH = null;
        // Returned image height in pixels. Required, unless RESY is used.
        this.HEIGHT = null;
        // Returned horizontal image resolution in UTM units (if m is added, e.g. 10m, in metrical units). (optional instead of HEIGHT)
        this.RESX = null;
        // Returned vertical image resolution in UTM units (if m is added, e.g. 10m, in metrical units). (optional instead of WIDTH)
        this.RESY = null;
        // Default background color. Option, default: "FFFFFF". Supported formats: "0xRRGGBB", "0xAARRGGBB", "#RRGGBB", "#AARRGGBB", "RRGGBB", "AARRGGBB".
        this.BGCOLOR = WMSParameters_1.WMSParameters.BgColor["#AARRGGBB"];
        // (when FORMAT = "image/png" or "image/tiff") The returned image has an alpha channel which is blank for pixels with no valid or available input data. Optional, default = "false". Supported values: "true", "false", "0", "1".
        this.TRANSPARENT = false;
        // The preconfigured layer (image) to be returned. You must specify exactly one layer and optionally add additional overlays. Required. Example: LAYERS=TRUE_COLOR,OUTLINE
        this.LAYERS = [WMSParameters_1.WMSParameters.Sentinel_2.True_color];
        this.DATE = new Date();
        this.DATE = params.DATE ? params.DATE : this.DATE;
        this.UUID = UUID;
        this.BBOX = new BoxCords_1.BoxCords({
            botton_right: { lat: "" + params.BBOX[0][0], long: "" + params.BBOX[0][1] },
            top_left: { lat: "" + params.BBOX[1][0], long: "" + params.BBOX[1][1] },
        });
        this.CRS = params.CRS ? params.CRS : this.CRS;
        if (!this.CRS && params.SRS) {
            this.SRS = params.SRS;
        }
        // else if (!this.CRS && !params.SRS) {
        //     throw new Error("CRS ou SRS precisam ser fornecidos (dependendo da versão),\n CRS >= 1.3.0 \n SRS <= 1.1.1)")
        // }
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
                return yield (fetch(this.get_requestLink()).then((res) => __awaiter(this, void 0, void 0, function* () {
                    const result = { link: res.url, blob: null };
                    result.blob = yield res.blob();
                    return result;
                })));
            }
            catch (e) {
                throw new Error(e);
            }
        });
    }
    measure(lat1, lon1, lat2, lon2) {
        const R = 6378.137; // Radius of earth in KM
        const dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
        const dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        return d * 1000; // meters
    }
    get_requestLink() {
        const link = new SentinelHubURL_1.SentinelHubURL();
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
        // link.setTimeTo(new Date("01/01/2018"))
        return link.toString();
    }
}
exports.GetMap = GetMap;
