export class DescriptivePosition {
    get LATITUDE() {
        return this.LAT;
    }
    get LONGITUDE() {
        return this.LONG;
    }
    constructor(public LAT: number, public LONG: number) { }
}
