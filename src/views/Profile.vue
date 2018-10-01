<template>
  <main>
    <Header :edit="true" @edit="submitForm('edit')" v-if="userType === 'registered'"/>
    <section id="profile">
      <h2>Um breve cadastro para não perder seus alertas!</h2>
      <form @submit.prevent="submitForm('new')">
        <label for="name">
          <input type="text" v-model="name" name="name" placeholder="Nome">
        </label>
        <label for="surname">
          <input type="text" v-model="surname" name="surname" placeholder="Sobrenome">
        </label>
        <label for="email">
          <input type="email" v-model="email" name="email" placeholder="E-mail">
        </label>
        <label for="phone_number">
          <input type="phone_number" v-model="phone_number" name="phone_number" placeholder="(11) 9.9999-8888" v-mask="['(##) ####-####', '(##) #####-####']">
        </label>
        <button type="submit" v-show="userType !== 'registered'">Enviar</button>
      </form>
    </section>
    <Footer />
  </main>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { mask } from 'vue-the-mask';
import swal from 'sweetalert';

export default {
  name: 'Profile',
  directives: {
    mask,
  },
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      userType: '',
      name: '',
      surname: '',
      email: '',
      phone_number: '',
      loading: false,
    };
  },
  computed: {
    selectedDistricts() {
      return this.$store.state.selectedDistricts;
    },
    user() {
      return this.$store.state.user.user;
    },
  },
  mounted() {
    this.checkUser();
    setTimeout(() => {
      if (this.userType === 'registered') {
        this.name = this.user.name;
        this.surname = this.user.surname;
        this.email = this.user.email;
        this.phone_number = this.user.phone_number.replace('+55', '');
      }
      if (this.selectedDistricts.length <= 0) {
        swal('Antes de se cadastrar você precisa selecionar os distritos que quer seguir ;)')
        this.$router.push('/districts');
      }
    }, 100);
  },
  methods: {
    checkUser() {
      if (localStorage.getItem('rdalgus') !== null) {
        this.userType = 'registered';
      }
    },
    submitForm(type) {
      this.toggleLoading();
      const data = {
        name: this.name,
        surname: this.surname,
        email: this.email,
        phone_number: this.phone_number,
      }
      const validation = this.validate(data);
      if (validation.status) {
        data.password = '123segredo$$';
        data.password_confirmation = '123segredo$$';
        data.phone_number = this.formatPhone(this.phone_number);

        const user = {
          user: data,
          districts: this.selectedDistricts,
        }

        if (type === 'new') {
          this.$store.dispatch('REGISTER_USER', user)
            .then(() => {
              this.$router.push('/alerts');
            })
            .catch((err) => {
              console.log(err.error);
              swal('Ocorreu um erro durante seu cadastro, tente novamente.');
            });
        } else if (type === 'edit') {
          this.$store.dispatch('EDIT_USER', user)
            .then(() => {
              swal('Cadastro alterado com sucesso!');
            })
            .catch(() => {
              swal('Ocorreu um erro durante sua edição, tente novamente.');
            });
        }
      } else {
        this.toggleLoading();
        swal('Ops! Todos os campos são obrigatórios.');
      }
    },
    formatPhone(phone) {
      const cleanPhone = phone
			.trim()
			.replace(/\W+/g, '')
      .replace(/\D+/g, '');
      return `+55${cleanPhone}`;
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
#profile {
  background-image: url('../assets/images/elements_bg.png');
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: center 10px;
  padding: 50% $gutter * 1.5 0;
}
#profile h2 {
  font-size: 2.7em;
  font-weight: 400;
  margin-bottom: $gutter;
}
#profile label {
  position: relative;
  width: 100%;
  display: block;
  background-repeat: no-repeat;
  background-size: auto 30px;
  background-position: 0 10px;
  min-height: 30px;
  padding-left: $gutter * 3;
  margin-bottom: $gutter * 2;

  &[for="name"],
  &[for="surname"] {
    background-image: url('../assets/images/person.png');
  }
  &[for="email"] {
    background-image: url('../assets/images/email.png');
  }
  &[for="phone_number"] {
    background-image: url('../assets/images/call.png');
  }
}
#profile input {
  width: 100%;
  display: block;
  font-size: 2em;
  font-family: inherit;
  background: transparent;
  border: 0;
  border-bottom: 2px solid $color_gray;
  padding: $gutter / 2 0;

  &:focus {
    border-bottom: 2px solid $color_blue;
    outline: 0;
  }
}
#profile button {
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
</style>

