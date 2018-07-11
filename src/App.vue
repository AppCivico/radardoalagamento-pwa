<template>
  <div id="app">
    <router-view/>
  </div>
</template>

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
</style>
