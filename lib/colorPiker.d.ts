import { GeoJsonFeature } from "./interfaces";
export declare class ColorFinder {
    img: HTMLImageElement;
    canvas: HTMLCanvasElement;
    canvas2: HTMLCanvasElement;
    constructor(img: HTMLImageElement);
    map(x: number, in_min: number, in_max: number, out_min: number, out_max: number): number;
    getfindColor(geoJson: GeoJsonFeature): Promise<GeoJsonFeature[]>;
}
