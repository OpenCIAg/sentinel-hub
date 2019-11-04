import { Cropper } from "./Cropper";
import { GetMap } from "./GetMap";
import { GeoJson, GeoJsonFeature } from "./interfaces";
import { LagLngXY } from "./LagLngXY";
import { WMSParameters } from "./WMSParameters";
import { ColorFinder } from "./colorPiker";
import { FindStructure } from "./findStructure";

export { WMSParameters } from "./WMSParameters";
export namespace SentinelHubWms {
    export async function getShapesFromSentinel(geoJson: GeoJson, uuid: string, options: { date: Date, layers: WMSParameters.Sentinel_2[] }): Promise<Array<{ img: string, LatLng: [number[], number[]], link: string }>> {
        try {
            const PolygonRestrains = SentinelHubWms.latLngToXYTool(geoJson);
            const packageResult: Array<{ img: string, LatLng: [number[], number[]], link: string }> = [];
            let packages: Array<{ data: string, latLng: LagLngXY, feature: GeoJsonFeature, link: string }> | void = [];
            packages = await new Promise(async (resolve): Promise<Array<{ data: string, latLng: LagLngXY, feature: GeoJsonFeature }> | void> => {
                const packagesP: Array<{ data: string, latLng: LagLngXY, feature: GeoJsonFeature, link: string }> = [];
                for (let i = 0; i < PolygonRestrains.length; i++) {
                    const LatLngXY = PolygonRestrains[i];
                    getImage(uuid, LatLngXY.getBobxConnors(), options).then(async (data) => {
                        packagesP.push({ data: URL.createObjectURL(data.blob), latLng: LatLngXY, feature: geoJson.features[i], link: data.link });
                        if (i + 1 === PolygonRestrains.length) { resolve(packagesP); }
                    }, (e) => {
                        throw new Error(e);
                    });
                }
            });
            if (packages) {
                for (const element of packages) {
                    const shape = await createShapeAsImage(element.feature, element.data, element.latLng);

                    packageResult.push({ img: shape.img, LatLng: shape.LatLng, link: element.link });
                }
            }
            return packageResult;
        } catch (e) {
            throw new Error(e);
        }
    }
    export async function getShapesFromImage(img: Blob, geoJson: GeoJson): Promise<Array<{ img: string, LatLng: [number[], number[]], link: string }>> {
        try {
            const PolygonRestrains = SentinelHubWms.latLngToXYTool(geoJson);
            const packageResult: Array<{ img: string, LatLng: [number[], number[]], link: string }> = [];
            let packages: Array<{ data: string, latLng: LagLngXY, feature: GeoJsonFeature, link: string }> | void = [];
            packages = await new Promise(async (resolve): Promise<Array<{ data: string, latLng: LagLngXY, feature: GeoJsonFeature }> | void> => {
                const packagesP: Array<{ data: string, latLng: LagLngXY, feature: GeoJsonFeature, link: string }> = [];
                for (let i = 0; i < PolygonRestrains.length; i++) {
                    const LatLngXY = PolygonRestrains[i];

                    const objImg = { blob: img, link: "" };
                    packagesP.push({ data: URL.createObjectURL(objImg.blob), latLng: LatLngXY, feature: geoJson.features[i], link: objImg.link });
                    if (i + 1 === PolygonRestrains.length) { resolve(packagesP); }
                }
            });
            if (packages) {
                for (const element of packages) {
                    const shape = await createShapeAsImage(element.feature, element.data, element.latLng);

                    packageResult.push({ img: shape.img, LatLng: shape.LatLng, link: element.link });
                }
            }
            return packageResult;
        } catch (e) {
            throw new Error(e);
        }
    }
    export async function getShapeFromSentinel(feature: GeoJsonFeature, uuid: string, options: { removeRoof: boolean, date: Date, layers: WMSParameters.Sentinel_2[] }): Promise<{ img: string, LatLng: [number[], number[]], link: string }> {
        try {
            if (options.removeRoof) {
                return await new FindStructure(uuid, feature, options.date).getInvalidPixels();
            }
            else {
                const latLng = latLngToXYTool(feature);
                const image = await getImage(uuid, latLng[0].getBobxConnors(), options);
                const shape = await createShapeAsImage(feature, URL.createObjectURL(image.blob), latLng[0]);
                return { img: shape.img, LatLng: shape.LatLng, link: image.link };
            }
        } catch (e) {
            throw new Error(e);
        }
    }
    export async function getDangerZone(feature: GeoJsonFeature, image: string | HTMLImageElement): Promise<GeoJson> {
        const geoJson: GeoJson = {
            "type": "FeatureCollection",
            "features": []
        };
        let convertedImage: HTMLImageElement;
        if (typeof image === "string") {
            convertedImage = await new Promise((resolve, reject) => {
                const imgConverter = new Image();
                imgConverter.src = image;
                imgConverter.onload = () => {
                    resolve(imgConverter);
                };
                imgConverter.onerror = () => {
                    reject('fail to convert string to image');
                };
            });
        }
        else {
            convertedImage = image;
        }
        const points = await new ColorFinder(convertedImage).getfindColor(feature);
        points.forEach(item => {
            geoJson.features.push(item);
        });
        return geoJson;
    }
    export async function getShapeFromImage(img: Blob, feature: GeoJsonFeature): Promise<{ img: string, LatLng: [number[], number[]], link: string }> {
        try {
            const latLng = latLngToXYTool(feature);
            const objImg = { blob: img, link: "" };
            const shape = await createShapeAsImage(feature, URL.createObjectURL(objImg.blob), latLng[0]);
            return { img: shape.img, LatLng: shape.LatLng, link: objImg.link };
        } catch (e) {
            throw new Error(e);
        }
    }
    /**
     * @param uuid;
     * @param bbox;
     * @param layers
     */
    export async function getImage(uuid: string, bbox: [number[], number[]], options: { date: Date, layers: WMSParameters.Sentinel_2[] }) {
        const getMap = new GetMap(uuid, { DATE: options.date, BBOX: bbox, FORMAT: WMSParameters.Format.image_png, LAYERS: options.layers, WIDTH: "1024", HEIGHT: "780" });
        return await getMap.request();
    }
    /**
     * Uses a GeoJSON to an array of objects that can make several transformation to use a GeoJSON features as shapes, just like a GIS system
     * @param geoJson ;
     */
    export function latLngToXYTool(geoJson: GeoJson | GeoJsonFeature) {
        if (("features" in geoJson)) {
            return Cropper.getLagLngXY(geoJson);
        } else {
            return Cropper.getLagLngXY({
                features: [geoJson],
                type: "FeatureCollection",
            });
        }
    }
    export function createShapeAsImage(feature: GeoJsonFeature, img: string, latLongXY: LagLngXY) {
        return Cropper.cropImage(feature, img, latLongXY);
    }
}
