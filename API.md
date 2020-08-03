<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [@ciag/sentinel-hub - v0.0.1-beta.1](#ciagsentinel-hub---v001-beta1)
  - [Index](#index)
    - [Modules](#modules)
    - [Enumerations](#enumerations)
    - [Classes](#classes)
    - [Interfaces](#interfaces)
    - [Type aliases](#type-aliases)
    - [Variables](#variables)
  - [Type aliases](#type-aliases-1)
    - [AceptedFeatures](#aceptedfeatures)
    - [ArgumentTypes](#argumenttypes)
    - [ICroppedImage](#icroppedimage)
    - [XY](#xy)
    - [getFromSentinelOptions](#getfromsentineloptions)
  - [Variables](#variables-1)
    - [`Let` _SafeFetch](#let-_safefetch)
- [Classes](#classes-1)
  - [Class: BoxCords](#class-boxcords)
    - [Hierarchy](#hierarchy)
    - [Index](#index-1)
    - [Constructors](#constructors)
    - [Properties](#properties)
    - [Accessors](#accessors)
  - [Class: DescriptivePosition](#class-descriptiveposition)
    - [Hierarchy](#hierarchy-1)
    - [Index](#index-2)
    - [Constructors](#constructors-1)
    - [Properties](#properties-1)
    - [Accessors](#accessors-1)
  - [Class: GetFeaturesRequest](#class-getfeaturesrequest)
    - [Hierarchy](#hierarchy-2)
    - [Index](#index-3)
    - [Constructors](#constructors-2)
    - [Properties](#properties-2)
    - [Methods](#methods)
  - [Class: GetMap](#class-getmap)
    - [Hierarchy](#hierarchy-3)
    - [Index](#index-4)
    - [Constructors](#constructors-3)
    - [Properties](#properties-3)
    - [Methods](#methods-1)
  - [Class: LagLngXY](#class-laglngxy)
    - [Hierarchy](#hierarchy-4)
    - [Index](#index-5)
    - [Constructors](#constructors-4)
    - [Accessors](#accessors-2)
    - [Methods](#methods-2)
  - [Class: SentinelHubURL](#class-sentinelhuburl)
    - [Hierarchy](#hierarchy-5)
    - [Index](#index-6)
    - [Constructors](#constructors-5)
    - [Properties](#properties-4)
    - [Methods](#methods-3)
- [Enums](#enums)
  - [Enumeration: BgColor](#enumeration-bgcolor)
    - [Index](#index-7)
    - [Enumeration members](#enumeration-members)
  - [Enumeration: Exceptions](#enumeration-exceptions)
    - [Index](#index-8)
    - [Enumeration members](#enumeration-members-1)
  - [Enumeration: Format](#enumeration-format)
    - [Index](#index-9)
    - [Enumeration members](#enumeration-members-2)
  - [Enumeration: Sentinel_2](#enumeration-sentinel_2)
    - [Index](#index-10)
    - [Enumeration members](#enumeration-members-3)
  - [Enumeration: TYPENAMES](#enumeration-typenames)
    - [Index](#index-11)
    - [Enumeration members](#enumeration-members-4)
- [Interfaces](#interfaces-1)
  - [Interface: Crs](#interface-crs)
    - [Hierarchy](#hierarchy-6)
    - [Index](#index-12)
    - [Properties](#properties-5)
  - [Interface: Feature](#interface-feature)
    - [Hierarchy](#hierarchy-7)
    - [Index](#index-13)
    - [Properties](#properties-6)
  - [Interface: Geometry](#interface-geometry)
    - [Hierarchy](#hierarchy-8)
    - [Index](#index-14)
    - [Properties](#properties-7)
  - [Interface: GetFeatureReturn](#interface-getfeaturereturn)
    - [Hierarchy](#hierarchy-9)
    - [Index](#index-15)
    - [Properties](#properties-8)
  - [Interface: GetFeaturesRequestOptions](#interface-getfeaturesrequestoptions)
    - [Hierarchy](#hierarchy-10)
    - [Index](#index-16)
    - [Properties](#properties-9)
  - [Interface: Properties](#interface-properties)
    - [Hierarchy](#hierarchy-11)
    - [Index](#index-17)
    - [Properties](#properties-10)
  - [Interface: Properties2](#interface-properties2)
    - [Hierarchy](#hierarchy-12)
    - [Index](#index-18)
    - [Properties](#properties-11)
  - [Interface: RawGetFeatureRequestOptions](#interface-rawgetfeaturerequestoptions)
    - [Hierarchy](#hierarchy-13)
    - [Index](#index-19)
    - [Properties](#properties-12)
- [Modules](#modules-1)
  - [Module: Cropper](#module-cropper)
    - [Index](#index-20)
    - [Functions](#functions)
  - [Module: GetMapParameters](#module-getmapparameters)
    - [Index](#index-21)
  - [Module: SentinelHub](#module-sentinelhub)
    - [Index](#index-22)
    - [Variables](#variables-2)
  - [Module: SentinelHubWfs](#module-sentinelhubwfs)
    - [Index](#index-23)
    - [Functions](#functions-1)
  - [Module: SentinelHubWms](#module-sentinelhubwms)
    - [Index](#index-24)
    - [Functions](#functions-2)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


<a name="globalsmd"></a>


# @ciag/sentinel-hub - v0.0.1-beta.1

## Index

### Modules

* [Cropper](#modulescroppermd)
* [GetMapParameters](#modulesgetmapparametersmd)
* [SentinelHub](#modulessentinelhubmd)
* [SentinelHubWfs](#modulessentinelhubwfsmd)
* [SentinelHubWms](#modulessentinelhubwmsmd)

### Enumerations

* [TYPENAMES](#enumstypenamesmd)

### Classes

* [BoxCords](#classesboxcordsmd)
* [DescriptivePosition](#classesdescriptivepositionmd)
* [GetFeaturesRequest](#classesgetfeaturesrequestmd)
* [GetMap](#classesgetmapmd)
* [LagLngXY](#classeslaglngxymd)
* [SentinelHubURL](#classessentinelhuburlmd)

### Interfaces

* [Crs](#interfacescrsmd)
* [Feature](#interfacesfeaturemd)
* [Geometry](#interfacesgeometrymd)
* [GetFeatureReturn](#interfacesgetfeaturereturnmd)
* [GetFeaturesRequestOptions](#interfacesgetfeaturesrequestoptionsmd)
* [Properties](#interfacespropertiesmd)
* [Properties2](#interfacesproperties2md)
* [RawGetFeatureRequestOptions](#interfacesrawgetfeaturerequestoptionsmd)

### Type aliases

* [AceptedFeatures](#aceptedfeatures)
* [ArgumentTypes](#argumenttypes)
* [ICroppedImage](#icroppedimage)
* [XY](#xy)
* [getFromSentinelOptions](#getfromsentineloptions)

### Variables

* [_SafeFetch](#let-_safefetch)

## Type aliases

###  AceptedFeatures

Ƭ **AceptedFeatures**: *Feature‹Polygon›*

___

###  ArgumentTypes

Ƭ **ArgumentTypes**: *F extends function ? A : never*

___

###  ICroppedImage

Ƭ **ICroppedImage**: *object*

#### Type declaration:

* **bbox**: *[number[], number[]]*

* **feature**: *Feature‹Polygon›*

* **img**: *string*

* **link**: *string*

___

###  XY

Ƭ **XY**: *object*

#### Type declaration:

* **X**: *number*

* **Y**: *number*

___

###  getFromSentinelOptions

Ƭ **getFromSentinelOptions**: *object*

#### Type declaration:

* **date**: *Date*

* **layers**: *[Sentinel_2](#enumsgetmapparameterssentinel_2md)[]*

* **proxy**? : *RequestInfo*

* **proxyOption**? : *RequestInit*

## Variables

### `Let` _SafeFetch

• **_SafeFetch**: *any* = globalThis.fetch ? globalThis.fetch.bind(window) : nodeFetch

# Classes


<a name="classesboxcordsmd"></a>


## Class: BoxCords

### Hierarchy

* **BoxCords**

### Index

#### Constructors

* [constructor](#constructor)

#### Properties

* [BOTTON_RIGHT](#botton_right)
* [TOP_LEFT](#top_left)

#### Accessors

* [getBBox](#getbbox)

### Constructors

####  constructor

\+ **new BoxCords**(`bbox`: BBox): *[BoxCords](#classesboxcordsmd)*

**Parameters:**

Name | Type |
------ | ------ |
`bbox` | BBox |

**Returns:** *[BoxCords](#classesboxcordsmd)*

\+ **new BoxCords**(`bbox0`: number, `bbox1`: any, `bbox2`: any, `bbox3`: any): *[BoxCords](#classesboxcordsmd)*

**Parameters:**

Name | Type |
------ | ------ |
`bbox0` | number |
`bbox1` | any |
`bbox2` | any |
`bbox3` | any |

**Returns:** *[BoxCords](#classesboxcordsmd)*

### Properties

####  BOTTON_RIGHT

• **BOTTON_RIGHT**: *[DescriptivePosition](#classesdescriptivepositionmd)*

___

####  TOP_LEFT

• **TOP_LEFT**: *[DescriptivePosition](#classesdescriptivepositionmd)*

### Accessors

####  getBBox

• **get getBBox**(): *BBox*

**Returns:** *BBox*


<a name="classesdescriptivepositionmd"></a>


## Class: DescriptivePosition

### Hierarchy

* **DescriptivePosition**

### Index

#### Constructors

* [constructor](#constructor)

#### Properties

* [LAT](#lat)
* [LONG](#long)

#### Accessors

* [LATITUDE](#latitude)
* [LONGITUDE](#longitude)

### Constructors

####  constructor

\+ **new DescriptivePosition**(`LAT`: number, `LONG`: number): *[DescriptivePosition](#classesdescriptivepositionmd)*

**Parameters:**

Name | Type |
------ | ------ |
`LAT` | number |
`LONG` | number |

**Returns:** *[DescriptivePosition](#classesdescriptivepositionmd)*

### Properties

####  LAT

• **LAT**: *number*

___

####  LONG

• **LONG**: *number*

### Accessors

####  LATITUDE

• **get LATITUDE**(): *number*

**Returns:** *number*

___

####  LONGITUDE

• **get LONGITUDE**(): *number*

**Returns:** *number*


<a name="classesgetfeaturesrequestmd"></a>


## Class: GetFeaturesRequest

### Hierarchy

* **GetFeaturesRequest**

### Index

#### Constructors

* [constructor](#constructor)

#### Properties

* [UUID](#uuid)
* [parameters](#parameters)
* [preset](#preset)
* [request](#request)
* [timeEnd](#timeend)
* [timeStart](#timestart)

#### Methods

* [addParameter](#addparameter)
* [addUUID](#adduuid)
* [getDirectLink](#getdirectlink)
* [getProxyLink](#getproxylink)

### Constructors

####  constructor

\+ **new GetFeaturesRequest**(`preset`: RequestInfo): *[GetFeaturesRequest](#classesgetfeaturesrequestmd)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`preset` | RequestInfo | "https://services.sentinel-hub.com/ogc/wfs/" |

**Returns:** *[GetFeaturesRequest](#classesgetfeaturesrequestmd)*

### Properties

####  UUID

• **UUID**: *string*

___

####  parameters

• **parameters**: *any[]* = []

___

####  preset

• **preset**: *RequestInfo*

___

####  request

• **request**: *string* = "REQUEST=GetFeature"

___

####  timeEnd

• **timeEnd**: *string* = new Date().toISOString().split('T')[0]

___

####  timeStart

• **timeStart**: *string* = new Date('2019-01-01').toISOString().split('T')[0]

### Methods

####  addParameter

▸ **addParameter**<**T**>(`name`: T, `value`: RawGetFeatureRequestOptions[T]): *void*

**Type parameters:**

▪ **T**: *keyof RawGetFeatureRequestOptions*

**Parameters:**

Name | Type |
------ | ------ |
`name` | T |
`value` | RawGetFeatureRequestOptions[T] |

**Returns:** *void*

___

####  addUUID

▸ **addUUID**(`uuid`: string): *void*

**Parameters:**

Name | Type |
------ | ------ |
`uuid` | string |

**Returns:** *void*

___

####  getDirectLink

▸ **getDirectLink**(`uuid`: string): *string*

Requesting directly from sentinel

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`uuid` | string | undefined |

**Returns:** *string*

___

####  getProxyLink

▸ **getProxyLink**(`proxy`: RequestInfo): *string*

Requesting via proxyLink

**Parameters:**

Name | Type |
------ | ------ |
`proxy` | RequestInfo |

**Returns:** *string*


<a name="classesgetmapmd"></a>


## Class: GetMap

### Hierarchy

* **GetMap**

### Index

#### Constructors

* [constructor](#constructor)

#### Properties

* [proxy](#proxy)
* [proxyOptions](#proxyoptions)

#### Methods

* [measure](#measure)
* [request](#request)

### Constructors

####  constructor

\+ **new GetMap**(`UUID`: string, `params`: object): *[GetMap](#classesgetmapmd)*

**Parameters:**

▪ **UUID**: *string*

▪ **params**: *object*

Name | Type |
------ | ------ |
`BBOX` | BBox |
`BGCOLOR?` | [BgColor](#enumsgetmapparametersbgcolormd) |
`CRS?` | string |
`DATE` | Date |
`EXCEPTIONS?` | [Exceptions](#enumsgetmapparametersexceptionsmd) |
`FORMAT` | [Format](#enumsgetmapparametersformatmd) |
`HEIGHT?` | string |
`LAYERS?` | [Sentinel_2](#enumsgetmapparameterssentinel_2md)[] |
`RESX?` | string |
`RESY?` | string |
`SRS?` | string |
`TRANSPARENT?` | boolean |
`WIDTH?` | string |

**Returns:** *[GetMap](#classesgetmapmd)*

### Properties

####  proxy

• **proxy**: *RequestInfo*

___

####  proxyOptions

• **proxyOptions**: *RequestInit*

### Methods

####  measure

▸ **measure**(`lat1`: any, `lon1`: any, `lat2`: any, `lon2`: any): *number*

**Parameters:**

Name | Type |
------ | ------ |
`lat1` | any |
`lon1` | any |
`lat2` | any |
`lon2` | any |

**Returns:** *number*

___

####  request

▸ **request**(): *Promise‹any›*

**Returns:** *Promise‹any›*


<a name="classeslaglngxymd"></a>


## Class: LagLngXY

### Hierarchy

* **LagLngXY**

### Index

#### Constructors

* [constructor](#constructor)

#### Accessors

* [getBBox](#getbbox)

#### Methods

* [translateToCanvas](#translatetocanvas)

### Constructors

####  constructor

\+ **new LagLngXY**(`bBox`: [BoxCords](#classesboxcordsmd)): *[LagLngXY](#classeslaglngxymd)*

**Parameters:**

Name | Type |
------ | ------ |
`bBox` | [BoxCords](#classesboxcordsmd) |

**Returns:** *[LagLngXY](#classeslaglngxymd)*

### Accessors

####  getBBox

• **get getBBox**(): *BBox*

**Returns:** *BBox*

### Methods

####  translateToCanvas

▸ **translateToCanvas**(`position`: [DescriptivePosition](#classesdescriptivepositionmd)): *any*

**Parameters:**

Name | Type |
------ | ------ |
`position` | [DescriptivePosition](#classesdescriptivepositionmd) |

**Returns:** *any*

▸ **translateToCanvas**(`lat`: number, `lng`: number): *any*

**Parameters:**

Name | Type |
------ | ------ |
`lat` | number |
`lng` | number |

**Returns:** *any*


<a name="classessentinelhuburlmd"></a>


## Class: SentinelHubURL

### Hierarchy

* **SentinelHubURL**

### Index

#### Constructors

* [constructor](#constructor)

#### Properties

* [UUID](#uuid)
* [link](#link)
* [parameters](#parameters)
* [preset](#preset)
* [request](#request)
* [timeFrom](#timefrom)
* [timeTo](#timeto)

#### Methods

* [addParameter](#addparameter)
* [addUUID](#adduuid)
* [clearTime](#cleartime)
* [getLink](#getlink)
* [getProxy](#getproxy)
* [setTimeFrom](#settimefrom)
* [setTimeTo](#settimeto)

### Constructors

####  constructor

\+ **new SentinelHubURL**(`preset`: RequestInfo): *[SentinelHubURL](#classessentinelhuburlmd)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`preset` | RequestInfo | "https://services.sentinel-hub.com/ogc/wms/" |

**Returns:** *[SentinelHubURL](#classessentinelhuburlmd)*

### Properties

####  UUID

• **UUID**: *string*

___

####  link

• **link**: *string*

___

####  parameters

• **parameters**: *any[]* = []

___

####  preset

• **preset**: *RequestInfo*

___

####  request

• **request**: *string* = "REQUEST=GetMap"

___

####  timeFrom

• **timeFrom**: *any* = null

___

####  timeTo

• **timeTo**: *any* = null

### Methods

####  addParameter

▸ **addParameter**(`name`: string, `value`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`value` | any |

**Returns:** *void*

___

####  addUUID

▸ **addUUID**(`uuid`: string): *void*

**Parameters:**

Name | Type |
------ | ------ |
`uuid` | string |

**Returns:** *void*

___

####  clearTime

▸ **clearTime**(): *void*

**Returns:** *void*

___

####  getLink

▸ **getLink**(): *string*

**Returns:** *string*

___

####  getProxy

▸ **getProxy**(): *string*

**Returns:** *string*

___

####  setTimeFrom

▸ **setTimeFrom**(`date`: Date): *void*

**Parameters:**

Name | Type |
------ | ------ |
`date` | Date |

**Returns:** *void*

___

####  setTimeTo

▸ **setTimeTo**(`date`: Date): *void*

**Parameters:**

Name | Type |
------ | ------ |
`date` | Date |

**Returns:** *void*

# Enums


<a name="enumsgetmapparametersbgcolormd"></a>


## Enumeration: BgColor

### Index

#### Enumeration members

* [AARRGGBB](#aarrggbb)
* [FFFFFF](#ffffff)
* [RRGGBB](#rrggbb)
* [_AARRGGBB](#_aarrggbb)
* [_RRGGBB](#_rrggbb)
* [xAARRGGBB](#xaarrggbb)
* [xRRGGBB](#xrrggbb)

### Enumeration members

####  AARRGGBB

• **AARRGGBB**: = "AARRGGBB"

___

####  FFFFFF

• **FFFFFF**: = "FFFFFF"

___

####  RRGGBB

• **RRGGBB**: = "RRGGBB"

___

####  _AARRGGBB

• **_AARRGGBB**: = "#AARRGGBB"

___

####  _RRGGBB

• **_RRGGBB**: = "#RRGGBB"

___

####  xAARRGGBB

• **xAARRGGBB**: = "0xAARRGGBB"

___

####  xRRGGBB

• **xRRGGBB**: = "0xRRGGBB"


<a name="enumsgetmapparametersexceptionsmd"></a>


## Enumeration: Exceptions

### Index

#### Enumeration members

* [BLANK](#blank)
* [INIMAGE](#inimage)
* [XML](#xml)

### Enumeration members

####  BLANK

• **BLANK**: = "BLANK"

___

####  INIMAGE

• **INIMAGE**: = "INIMAGE"

___

####  XML

• **XML**: = "XML"


<a name="enumsgetmapparametersformatmd"></a>


## Enumeration: Format

### Index

#### Enumeration members

* [image_jpeg](#image_jpeg)
* [image_png](#image_png)
* [image_tiff_16](#image_tiff_16)
* [image_tiff_32f](#image_tiff_32f)
* [image_tiff_8](#image_tiff_8)

### Enumeration members

####  image_jpeg

• **image_jpeg**: = "image/jpeg"

___

####  image_png

• **image_png**: = "image/png"

___

####  image_tiff_16

• **image_tiff_16**: = "image/tiff;depth=16"

___

####  image_tiff_32f

• **image_tiff_32f**: = "image/tiff;depth=32f"

___

####  image_tiff_8

• **image_tiff_8**: = "image/tiff;depth=8"


<a name="enumsgetmapparameterssentinel_2md"></a>


## Enumeration: Sentinel_2

### Index

#### Enumeration members

* [AGRICULTURE](#agriculture)
* [BATHYMETRIC](#bathymetric)
* [FALSE_COLOR](#false_color)
* [FALSE_COLOR_URBAN](#false_color_urban)
* [GEOLOGY](#geology)
* [MOISTURE_INDEX](#moisture_index)
* [NDVI](#ndvi)
* [SWIR](#swir)
* [TRUE_COLOR](#true_color)

### Enumeration members

####  AGRICULTURE

• **AGRICULTURE**: = "AGRICULTURE"

___

####  BATHYMETRIC

• **BATHYMETRIC**: = "BATHYMETRIC"

___

####  FALSE_COLOR

• **FALSE_COLOR**: = "FALSE_COLOR"

___

####  FALSE_COLOR_URBAN

• **FALSE_COLOR_URBAN**: = "FALSE_COLOR_URBAN"

___

####  GEOLOGY

• **GEOLOGY**: = "GEOLOGY"

___

####  MOISTURE_INDEX

• **MOISTURE_INDEX**: = "MOISTURE_INDEX"

___

####  NDVI

• **NDVI**: = "NDVI"

___

####  SWIR

• **SWIR**: = "SWIR"

___

####  TRUE_COLOR

• **TRUE_COLOR**: = "TRUE_COLOR"


<a name="enumstypenamesmd"></a>


## Enumeration: TYPENAMES

### Index

#### Enumeration members

* [BYOC](#byoc)
* [ENVISAT MERIS](#envisat-meris)
* [LANDSAT 5](#landsat-5)
* [LANDSAT 7](#landsat-7)
* [LANDSAT 8](#landsat-8)
* [MODIS](#modis)
* [SENTINEL 3 OLCI](#sentinel-3-olci)
* [SENTINEL 3 SLSTR](#sentinel-3-slstr)
* [SENTINEL 5P](#sentinel-5p)
* [SENTINEL-1 EW](#sentinel-1-ew)
* [SENTINEL-1 EW SH](#sentinel-1-ew-sh)
* [SENTINEL-1 IW](#sentinel-1-iw)
* [SENTINEL-2 L1C](#sentinel-2-l1c)
* [SENTINEL-2 L2A](#sentinel-2-l2a)

### Enumeration members

####  BYOC

• **BYOC**: = "/"

___

####  ENVISAT MERIS

• **ENVISAT MERIS**: = "ENV.TILE"

___

####  LANDSAT 5

• **LANDSAT 5**: = "L5.TILE"

___

####  LANDSAT 7

• **LANDSAT 7**: = "L7.TILE"

___

####  LANDSAT 8

• **LANDSAT 8**: = "L8.TILE"

___

####  MODIS

• **MODIS**: = "/"

___

####  SENTINEL 3 OLCI

• **SENTINEL 3 OLCI**: = "S3.TILE"

___

####  SENTINEL 3 SLSTR

• **SENTINEL 3 SLSTR**: = "/"

___

####  SENTINEL 5P

• **SENTINEL 5P**: = "S5p_L2.TILE"

___

####  SENTINEL-1 EW

• **SENTINEL-1 EW**: = "S1_EW.TILE"

___

####  SENTINEL-1 EW SH

• **SENTINEL-1 EW SH**: = "S1_EW_SH.TILE"

___

####  SENTINEL-1 IW

• **SENTINEL-1 IW**: = "S1.TILE"

___

####  SENTINEL-2 L1C

• **SENTINEL-2 L1C**: = "S2.TILE"

___

####  SENTINEL-2 L2A

• **SENTINEL-2 L2A**: = "/"

# Interfaces


<a name="interfacescrsmd"></a>


## Interface: Crs

### Hierarchy

* **Crs**

### Index

#### Properties

* [properties](#properties)
* [type](#type)

### Properties

####  properties

• **properties**: *[Properties](#interfacespropertiesmd)*

___

####  type

• **type**: *string*


<a name="interfacesfeaturemd"></a>


## Interface: Feature

### Hierarchy

* **Feature**

### Index

#### Properties

* [geometry](#geometry)
* [properties](#properties)
* [type](#type)

### Properties

####  geometry

• **geometry**: *[Geometry](#interfacesgeometrymd)*

___

####  properties

• **properties**: *[Properties2](#interfacesproperties2md)*

___

####  type

• **type**: *string*


<a name="interfacesgeometrymd"></a>


## Interface: Geometry

### Hierarchy

* **Geometry**

### Index

#### Properties

* [coordinates](#coordinates)
* [crs](#crs)
* [type](#type)

### Properties

####  coordinates

• **coordinates**: *number[][][][]*

___

####  crs

• **crs**: *[Crs](#interfacescrsmd)*

___

####  type

• **type**: *string*


<a name="interfacesgetfeaturereturnmd"></a>


## Interface: GetFeatureReturn

### Hierarchy

* **GetFeatureReturn**

### Index

#### Properties

* [features](#features)
* [type](#type)

### Properties

####  features

• **features**: *[Feature](#interfacesfeaturemd)[]*

___

####  type

• **type**: *string*


<a name="interfacesgetfeaturesrequestoptionsmd"></a>


## Interface: GetFeaturesRequestOptions

### Hierarchy

* **GetFeaturesRequestOptions**

### Index

#### Properties

* [BBOX](#optional-bbox)
* [DATE_END](#optional-date_end)
* [DATE_START](#optional-date_start)
* [FEATURE_OFFSET](#optional-feature_offset)
* [MAXFEATURES](#optional-maxfeatures)
* [OUTPUTFORMAT](#optional-outputformat)
* [SRSNAME](#optional-srsname)
* [TYPENAMES](#optional-typenames)

### Properties

#### `Optional` BBOX

• **BBOX**? : *number[]*

___

#### `Optional` DATE_END

• **DATE_END**? : *Date*

___

#### `Optional` DATE_START

• **DATE_START**? : *Date*

___

#### `Optional` FEATURE_OFFSET

• **FEATURE_OFFSET**? : *number*

___

#### `Optional` MAXFEATURES

• **MAXFEATURES**? : *number*

___

#### `Optional` OUTPUTFORMAT

• **OUTPUTFORMAT**? : *string*

___

#### `Optional` SRSNAME

• **SRSNAME**? : *string*

___

#### `Optional` TYPENAMES

• **TYPENAMES**? : *[TYPENAMES](#enumstypenamesmd)*


<a name="interfacespropertiesmd"></a>


## Interface: Properties

### Hierarchy

* **Properties**

### Index

#### Properties

* [name](#name)

### Properties

####  name

• **name**: *string*


<a name="interfacesproperties2md"></a>


## Interface: Properties2

### Hierarchy

* **Properties2**

### Index

#### Properties

* [cloudCoverPercentage](#cloudcoverpercentage)
* [crs](#crs)
* [date](#date)
* [id](#id)
* [mbr](#mbr)
* [path](#path)
* [time](#time)

### Properties

####  cloudCoverPercentage

• **cloudCoverPercentage**: *number*

___

####  crs

• **crs**: *string*

___

####  date

• **date**: *string*

___

####  id

• **id**: *string*

___

####  mbr

• **mbr**: *string*

___

####  path

• **path**: *string*

___

####  time

• **time**: *string*


<a name="interfacesrawgetfeaturerequestoptionsmd"></a>


## Interface: RawGetFeatureRequestOptions

### Hierarchy

* **RawGetFeatureRequestOptions**

### Index

#### Properties

* [BBOX](#optional-bbox)
* [FEATURE_OFFSET](#optional-feature_offset)
* [MAXFEATURES](#optional-maxfeatures)
* [OUTPUTFORMAT](#optional-outputformat)
* [SRSNAME](#optional-srsname)
* [TIME](#optional-time)
* [TYPENAMES](#optional-typenames)

### Properties

#### `Optional` BBOX

• **BBOX**? : *number[]*

___

#### `Optional` FEATURE_OFFSET

• **FEATURE_OFFSET**? : *number*

___

#### `Optional` MAXFEATURES

• **MAXFEATURES**? : *number*

___

#### `Optional` OUTPUTFORMAT

• **OUTPUTFORMAT**? : *string*

___

#### `Optional` SRSNAME

• **SRSNAME**? : *string*

___

#### `Optional` TIME

• **TIME**? : *string*

___

#### `Optional` TYPENAMES

• **TYPENAMES**? : *[TYPENAMES](#enumstypenamesmd)*

# Modules


<a name="modulescroppermd"></a>


## Module: Cropper

### Index

#### Functions

* [ClipBase64ImageFromPolygon](#clipbase64imagefrompolygon)
* [ClipImageFromPolygin](#clipimagefrompolygin)
* [getLagLngXY](#getlaglngxy)

### Functions

####  ClipBase64ImageFromPolygon

▸ **ClipBase64ImageFromPolygon**(`feature`: Feature‹Polygon›, `img`: string, `latLongXY`: [LagLngXY](#classeslaglngxymd)): *Promise‹object›*

**Parameters:**

Name | Type |
------ | ------ |
`feature` | Feature‹Polygon› |
`img` | string |
`latLongXY` | [LagLngXY](#classeslaglngxymd) |

**Returns:** *Promise‹object›*

___

####  ClipImageFromPolygin

▸ **ClipImageFromPolygin**(`image`: HTMLImageElement, `feature`: Feature‹Polygon›, `latLongXY`: [LagLngXY](#classeslaglngxymd)): *Promise‹object›*

**Parameters:**

Name | Type |
------ | ------ |
`image` | HTMLImageElement |
`feature` | Feature‹Polygon› |
`latLongXY` | [LagLngXY](#classeslaglngxymd) |

**Returns:** *Promise‹object›*

___

####  getLagLngXY

▸ **getLagLngXY**(`geoJson`: FeatureCollection‹Polygon›): *[LagLngXY](#classeslaglngxymd)[]*

**Parameters:**

Name | Type |
------ | ------ |
`geoJson` | FeatureCollection‹Polygon› |

**Returns:** *[LagLngXY](#classeslaglngxymd)[]*


<a name="modulesgetmapparametersmd"></a>


## Module: GetMapParameters

### Index

#### Enumerations

* [BgColor](#enumsgetmapparametersbgcolormd)
* [Exceptions](#enumsgetmapparametersexceptionsmd)
* [Format](#enumsgetmapparametersformatmd)
* [Sentinel_2](#enumsgetmapparameterssentinel_2md)


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

▸ **GetFeature**(`polygonList`: FeatureCollection‹Polygon› | Feature‹Polygon›, `uuid`: string, `options`: [GetFeaturesRequestOptions](#interfacesgetfeaturesrequestoptionsmd), `proxy`: RequestInfo, `requestOption?`: RequestInit): *Promise‹Response›*

**`description`** Used to create a Fetch based on the BBOX of the provided polygon(s)

 it can be created with a proxy URL

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`polygonList` | FeatureCollection‹Polygon› &#124; Feature‹Polygon› | - |
`uuid` | string | - |
`options` | [GetFeaturesRequestOptions](#interfacesgetfeaturesrequestoptionsmd) | for each option effect and more details: https://www.sentinel-hub.com/develop/api/ogc/standard-parameters/wfs/  |
`proxy` | RequestInfo | - |
`requestOption?` | RequestInit | - |

**Returns:** *Promise‹Response›*

___

####  GetFeatureAsync

▸ **GetFeatureAsync**(`polygonList`: FeatureCollection‹Polygon› | Feature‹Polygon›, `uuid`: string, `options`: [GetFeaturesRequestOptions](#interfacesgetfeaturesrequestoptionsmd), `proxy`: RequestInfo, `requestOption?`: RequestInit): *Observable‹Response›*

**`description`** Used to create a Fetch based on the BBOX of the provided polygon(s)
`RxJs Version`

 it can be created with a proxy URL

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`polygonList` | FeatureCollection‹Polygon› &#124; Feature‹Polygon› | - |
`uuid` | string | - |
`options` | [GetFeaturesRequestOptions](#interfacesgetfeaturesrequestoptionsmd) | for each option effect and more details: https://www.sentinel-hub.com/develop/api/ogc/standard-parameters/wfs/  |
`proxy` | RequestInfo | - |
`requestOption?` | RequestInit | - |

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

* [getMap](#getmap)
* [getShapeFromSentinel](#getshapefromsentinel)
* [getShapeFromSentinelAsync](#const-getshapefromsentinelasync)
* [getShapesFromSentinel](#getshapesfromsentinel)
* [getShapesFromSentinelAsync](#const-getshapesfromsentinelasync)
* [latLngToXYTool](#latlngtoxytool)

### Functions

####  getMap

▸ **getMap**(`uuid`: string, `bbox`: BBox, `options`: [getFromSentinelOptions](#getfromsentineloptions)): *Promise‹any›*

**`description`** used to get the sentinel's satellite image of a square

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`uuid` | string | "" |
`bbox` | BBox | - |
`options` | [getFromSentinelOptions](#getfromsentineloptions) | - |

**Returns:** *Promise‹any›*

___

####  getShapeFromSentinel

▸ **getShapeFromSentinel**(`feature`: Feature‹Polygon›, `uuid`: string, `options`: [getFromSentinelOptions](#getfromsentineloptions)): *Promise‹[ICroppedImage](#icroppedimage)›*

**`description`** used to get sentinel's satellite image of a polygon, with the image cropped for the polygon

**Parameters:**

Name | Type |
------ | ------ |
`feature` | Feature‹Polygon› |
`uuid` | string |
`options` | [getFromSentinelOptions](#getfromsentineloptions) |

**Returns:** *Promise‹[ICroppedImage](#icroppedimage)›*

___

#### `Const` getShapeFromSentinelAsync

▸ **getShapeFromSentinelAsync**(`feature`: Feature‹Polygon›, `uuid`: string, `options`: [getFromSentinelOptions](#getfromsentineloptions)): *Observable‹object›*

**Parameters:**

Name | Type |
------ | ------ |
`feature` | Feature‹Polygon› |
`uuid` | string |
`options` | [getFromSentinelOptions](#getfromsentineloptions) |

**Returns:** *Observable‹object›*

___

####  getShapesFromSentinel

▸ **getShapesFromSentinel**(`featureCollection`: FeatureCollection‹Polygon›, `uuid`: string, `options`: [getFromSentinelOptions](#getfromsentineloptions)): *Promise‹[ICroppedImage](#icroppedimage)[]›*

**`description`** used to get multiple sentinel's satellite image of a collection of polygons, with the image cropped for the polygon

**Parameters:**

Name | Type |
------ | ------ |
`featureCollection` | FeatureCollection‹Polygon› |
`uuid` | string |
`options` | [getFromSentinelOptions](#getfromsentineloptions) |

**Returns:** *Promise‹[ICroppedImage](#icroppedimage)[]›*

___

#### `Const` getShapesFromSentinelAsync

▸ **getShapesFromSentinelAsync**(`featureCollection`: FeatureCollection‹Polygon›, `uuid`: string, `options`: [getFromSentinelOptions](#getfromsentineloptions)): *Observable‹object›[]*

**Parameters:**

Name | Type |
------ | ------ |
`featureCollection` | FeatureCollection‹Polygon› |
`uuid` | string |
`options` | [getFromSentinelOptions](#getfromsentineloptions) |

**Returns:** *Observable‹object›[]*

___

####  latLngToXYTool

▸ **latLngToXYTool**(`geoJson`: FeatureCollection‹Polygon› | Feature‹Polygon›): *[LagLngXY](#classeslaglngxymd)‹›[]*

**Parameters:**

Name | Type |
------ | ------ |
`geoJson` | FeatureCollection‹Polygon› &#124; Feature‹Polygon› |

**Returns:** *[LagLngXY](#classeslaglngxymd)‹›[]*
