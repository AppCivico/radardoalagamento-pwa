<template>
  <li>
    <input type="checkbox" v-model="checkbox" name="checkbox" @change="handleCheckbox">
    {{ district.name }}
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
