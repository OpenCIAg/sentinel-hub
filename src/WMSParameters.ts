// tslint:disable-next-line: no-namespace
export namespace WMSParameters {
    export enum Format {
        image_png = "image/png",
        image_jpeg = "image/jpeg",
        image_tiff_8 = "image/tiff;depth=8",
        image_tiff_16 = "image/tiff;depth=16",
        image_tiff_32f = "image/tiff;depth=32f",
    }
    export enum BgColor {
        FFFFFF = "FFFFFF",
        xRRGGBB = "0xRRGGBB",
        xAARRGGBB = "0xAARRGGBB",
        _RRGGBB = "#RRGGBB",
        _AARRGGBB = "#AARRGGBB",
        RRGGBB = "RRGGBB",
        AARRGGBB = "AARRGGBB",
    }
    export enum Sentinel_2 {
        NDVI="NDVI",
        FALSE_COLOR="FALSE_COLOR",
        FALSE_COLOR_URBAN="FALSE_COLOR_URBAN",
        AGRICULTURE = "AGRICULTURE",
        BATHYMETRIC = "BATHYMETRIC",
        GEOLOGY = "GEOLOGY",
        MOISTURE_INDEX = "MOISTURE_INDEX",
        SWIR="SWIR",
        TRUE_COLOR="TRUE_COLOR"
    }
    export enum Exceptions {
        XML = "XML",
        INIMAGE = "INIMAGE",
        BLANK = "BLANK",
    }
}
