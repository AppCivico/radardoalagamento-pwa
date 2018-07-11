<template>
  <header id="header">
    <a v-if="back" href="#" class="header__back" @click.prevent="$emit('back')">Voltar</a>
    <h2>{{ this.$route.name }}</h2>
    <a v-if="check" href="#" class="header__check" @click.prevent="$emit('check')">Confirmar</a>
    <a v-if="edit" href="#" class="header__edit" @click.prevent="$emit('edit')">Editar</a>
    <a v-if="refresh" href="#" class="header__refresh" @click.prevent="$emit('refresh')">Recarregar</a>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    check: Boolean,
    edit: Boolean,
    back: Boolean,
    refresh: Boolean,
  }
}
</script>

<style lang="scss">
#header {
  overflow: hidden;
  padding: $gutter * 1.5 $gutter * 2;
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
.header__edit {
  display: block;
  float: right;
  font-size: 0;
  background-image: url('../assets/images/edit.png');
  background-repeat: no-repeat;
  background-size: 100% auto;
  width: 30px;
  height: 30px;
}
.header__back {
  display: block;
  float: left;
  font-size: 0;
  background-image: url('../assets/images/back-icon.png');
  background-repeat: no-repeat;
  background-size: 100% auto;
  width: 25px;
  height: 25px;
  margin-right: $gutter;
}
.header__refresh {
  display: block;
  float: right;
  font-size: 0;
  background-image: url('../assets/images/refresh_icon.png');
  background-repeat: no-repeat;
  background-size: 100% auto;
  width: 30px;
  height: 30px;
}
</style>


