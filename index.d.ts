
interface latLong {
    lat: string
    long: string
}
interface GeoJsonFeatureGeomety {
    "type": string; "coordinates": number[][][];
}
interface GeoJsonFeature {
    "type": string
    "properties": {},
    "geometry": GeoJsonFeatureGeomety
}
interface GeoJson {
    "type": string,
    "features": GeoJsonFeature[]

}
interface BoxCordsSimple {
    topLeft: Number[]
    bottonRight: Number[]
}
// import {  } from "module";
