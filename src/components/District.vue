<template>
  <li>
    <div class="district__checkbox">
      <input type="checkbox" v-model="checkbox" :id="`district__${district.id}`" name="district__checkbox" @change="handleCheckbox">
      <span></span>
    </div>
    <label :for="`district__${district.id}`">{{ district.name }}</label>
  </li>
</template>

<script>
export default {
  name: 'District',
  props: {
    district: Object,
  },
  data() {
    return {
      checkbox: false,
    };
  },
  methods: {
    handleCheckbox() {
      if (this.checkbox) {
        this.$emit('add-district', this.district.id);
      } else {
        this.$emit('remove-district', this.district.id);
      }
    },
  }
}
</script>

<style lang="scss">
.districts li {
  float: left;
  width: 50%;
  text-align: left;
  margin-bottom: $gutter / 2;
}
.districts .district__checkbox {
  position: relative;
  width: 20px;
  height: 20px;
  display: inline-block;
  vertical-align: middle;
  margin-right: $gutter / 3;
}
.districts .district__checkbox span {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('../assets/images/checkbox.png');
  background-size: 100% auto;
  z-index: 1;
}
.districts .district__checkbox input[type=checkbox] {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  opacity: 0;
  margin-right: $gutter / 3;

  &:checked + span {
    background-image: url('../assets/images/checkbox-on.png');
  }
}
.districts label {
  font-size: 1.4em;
}
</style>

