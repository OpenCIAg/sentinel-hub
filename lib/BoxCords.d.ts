import { latLong } from "./interfaces";
export declare class BoxCords {
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
    });
    toString(): string;
}
