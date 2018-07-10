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
  background: $grayLight;
  height: 100%;
  font-size: 62.5%;
}

img {
  max-width: 100%;
  height: auto;
}

#app {
  position: relative;
  font-family: 'Roboto Slab', serif;
  text-align: center;
  color:$black;
  margin: 0 auto;
  background: $white;
  max-width: 768px;
  min-height: 100%;
  overflow: hidden;
}
</style>
