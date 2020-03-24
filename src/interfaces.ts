import { Feature, Polygon } from "geojson";

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
// import {  } from "module";
