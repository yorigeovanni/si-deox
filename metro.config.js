const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);
console.log(config.resolver.assetExts);
config.resolver.assetExts = [...config.resolver.assetExts, "html", "json", "retool", "retool-css"];
config.resolver.sourceExts = [...config.resolver.sourceExts, "html"];

module.exports = withNativeWind(config, { input: "./global.css" });