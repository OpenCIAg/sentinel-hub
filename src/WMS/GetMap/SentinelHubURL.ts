export enum SentinelWMSRequests {
    GET_MAP = "REQUEST=GetMap",
    GET_FEATURE_INFO = "REQUEST=GetFeatureInfo"
}
export class SentinelHubURL {
    public parameters = [];
    public link: string;
    public UUID: string;
    public timeFrom = null;
    public timeTo = null;
    constructor(public preset: RequestInfo = "https://services.sentinel-hub.com/ogc/wms/", public request: SentinelWMSRequests | string = SentinelWMSRequests.GET_MAP) {
    }
    public addUUID(uuid: string) { this.UUID = uuid; }
    public addParameter(name: string, value: any) {
        this.parameters.push(name + "=" + value);
    }
    public setTimeFrom(date: Date) {
        this.timeFrom = "TIME=" + this.formatSentinelUrlDate(date);
    }
    public setTimeTo(date: Date) {
        this.timeTo = "/" + this.formatSentinelUrlDate(date);
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
    private formatSentinelUrlDate(date: Date) {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    }
}
