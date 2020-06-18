import { TYPENAMES } from "./TYPENAMES";
import { RawGetFeatureRequestOptions } from "./GetFeaturesRequestOptions";
//https://services.sentinel-hub.com/ogc/wfs/be0ceacc-a155-4e85-85b4-8250f0e8215e?REQUEST=GetFeature&TYPENAMES=S2.TILE&OUTPUTFORMAT=application/json&BBOX=1600965,5819367,1610917,5826373&TIME=2019-01-01/2019-04-23

export class GetFeaturesRequest {
    public parameters = [];


    public request = "REQUEST=GetFeature";
    public UUID: string;
    public timeStart = new Date('2019-01-01').toISOString().split('T')[0];
    public timeEnd = new Date().toISOString().split('T')[0];
    constructor(public preset: RequestInfo = "https://services.sentinel-hub.com/ogc/wfs/") {
    }
    public addUUID(uuid: string) { this.UUID = uuid; }


    public addParameter<T extends keyof RawGetFeatureRequestOptions>(name: T, value: RawGetFeatureRequestOptions[T]) {
        this.parameters.push(name + "=" + value);
    }
    /**
     * Requesting via proxyLink
     */
    public getProxyLink(proxy:RequestInfo){
      return proxy + '?' + this.request + '&' + this.parameters.join("&");
    };

    /**
     * Requesting directly from sentinel
     */
    public getDirectLink(uuid: string = undefined) {
        return this.preset + this.UUID + "?" + this.request + '&' + this.parameters.join("&");
    }
}
