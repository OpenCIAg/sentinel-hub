import { latLong } from "./interfaces";

export module GetMap {
    class BoxCords {
        topLeft: latLong
        bottonRight: latLong
        constructor(param: { top_left: { lat: string, long: string }, botton_right: { lat: string, long: string } }) {
            this.topLeft = param.top_left
            this.bottonRight = param.botton_right
        }
        toString() {
            return `${this.topLeft.lat},${this.topLeft.long},${this.bottonRight.lat},${this.bottonRight.long}`
        }
    }

   export class GetMap {
        private UUID: string
        //Specifies the bounding box of the requested image. Coordinates must be in the specified coordinate reference system. The four coordinates representing the top-left and bottom-right of the bounding box must be separated by commas. Required. Example: BBOX=-13152499,4038942,-13115771,4020692
        private BBOX: BoxCords = null

        //(when VERSION 1.3.0 or higher) the coordinate reference system in which the BBOX is specified and in which to return the image. Optional, default: "EPSG:3857". For a list of available CRSs see the GetCapabilities result.
        private CRS: string = "EPSG:4326"

        //(when VERSION 1.1.1 or lower) the coordinate reference system in which the BBOX is specified and in which to return the image. Optional, default: "EPSG:3857". For a list of available CRSs see the GetCapabilities result.
        private SRS: string = "EPSG:3857"

        //The returned image format. Optional, default: "image/png". Detailed information about supported values.
        private FORMAT: WMSParameters.Format = WMSParameters.Format.image_png

        //Returned image width in pixels. Required, unless RESX is used.
        private WIDTH: string = null

        //Returned image height in pixels. Required, unless RESY is used.
        private HEIGHT: string = null

        //Returned horizontal image resolution in UTM units (if m is added, e.g. 10m, in metrical units). (optional instead of HEIGHT)
        private RESX: string = null

        //Returned vertical image resolution in UTM units (if m is added, e.g. 10m, in metrical units). (optional instead of WIDTH)
        private RESY: string = null

        //Default background color. Option, default: "FFFFFF". Supported formats: "0xRRGGBB", "0xAARRGGBB", "#RRGGBB", "#AARRGGBB", "RRGGBB", "AARRGGBB".
        private BGCOLOR: WMSParameters.BgColor = WMSParameters.BgColor["#AARRGGBB"]

        //(when FORMAT = "image/png" or "image/tiff") The returned image has an alpha channel which is blank for pixels with no valid or available input data. Optional, default = "false". Supported values: "true", "false", "0", "1".
        private TRANSPARENT: boolean = false


        //The preconfigured layer (image) to be returned. You must specify exactly one layer and optionally add additional overlays. Required. Example: LAYERS=TRUE_COLOR,OUTLINE
        private LAYERS: WMSParameters.Sentinel_2[] = [WMSParameters.Sentinel_2.True_color]


        //The exception format. Optional, default: "XML". Supported values: "XML", "INIMAGE", "BLANK" (all three for version >= 1.3.0), "application/vnd.ogc.se_xml", "application/vnd.ogc.se_inimage", "application/vnd.ogc.se_blank" (all three for version < 1.3.0).
        private EXCEPTIONS: WMSParameters.Exceptions

        private DATE:Date = new Date()


