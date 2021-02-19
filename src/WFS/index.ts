import { Polygon, FeatureCollection, Feature } from 'geojson';
import * as bbox from 'geojson-bbox';
import { TYPENAMES } from './GetFeatures/TYPENAMES';
import { GetFeaturesRequest } from './GetFeatures/GetFeaturesRequest';
import { GetFeaturesRequestOptions, RawGetFeatureRequestOptions } from './GetFeatures/GetFeaturesRequestOptions';
import { defer, from, Observable } from 'rxjs';
import { _SafeFetch, _ArgumentTypes } from '..';
import { GetFeatureReturn } from './GetFeatures/GetFeatureReturn';

export namespace SentinelHubWfs {
    /**
     * default options to the getDate function
     */
    const defaultGetDateOptions: GetFeaturesRequestOptions = {
        TYPENAMES: TYPENAMES["SENTINEL-2 L1C"],
        OUTPUTFORMAT: 'application/json',
    }

    /**
     * @description Used to create a Fetch based on the BBOX of the provided polygon(s)
     *
     *  it can be created with a proxy URL
     * @param {GetFeaturesRequestOptions} options for each option effect and more details: https://www.sentinel-hub.com/develop/api/ogc/standard-parameters/wfs/
     */
    export function GetFeature(polygonList: FeatureCollection<Polygon> | Feature<Polygon>, uuid: string, options: GetFeaturesRequestOptions, proxy: RequestInfo, requestOption?: RequestInit): Promise<Response>;
    export function GetFeature(polygonList: FeatureCollection<Polygon> | Feature<Polygon>, uuid: string, options: GetFeaturesRequestOptions = defaultGetDateOptions, proxy: RequestInfo = null, requestOption: RequestInit = null): Promise<Response> {
        // merge the defalt options with the user's options without ever changeing the reference to the original object
        options = Object.assign(Object.assign({}, defaultGetDateOptions), options)

        // getting the bbox(aka the top left connor and the bottong right connor of the combined polygons as a square ) and formatting for the sentinel urls format
        options.BBOX = bbox(polygonList).map(i => String(i).replace('-', '').replace('.', '').slice(0, 7)).join(',')
        requestOption = Object.assign({ method: 'GET' }, requestOption)

        const request = new GetFeaturesRequest()

        request.addUUID(uuid)

        const rawRequsstOptions: RawGetFeatureRequestOptions = {}

        // adding allready formated user options to the real request parameters object
        options.BBOX ? rawRequsstOptions.BBOX = options.BBOX : null;
        options.FEATURE_OFFSET ? rawRequsstOptions.FEATURE_OFFSET = options.FEATURE_OFFSET : null;
        options.MAXFEATURES ? rawRequsstOptions.MAXFEATURES = options.MAXFEATURES : null;
        options.OUTPUTFORMAT ? rawRequsstOptions.OUTPUTFORMAT = options.OUTPUTFORMAT : null;
        options.SRSNAME ? rawRequsstOptions.SRSNAME = options.SRSNAME : null;
        options.TYPENAMES ? rawRequsstOptions.TYPENAMES = options.TYPENAMES : null;

        // formatting Object dates to the paremater TIMES that the GetFeatures acepts (TIME=2019-01-01/2019-04-23)
        if (options.DATE_START && options.DATE_END) {
            const formatedDates = [options.DATE_START, options.DATE_END]
                .map(i => i.toISOString().split('T')[0])
                .join('/')
            rawRequsstOptions.TIME = formatedDates
        }

        // adding each individual user declared parameter to the url builder
        Object.keys(rawRequsstOptions).forEach((option: keyof RawGetFeatureRequestOptions) => request.addParameter(option, rawRequsstOptions[option]));

        let link: string

        if (proxy) {
            /**
             * link via proxy
             * @example ```
             *  'http://myapi/REQUEST=GetFeature...
             * ```
             */
            link = request.getProxyLink(proxy)
        } else {
            /**
             * direct sentinel link
             * @example ```
             *  'https://services.sentinel-hub.com/ogc/wfs/{uuid}?REQUEST=GetFeature...
             * ```
             */
            link = request.getDirectLink(uuid)
        }
        return new Promise(r =>
            r(_SafeFetch(link, requestOption))
        )
    }

    /**
     * @description Used to create a Fetch based on the BBOX of the provided polygon(s)
     * `RxJs Version`
     *
     *  it can be created with a proxy URL
     * @param {GetFeaturesRequestOptions} options for each option effect and more details: https://www.sentinel-hub.com/develop/api/ogc/standard-parameters/wfs/
     */
    export function GetFeatureAsync(polygonList: FeatureCollection<Polygon> | Feature<Polygon>, uuid: string, options: GetFeaturesRequestOptions, proxy: RequestInfo, requestOption?: RequestInit): Observable<Response>;
    export function GetFeatureAsync(polygonList: FeatureCollection<Polygon> | Feature<Polygon>, uuid: string, options: GetFeaturesRequestOptions = defaultGetDateOptions, proxy: RequestInfo = null, requestOption: RequestInit = null): Observable<Response> {
        // corverts js promise to RxJs observable
        return defer(() => from(GetFeature(polygonList, uuid, options, proxy, requestOption)))
    }

    /**
     * @description Used to fetch avaliable dates for sattelite data
     *
     *  it can be created with a proxy URL
     * @param {GetFeaturesRequestOptions} dateOptions for each option effect and more details: https://www.sentinel-hub.com/develop/api/ogc/standard-parameters/wfs/
     */
    export async function getAvaliableDates(polygonList: FeatureCollection<Polygon> | Feature<Polygon>, uuid: string, dateOptions: { from: Date, to: Date, proxy?: RequestInfo, requestOption?: RequestInit }, options: GetFeaturesRequestOptions = defaultGetDateOptions): Promise<Date[]> {
        let requestOptions = {...defaultGetDateOptions,...options}
        
        requestOptions.DATE_START = dateOptions.from
        requestOptions.DATE_END = dateOptions.to
        const dates: GetFeatureReturn = await GetFeature(polygonList, uuid, requestOptions, dateOptions.proxy, dateOptions.requestOption).then(r => r.json())
        return dates.features.map(i => new Date(i.properties.date))
    }

    /**
     * @description Used to fetch avaliable dates for sattelite data
     * `RxJs Version`
     *
     *  it can be created with a proxy URL
     * @param {GetFeaturesRequestOptions} options for each option effect and more details: https://www.sentinel-hub.com/develop/api/ogc/standard-parameters/wfs/
     */
    export const getAvaliableDatesAsync = (...args: _ArgumentTypes<typeof getAvaliableDates>) => defer(() => from(getAvaliableDates(...args)))


}