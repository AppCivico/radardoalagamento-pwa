<template>
  <div class="home">
    <Tutorial :status="status" @skip="hideLauchScreen"/>
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
  data() {
    return {
      status: 'show',
    }
  },
  beforeRouteEnter (to, from, next) {
    if (from.name !== null) {
      next((vm) => {
        console.log('this1', this);

        this.status = 'show';
      });
      return;
    } else {
      next((vm) => {
        console.log('this2', this);
        if (window.matchMedia('(display-mode: standalone)').matches) {
          this.status = 'hide';
        } else {
          this.status = 'show';
        }
      });
    }
  },
  methods: {
    hideLauchScreen() {
      this.status = 'hide';
    },
  }
};
</script>

<style>
.home {
  position: absolute;
  height: 100%;
}
</style>

