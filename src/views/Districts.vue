<template>
  <main>
    <Header />
    <section id="districts">
      <div
        class="zone"
        v-for="(zone, index) in zones"
        :key="zone.id"
        :style="{ backgroundColor: colors[index]}"
      >
        <header class="zone__header">
          <div class="zone__header__image">
            <img v-if="zone.name" :src="require(`@/assets/images/zona-${zone.name.toLowerCase()}.png`)" :alt="`Mapa da zona ${zone.name}`">
          </div>
          <h3>{{ zone.name !== 'Centro' ? 'Zona ' : '' }}{{ zone.name }}</span></h3>
        </header>
        <ul class="districts">
          <District
            v-for="district in zone.districts"
            :district="district"
            :key="district.id"
            @add-district="addDistrict"
            @remove-district="removeDistrict"
          />
        </ul>
      </div>
    </section>
    <Footer />
  </main>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import District from '@/components/District';

export default {
  name: 'Districts',
  components: {
    Header,
    Footer,
    District,
  },
  mounted() {
    this.$store.dispatch('GET_ZONES');
  },
  computed: {
    zones() {
      return this.$store.state.zones.reverse();
    },
  },
  data() {
    return {
      selectedDistricts: [],
      colors: ['#93dcdf', '#48ced8', '#10a1ba', '#0f718d', '#004e70'],

    };
  },
  methods: {
    addDistrict(id) {
      this.selectedDistricts.push(id);
    },
    removeDistrict(id) {
      const index = this.selectedDistricts.findIndex(item => item === id);
			this.selectedDistricts.splice(index, 1);
    },
  }
}
</script>

<style lang="scss">
.zone {
  color: $color_white;
}
.zone__header {
  display: table;
  width: 100%;
  padding: $gutter;
  text-align: left;
}
.zone__header .zone__header__image {
  float: left;
  width: 30%;
  margin-right: $gutter;
}
.zone__header  img {
  max-width: 100%;
  height: auto;
}
.districts ul {
  display: table;
  width: 100%;
  list-style: none;
}
.districts li {
  float: left;
  width: 50%;
  text-align: left;
}
</style>

