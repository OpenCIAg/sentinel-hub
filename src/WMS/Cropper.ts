
import { LagLngXY } from "./LagLngXY";
import { Polygon, Feature } from "geojson";

export namespace Cropper {
    export function getLagLngXY(geoJson: GeoJSON.FeatureCollection<Polygon>) {
        const toReturn: LagLngXY[] = [];
        geoJson.features.forEach((element) => {
            const lowerLat = element.geometry.coordinates[0].map((r) => r[1]).reduce((e, j) => j < e ? e : j);
            const lowerLng = element.geometry.coordinates[0].map((r) => r[0]).reduce((e, j) => j < e ? e : j);
            const BiggerLat = element.geometry.coordinates[0].map((r) => r[1]).reduce((e, j) => j > e ? e : j);
            const BiggerLng = element.geometry.coordinates[0].map((r) => r[0]).reduce((e, j) => j > e ? e : j);

            toReturn.push(new LagLngXY(lowerLat, lowerLng, BiggerLat, BiggerLng));
        });
        return toReturn;
    }
    export function cropImage(feature: Feature<Polygon>, img: string, latLongXY: LagLngXY): Promise<{ img: string, LatLng: [number[], number[]] }> {
        return new Promise((r, f) => {
            const image: HTMLImageElement = document.createElement("img");
            image.src = img;
            image.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.height = image.height;
                canvas.width = image.width;
                canvas.style.display = "none";
                document.body.appendChild(canvas);
                if (canvas.getContext) {
                    const ctx = canvas.getContext("2d");
                    ctx.beginPath();
                    const x = [];
                    feature.geometry.coordinates[0].forEach((cord, i) => {
                        const corde = latLongXY.latlngToScreenXY(cord[1], cord[0]);
                        if (!i) {
                            ctx.moveTo(corde.x, corde.y);
                        } else { ctx.lineTo(corde.x, corde.y); }
                    });
                    ctx.stroke();

                    ctx.clip();
                    ctx.drawImage(image, 0, 0,image.width,image.height);
                    r({ img: canvas.toDataURL(), LatLng: latLongXY.getBobxConnors() });
                }
            };
        });
    }
    export function getCrop(canvas, offsetX, offsetY, width, height, callback) {
        const buffer = document.createElement("canvas");
        let b_ctx = buffer.getContext("2d");
        buffer.width = width;
        buffer.height = height;

        b_ctx.drawImage(canvas, offsetX, offsetY, width, height,
            0, 0, buffer.width, buffer.height);
        callback(buffer.toDataURL());
    }

}
