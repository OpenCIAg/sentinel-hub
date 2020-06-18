# OpenCIAg | sentinel-hub-wms

## Install

```shell
npm install @ciag/sentinel-hub-wms
```

## API

### [DOC](./API.md)

### geoJsonToShapeImgs()

```ts
import { SentinelHub } from '@ciag/sentinel-hub-wms';
import { WMSParameters } from '@ciag/sentinel-hub-wms/dist/WMS'

const uuid = "{{Seu UUID aqui}}"
const geoJson = { "type": "FeatureCollection", "features": [{ "type": "Feature", "properties": {}, "geometry": { "type": "Polygon", "coordinates": [[[-410.4850959777832, -21.969255615138092], [-410.4859972000122, -21.96740494795422], [-410.48625469207764, -21.96619105638408], [-410.48638343811035, -21.965215955642634], [-410.4894518852234, -21.966330355943608], [-410.48882961273193, -21.96822083645885], [-410.48788547515863, -21.96929541416751], [-410.4866409301758, -21.970210788766085], [-410.48625469207764, -21.970509279207434], [-410.4850959777832, -21.969255615138092]]] } }] }


SentinelHub.WMS.geoJsonToShapeImgs(geoJson, uuid, { date: new Date(), layers: [WMSParameters.Sentinel_2.NDVI] }).then((result) => {
    result.forEach((element: { img: string; LatLng: [number[], number[]] }) => {
        console.log(`lat:${element.LatLng[0][0]} Long:${element.LatLng[0][1]}, Base64Lenght: ${result[0].img.length}`)
    });

}).catch((e) => {
    console.log(e)
})
```

### getImage()

```ts
import { SentinelHub } from '@ciag/sentinel-hub-wms';
import { WMSParameters } from '@ciag/sentinel-hub-wms/dist/WMS'

const uuid = "{{Seu UUID aqui}}"

SentinelHub.WMS.getImage(uuid,[[-410.4859972000122, -21.96740494795422],[-410.4850959777832, -21.969255615138092]],{date:new Date(),layers:[WMSParameters.Sentinel_2.NDVI]}).then(result =>{
    console.log(result.type)
})
```
