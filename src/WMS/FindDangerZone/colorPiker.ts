// import { SentinelHubWms } from "../index";
// import { Feature, Polygon } from "geojson";

// declare module IGeoJsonPoint {

//     export interface Feature {
//         type: string;
//         properties: Properties;
//         geometry: Geometry;
//     }
//     export interface Properties {
//         capacity?: string;
//         type?: string;
//         mount?: string;
//     }
//     export interface Geometry {
//         type: string;
//         coordinates?: (number)[] | null;
//     }

// }

// export class ColorFinder {
//     public width = 50;
//     public height = 50;
//     public canvas: HTMLCanvasElement;
//     public canvas2: HTMLCanvasElement;
//     public canvasContext: CanvasRenderingContext2D;
//     constructor(public img: HTMLImageElement) {
//         this.canvas = document.createElement("canvas");
//         const width = this.width;
//         const height = this.height;
//         this.canvas.width = width;
//         this.canvas.height = height;
//         this.canvasContext = this.canvas.getContext("2d")
//         this.canvas.getContext("2d").drawImage(this.img, 0, 0, width, height);
//         this.canvas2 = document.createElement("canvas");
//         this.canvas2.width = width;
//         this.canvas2.height = height;
//     }
//     // tslint:disable-next-line: variable-name
//     public map(x: number, in_min: number, in_max: number, out_min: number, out_max: number): number {
//         return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
//     }
//     public getfindColor(geoJson: Feature<Polygon>): Promise<Feature<Polygon>[]> {
//         return new Promise((resolve) => {
//             const FeatureGrop: Feature<Polygon>[] = [];
//             Array.from(Array(this.canvas.width).keys()).forEach((x) => {
//                 Array.from(Array(this.canvas.height).keys()).forEach((y) => {
//                     const data = this.canvas.getContext("2d").getImageData(x, y, 1, 1).data;
//                     if (data[0] > 100 && data[2] < 72 && data[1] < 100) {
//                         const latLong = SentinelHubWms.latLngToXYTool(geoJson)[0];

//                         const mapy = (this.map(y + 0.4, 0, this.height, latLong.pMin.lat, latLong.pMax.lat));
//                         const mapx = this.map(((x - this.width) * -1) - 0.4, 0, this.width, latLong.pMin.lng, latLong.pMax.lng);
//                         const feature: Feature<Polygon> = {
//                             geometry: {
//                                 coordinates: [[[mapy, mapx]]],
//                                 type: "Polygon",
//                             },
//                             properties: {},
//                             type: "Feature",
//                         };
//                         FeatureGrop.push(feature);
//                     }

//                 });
//             });
//             resolve(FeatureGrop);
//         });
//     }

// }
