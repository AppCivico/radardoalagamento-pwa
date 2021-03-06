/* eslint-disable no-console */

import { register } from 'register-service-worker';

let swRegistration = '';

function initialiseUI() {
  console.log('tentativa se push manager');
  swRegistration.pushManager.getSubscription().then((subscription) => {
    console.log('sub', subscription);
  });
}

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready(swReg) {
      console.log('App is being served from cache by a service worker.\n' +
          'For more details, visit https://goo.gl/AFskqB');
      swRegistration = swReg;
      initialiseUI();
    },
    cached() {
      console.log('Content has been cached for offline use.');
    },
    updated() {
      console.log('New content is available; please refresh.');
    },
    offline() {
      console.log('No internet connection found. App is running in offline mode.');
    },
    error(error) {
      console.error('Error during service worker registration:', error);
    },
  });
}
