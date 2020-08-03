import { Position, BBox } from 'geojson'
import { DescriptivePosition } from './DescriptivePosition';
export class BoxCords {
    TOP_LEFT: DescriptivePosition;
    BOTTON_RIGHT: DescriptivePosition;
    constructor(bbox: BBox)
    constructor(bbox0: number, bbox1, bbox2, bbox3)
    constructor(bbox0: number | BBox, bbox1?: number, bbox2?: number, bbox3?: number) {
        if (Array.isArray(bbox0)) {
            this.TOP_LEFT = new DescriptivePosition(bbox0[0], bbox0[1])
            this.BOTTON_RIGHT = new DescriptivePosition(bbox0[2], bbox0[3])
        } else {
            this.TOP_LEFT = new DescriptivePosition(bbox0, bbox1)
            this.BOTTON_RIGHT = new DescriptivePosition(bbox2, bbox3)
        }
    }
    public get getBBox(): BBox {
        return [this.TOP_LEFT.LAT, this.TOP_LEFT.LONG, this.BOTTON_RIGHT.LAT, this.BOTTON_RIGHT.LONG]
    }
}
