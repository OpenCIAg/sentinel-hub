import { Feature, Polygon } from "geojson";
import { WMSParameters } from "./WMSParameters";


export interface latLong {
    lat: string
    long: string
}
export interface GeoJsonFeatureGeomety {
    "type": string; "coordinates": number[][][]|any;
}
export type AceptedFeatures  = Feature<Polygon>
export interface BoxCordsSimple {
    topLeft: number[]
    bottonRight: number[]
}
export type ICroppedImage = {
    img: string;
    feature: Feature<Polygon>;
    bbox: [number[], number[]];
    link: string;
};

export type getFromSentinelOptions = {
    proxy?:RequestInfo
    proxyOption?:RequestInit
    date: Date;
    layers: WMSParameters.Sentinel_2[];
};
