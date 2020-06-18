import { TYPENAMES } from './TYPENAMES';
export interface GetFeaturesRequestOptions {
    BBOX?: number[]
    TYPENAMES?: TYPENAMES;
    MAXFEATURES?: number;
    SRSNAME?: string;
    FEATURE_OFFSET?: number;
    OUTPUTFORMAT?: string;
    DATE_START?: Date;
    DATE_END?: Date;
}
export interface RawGetFeatureRequestOptions {
    TYPENAMES?: TYPENAMES;
    MAXFEATURES?: number;
    BBOX?: number[];
    SRSNAME?: string;
    FEATURE_OFFSET?: number;
    OUTPUTFORMAT?: string;
    TIME?: string
}

