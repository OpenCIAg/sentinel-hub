import { GeoJsonFeature, GeoJson } from "./interfaces";
export declare class FindStructure {
    uuid: string;
    shape: GeoJsonFeature;
    dateFromShape: Date;
    constructor(uuid: string, shape: GeoJsonFeature, dateFromShape: Date);
    getmonthAfter(): Promise<GeoJson>;
    getYearAfter(): Promise<GeoJson>;
    getYearBebore(): Promise<GeoJson>;
    getSixMonthsBebore(): Promise<GeoJson>;
    getTowYearAgo(): Promise<GeoJson>;
    getInvalidPixels(): Promise<{
        img: string;
        LatLng: [number[], number[]];
        link: string;
    }>;
    private getDangerZoneByDate;
    private RawToImage;
    private paintInvalidInDangerZone;
}
