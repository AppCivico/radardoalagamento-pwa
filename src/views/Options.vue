<template>
  <main>
    <Header />
    <section id="options">
      <nav>
        <ul class="options__menu">
          <li><router-link to="/terms">Termos se Serviço</router-link></li>
          <li><router-link to="/privacy">Política de Privacidade</router-link></li>
          <li class="help"><router-link to="/terms">Ajuda</router-link></li>
        </ul>
      </nav>
    </section>
    <Footer />
  </main>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default {
  name: 'Options',
  components: {
    Header,
    Footer,
  },
}
</script>

<style lang="scss">
#options {
  background-image: url('../assets/images/elements_bg.png');
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: bottom;
  padding: 0 0 50%;
  min-height: 600px;
}
.options__menu {
  width: 100%;
  list-style: none;
}
.options__menu li {
  display: block;
  width: 100%;
  font-size: 2em;
  border-bottom: 1px solid $color_gray;
  padding: $gutter $gutter $gutter 80px;
  background-image: url('../assets/images/ic-termosepoliticas.png');
  background-repeat: no-repeat;
  background-size: auto 35%;
  background-position: left 30px center;
  text-align: left;

  &.help {
    background-image: url('../assets/images/spam-ico-copy.png');
  }
}
.options__menu a {
  color: inherit;
  text-decoration: none;
}
</style>

