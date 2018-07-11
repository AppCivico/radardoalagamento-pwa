<template>
  <main>
    <Header :check="true" @check="saveDistricts"/>
    <section id="districts">
      <div
        :class="`zone ${selectedZone === index ? 'open' : ''}`"
        v-for="(zone, index) in zones"
        :key="zone.id"
        :style="{ backgroundColor: colors[index]}"
      >
        <header class="zone__header" @click="toggleZone(index)">
          <div class="zone__header__image">
            <img v-if="zone.name" :src="require(`@/assets/images/zona-${zone.name.toLowerCase()}.png`)" :alt="`Mapa da zona ${zone.name}`">
          </div>
          <h3>
            {{ zone.name !== 'Centro' ? 'Zona ' : '' }}{{ zone.name }}
            <br>
            <span v-show="selectedZone !== index">{{ zone.districts.length }} distritos</span>
          </h3>
        </header>
        <div class="districts">
          <ul>
            <District
              v-for="district in zone.districts"
              :district="district"
              :selected="selectedDistricts.findIndex(item => item === district.id)"
              :key="district.id"
              @add-district="addDistrict"
              @remove-district="removeDistrict"
            />
            <li>
              <div class="district__checkbox">
                <input type="checkbox" :id="`districtAll__${zone.id}`" name="districtAll__checkbox" @change="toggleAll($event, zone.districts)">
                <span></span>
              </div>
              <label :for="`districtAll__${zone.id}`">Seguir todos</label>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <Footer />
  </main>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import District from '@/components/District';
import swal from 'sweetalert';

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
      selectedZone: null,
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
    toggleZone(i) {
      if (this.selectedZone === i) {
        this.selectedZone = null;
      } else {
        this.selectedZone = i;
      }
    },
    toggleAll(event, districts) {
      if (event.target.checked) {
        districts.map(item => {
          if (this.selectedDistricts.findIndex(a => a === item.id) === -1) {
            this.addDistrict(item.id);
          }
        });
      } else {
        districts.map(item => {
          this.removeDistrict(item.id);
        });
      }
    },
    saveDistricts() {
      if (this.selectedDistricts.length > 0) {
        this.$store.commit('SET_SELECTED_DISTRICTS', { payload: this.selectedDistricts });
        this.$router.push('/profile');
      } else {
        swal('Ops, você não selecionou nenhum distrito.');
      }
    }
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

