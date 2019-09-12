"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
class ColorFinder {
    constructor(img) {
        this.img = img;
        this.canvas = document.createElement('canvas');
        const width = 100;
        const height = 100;
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.getContext('2d').drawImage(this.img, 0, 0, width, height);
        this.canvas2 = document.createElement('canvas');
        this.canvas2.width = width;
        this.canvas2.height = height;
    }
    XYtoLatLong() {
        var minlat = 20.12391239, maxLat = 21.19231823, minX = 0, maxX = 100;
        50;
    }
    map(x, in_min, in_max, out_min, out_max) {
        return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }
    getfindColor(geoJson) {
        return new Promise((resolve) => {
            const FeatureGrop = [];
            Array.from(Array(this.canvas.width).keys()).forEach(x => {
                Array.from(Array(this.canvas.height).keys()).forEach(y => {
                    const data = this.canvas.getContext('2d').getImageData(x, y, 1, 1).data;
                    if (data[0] > 100 && data[2] < 72 && data[1] < 100) {
                        const latLong = index_1.SentinelHubWms.latLngToXYTool(geoJson)[0];
                        const mapx = this.map(x, 0, 100, latLong.pMin.lat, latLong.pMax.lat);
                        const mapy = this.map(y, 0, 100, latLong.pMin.lng, latLong.pMax.lng);
                        debugger;
                        const feature = {
                            type: "Feature",
                            properties: {},
                            geometry: {
                                type: "Point",
                                coordinates: [mapx, mapy]
                            }
                        };
                        FeatureGrop.push(feature);
                    }
                });
            });
            resolve(FeatureGrop);
        });
    }
}
exports.ColorFinder = ColorFinder;
