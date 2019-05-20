# radardoalagamento-pwa
- Install packages with:
 `yarn`

- For development server `npm run serve`

- For production build: `yarn build`, this will generate a `dist` folder ready for being served using any http server.

# Usual adjustments:
- You need to set your own google maps api key, you can find it on `public/index.html` line `16`. [How to get a google maps api key?](https://developers.google.com/maps/documentation/javascript/get-api-key)
- You need to set your own OneSignal appId, you can find it at `src/App.vue` on line `23`. [OneSignal web push quickstart](https://documentation.onesignal.com/docs/web-push-quickstart)
