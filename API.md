# Modules


<a name="modulessentinelhubmd"></a>


## Module: SentinelHub

### Index

#### Variables

* [WFS](#const-wfs)
* [WMS](#const-wms)

### Variables

#### `Const` WFS

• **WFS**: *[SentinelHubWfs](#modulessentinelhubwfsmd)* = SentinelHubWfs

___

#### `Const` WMS

• **WMS**: *[SentinelHubWms](#modulessentinelhubwmsmd)* = SentinelHubWms


<a name="modulessentinelhubwfsmd"></a>


## Module: SentinelHubWfs

### Index

#### Functions

* [GetFeature](#getfeature)
* [GetFeatureAsync](#getfeatureasync)
* [getAvaliableDates](#getavaliabledates)
* [getAvaliableDatesAsync](#const-getavaliabledatesasync)

### Functions

####  GetFeature

▸ **GetFeature**(`polygonList`: FeatureCollection‹Polygon› | Feature‹Polygon›, `uuid`: string): *Promise‹Response›*

**`description`** Used to create a Fetch based on the BBOX of the provided polygon(s)

 it can be created with a proxy URL

**Parameters:**

Name | Type |
------ | ------ |
`polygonList` | FeatureCollection‹Polygon› &#124; Feature‹Polygon› |
`uuid` | string |

**Returns:** *Promise‹Response›*

▸ **GetFeature**(`polygonList`: FeatureCollection‹Polygon› | Feature‹Polygon›, `uuid`: string, `options`: GetFeaturesRequestOptions): *Promise‹Response›*

**Parameters:**

Name | Type |
------ | ------ |
`polygonList` | FeatureCollection‹Polygon› &#124; Feature‹Polygon› |
`uuid` | string |
`options` | GetFeaturesRequestOptions |

**Returns:** *Promise‹Response›*

▸ **GetFeature**(`polygonList`: FeatureCollection‹Polygon› | Feature‹Polygon›, `uuid`: string, `options`: GetFeaturesRequestOptions, `proxy`: RequestInfo, `requestOption?`: RequestInit): *Promise‹Response›*

**Parameters:**

Name | Type |
------ | ------ |
`polygonList` | FeatureCollection‹Polygon› &#124; Feature‹Polygon› |
`uuid` | string |
`options` | GetFeaturesRequestOptions |
`proxy` | RequestInfo |
`requestOption?` | RequestInit |

**Returns:** *Promise‹Response›*

___

####  GetFeatureAsync

▸ **GetFeatureAsync**(`polygonList`: FeatureCollection‹Polygon› | Feature‹Polygon›, `uuid`: string): *Observable‹Response›*

**`description`** Used to create a Fetch based on the BBOX of the provided polygon(s)
`RxJs Version`

 it can be created with a proxy URL

**Parameters:**

Name | Type |
------ | ------ |
`polygonList` | FeatureCollection‹Polygon› &#124; Feature‹Polygon› |
`uuid` | string |

**Returns:** *Observable‹Response›*

▸ **GetFeatureAsync**(`polygonList`: FeatureCollection‹Polygon› | Feature‹Polygon›, `uuid`: string, `options`: GetFeaturesRequestOptions): *Observable‹Response›*

**Parameters:**

Name | Type |
------ | ------ |
`polygonList` | FeatureCollection‹Polygon› &#124; Feature‹Polygon› |
`uuid` | string |
`options` | GetFeaturesRequestOptions |

**Returns:** *Observable‹Response›*

▸ **GetFeatureAsync**(`polygonList`: FeatureCollection‹Polygon› | Feature‹Polygon›, `uuid`: string, `options`: GetFeaturesRequestOptions, `proxy`: RequestInfo, `requestOption?`: RequestInit): *Observable‹Response›*

**Parameters:**

Name | Type |
------ | ------ |
`polygonList` | FeatureCollection‹Polygon› &#124; Feature‹Polygon› |
`uuid` | string |
`options` | GetFeaturesRequestOptions |
`proxy` | RequestInfo |
`requestOption?` | RequestInit |

**Returns:** *Observable‹Response›*

___

####  getAvaliableDates

▸ **getAvaliableDates**(`polygonList`: FeatureCollection‹Polygon› | Feature‹Polygon›, `uuid`: string, `options`: object): *Promise‹Date[]›*

**`description`** Used to fetch avaliable dates for sattelite data

 it can be created with a proxy URL

**Parameters:**

▪ **polygonList**: *FeatureCollection‹Polygon› | Feature‹Polygon›*

▪ **uuid**: *string*

▪ **options**: *object*

for each option effect and more details: https://www.sentinel-hub.com/develop/api/ogc/standard-parameters/wfs/

Name | Type |
------ | ------ |
`from` | Date |
`proxy?` | RequestInfo |
`requestOption?` | RequestInit |
`to` | Date |

**Returns:** *Promise‹Date[]›*

___

#### `Const` getAvaliableDatesAsync

▸ **getAvaliableDatesAsync**(...`args`: [ArgumentTypes](#argumenttypes)‹[getAvaliableDates](#getavaliabledates)›): *Observable‹Date[]›*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | [ArgumentTypes](#argumenttypes)‹[getAvaliableDates](#getavaliabledates)› |

**Returns:** *Observable‹Date[]›*


<a name="modulessentinelhubwmsmd"></a>


## Module: SentinelHubWms

### Index

#### Functions

* [createShapeAsImage](#createshapeasimage)
* [getDangerZone](#getdangerzone)
* [getImage](#getimage)
* [getShapeFromSentinel](#getshapefromsentinel)
* [getShapeFromSentinelAsync](#const-getshapefromsentinelasync)
* [getShapesFromSentinel](#getshapesfromsentinel)
* [getShapesFromSentinelAsync](#const-getshapesfromsentinelasync)
* [latLngToXYTool](#latlngtoxytool)

### Functions

####  createShapeAsImage

▸ **createShapeAsImage**(`feature`: Feature‹Polygon›, `img`: string, `latLongXY`: LagLngXY): *Promise‹object›*

**`deprecated`** `new code in development`

**`description`** Crop user provided image to shape

**`beta`** 

**Parameters:**

Name | Type |
------ | ------ |
`feature` | Feature‹Polygon› |
`img` | string |
`latLongXY` | LagLngXY |

**Returns:** *Promise‹object›*

___

####  getDangerZone

▸ **getDangerZone**(`feature`: Feature‹Polygon›, `image`: string | HTMLImageElement): *Promise‹FeatureCollection‹Polygon››*

**`deprecated`** `new code in development`

**`description`** used to find and remove non organic pixels in the satellite data (remove roads/houses/...)

**`beta`** 

**Parameters:**

Name | Type |
------ | ------ |
`feature` | Feature‹Polygon› |
`image` | string &#124; HTMLImageElement |

**Returns:** *Promise‹FeatureCollection‹Polygon››*

___

####  getImage

▸ **getImage**(`uuid`: string, `bbox`: [number[], number[]], `options`: getFromSentinelOptions): *Promise‹any›*

**`description`** used to get the sentinel's satellite image of a square

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`uuid` | string | "" |
`bbox` | [number[], number[]] | - |
`options` | getFromSentinelOptions | - |

**Returns:** *Promise‹any›*

___

####  getShapeFromSentinel

▸ **getShapeFromSentinel**(`feature`: Feature‹Polygon›, `uuid`: string, `options`: getFromSentinelOptions): *Promise‹ICroppedImage›*

**`description`** used to get sentinel's satellite image of a polygon, with the image cropped for the polygon

**Parameters:**

Name | Type |
------ | ------ |
`feature` | Feature‹Polygon› |
`uuid` | string |
`options` | getFromSentinelOptions |

**Returns:** *Promise‹ICroppedImage›*

___

#### `Const` getShapeFromSentinelAsync

▸ **getShapeFromSentinelAsync**(...`args`: [ArgumentTypes](#argumenttypes)‹[getShapeFromSentinel](#getshapefromsentinel)›): *Observable‹object›*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | [ArgumentTypes](#argumenttypes)‹[getShapeFromSentinel](#getshapefromsentinel)› |

**Returns:** *Observable‹object›*

___

####  getShapesFromSentinel

▸ **getShapesFromSentinel**(`featureCollection`: FeatureCollection‹Polygon›, `uuid`: string, `options`: getFromSentinelOptions): *Promise‹ICroppedImage[]›*

**`description`** used to get multiple sentinel's satellite image of a collection of polygons, with the image cropped for the polygon

**Parameters:**

Name | Type |
------ | ------ |
`featureCollection` | FeatureCollection‹Polygon› |
`uuid` | string |
`options` | getFromSentinelOptions |

**Returns:** *Promise‹ICroppedImage[]›*

___

#### `Const` getShapesFromSentinelAsync

▸ **getShapesFromSentinelAsync**(...`args`: [ArgumentTypes](#argumenttypes)‹[getShapesFromSentinel](#getshapesfromsentinel)›): *Observable‹object›[]*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | [ArgumentTypes](#argumenttypes)‹[getShapesFromSentinel](#getshapesfromsentinel)› |

**Returns:** *Observable‹object›[]*

___

####  latLngToXYTool

▸ **latLngToXYTool**(`geoJson`: FeatureCollection‹Polygon› | Feature‹Polygon›): *LagLngXY‹›[]*

**Parameters:**

Name | Type |
------ | ------ |
`geoJson` | FeatureCollection‹Polygon› &#124; Feature‹Polygon› |

**Returns:** *LagLngXY‹›[]*