        constructor(UUID:string,params: {DATE:Date, BBOX: [number[], number[]], CRS?: string, SRS?: string, FORMAT: WMSParameters.Format, WIDTH?: string, HEIGHT?: string, RESX?: string, RESY?: string, BGCOLOR?: WMSParameters.BgColor, TRANSPARENT?: boolean, LAYERS?: WMSParameters.Sentinel_2[], EXCEPTIONS?: WMSParameters.Exceptions }) {
            this.DATE= params.DATE?params.DATE:this.DATE
            this.UUID = UUID
            this.BBOX = new BoxCords({
                top_left: { lat: "" + params.BBOX[1][0], long: "" + params.BBOX[1][1] },
                botton_right: { lat: "" + params.BBOX[0][0], long: "" + params.BBOX[0][1] }
            })
            this.CRS = params.CRS ? params.CRS : this.CRS
            if (!this.CRS && params.SRS) {
                this.SRS = params.SRS
            }
            // else if (!this.CRS && !params.SRS) {
            //     throw new Error("CRS ou SRS precisam ser fornecidos (dependendo da versão),\n CRS >= 1.3.0 \n SRS <= 1.1.1)")
            // }
            this.FORMAT = params.FORMAT ? params.FORMAT : this.FORMAT
            if (params.HEIGHT && params.WIDTH) {
                this.WIDTH = params.WIDTH
                this.HEIGHT = params.HEIGHT
            }
            else if (params.RESX && params.RESY) {
                this.RESX = params.RESX
                this.RESY = params.RESY
            }
            else {
                this.RESX = this.measure(this.BBOX.topLeft.lat, this.BBOX.topLeft.long, this.BBOX.topLeft.lat, this.BBOX.bottonRight.long).toFixed() + "m"
                this.RESY = this.measure(this.BBOX.topLeft.lat, this.BBOX.topLeft.long, this.BBOX.bottonRight.lat, this.BBOX.topLeft.long).toFixed() + "m"
            }
            this.BGCOLOR = params.BGCOLOR ? params.BGCOLOR : this.BGCOLOR
            this.TRANSPARENT = params.TRANSPARENT ? params.TRANSPARENT : this.TRANSPARENT
            this.LAYERS = params.LAYERS ? params.LAYERS : this.LAYERS
            this.EXCEPTIONS = params.EXCEPTIONS
        }
        public async request() {
            try {
                return await (fetch(this.get_requestLink()).then(res => res.blob()))
            }
            catch (e) {
                console.log(e)
            }
        }
        private get_requestLink() {
            let link = new SentinelHubURL()
            link.addUUID(this.UUID)
            if (this.BBOX) { link.addParameter("BBOX", this.BBOX.toString()) }
            if (this.CRS) { link.addParameter("CRS", this.CRS) }
            if (this.SRS) { link.addParameter("SRS", this.SRS) }
            if (this.FORMAT) { link.addParameter("FORMAT", this.FORMAT) }
            if (this.WIDTH && !this.RESX) { link.addParameter("WIDTH", this.WIDTH), link.addParameter("HEIGHT", this.HEIGHT) }
            if (!this.WIDTH && this.RESX) { link.addParameter("RESX", this.RESX), link.addParameter("RESY", this.RESY) }
            if (this.BGCOLOR) { link.addParameter("BGCOLOR", this.BGCOLOR) }
            if (this.TRANSPARENT) { link.addParameter("TRANSPARENT", this.TRANSPARENT) }
            if (this.LAYERS) { link.addParameter("LAYERS", this.LAYERS) }
            if (this.EXCEPTIONS) { link.addParameter("EXCEPTIONS", this.EXCEPTIONS) }
            link.setTimeFrom(this.DATE)
            // link.setTimeTo(new Date("01/01/2018"))
            return link.toString()
        }
        measure(lat1, lon1, lat2, lon2) {  // generally used geo measurement function
            var R = 6378.137; // Radius of earth in KM
            var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
            var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c;
            return d * 1000; // meters
        }

    }
    class SentinelHubURL {
        parameters = []
        link: string
        preset = "http://services.sentinel-hub.com/ogc/wms/"
        request = "REQUEST=GetMap"
        UUID: string
        timeFrom = null
        timeTo = null
        constructor() {
            this.link = this.preset
        }
        addUUID(uuid: string) { this.UUID = uuid }
        addParameter(name: string, value: any) {
            this.parameters.push(name + "=" + value)
        }
        setTimeFrom(date: Date) {
            this.timeFrom = "TIME=" + date.toISOString().split("T")[0]
        }
        setTimeTo(date: Date) {
            this.timeTo = "/" + date.toISOString().split("T")[0] + "/P1D"
        }
        private getLinkTime() {
            return this.timeFrom ? (
                this.timeFrom + (this.timeTo ? this.timeTo : "")
                + "&") : ""
        }
        public clearTime() {
            this.timeFrom = null
            this.timeTo = null
        }
        toString() {
            this.link = this.preset + this.UUID + "?" + this.request + "&" + this.getLinkTime() + this.parameters.join("&")
            return this.link

        }
    }
}