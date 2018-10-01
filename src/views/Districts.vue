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
    this.checkUser();
    setTimeout(() => {
      if (this.userType === 'registered') {
        this.selectedDistricts = this.alreadySelected;
      }
    }, 100);
  },
  computed: {
    zones() {
      return this.$store.state.zones.reverse();
    },
    alreadySelected() {
      return this.$store.state.selectedDistricts;
    },
  },
  data() {
    return {
      selectedDistricts: [],
      colors: ['#daf2f2', '#c5e9ea', '#a9dbdf', '#7ecdd8', '#599fb9'],
      selectedZone: null,
      userType: '',
    };
  },
  methods: {
    checkUser() {
      if (localStorage.getItem('rdalgus') !== null) {
        this.userType = 'registered';
      }
    },
    addDistrict(id) {
      this.selectedDistricts.push(id);
      if (this.userType === 'registered') {
        this.updateUser('follow', id);
      }
    },
    removeDistrict(id) {
      const index = this.selectedDistricts.findIndex(item => item === id);
      this.selectedDistricts.splice(index, 1);
      if (this.userType === 'registered') {
        this.updateUser('unfollow', id);
      }
    },
    updateUser(action, id) {
      const payload = { action, id };
      this.$store.dispatch('UPDATE_DISTRICTS', payload);
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
        swal('Ops! você não selecionou nenhum distrito.');
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
  color: $color_blackLight;
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
  color: $color_blackLight;
  transition: max-height 500ms;
}
.districts ul{
  display: table;
  width: 100%;
  list-style: none;
  padding: 0 $gutter $gutter;
}
</style>

