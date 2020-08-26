import { GetMap } from "./GetMap/GetMap";
import { Feature, Polygon, FeatureCollection, BBox } from "geojson";
import { Cropper } from "./GetMap/Cropper";
import { defer, from } from 'rxjs'
import { GetMapParameters } from "./GetMap/WMSParameters";
import * as featureToBBox from 'geojson-bbox'
export { GetMapParameters as WMSParameters } from "./GetMap/WMSParameters";
export type AceptedFeatures = Feature<Polygon>

export type ICroppedImage = {
    img: string;
    feature: Feature<Polygon>;
    bbox: [number[], number[]];
    link: string;
};

export type getFromSentinelOptions = {
    proxy?: RequestInfo
    proxyOption?: RequestInit
    date: Date;
    layers: GetMapParameters.Sentinel_2[];
    width?: number;
    height?: number
};

export namespace SentinelHubWms {
    const featureToFeatureCollection = (feature: Feature<Polygon>): GeoJSON.FeatureCollection<Polygon> => ({ features: [feature], type: "FeatureCollection" })
    export function latLngToXYTool(geoJson: GeoJSON.FeatureCollection<Polygon> | Feature<Polygon>) {
        let featureCollection: GeoJSON.FeatureCollection<Polygon>
        if ("features" in geoJson) {
            featureCollection = geoJson
        } else {
            featureCollection = featureToFeatureCollection(geoJson)
        }
        return Cropper.getLagLngXY(featureCollection);
    }

    /**
     * @description used to get sentinel's satellite image of a polygon, with the image cropped for the polygon
     */
    export async function getShapeFromSentinel(feature: Feature<Polygon>, uuid: string, options: getFromSentinelOptions): Promise<ICroppedImage> {
        const sentinelResult = await getMap(uuid, featureToBBox(feature), options)
        const latLngTool = latLngToXYTool(feature)[0];
        const shape = await Cropper.ClipBase64ImageFromPolygon(feature, URL.createObjectURL(sentinelResult.blob), latLngTool);
        return { img: shape.img, feature, bbox: shape.LatLng, link: sentinelResult.link };
    }

    /**
     * @description used to get sentinel's satellite image of a polygon, with the image cropped for the polygon
     * `RxJs Version`
     */

    export const getShapeFromSentinelAsync = (feature: Feature<Polygon>, uuid: string, options: getFromSentinelOptions) => defer(() => from(getShapeFromSentinel(feature, uuid, options)))

    /**
     * @description used to get multiple sentinel's satellite image of a collection of polygons, with the image cropped for the polygon
     */
    export async function getShapesFromSentinel(featureCollection: FeatureCollection<Polygon>, uuid: string, options: getFromSentinelOptions): Promise<ICroppedImage[]> {
        const promises = featureCollection.features.map(i => getShapeFromSentinel(i, uuid, options))
        const resolverOrFailerPromises = await Promise.allSettled(promises);
        const fulfilledPromises = resolverOrFailerPromises
            .filter(result => result.status === "fulfilled")
            .map((fulfilled: PromiseFulfilledResult<ICroppedImage>) => fulfilled.value);

        return fulfilledPromises;
    }

    /**
     * @description used to get multiple sentinel's satellite image of a collection of polygons, with the image cropped for the polygon
     * `RxJs Version`
     */
    export const getShapesFromSentinelAsync = (featureCollection: FeatureCollection<Polygon>, uuid: string, options: getFromSentinelOptions) => featureCollection.features.map(feature => defer(() => from(getShapeFromSentinel(feature, uuid, options))))

    /**
     * @description used to get the sentinel's satellite image of a square
     */
    export async function getMap(uuid: string = "", bbox: BBox, options: getFromSentinelOptions) {
        const getMapInst = new GetMap(uuid, { DATE: options.date, BBOX: bbox, FORMAT: GetMapParameters.Format.image_png, LAYERS: options.layers, WIDTH: (options.width||1024), HEIGHT: (options.height||780) });
        if (options.proxy) getMapInst.proxy = options.proxy
        if (options.proxyOption) getMapInst.proxyOptions = options.proxyOption
        return await getMapInst.request();
    }

    // /**
    //  * @deprecated `new code in development`
    //  * @description used to find and remove non organic pixels in the satellite data (remove roads/houses/...)
    //  * @beta
    //  */
    // export async function getDangerZone(feature: Feature<Polygon>, image: string | HTMLImageElement): Promise<GeoJSON.FeatureCollection<Polygon>> {
    //     const geoJson: GeoJSON.FeatureCollection<Polygon> = {
    //         "type": "FeatureCollection",
    //         "features": []
    //     };
    //     let convertedImage: HTMLImageElement;
    //     if (typeof image === "string") {
    //         convertedImage = await new Promise((resolve, reject) => {
    //             const imgConverter = new Image();
    //             imgConverter.src = image;
    //             imgConverter.onload = () => {
    //                 resolve(imgConverter);
    //             };
    //             imgConverter.onerror = () => {
    //                 reject('fail to convert string to image');
    //             };
    //         });
    //     }
    //     else {
    //         convertedImage = image;
    //     }
    //     const points = await new ColorFinder(convertedImage).getfindColor(feature);
    //     points.forEach(item => {
    //         geoJson.features.push(item);
    //     });
    //     return geoJson;
    // }
}
