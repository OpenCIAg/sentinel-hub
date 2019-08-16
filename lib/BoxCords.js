"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BoxCords {
    constructor(param) {
        this.topLeft = param.top_left;
        this.bottonRight = param.botton_right;
    }
    toString() {
        return `${this.topLeft.lat},${this.topLeft.long},${this.bottonRight.lat},${this.bottonRight.long}`;
    }
}
exports.BoxCords = BoxCords;
