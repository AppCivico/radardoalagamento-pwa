<template>
  <main>
    <Header :check="true"/>
      <section id="profile">
        <h2>Profile</h2>
      </section>
    <Footer />
  </main>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default {
  name: 'home',
  components: {
    Header,
    Footer,
  },
};
</script>

<style>
</style>

