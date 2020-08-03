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

    private minCanvasRosolution = { X: 0, Y: 0 }
    private maxCanvasRosolution = { X: 1024, Y: 780 }


    private radius = 6.371;

    constructor(private bBox: BoxCords) {
        this.minMapPosition = bBox.TOP_LEFT
        this.maxMapPosition = bBox.BOTTON_RIGHT

        this.minCanvasPosition = this.latlngToGlobalXY(this.minMapPosition)
        this.maxCanvasPosition = this.latlngToGlobalXY(this.maxMapPosition)
    }

    private latlngToGlobalXY(position: DescriptivePosition): XY {
        const X = this.radius * position.LONG * Math.cos((this.minMapPosition.LAT + this.maxMapPosition.LAT) / 2);
        const Y = this.radius * position.LAT;
        return { X, Y };
    }

    public translateToCanvas(position: DescriptivePosition)
    public translateToCanvas(lat: number, lng: number)
    public translateToCanvas(lat: number | DescriptivePosition, lng?: number) {
        let pos: XY
        if (lat instanceof DescriptivePosition) {
            pos = this.latlngToGlobalXY(lat);
        } else {
            pos = this.latlngToGlobalXY(new DescriptivePosition(lat, lng));
        }

        const percentX = ((pos.X - this.minCanvasPosition.X) / (this.maxCanvasPosition.X - this.minCanvasPosition.X));
        const percentY = ((pos.Y - this.minCanvasPosition.Y) / (this.maxCanvasPosition.Y - this.minCanvasPosition.Y));
        return {
            x: ((this.minCanvasRosolution.X + (this.maxCanvasRosolution.X - this.minCanvasRosolution.X) * percentX) - this.maxCanvasRosolution.X) * -1,
            y: this.minCanvasRosolution.Y + (this.maxCanvasRosolution.Y - this.minCanvasRosolution.Y) * percentY
        };
    }

    public get getBBox(): BBox {
        return this.bBox.getBBox;
    }
}
