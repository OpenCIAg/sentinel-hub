import { SentinelHubWms } from "./WMS";
import { SentinelHubWfs } from "./WFS";
import * as nodeFetch from 'node-fetch'
// is the code is running on node(that does not have fetch) we hijack it with node-fetch to a inner variable used for all fetchs in this module
export let _SafeFetch = globalThis.fetch ? globalThis.fetch.bind(window) : nodeFetch
// type used to clone function parametes

export type _ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;
export namespace SentinelHub {
    export const WMS = SentinelHubWms
    export const WFS = SentinelHubWfs
}
// const feature: GeoJSON.Feature<GeoJSON.Polygon> = {"type":"Feature","properties":{"_Agromax_minio":{"id":null,"originalFilename":"a12b258a-b5e6-47c5-9b6d-43b0f59dc9500-f3560cd6-82f1-44a6-aa51-ec1017e20aa6.png","filename":"0-f3560cd6-82f1-44a6-aa51-ec1017e20aa6.png","url":"http://192.168.1.101:2020/agromax-dev/0-f3560cd6-82f1-44a6-aa51-ec1017e20aa6.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20200831T155750Z&X-Amz-SignedHeaders=host&X-Amz-Expires=59&X-Amz-Credential=minioadmin%2F20200831%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=76f9e294db77afe3fde3bcec49b1e124fa7b2965b4df650b7a753669507ec49e"},"_Agromax_midia_Collect_Date":"2020-08-02T03:00:00.000Z"},"geometry":{"type":"Polygon","coordinates":[[[-50.519933,-21.92668],[-50.5193,-21.925168],[-50.516328,-21.926541],[-50.519171,-21.927895],[-50.519933,-21.92668]]]}}
// SentinelHub.WMS.getFeatureInfo(feature, "be0ceacc-a155-4e85-85b4-8250f0e8215e", 1, 1, 0, 0,{date:new Date(),layers:"NDVIVALUE"}).then(r => console.log(r))
