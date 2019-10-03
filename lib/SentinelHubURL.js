"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SentinelHubURL {
    constructor() {
        this.parameters = [];
        this.preset = "https://services.sentinel-hub.com/ogc/wms/";
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
    clearTime() {
        this.timeFrom = null;
        this.timeTo = null;
    }
    toString() {
        this.link = this.preset + this.UUID + "?" + this.request + "&" + this.getLinkTime() + this.parameters.join("&");
        return this.link;
    }
    getLinkTime() {
        return this.timeFrom ? (this.timeFrom + (this.timeTo ? this.timeTo : "")
            + "&") : "";
    }
}
exports.SentinelHubURL = SentinelHubURL;
