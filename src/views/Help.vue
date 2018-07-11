<template>
  <main>
    <Header :back="true" @back="goBack"/>
    <section id="options">
      <nav>
        <ul class="options__menu options__menu-clean">
          <li><router-link to="/terms">Termos de Serviço</router-link></li>
          <li><router-link to="/privacy">Política de Privacidade</router-link></li>
          <li><a href="#" @click.prevent="reportProblem">Reportar problema</a></li>
          <li><a href="#" @click.prevent="showAbout">Sobre</a></li>
        </ul>
      </nav>
    </section>
    <Footer />
  </main>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import swal from 'sweetalert';

export default {
  name: 'Help',
  components: {
    Header,
    Footer,
  },
  methods: {
    reportProblem() {
      swal({
        title: 'Reportar problema',
        content: 'input',
        buttons: ['CANCELAR', 'OK'],
      })
      .then((val) => {
        if (val !== null && val !== '') {
          const data = {
            payload: val,
          };
          this.$store.dispatch('REPORT_PROBLEM', data)
            .then(() => {
              swal('Mensagem enviada com sucesso!');
            })
            .catch(() => {
              swal('Ocorreu um erro ao enviar sua mensagem, tente novamente');
            });
        } else if (val === ''){
          swal('Campo obrigatório');
        }
      });
    },
    showAbout() {
      swal({
        title: 'Sobre',
        text: `Versão 2.32
        Desenvolvido por AppCívico`,
      });
    },
    goBack() {
      this.$router.push('/options');
    }
  }
}
</script>
