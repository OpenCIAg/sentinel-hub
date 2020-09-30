import { GetFeatureInfoParams, GetMapParameters } from "../WMSParameters";
import { BoxCords } from "../GetMap/BoxCords";
import { SentinelHubURL, SentinelWMSRequests } from "../GetMap/SentinelHubURL";
import { _SafeFetch } from "../..";
import { BBox } from "geojson";


export class GetFeatureInfo {

    public proxy: RequestInfo

    public proxyOptions: RequestInit = {}
    /**
     *
     * @param UUID
     * @param DATE
     * @param BBOX Specifies the bounding box of the requested image. Coordinates must be in the specified coordinate reference system. The four coordinates representing the top-left and bottom-right of the bounding box must be separated by commas. Required. Example: BBOX=-13152499,4038942,-13115771,4020692
     * @param CRS (when VERSION 1.3.0 or higher) the coordinate reference system in which the BBOX is specified and in which to return the image. Optional, default: "EPSG:3857". For a list of available CRSs see the GetCapabilities result.
     * @param INFO_FORMAT The output format of the feature info content.
     * @param WIDTH The image-space width containing the queried point, in pixels. Required.
     * @param HEIGHT The image-space height containing the queried point, in pixels. Required.
     * @param QUERY_LAYERS The layers for which the feature info is requested.
     */
    constructor(public UUID: string, public DATE: Date, public BBOX: BBox, public WIDTH: number, public HEIGHT: number, public I: number, public J: number, public QUERY_LAYERS: GetFeatureInfoParams.QUERY_LAYERS | string = GetFeatureInfoParams.QUERY_LAYERS.TRUE_COLOR, public INFO_FORMAT: GetFeatureInfoParams.INFO_FORMAT = GetFeatureInfoParams.INFO_FORMAT["application/json"], public CRS: string = "EPSG:3857") {
    }
    public async request<T = any>(): Promise<{ link: string, json: T }> {
        try {
            return await (_SafeFetch(this.get_requestLink(), this.proxyOptions).then(async (res) => {
                const result = { link: res.url, json: null as T };
                result.json = await res.json();
                return result
            }));
        } catch (e) {
            throw new Error(e);
        }
    }
    private get_requestLink() {
        const link = new SentinelHubURL(this.proxy, SentinelWMSRequests.GET_FEATURE_INFO);
        if (!this.proxy) { link.addUUID(this.UUID); }
        if (this.BBOX) { link.addParameter("BBOX", this.BBOX.toString()); }
        if (this.CRS) { link.addParameter("CRS", this.CRS); }
        if (this.INFO_FORMAT) { link.addParameter("INFO_FORMAT", this.INFO_FORMAT); }
        if (this.WIDTH != undefined) { link.addParameter("WIDTH", this.WIDTH); }
        if (this.HEIGHT != undefined) { link.addParameter("HEIGHT", this.HEIGHT); }
        if (this.QUERY_LAYERS) { link.addParameter("QUERY_LAYERS", this.QUERY_LAYERS); }
        if (this.I != undefined) { link.addParameter("I", this.I); }
        if (this.J != undefined) { link.addParameter("J", this.J); }
        link.setTimeFrom(this.DATE);
        if (this.proxy) { return link.getProxy() }
        else { return link.getLink() };
    }

}