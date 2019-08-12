var Cropper;
(function (Cropper) {
    function getLagLngXY(geoJson) {
        let toReturn = [];
        geoJson.features.forEach(element => {
            let lowerLat = element.geometry.coordinates[0].map(r => { return r[1]; }).reduce((e, j) => { return j < e ? e : j; });
            let lowerLng = element.geometry.coordinates[0].map(r => { return r[0]; }).reduce((e, j) => { return j < e ? e : j; });
            let BiggerLat = element.geometry.coordinates[0].map(r => { return r[1]; }).reduce((e, j) => { return j > e ? e : j; });
            let BiggerLng = element.geometry.coordinates[0].map(r => { return r[0]; }).reduce((e, j) => { return j > e ? e : j; });
            toReturn.push(new LagLngXY(lowerLat, lowerLng, BiggerLat, BiggerLng));
        });
        return toReturn;
    }
    Cropper.getLagLngXY = getLagLngXY;
    function cropImage(feature, img, latLongXY) {
        return new Promise((r, f) => {
            const image = document.createElement('img');
            image.src = img;
            image.onload = () => {
                let canvas = document.createElement("canvas");
                canvas.height = 780;
                canvas.width = 1024;
                canvas.style.display = "none";
                document.body.appendChild(canvas);
                if (canvas.getContext) {
                    var ctx = canvas.getContext('2d');
                    ctx.beginPath();
                    let x = [];
                    feature.geometry.coordinates[0].forEach((cord, i) => {
                        let corde = latLongXY.latlngToScreenXY(cord[1], cord[0]);
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
        var buffer = document.createElement('canvas');
        var b_ctx = buffer.getContext('2d');
        buffer.width = width;
        buffer.height = height;
        b_ctx.drawImage(canvas, offsetX, offsetY, width, height, 0, 0, buffer.width, buffer.height);
        callback(buffer.toDataURL());
    }
    Cropper.getCrop = getCrop;
    ;
})(Cropper || (Cropper = {}));
//# sourceMappingURL=Cropper.js.map