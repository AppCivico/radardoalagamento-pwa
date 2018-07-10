<template>
  <footer id="footer">
    <nav class="footer__nav">
      <ul>
        <router-link to="/profile">Perfil</router-link>
        <router-link to="/alerts">Alertas</router-link>
        <router-link to="/districts">Distritos</router-link>
        <router-link to="/options">Configurações</router-link>
      </ul>
    </nav>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style>
#footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}
.footer__nav ul {
  list-style: none;
  display: block;
}
.footer__nav li {
  float: left;
  width: 25%;
}
</style>


