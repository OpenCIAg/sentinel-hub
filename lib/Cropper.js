"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LagLngXY_1 = require("./LagLngXY");
var Cropper;
(function (Cropper) {
    function getLagLngXY(geoJson) {
        const toReturn = [];
        geoJson.features.forEach((element) => {
            const lowerLat = element.geometry.coordinates[0].map((r) => r[1]).reduce((e, j) => j < e ? e : j);
            const lowerLng = element.geometry.coordinates[0].map((r) => r[0]).reduce((e, j) => j < e ? e : j);
            const BiggerLat = element.geometry.coordinates[0].map((r) => r[1]).reduce((e, j) => j > e ? e : j);
            const BiggerLng = element.geometry.coordinates[0].map((r) => r[0]).reduce((e, j) => j > e ? e : j);
            toReturn.push(new LagLngXY_1.LagLngXY(lowerLat, lowerLng, BiggerLat, BiggerLng));
        });
        return toReturn;
    }
    Cropper.getLagLngXY = getLagLngXY;
    function cropImage(feature, img, latLongXY) {
        return new Promise((r, f) => {
            const image = document.createElement("img");
            image.src = img;
            image.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.height = 780;
                canvas.width = 1024;
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
                        }
                        else {
                            ctx.lineTo(corde.x, corde.y);
                        }
                    });
                    ctx.stroke();
                    ctx.clip();
                    ctx.drawImage(image, 0, 0);
                    r({ img: canvas.toDataURL(), LatLng: latLongXY.getBobxConnors() });
                }
            };
        });
    }
    Cropper.cropImage = cropImage;
    function getCrop(canvas, offsetX, offsetY, width, height, callback) {
        const buffer = document.createElement("canvas");
        let b_ctx = buffer.getContext("2d");
        buffer.width = width;
        buffer.height = height;
        b_ctx.drawImage(canvas, offsetX, offsetY, width, height, 0, 0, buffer.width, buffer.height);
        callback(buffer.toDataURL());
    }
    Cropper.getCrop = getCrop;
})(Cropper = exports.Cropper || (exports.Cropper = {}));
