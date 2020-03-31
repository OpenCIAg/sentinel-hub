import { GetMap } from "./GetMap";
import { Feature, Polygon, FeatureCollection } from "geojson";
import { Cropper } from "./Cropper";
import { Observable, defer, from } from 'rxjs'
import { getFromSentinelOptions, ICroppedImage } from "./interfaces";
import { WMSParameters } from "./WMSParameters";
import { ColorFinder } from "./colorPiker";
import { LagLngXY } from "./LagLngXY";
export { WMSParameters } from "./WMSParameters";
export namespace SentinelHubWms {
    export async function  getShapeFromSentinel(feature: Feature<Polygon>, uuid: string, options: getFromSentinelOptions): Promise<ICroppedImage> {
        const latLng = latLngToXYTool(feature);
        const sentinelResult = await getImage(uuid,latLng[0].getBobxConnors() , options)
        const latLngTool = latLngToXYTool(feature)[0];
        const shape = await Cropper.cropImage(feature, URL.createObjectURL(sentinelResult.blob), latLngTool);
        return { img: shape.img, feature, bbox: shape.LatLng, link: sentinelResult.link };
    }
    export async function   getShapesFromSentinel(featureCollection: FeatureCollection<Polygon>, uuid: string, options: getFromSentinelOptions): Promise<ICroppedImage[]> {
        const promises = featureCollection.features.map(i => getShapeFromSentinel(i, uuid, options))
        return await Promise.all(
            promises.map(async p => {
                try {
                    return await p
                } catch (e) {
                    console.error(e)
                    return undefined
                }
            }).filter(i => !!i))
    }

    export function getShapeFromSentinelAsync(feature: Feature<Polygon>, uuid: string, options: getFromSentinelOptions): Observable<ICroppedImage> {
        return defer(() => from(getShapeFromSentinel(feature, uuid, options)))
    }

    export function getShapesFromSentinelAsync(featureCollection: FeatureCollection<Polygon>, uuid: string, options: getFromSentinelOptions): Observable<ICroppedImage>[] {
        return featureCollection.features.map(feature => defer(() => from(getShapeFromSentinel(feature, uuid, options))))
    }

    export async function  getImage(uuid: string = "", bbox: [number[], number[]], options: getFromSentinelOptions) {
        const getMap = new GetMap(uuid, { DATE: options.date, BBOX: bbox, FORMAT: WMSParameters.Format.image_png, LAYERS: options.layers, WIDTH: "1024", HEIGHT: "780" });
        if(options.proxy) getMap.proxy = options.proxy
        return await getMap.request();
    }

    export function latLngToXYTool(geoJson: GeoJSON.FeatureCollection<Polygon> | Feature<Polygon>) {
        if (("features" in geoJson)) {
            return Cropper.getLagLngXY(geoJson);
        } else {
            return Cropper.getLagLngXY({
                features: [geoJson],
                type: "FeatureCollection",
            });
        }
    }
    export async function  getDangerZone(feature: Feature<Polygon>, image: string | HTMLImageElement): Promise<GeoJSON.FeatureCollection<Polygon>> {
        const geoJson: GeoJSON.FeatureCollection<Polygon> = {
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
    export function createShapeAsImage(feature: Feature<Polygon>, img: string, latLongXY: LagLngXY) {
        return Cropper.cropImage(feature, img, latLongXY);
    }
}