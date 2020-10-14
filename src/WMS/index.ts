import { GetMap } from "./GetMap/GetMap";
import { Feature, Polygon, FeatureCollection, BBox } from "geojson";
import { Cropper } from "./GetMap/Cropper";
import { defer, from } from 'rxjs'
import { GetFeatureInfoParams, GetMapParameters as _GetMapParameters } from "./WMSParameters";
import * as featureToBBox from 'geojson-bbox'
import { LagLngXY, XY } from "./GetMap/LagLngXY";
import { BoxCords } from "./GetMap/BoxCords";
import * as geojsonBbox from 'geojson-bbox'
import { GetFeatureInfo } from "./getFeatureInfo/GetFeatureInfo";

export type AceptedFeatures = Feature<Polygon>



export namespace SentinelHubWms {
    export import GetMapParameters = _GetMapParameters;
    export interface GetFeatureInfoProperties {
        id: string;
        date: string;
        time: string;
        path: string;
        crs: string;
        mbr: string;
        cloudCoverPercentage: number;
        out1: string;
        out2: string;
        out3: string;
    }
    export type GetFeatureInfoReturn = GeoJSON.FeatureCollection<GeoJSON.Polygon, GetFeatureInfoProperties>
    export type ICroppedImage = {
        img: string;
        feature: Feature<Polygon>;
        bbox: BBox;
        link: string;
    };
    export type getMapFromSentinelOptions = {
        proxy?: RequestInfo
        proxyOption?: RequestInit
        date: Date;
        layers: _GetMapParameters.Sentinel_2[];
        width?: number;
        height?: number,
        showLogo?: boolean
    };
    export type getFeatureInfoFromSentinelOptions = {
        proxy?: RequestInfo
        proxyOption?: RequestInit
        date: Date;
        layer: GetFeatureInfoParams.QUERY_LAYERS | string;
    };

    const featureToFeatureCollection = (feature: Feature<Polygon>): GeoJSON.FeatureCollection<Polygon> => ({ features: [feature], type: "FeatureCollection" })
    const featuresToFeatureCollection = (features: Feature<Polygon>[]): GeoJSON.FeatureCollection<Polygon> => ({ features, type: "FeatureCollection" })

    export function latLngToXYTool(geoJson: GeoJSON.FeatureCollection<Polygon> | Feature<Polygon>, canvasResolution: XY) {
        let featureCollection: GeoJSON.FeatureCollection<Polygon>
        if ("features" in geoJson) {
            featureCollection = geoJson
        } else {
            featureCollection = featureToFeatureCollection(geoJson)
        }
        return Cropper.getLagLngXY(featureCollection, canvasResolution);
    }

    /**
     * @description used to get sentinel's satellite image of a polygon, with the image cropped for the polygon
     */
    export async function getShapeFromSentinel(feature: Feature<Polygon>, uuid: string, options: getMapFromSentinelOptions): Promise<ICroppedImage> {
        const canvasResolution: XY = {
            X: (options.width || 1024),
            Y: (options.height || 780)
        }
        const sentinelResult = await getMap(uuid, featureToBBox(feature), options)
        const latLngTool = latLngToXYTool(feature, canvasResolution)[0];
        const shape = await Cropper.ClipBase64ImageFromPolygon(feature, URL.createObjectURL(sentinelResult.blob), latLngTool);
        return { img: shape.img, feature, bbox: shape.LatLng, link: sentinelResult.link };
    }

    /**
     * @description used to get sentinel's satellite image of a polygon, with the image cropped for the polygon
     * `RxJs Version`
     */

    export const getShapeFromSentinelAsync = (feature: Feature<Polygon>, uuid: string, options: getMapFromSentinelOptions) => defer(() => from(getShapeFromSentinel(feature, uuid, options)))

