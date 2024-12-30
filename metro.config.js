const { getDefaultConfig } = require('@expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // Do not disable CSS support when using Tailwind.
  isCSSEnabled: true,
});

module.exports = config;
