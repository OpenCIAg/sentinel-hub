namespace SentinelHubWms {

    export async function geoJsonToShapeImg(geoJson: GeoJson, uuid: string, options: { date: Date, layers: WMSParameters.Sentinel_2[] }): Promise<{ img: string, LatLng: [number[], number[]] }[]> {
        const PolygonRestrains = SentinelHubWms.latLngToXYTool(geoJson)
        let packageResult:{ img: string, LatLng: [number[], number[]] }[] =[]
        const packages: { data: string, latLng: LagLngXY, feature: GeoJsonFeature }[] | void = await new Promise(async (resolve): Promise<{ data: string, latLng: LagLngXY, feature: GeoJsonFeature }[] | void> => {
            let packages: { data: string, latLng: LagLngXY, feature: GeoJsonFeature }[] = []
            for (let i = 0; i < PolygonRestrains.length; i++) {
                const LatLngXY = PolygonRestrains[i];

                getImage(uuid, LatLngXY.getBobxConnors(), options).then(async (data) => {
                    packages.push({ data: URL.createObjectURL(data), latLng: LatLngXY, feature: geoJson.features[i] })
                    if (i + 1 == PolygonRestrains.length) { resolve(packages) }
                })
            };
        })
        
        if (packages) {
            for (const element of packages) {
                let returning = await createShapeAsImage(element.feature, element.data, element.latLng)
                packageResult.push(returning)
            };
        }
        return packageResult
    }
    /**
     * 
     * @param uuid 
     * @param bbox 
     * @param layers
     */
    export async function getImage(uuid: string, bbox: [Number[], Number[]], options: { date: Date, layers: WMSParameters.Sentinel_2[] }) {
        let getMap = new GetMap.GetMap(uuid, { DATE: options.date, BBOX: bbox, FORMAT: WMSParameters.Format.image_png, LAYERS: options.layers, WIDTH: "1024", HEIGHT: "780" })
        return await getMap.request()
    }
    /**
     * Uses a GeoJSON to an array of objects that can make several transformation to use a GeoJSON features as shapes, just like a GIS system
     * @param geoJson 
     */
    export function latLngToXYTool(geoJson: GeoJson) {
        return Cropper.getLagLngXY(geoJson)
    }
    export function createShapeAsImage(feature: GeoJsonFeature, img: string, latLongXY: LagLngXY) {
        return Cropper.cropImage(feature, img, latLongXY)
    }
}
