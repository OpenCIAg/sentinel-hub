export interface GetFeatureReturn {
    type: string;
    features: Feature[];
}

interface Feature {
    type: string;
    geometry: Geometry;
    properties: Properties2;
}

interface Properties2 {
    id: string;
    date: string;
    time: string;
    path: string;
    crs: string;
    mbr: string;
    cloudCoverPercentage: number;
}

interface Geometry {
    type: string;
    crs: Crs;
    coordinates: number[][][][];
}

interface Crs {
    type: string;
    properties: Properties;
}

interface Properties {
    name: string;
}
