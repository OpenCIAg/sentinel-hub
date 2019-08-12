declare namespace SentinelHubWms {
    function geoJsonToShapeImgs(geoJson: GeoJson, uuid: string, options: {
        date: Date;
        layers: WMSParameters.Sentinel_2[];
    }): Promise<{
        img: string;
        LatLng: [number[], number[]];
    }[]>;
    function geoJsonToShapeImg(feature: GeoJsonFeature, uuid: string, options: {
        date: Date;
        layers: WMSParameters.Sentinel_2[];
    }): Promise<{
        img: string;
        LatLng: [number[], number[]];
    }>;
    function getImage(uuid: string, bbox: [Number[], Number[]], options: {
        date: Date;
        layers: WMSParameters.Sentinel_2[];
    }): Promise<Blob>;
    function latLngToXYTool(geoJson: GeoJson | GeoJsonFeature): LagLngXY[];
    function createShapeAsImage(feature: GeoJsonFeature, img: string, latLongXY: LagLngXY): Promise<{
        img: string;
        LatLng: [number[], number[]];
    }>;
}
