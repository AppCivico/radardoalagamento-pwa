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
  mounted() {
    const tutorial = localStorage.getItem('rdalgtut');
    if (tutorial === 'done') {
      this.status = 'hide';
      this.$router.push('/alerts')
    } else {
      localStorage.setItem('rdalgtut', 'done');
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
      setTimeout(() => {
        this.$router.push('districts');
      }, 500);
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

