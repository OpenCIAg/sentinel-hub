// import * as moment from "moment";
// import { ColorFinder } from "./colorPiker";
// import { Feature, Polygon } from "geojson";
// import { WMSParameters, SentinelHubWms } from "..";

// export class FindStructure {
//     constructor(public uuid: string, public shape: Feature<Polygon>, public dateFromShape: Date) { }
//     public async getmonthAfter() {
//         const monthAfter = moment(this.dateFromShape).add("months", 1).toDate();
//         return await this.getDangerZoneByDate(monthAfter);
//     }
//     public async getYearAfter() {
//         const monthAfter = moment(this.dateFromShape).add("years", 1).toDate();
//         return await this.getDangerZoneByDate(monthAfter);
//     }
//     public async getYearBebore() {
//         const monthAfter = moment(this.dateFromShape).subtract("years", 1).toDate();
//         return await this.getDangerZoneByDate(monthAfter);
//     }
//     public async getSixMonthsBebore() {
//         const monthAfter = moment(this.dateFromShape).subtract("months", 6).toDate();
//         return await this.getDangerZoneByDate(monthAfter);
//     }
//     public async getTowYearAgo() {
//         const monthAfter = moment(this.dateFromShape).subtract("months", 2).toDate();
//         return await this.getDangerZoneByDate(monthAfter);
//     }
//     public async getInvalidPixels(): Promise<{ img: string, LatLng: [number[], number[]], link: string }> {
//         const ty = await this.getTowYearAgo();
//         const sm = await this.getSixMonthsBebore();
//         const oy = await this.getYearBebore();

//         let ponts: any[][] = [];
//         ponts.push(ty.features.map((i) => {
//             return i.geometry.coordinates;
//         }));
//         ponts.push(sm.features.map((i) => {
//             return i.geometry.coordinates;
//         }));
//         ponts.push(oy.features.map((i) => {
//             return i.geometry.coordinates;
//         }));
//         ponts = ponts.sort((a, b) => {
//             if (a.length > b.length) {
//                 return 1;
//             }
//             if (a.length < b.length) {
//                 return -1;
//             }
//             return 0;
//         });
//         const validPoints: Feature<Polygon>[] = []
//         ponts[0].forEach((i, index) => {
//             const p1HasValue = !!ponts[1].find(i => i == ponts[0][index]);
//             const p2HasValue = !!ponts[2].find(i => i == ponts[0][index]);
//             if ((!!ponts[0][index]) && p1HasValue && p2HasValue) {
//                 const feature: Feature<Polygon> = {
//                     geometry: {
//                         coordinates: [i[0], i[1]],
//                         type: "Polygon",
//                     },
//                     properties: {},
//                     type: "Feature",
//                 };
//                 validPoints.push(feature)
//             }
//         });
//         const returnGeoJson: GeoJSON.FeatureCollection<Polygon> = {
//             features: validPoints,
//             type: "FeatureCollection",
//         }

//         const bbox = SentinelHubWms.latLngToXYTool(this.shape)[0];
//         const imgRaw = await SentinelHubWms.getMap(this.uuid, bbox.getBBox, { date: this.dateFromShape, layers: [WMSParameters.Sentinel_2.NDVI] });
//         const img = await this.RawToImage(imgRaw.blob);
//         const paintedImage = await this.paintInvalidInDangerZone(img, returnGeoJson);
//         const shape = await SentinelHubWms.createShapeAsImage(this.shape, paintedImage, bbox);
//         return { img: paintedImage, link: imgRaw.link, LatLng: shape.LatLng };
//     }
//     private async  getDangerZoneByDate(date: Date) {
//         const bbox = SentinelHubWms.latLngToXYTool(this.shape)[0];
//         const imgRaw = await SentinelHubWms.getMap(this.uuid, bbox.getBBox, { date, layers: [WMSParameters.Sentinel_2.NDVI] });
//         const img = await this.RawToImage(imgRaw.blob);
//         return SentinelHubWms.getDangerZone(this.shape, img);
//     }
//     private RawToImage(blob: Blob): Promise<HTMLImageElement> {
//         return new Promise((resolve, reject) => {
//             const img = new Image();
//             img.onload = () => {
//                 resolve(img);
//             };
//             img.src = URL.createObjectURL(blob);
//             setTimeout(() => {
//                 reject("FindStructure: fail to load blob");
//             }, 5000);
//         });
//     }
//     private paintInvalidInDangerZone(img: HTMLImageElement, shape: GeoJSON.FeatureCollection<Polygon>): Promise<string> {
//         const colorManager = new ColorFinder(img);
//         return new Promise((resolve) => {
//             Array.from(Array(colorManager.canvas.width).keys()).forEach((x) => {
//                 Array.from(Array(colorManager.canvas.height).keys()).forEach((y) => {
//                     const data = colorManager.canvas.getContext("2d").getImageData(x, y, 1, 1).data;
//                     colorManager.canvasContext.fillStyle = "gray"
//                     if (data[0] > 100 && data[2] < 72 && data[1] < 100) {
//                         const latLong = SentinelHubWms.latLngToXYTool(shape)[0];
//                         colorManager.canvasContext.fillRect(x, y, 1, 1);
//                     }

//                 });
//             });
//             resolve(colorManager.canvas.toDataURL());
//         });
//     }

// }
