<template>
  <header id="header">
    <h2>{{ this.$route.name }}</h2>
    <a v-if="check" href="#" class="header__check" @click.prevent="$emit('check')">check</a>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    check: Boolean,
  }
}
</script>

<style lang="scss">
#header {
  overflow: hidden;
  padding: $gutter * 1.5 $gutter;
  background-color: $color_blue;
  text-align: left;
}
#header h2 {
  font-size: 2.2em;
  font-weight: 400;
  color: $color_white;
  float: left;
}
.header__check {
  display: block;
  float: right;
  font-size: 0;
  background-image: url('../assets/images/done.png');
  background-repeat: no-repeat;
  background-size: 100% auto;
  width: 30px;
  height: 23px;
  margin-top: 3px;
}
</style>


