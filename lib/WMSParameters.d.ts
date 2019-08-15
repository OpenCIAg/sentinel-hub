export declare module WMSParameters {
    enum Format {
        image_png = "image/png",
        image_jpeg = "image/jpeg",
        image_tiff_8 = "image/tiff;depth=8",
        image_tiff_16 = "image/tiff;depth=16",
        image_tiff_32f = "image/tiff;depth=32f"
    }
    enum BgColor {
        FFFFFF = "FFFFFF",
        xRRGGBB = "0xRRGGBB",
        xAARRGGBB = "0xAARRGGBB",
        _RRGGBB = "#RRGGBB",
        _AARRGGBB = "#AARRGGBB",
        RRGGBB = "RRGGBB",
        AARRGGBB = "AARRGGBB"
    }
    enum Sentinel_2 {
        True_color = "TRUE_COLOR",
        False_color = "FALSE_COLOR",
        False_color_urban = "FALSE_COLOR_URBAN",
        NDVI = "NDVI",
        Moisture_index = "MOISTURE_INDEX",
        SWIR = "SWIR",
        NDWI = "NDWI",
        NDSI = "NDSI"
    }
    enum Exceptions {
        XML = "XML",
        INIMAGE = "INIMAGE",
        BLANK = "BLANK"
    }
}
