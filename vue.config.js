const fs = require('fs');

module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        data: fs.readFileSync('src/styles/index.scss', 'utf-8'),
      },
    },
  },
  pwa: {
    name: 'Radar do Alagamento',
    themeColor: '#28cfce',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'no',
    workboxOptions: {
      include: [/\.html$/, /\.js$/, /\.css$/, /\.svg$/, /\.png$/, /\.jpg$/],
      runtimeCaching: [
        {
          urlPattern: new RegExp('^https://dtupa.eokoe.com/'),
          handler: 'networkFirst',
        },
        {
          urlPattern: /\.svg$/,
          handler: 'networkFirst',
        },
      ],
    },
  },
};
