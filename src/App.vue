<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  beforeMount() {
    const OneSignal = window.OneSignal || [];

    OneSignal.push(() => {
      OneSignal.on('subscriptionChange', (isSubscribed) => {
        OneSignal.push(() => {
          OneSignal.getUserId((userId) => {
            this.$store.commit('SET_ONESIGNAL_USER_ID', userId);
          });
        });
      });

      OneSignal.init({
        appId: '7945e8d5-d196-43af-bca1-b3d0b6224b96',
        // appId: '926039b6-92fb-4516-8bed-bbe89166861e',
        allowLocalhostAsSecureOrigin: true,
        autoRegister: false,
        welcomeNotification: {
          disable: true,
        },
        promptOptions: {
          /* actionMessage limited to 90 characters */
          actionMessage: 'Gostaria de ativar as notificações do Radar do Alagamento?',
          /* acceptButtonText limited to 15 characters */
          acceptButtonText: 'Sim',
          /* cancelButtonText limited to 15 characters */
          cancelButtonText: 'Não'
        },
      }).then(() => {
        OneSignal.showHttpPrompt()
      })
    });
  },

  mounted() {
    const apiKey = localStorage.getItem('rdalgapk');
    const user = localStorage.getItem('rdalgus');
    if (apiKey) {
      this.$store.commit('SET_APIKEY', { res: apiKey });
    }
    if (user) {
      const parsedUser = JSON.parse(user);
      this.$store.commit('SET_USER', { res: parsedUser });
      this.$store.commit('SET_SELECTED_DISTRICTS', { payload: parsedUser.districts });
    }
  },
};
</script>


<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  height: 100%;
}

button {
  outline: 0;
}

body {
  background: $color_grayLight;
  height: 100%;
  font-size: 62.5%;
}

img {
  max-width: 100%;
  height: auto;
}

#app {
  position: relative;
  font-family: 'Raleway', sans-serif;
  text-align: center;
  color: $color_gray;
  margin: 0 auto;
  background: $color_white;
  max-width: 768px;
  min-height: 100%;
  overflow: hidden;
}

main {
  padding-bottom: 76px;
}

.swal-modal {
  font-family: 'Raleway', sans-serif;
  color: $color_gray;
}
.swal-button {
  background-color: $color_blue;

  &:active {
    background-color: $color_blue;
  }
}
.swal-button--cancel {
  color: $color_white;
}
</style>

