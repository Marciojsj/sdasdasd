const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add SCSS support
config.resolver.sourceExts.push('scss', 'sass');

module.exports = config;
