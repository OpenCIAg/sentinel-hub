export declare class LagLngXY {
    pMin: {
        lat: any;
        lng: any;
        perX: any;
        perY: any;
        pos: any;
        scrX: number;
        scrY: number;
    };
    pMax: {
        lat: any;
        lng: any;
        perX: any;
        perY: any;
        pos: any;
        scrX: number;
        scrY: number;
    };
    radius: number;
    constructor(pMinLat: any, pMinLng: any, pMaxLat: any, pMaxLng: any);
    latlngToGlobalXY(lat: any, lng: any): {
        x: number;
        y: number;
    };
    latlngToScreenXY(lat: any, lng: any): {
        x: number;
        y: number;
    };
    getBobxConnors(): [number[], number[]];
}
