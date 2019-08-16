import { GeoJson, GeoJsonFeature } from "./interfaces";
import { LagLngXY } from "./LagLngXY";
import { WMSParameters } from "./WMSParameters";
export { WMSParameters } from "./WMSParameters";
export declare namespace SentinelHubWms {
    function geoJsonToShapeImgs(geoJson: GeoJson, uuid: string, options: {
        date: Date;
        layers: WMSParameters.Sentinel_2[];
    }): Promise<Array<{
        img: string;
        LatLng: [number[], number[]];
        link: string;
    }>>;
    function geoJsonToShapeImg(feature: GeoJsonFeature, uuid: string, options: {
        date: Date;
        layers: WMSParameters.Sentinel_2[];
    }): Promise<{
        img: string;
        LatLng: [number[], number[]];
        link: string;
    }>;
    /**
     * @param uuid;
     * @param bbox;
     * @param layers
     */
    function getImage(uuid: string, bbox: [number[], number[]], options: {
        date: Date;
        layers: WMSParameters.Sentinel_2[];
    }): Promise<{
        link: string;
        blob: Promise<Blob>;
    }>;
    /**
     * Uses a GeoJSON to an array of objects that can make several transformation to use a GeoJSON features as shapes, just like a GIS system
     * @param geoJson ;
     */
    function latLngToXYTool(geoJson: GeoJson | GeoJsonFeature): LagLngXY[];
    function createShapeAsImage(feature: GeoJsonFeature, img: string, latLongXY: LagLngXY): Promise<{
        img: string;
        LatLng: [number[], number[]];
    }>;
}
