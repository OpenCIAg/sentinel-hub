import { LagLngXY, XY } from "./LagLngXY";
import { Polygon, Feature, BBox } from "geojson";
import * as bbox from 'geojson-bbox'
import { BoxCords } from "./BoxCords";
// TODO: refatorar
export namespace Cropper {

    export function getLagLngXY(geoJson: GeoJSON.FeatureCollection<Polygon>, canvasResolution:XY): LagLngXY[] {
        return geoJson.features.map((element) => new LagLngXY(new BoxCords(bbox(element)),canvasResolution))
    }

    export function ClipImageFromPolygin(image: HTMLImageElement, feature: Feature<Polygon>, latLongXY: LagLngXY) {
        const canvas = document.createElement("canvas");
        canvas.height = image.height;
        canvas.width = image.width;

        const ctx = canvas.getContext("2d");
        ctx.beginPath();

        feature.geometry.coordinates[0].forEach((cord, i) => {

            const corde = latLongXY.translateToCanvas(cord[1], cord[0]);
            if (!i) {
                ctx.moveTo(corde.X, corde.Y);
            } else { ctx.lineTo(corde.X, corde.Y); }
        });

        ctx.stroke();

        ctx.clip();
        ctx.drawImage(image, 0, 0, image.width, image.height);

        const imageBase64 = canvas.toDataURL()
        return ({ img: imageBase64, LatLng: latLongXY.getBBox });
    }

    export function ClipBase64ImageFromPolygon(feature: Feature<Polygon>, img: string, latLongXY: LagLngXY): Promise<{ img: string, LatLng: BBox }> {
        return new Promise((resolve, reject) => {
            const image: HTMLImageElement = document.createElement("img");

            image.onload = () => {
                resolve(ClipImageFromPolygin(image, feature, latLongXY))
            };
            image.onerror = (e) => reject(e)

            image.src = img;
        });
    }

}
