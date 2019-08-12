declare class LagLngXY {
    pMin: {
        scrX: number;
        scrY: number;
        lat: any;
        lng: any;
        pos: any;
        perX: any;
        perY: any;
    };
    pMax: {
        scrX: number;
        scrY: number;
        lat: any;
        lng: any;
        pos: any;
        perX: any;
        perY: any;
    };
    radius: number;
    latlngToGlobalXY(lat: any, lng: any): {
        x: number;
        y: number;
    };
    constructor(pMinLat: any, pMinLng: any, pMaxLat: any, pMaxLng: any);
    latlngToScreenXY(lat: any, lng: any): {
        x: number;
        y: number;
    };
    getBobxConnors(): [number[], number[]];
}
