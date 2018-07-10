<template>
  <header id="header">
    <h2>{{ this.$route.name }}</h2>
  </header>
</template>

<script>
export default {
  name: 'Header',
}
</script>

<style lang="scss">
#header {
  padding: $gutter * 1.5 $gutter;
  background-color: $color_blue;
  text-align: left;
}
#header h2 {
  font-size: 2.2em;
  font-weight: 400;
  color: $color_white;
}
</style>


