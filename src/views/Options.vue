<template>
  <main>
    <Header />
    <section id="options">
        <h1>Configurações</h1>
    </section>
    <Footer />
  </main>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import swal from 'sweetalert';

export default {
  name: 'Options',
  components: {
    Header,
    Footer,
  },
}
</script>

<style lang="scss">

</style>

