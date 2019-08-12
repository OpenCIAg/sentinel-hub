declare namespace Cropper {
    function getLagLngXY(geoJson: GeoJson): LagLngXY[];
    function cropImage(feature: GeoJsonFeature, img: string, latLongXY: LagLngXY): Promise<{
        img: string;
        LatLng: [number[], number[]];
    }>;
    function getCrop(canvas: any, offsetX: any, offsetY: any, width: any, height: any, callback: any): void;
}
