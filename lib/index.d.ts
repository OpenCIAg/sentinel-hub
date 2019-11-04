import { GeoJson, GeoJsonFeature } from "./interfaces";
import { LagLngXY } from "./LagLngXY";
import { WMSParameters } from "./WMSParameters";
export { WMSParameters } from "./WMSParameters";
export declare namespace SentinelHubWms {
    function getShapesFromSentinel(geoJson: GeoJson, uuid: string, options: {
        date: Date;
        layers: WMSParameters.Sentinel_2[];
    }): Promise<Array<{
        img: string;
        LatLng: [number[], number[]];
        link: string;
    }>>;
    function getShapesFromImage(img: Blob, geoJson: GeoJson): Promise<Array<{
        img: string;
        LatLng: [number[], number[]];
        link: string;
    }>>;
    function getShapeFromSentinel(feature: GeoJsonFeature, uuid: string, options: {
        removeRoof: boolean;
        date: Date;
        layers: WMSParameters.Sentinel_2[];
    }): Promise<{
        img: string;
        LatLng: [number[], number[]];
        link: string;
    }>;
    function getDangerZone(feature: GeoJsonFeature, image: string | HTMLImageElement): Promise<GeoJson>;
    function getShapeFromImage(img: Blob, feature: GeoJsonFeature): Promise<{
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
        blob: any;
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
