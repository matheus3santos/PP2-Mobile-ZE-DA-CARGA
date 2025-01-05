module.exports = (api) => {
  api.cache(true);
  return {
    presets: [['babel-preset-expo', { jsxRuntime: 'automatic' }]],
    plugins: [
      [
        '@tamagui/babel-plugin',
        {
          components: ['tamagui'],
          config: './tamagui.config.ts',
          logTimings: true,
          disableExtraction: process.env.NODE_ENV === 'development',
        },
      ],

      // Plugin do react-native-dotenv
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          blocklist: null,
          allowlist: null,
          safe: false,
          allowUndefined: true,
        },
      ],

      // Plugin necessário para o Reanimated
      'react-native-reanimated/plugin',
    ],
  };
};
