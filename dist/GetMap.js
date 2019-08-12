var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
//# sourceMappingURL=GetMap.js.map