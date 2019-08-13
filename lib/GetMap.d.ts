export declare module GetMap {
    class GetMap {
        private UUID;
        private BBOX;
        private CRS;
        private SRS;
        private FORMAT;
        private WIDTH;
        private HEIGHT;
        private RESX;
        private RESY;
        private BGCOLOR;
        private TRANSPARENT;
        private LAYERS;
        private EXCEPTIONS;
        private DATE;
        constructor(UUID: string, params: {
            DATE: Date;
            BBOX: [number[], number[]];
            CRS?: string;
            SRS?: string;
            FORMAT: WMSParameters.Format;
            WIDTH?: string;
            HEIGHT?: string;
            RESX?: string;
            RESY?: string;
            BGCOLOR?: WMSParameters.BgColor;
            TRANSPARENT?: boolean;
            LAYERS?: WMSParameters.Sentinel_2[];
            EXCEPTIONS?: WMSParameters.Exceptions;
        });
        request(): Promise<Blob>;
        private get_requestLink;
        measure(lat1: any, lon1: any, lat2: any, lon2: any): number;
    }
}
