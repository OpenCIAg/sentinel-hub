import { DescriptivePosition } from "./DescriptivePosition";
import { BoxCords } from "./BoxCords";
import { BBox } from "geojson";
export type XY = { X: number, Y: number }
// top-left reference point
export class LagLngXY {
    private minMapPosition: DescriptivePosition
    private maxMapPosition: DescriptivePosition

    private minCanvasPosition: XY
    private maxCanvasPosition: XY

    private radius = 6.371;

    constructor(
        private bBox: BoxCords,
        public maxCanvasRosolution:XY = { X: 1024, Y: 780 },
        public minCanvasRosolution:XY = { X: 0, Y: 0 }
    ) {
        this.minMapPosition = new DescriptivePosition(bBox.TOP_LEFT.LAT, bBox.TOP_LEFT.LONG)
        this.maxMapPosition = new DescriptivePosition(bBox.BOTTON_RIGHT.LAT, bBox.BOTTON_RIGHT.LONG)

        this.minCanvasPosition = this.latlngToGlobalXY(this.minMapPosition)
        this.maxCanvasPosition = this.latlngToGlobalXY(this.maxMapPosition)
    }
    public latlngToGlobalXY(position: DescriptivePosition): XY
    public latlngToGlobalXY(lat: number, lng: number): XY
    public latlngToGlobalXY(lat: number | DescriptivePosition, lng?: number): XY {
        let pos: DescriptivePosition
        if (lat instanceof DescriptivePosition) {
            pos = lat;
        } else {
            pos = new DescriptivePosition(lat, lng)
        }

        const X = this.radius * pos.LONG
        const Y = this.radius * pos.LAT

        // const Y = this.radius * pos.LAT * Math.cos((this.minMapPosition.LAT + this.maxMapPosition.LAT) / 2);
        // const X = this.radius * pos.LONG * Math.cos((this.minMapPosition.LONG + this.maxMapPosition.LONG) / 2);
        return { X, Y };
    }
    /**
     * Passes a GeoJSON bbox values `[BOTTON_LEFT.LONG, BOTTON_LEFT.LAT,TOP_RIGHT.LONG, TOP_RIGHT.LAT]`
     * 
     * To a canvas oriented bbox `[TOP_LEFT.X, TOP_LEFT.Y,BOTTON_RIGTH.X, BOTTON_RIGTH.Y]`
     * 
     * when a point lowers, the latitude values decreases, but the x value increases ex:( lat:-20 = x 20/ lat:-21 = x:21)
     */
    public translateBboxCanvas(bbox: BoxCords | [number, number, number, number]) {
        let _bbox: BoxCords
        if (Array.isArray(bbox)) {
            _bbox = new BoxCords(bbox)
        } else {
            _bbox = bbox
        }
        return { TOP_LEFT: this.translateToCanvas(_bbox.TOP_LEFT), BOTTON_RIGTH: this.translateToCanvas(_bbox.BOTTON_RIGHT) }
    }
    public translateToCanvas(position: DescriptivePosition): XY
    public translateToCanvas(lat: number, lng: number): XY
    public translateToCanvas(lat: number | DescriptivePosition, lng?: number): XY {
        let pos: XY
        if (lat instanceof DescriptivePosition) {
            pos = this.latlngToGlobalXY(lat);
        } else {
            pos = this.latlngToGlobalXY(new DescriptivePosition(lat, lng));
        }

        const percentX = ((pos.X - this.minCanvasPosition.X) / (this.maxCanvasPosition.X - this.minCanvasPosition.X));
        const percentY = ((pos.Y - this.minCanvasPosition.Y) / (this.maxCanvasPosition.Y - this.minCanvasPosition.Y));

        return {
            X: ((this.minCanvasRosolution.X + (this.maxCanvasRosolution.X - this.minCanvasRosolution.X) * percentX)),
            Y: ((this.minCanvasRosolution.Y + (this.maxCanvasRosolution.Y - this.minCanvasRosolution.Y) * percentY))
        };
    }

    public get getBBox(): BBox {
        return this.bBox.getBBox;
    }
}
