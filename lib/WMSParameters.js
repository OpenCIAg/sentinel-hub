"use strict";
var WMSParameters;
(function (WMSParameters) {
    let Format;
    (function (Format) {
        Format["image_png"] = "image/png";
        Format["image_jpeg"] = "image/jpeg";
        Format["image_tiff_8"] = "image/tiff;depth=8";
        Format["image_tiff_16"] = "image/tiff;depth=16";
        Format["image_tiff_32f"] = "image/tiff;depth=32f";
    })(Format = WMSParameters.Format || (WMSParameters.Format = {}));
    let BgColor;
    (function (BgColor) {
        BgColor["FFFFFF"] = "FFFFFF";
        BgColor["xRRGGBB"] = "0xRRGGBB";
        BgColor["xAARRGGBB"] = "0xAARRGGBB";
        BgColor["_RRGGBB"] = "#RRGGBB";
        BgColor["_AARRGGBB"] = "#AARRGGBB";
        BgColor["RRGGBB"] = "RRGGBB";
        BgColor["AARRGGBB"] = "AARRGGBB";
    })(BgColor = WMSParameters.BgColor || (WMSParameters.BgColor = {}));
    let Sentinel_2;
    (function (Sentinel_2) {
        Sentinel_2["True_color"] = "TRUE_COLOR";
        Sentinel_2["False_color"] = "FALSE_COLOR";
        Sentinel_2["False_color_urban"] = "FALSE_COLOR_URBAN";
        Sentinel_2["NDVI"] = "NDVI";
        Sentinel_2["Moisture_index"] = "MOISTURE_INDEX";
        Sentinel_2["SWIR"] = "SWIR";
        Sentinel_2["NDWI"] = "NDWI";
        Sentinel_2["NDSI"] = "NDSI";
    })(Sentinel_2 = WMSParameters.Sentinel_2 || (WMSParameters.Sentinel_2 = {}));
    let Exceptions;
    (function (Exceptions) {
        Exceptions["XML"] = "XML";
        Exceptions["INIMAGE"] = "INIMAGE";
        Exceptions["BLANK"] = "BLANK";
    })(Exceptions = WMSParameters.Exceptions || (WMSParameters.Exceptions = {}));
})(WMSParameters || (WMSParameters = {}));
