<template>
  <main>
    <Header />
    <section id="new-alert">
      <h2>Enviar novo alerta</h2>
      <form @submit.prevent="submitForm('new')" v-if="userType === 'registered'">
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
  },
  methods: {
    checkUser() {
      if (localStorage.getItem('rdalgus') !== null) {
        this.userType = 'registered';
      }
    },
    useGeolocation() {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((location) => {
          console.log('location', location);
          this.lat = location.coords.latitude;
          this.lng = location.coords.longitude;
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
      console.log('data', data);
      const validation = this.validate(data);
      if (validation.status) {
        console.log('data 2', data);
        this.$store.dispatch('NEW_ALERT', data)
          .then(() => {
            swal('Alerta enviado com sucesso!');
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
</style>

