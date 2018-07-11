<template>
  <main>
    <Header :back="true" @back="goBack"/>
    <section id="options">
      <article>
        <p>Consectetur adipiscing elit. Etiam at nisi sed purus mattis varius id sit amet nibh. Nullam dolor neque, sagittis eu iaculis sit amet, ultricies ac velit. Morbi semper tempus massa id congue. Quisque aliquet justo ac lobortis vehicula. Sed in leo vel ligula tincidunt scelerisque at a leo. Vivamus vulputate non lectus nec ultricies.</p>

        <p>Quisque posuere est at est tempor efficitur eu a lorem. Donec sit amet sollicitudin dolor, eget sollicitudin nibh. Fusce commodo consequat ipsum, luctus ultricies urna varius et. Morbi mollis urna sed placerat maximus. Donec condimentum non ipsum vel molestie. Aliquam bibendum nisl mauris, eu finibus diam gravida ac. Sed ex orci, porttitor eget ex in, ultrices iaculis orci. Mauris id massa lectus.</p>
      </article>
    </section>
    <Footer />
  </main>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default {
  name: 'Privacy',
  components: {
    Header,
    Footer,
  },
  methods: {
    goBack() {
      this.$router.push('/options');
    }
  }
}
</script>
