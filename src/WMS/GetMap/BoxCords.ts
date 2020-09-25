import { Position, BBox } from 'geojson'
import { DescriptivePosition } from './DescriptivePosition';
export class BoxCords {
    BOTTON_RIGHT: DescriptivePosition;
    TOP_LEFT: DescriptivePosition;
    constructor(bbox: BBox)
    constructor(bbox0: number, bbox1, bbox2, bbox3)
    constructor(bbox0: number | BBox, bbox1?: number, bbox2?: number, bbox3?: number) {
        if (Array.isArray(bbox0)) {
            const min = new DescriptivePosition(bbox0[1], bbox0[0])
            const max = new DescriptivePosition(bbox0[3], bbox0[2])
            this.BOTTON_RIGHT = new DescriptivePosition(min.LAT,max.LONG)
            this.TOP_LEFT = new DescriptivePosition(max.LAT, min.LONG)
        } else {
            this.BOTTON_RIGHT = new DescriptivePosition(bbox1, bbox0)
            this.TOP_LEFT = new DescriptivePosition(bbox3, bbox2)
        }
    }
    public get getBBox(): BBox {
        return [this.BOTTON_RIGHT.LONG, this.BOTTON_RIGHT.LAT,this.TOP_LEFT.LONG, this.TOP_LEFT.LAT]
    }
    public toString(){
        return [this.BOTTON_RIGHT.LAT, this.BOTTON_RIGHT.LONG, this.TOP_LEFT.LAT, this.TOP_LEFT.LONG].join(",")
    }
    toCanvasOrientation(){
        return [this.TOP_LEFT.LAT, this.TOP_LEFT.LONG,this.BOTTON_RIGHT.LAT, this.BOTTON_RIGHT.LONG]
    }
}
