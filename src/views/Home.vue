<template>
  <div class="home">
    <Tutorial />
  </div>
</template>

<script>
// @ is an alias to /src
import Tutorial from '@/components/Tutorial.vue';

export default {
  name: 'home',
  components: {
    Tutorial,
  },
};
</script>
