<template>
  <main>
    <Header />
    <section id="alerts">
    </section>
    <Footer />
  </main>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import swal from 'sweetalert';

export default {
  name: 'Districts',
  components: {
    Header,
    Footer,
  },
  mounted() {
    //this.$store.dispatch('GET_ALERTS', 'all');
    this.checkUser();
  },
  data() {
    return {
      userType: '',
    };
  },
  methods: {
    checkUser() {
      if (localStorage.getItem('rdalgus') !== null) {
        this.userType = 'registered';
      }
    },
  }
}
</script>

<style lang="scss">
.zone {
  color: $color_white;

  &.open {
    .districts {
      max-height: 1000px;
    }
    .zone__header {
      text-align: center;

      .zone__header__image {
        float: none;
        width: 30%;
        margin: 0 auto;
      }
      h3 {
        position: relative;
        transform: none;
        left: auto;
        top: auto;
      }
    }
  }
}
.zone__header {
  position: relative;
  display: table;
  width: 100%;
  padding: $gutter;
  text-align: left;
}
.zone__header .zone__header__image {
  float: left;
  width: 20%;
  margin-right: $gutter;
}
.zone__header img {
  max-width: 100%;
  height: auto;
}
.zone__header h3 {
  position: absolute;
  left: 30%;
  top: 50%;
  transform: translate(0, -50%);
  font-size: 2em;
  font-weight: 400;
}
.zone__header h3 span {
  display: block;
  font-size: 0.9em;
  font-weight: 300;
}
.districts {
  max-height: 0;
  overflow: hidden;
  transition: max-height 500ms;
}
.districts ul{
  display: table;
  width: 100%;
  list-style: none;
  padding: 0 $gutter $gutter;
}
</style>