    /**
     * @description used to get multiple sentinel's satellite image of a collection of polygons, with the image cropped for the polygon
     */
    export async function getShapesFromSentinel(featureCollection: FeatureCollection<Polygon>, uuid: string, options: getMapFromSentinelOptions): Promise<ICroppedImage[]> {
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
    export const getShapesFromSentinelAsync = (featureCollection: FeatureCollection<Polygon>, uuid: string, options: getMapFromSentinelOptions) => featureCollection.features.map(feature => defer(() => from(getShapeFromSentinel(feature, uuid, options))))

    /**
     * @description used to get the sentinel's satellite image of a square
     */
    export async function getMap(uuid: string = "", bbox: BBox, options: getMapFromSentinelOptions) {
        const getMapInst = new GetMap(uuid, { DATE: options.date, BBOX: bbox, FORMAT: GetMapParameters.Format.image_png, LAYERS: options.layers, WIDTH: (options.width || 1024), HEIGHT: (options.height || 780), SHOWLOGO: options.showLogo });
        if (options.proxy) getMapInst.proxy = options.proxy
        if (options.proxyOption) getMapInst.proxyOptions = options.proxyOption
        return await getMapInst.request();
    }
    export function sentinelbase64ToImage(base64: string, width: number, height: number): Promise<HTMLImageElement> {
        return new Promise((r, f) => {
            const img = new Image(width, height)
            img.onload = () => { r(img) }
            img.onerror = (e) => { console.error(e); f(new Image(width, height)) }
            img.src = base64
        })
    }
    export function renderImage(latLngTool: LagLngXY, context: CanvasRenderingContext2D): (value: ICroppedImage, index: number, array: ICroppedImage[]) => Promise<void> {
        return async (feature) => {
            const topLeft = latLngTool.translateToCanvas(geojsonBbox[0], geojsonBbox[1]);
            const bottonRigth = latLngTool.translateToCanvas(geojsonBbox[0], geojsonBbox[1]);
            const width = bottonRigth.X - topLeft.X;
            const height = bottonRigth.Y - topLeft.Y;
            const img = await sentinelbase64ToImage(feature.img, width, height);
            context.drawImage(img, topLeft.X, topLeft.Y, width, height);
        };
    }
    export async function plotFeatureGroup(canvasResolution: { width: number, hegth: number }, featureCollection: FeatureCollection<Polygon>, uuid: string, options: getMapFromSentinelOptions) {
        const images = await getShapesFromSentinel(featureCollection, uuid, options)
        return await plotShapesResults(canvasResolution, images, featureCollection);
    }




    async function plotShapesResults(canvasResolution: { width: number; hegth: number; }, images: ICroppedImage[], featureCollection?: FeatureCollection<Polygon>) {
        featureCollection = featureCollection || featuresToFeatureCollection(images.map(i => i.feature))
        const canvas = document.createElement('canvas');

        canvas.width = canvasResolution.width;
        canvas.height = canvasResolution.hegth;

        const context = canvas.getContext('2d');

        const latLngTool = new LagLngXY(new BoxCords(geojsonBbox(featureCollection)));

        const rencerImages = images.map(renderImage(latLngTool, context));

        await Promise.all(rencerImages);

        return canvas.toDataURL();
    }

    export async function getFeatureInfo(feature: Feature<Polygon>, uuid: string, WIDTH: number, HEIGHT: number, J: number, I: number, options: getFeatureInfoFromSentinelOptions = { date: new Date(), layer: GetFeatureInfoParams.QUERY_LAYERS.NDVI }) {
        const bbox = geojsonBbox(feature).map(i => String(i).replace('-', '').replace('.', '').slice(0, 7)).join(',')
        const sentinelResult = new GetFeatureInfo(uuid, options.date, bbox, WIDTH, HEIGHT, I, J, options.layer)
        if (options.proxy) sentinelResult.proxy = options.proxy
        if (options.proxyOption) sentinelResult.proxyOptions = options.proxyOption
        const result = await sentinelResult.request<GetFeatureInfoReturn>()
        return result
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
