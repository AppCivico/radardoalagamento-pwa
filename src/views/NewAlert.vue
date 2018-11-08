<template>
  <main>
    <Header />
    <section id="new-alert">
      <h2>Enviar novo alerta</h2>
      <form @submit.prevent="submitForm('new')" v-if="userType === 'registered'">
        <input type="text" id="searchTextField" placeholder="Localização">
        <div id="map" class="new-alert__map"></div>
        <label for="description">
          <input type="text" v-model="description" name="description" placeholder="Descrição">
          <span class="new-alert__helper">Essa será a mensagem exibida na notificação, prefira mensagens curtas e objetivas.</span>
        </label>
        <label for="level">
          <select name="level" id="level" v-model="level">
            <option v-for="(value, key) in levels" :key="key" :value="key">{{ value }}</option>
          </select>
          <span class="new-alert__helper">Selecione a gravidade do alerta.</span>
        </label>
        <button type="submit">Enviar</button>
      </form>
      <h2 v-else>Você precisa se cadastrar para enviar alertas</h2>
    </section>
    <Footer />
  </main>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import swal from 'sweetalert';

export default {
  name: 'NewAlert',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      userType: '',
      level: '',
      description: '',
      loading: false,
      levels: {
        attention: 'Atenção',
        alert: 'Alerta',
        emergency: 'Emergência',
        overflow: 'Enchente'
      },
      lat: '',
      lng: '',
      map: {},
      autocomplete: {},
      marker: {},
    };
  },
  mounted() {
    this.checkUser();
    if (this.userType = 'registered') {
      swal({
        text: 'Gostaria de usar sua localização atual para enviar a notificação?',
        buttons: ['NÃO', 'OK'],
      })
      .then((val) => {
        if (val !== null) {
          this.useGeolocation();
        }
      });
    }
    this.initMap();
  },
  methods: {
    initMap() {
      const position = { lat: -23.576159600000004, lng: -46.646406899999995 };
      this.$nextTick(() => {
        this.map = new google.maps.Map(document.getElementById('map'), {
          center: position,
          zoom: 10,
        });
        this.marker = new google.maps.Marker({position, map: this.map});
        this.initAutocomplete();
      });
    },
    initAutocomplete() {
      var defaultBounds = new google.maps.LatLngBounds(new google.maps.LatLng(-23.576159600000004, -46.646406899999995));

      var input = document.getElementById('searchTextField');
      var options = {
        bounds: defaultBounds,
        types: ['geocode'],
      };

      this.autocomplete = new google.maps.places.Autocomplete(input, options);
      this.autocomplete.addListener('place_changed', this.updateMap);
    },
    updateMap() {
      var place = this.autocomplete.getPlace();
      if (place.geometry) {
        this.lat = place.geometry.location.lat();
        this.lng = place.geometry.location.lng();
        this.map.panTo(place.geometry.location);
        this.map.setZoom(15);
        this.marker = new google.maps.Marker({position: place.geometry.location, map: this.map});
      } else {
        swal('Localização não encontrada');
      }
    },
    checkUser() {
      if (localStorage.getItem('rdalgus') !== null) {
        this.userType = 'registered';
      }
    },
    useGeolocation() {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((location) => {
          this.lat = location.coords.latitude;
          this.lng = location.coords.longitude;
          var position = {
            lat: location.coords.latitude,
            lng: location.coords.longitude,
          };

          this.map.setCenter(position);
          this.marker.setPosition(position);
        });
      } else {
        swal('Ops! Seu navegador não suporta geolocalização, utilize o mapa');
      }
    },
    submitForm() {
      this.toggleLoading();
      const data = {
        description: this.description,
        level: this.level,
        lng: this.lng,
        lat: this.lat,
      }
      const validation = this.validate(data);
      if (validation.status) {
        this.$store.dispatch('NEW_ALERT', data)
          .then(() => {
            swal('Alerta enviado com sucesso!');
          })
          .then(() => {
            this.$router.push('alerts');
            this.$router.push({ name: 'Alertas', query: { type: 'city' } });
          })
          .catch(() => {
            swal('Ocorreu um erro durante o envio, tente novamente.');
          });
      } else {
        this.toggleLoading();
        swal('Ops! Todos os campos são obrigatórios.');
      }
    },
    validate (data) {
      const validation = {
        status: false,
        errors: {}
      }

      Object.keys(data).map((item) => {
        if (data[item] === '') {
          validation.errors[item] = 'Campo obrigatório'
        }
        if (Array.isArray(data[item]) && data[item].length < 1) {
          validation.errors[item] = 'Campo obrigatório'
        }
      })

      if (Object.keys(validation.errors).length < 1) {
        validation.status = true
      }

      return validation
    },
    toggleLoading() {
      this.loading = !this.loading;
    },
  },
};
</script>

<style lang="scss">
#new-alert{
  background-image: url('../assets/images/elements_bg.png');
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: bottom center;
  padding: $gutter $gutter * 1.5 50%;
}
#new-alert h2 {
  font-size: 2.2em;
  font-weight: 400;
  margin-bottom: $gutter;
}
#new-alert label {
  position: relative;
  width: 100%;
  display: block;
  background-repeat: no-repeat;
  background-size: auto 30px;
  background-position: 0 10px;
  min-height: 30px;
  margin-bottom: $gutter;
}
#new-alert input,
#new-alert select {
  width: 100%;
  display: block;
  font-size: 2em;
  font-family: inherit;
  background: transparent;
  border: 0;
  border-bottom: 2px solid $color_gray;
  border-radius: 0;
  padding: $gutter / 2 0;

  &:focus {
    border-bottom: 2px solid $color_blue;
    outline: 0;
  }
}
#new-alert button {
  width: 100%;
  background-color: $color_blueDark;
  font-size: 2.2em;
  font-weight: 300;
  color: $color_white;
  letter-spacing: 0.1em;
  border: 0;
  border-radius: 4px;
  cursor: pointer;
  padding: $gutter / 2 0;
}
.new-alert__helper {
  text-align: left;
  font-size: 1.2em;
  display: block;
  margin-top: $gutter / 4;
}
.new-alert__map {
  width: 100%;
  height: 200px;
  margin: $gutter 0;
}
</style>

