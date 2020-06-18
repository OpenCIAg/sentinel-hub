import { SentinelHubWms } from "./WMS";
import * as nodeFetch from 'node-fetch'
import { SentinelHubWfs } from "./WFS";
// is the code is running on node(that does not have fetch) we hijack it with node-fetch to a inner variable used for all fetchs in this module
export let _SafeFetch = globalThis.fetch ? globalThis.fetch : nodeFetch
// type used to clone function parametes 
export type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;
export namespace SentinelHub{
    export const WMS = SentinelHubWms
    export const WFS = SentinelHubWfs
}