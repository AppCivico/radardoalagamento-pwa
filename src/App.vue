<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
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

    const OneSignal = window.OneSignal || [];
    OneSignal.push(() => {
      OneSignal.on('subscriptionChange', (isSubscribed) => {
        console.log('The users subscription state is now:', isSubscribed);
        OneSignal.push(() => {
          OneSignal.getUserId((userId) => {
            console.log('OneSignal User ID:', userId);
          });
        });
      });

      OneSignal.init({
        appId: '7945e8d5-d196-43af-bca1-b3d0b6224b96',
      });
    });
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

