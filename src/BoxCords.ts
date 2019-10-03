import { latLong } from "./interfaces";
export class BoxCords {
    topLeft: latLong;
    bottonRight: latLong;
    constructor(param: {
        top_left: {
            lat: string;
            long: string;
        };
        botton_right: {
            lat: string;
            long: string;
        };
    }) {
        this.topLeft = param.top_left;
        this.bottonRight = param.botton_right;
    }
    public toString() {
        return `${this.topLeft.lat},${this.topLeft.long},${this.bottonRight.lat},${this.bottonRight.long}`;
    }
}
