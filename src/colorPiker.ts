import { SentinelHubWms } from "./index";
import { GeoJson, GeoJsonFeature } from "./interfaces";

declare module IGeoJsonPoint {

    export interface Feature {
        type: string;
        properties: Properties;
        geometry: Geometry;
    }
    export interface Properties {
        capacity?: string;
        type?: string;
        mount?: string;
    }
    export interface Geometry {
        type: string;
        coordinates?: (number)[] | null;
    }


}

export class ColorFinder {
    canvas: HTMLCanvasElement;
    canvas2: HTMLCanvasElement;
    constructor(public img: HTMLImageElement) {
        this.canvas = document.createElement('canvas');
        const width = 50
        const height = 50
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.getContext('2d').drawImage(this.img, 0, 0, width, height);
        this.canvas2 = document.createElement('canvas')
        this.canvas2.width = width;
        this.canvas2.height = height;
    }
    map(x: number, in_min: number, in_max: number, out_min: number, out_max: number): number {
        return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }
    getfindColor(geoJson: GeoJsonFeature): Promise<GeoJsonFeature[]> {
        return new Promise((resolve) => {
            const FeatureGrop: GeoJsonFeature[] = []
            Array.from(Array(this.canvas.width).keys()).forEach(x => {
                Array.from(Array(this.canvas.height).keys()).forEach(y => {
                    const data = this.canvas.getContext('2d').getImageData(x, y, 1, 1).data
                    if (data[0] > 100 && data[2] < 72 && data[1] < 100) {
                        const latLong = SentinelHubWms.latLngToXYTool(geoJson)[0]

                        const mapy = (this.map(y + 0.4, 0, 50, latLong.pMin.lat, latLong.pMax.lat));
                        const mapx = this.map(((x - 50) * -1) - 0.4, 0, 50, latLong.pMin.lng, latLong.pMax.lng);
                        const feature: GeoJsonFeature = {
                            type: "Feature",
                            properties: {},
                            geometry: {
                                type: "Point",
                                coordinates: [mapy, mapx]
                            }
                        }
                        FeatureGrop.push(feature)
                    }

                })
            })
            resolve(FeatureGrop)
        })
    }

}
