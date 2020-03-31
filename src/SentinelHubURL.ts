export class SentinelHubURL {
    public parameters = [];
    public link: string;
   
    public request = "REQUEST=GetMap";
    public UUID: string;
    public timeFrom = null;
    public timeTo = null;
    constructor(public preset:RequestInfo = "https://services.sentinel-hub.com/ogc/wms/") {
    }
    public addUUID(uuid: string) { this.UUID = uuid; }
    public addParameter(name: string, value: any) {
        this.parameters.push(name + "=" + value);
    }
    public setTimeFrom(date: Date) {
        this.timeFrom = "TIME=" + date.toISOString().split("T")[0];
    }
    public setTimeTo(date: Date) {
        this.timeTo = "/" + date.toISOString().split("T")[0] + "/P1D";
    }
    public clearTime() {
        this.timeFrom = null;
        this.timeTo = null;
    }
    public getLink() {
        this.link = this.preset + this.UUID + "?" + this.request + "&" + this.getLinkTime() + this.parameters.join("&");
        return this.link;
    }
    public getProxy() {
        this.link = this.preset + '?' + this.request + "&" + this.getLinkTime() + this.parameters.join("&");
        return this.link;
    }
    private getLinkTime() {
        return this.timeFrom ? (this.timeFrom + (this.timeTo ? this.timeTo : "")
            + "&") : "";
    }
}
