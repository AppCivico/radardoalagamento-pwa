<template>
  <footer id="footer">
    <nav class="footer__nav">
      <ul>
        <li :class="this.$route.fullPath === '/profile' ? 'active' : ''">
          <a href="#" @click.prevent="$router.push('profile')">
            <svg xmlns="http://www.w3.org/2000/svg" width="51" height="51" viewBox="0 0 51 51">
              <path fill="#757575" fill-rule="evenodd" d="M25.5 26C32.375 26 38 20.15 38 13S32.375 0 25.5 0 13 5.85 13 13s5.625 13 12.5 13zm0 6C16.894 32 0 36.117 0 44.667V51h51v-6.333C51 36.117 34.106 32 25.5 32z"/>
            </svg>
            <h3>Perfil</h3>
          </a>
        </li>
        <li :class="this.$route.fullPath === '/alerts' ? 'active' : ''">
          <a href="#" @click.prevent="$router.push('alerts')">
            <svg xmlns="http://www.w3.org/2000/svg" width="57" height="57" viewBox="0 0 57 57">
              <path fill-rule="evenodd" d="M28.498 45.278a4.116 4.116 0 0 1-4.116-4.114 4.12 4.12 0 0 1 4.116-4.113 4.114 4.114 0 0 1 0 8.227zm-3.17-32.612h6.334v18.996h-6.333V12.666zM40.304 0H16.691L0 16.694v23.61l16.69 16.69h23.613L57 40.304v-23.61L40.303 0z"/>
            </svg>
            <h3>Alertas</h3>
          </a>
        </li>
        <li :class="this.$route.fullPath === '/districts' ? 'active' : ''">
          <a href="#" @click.prevent="$router.push('districts')">
            <svg xmlns="http://www.w3.org/2000/svg" width="57" height="57" viewBox="0 0 57 57">
              <path fill="#28CFCE" fill-rule="evenodd" d="M55.417 0h-.634L38 6.65 19 0 1.267 6.017C.633 6.333 0 6.65 0 7.6v47.817C0 56.367.633 57 1.583 57h.634L19 50.35 38 57l17.733-6.017c.634-.316 1.267-.95 1.267-1.583V1.583C57 .633 56.367 0 55.417 0zM38 52l-19-6.75V7l19 6.75V52z"/>
            </svg>
            <h3>Distritos</h3>
          </a>
        </li>
        <li :class="this.$route.fullPath === '/options' ? 'active' : ''">
          <a href="#" @click.prevent="$router.push('options')">
            <svg xmlns="http://www.w3.org/2000/svg" width="53" height="54" viewBox="0 0 53 54">
              <path fill-rule="evenodd" d="M46.787 22.799c1.48-1.48 2.959-2.665 4.438-3.85.592-.591 1.183-.888 1.48-1.776v-.296c-.297-.296-.297-.592-.297-.888l-7.987-8.883c-.296-.296-.592-.296-.888 0-1.183 1.185-2.662 2.369-3.846 3.553-.591.592-.887.592-1.183 0-1.183-.888-2.662-1.776-4.142-2.368-.591-.297-.887-.593-.887-1.48V.887c0-.296 0-.888-.296-.888H19.867c-.296 0-.296.592-.296.888V6.81c0 .888 0 .888-.888 1.48-1.479.593-2.958 1.48-4.141 2.37-.592.591-.888.591-1.48 0l-.295-.297c-1.184-.888-2.071-1.776-3.255-2.665-.887-.888-.887-.888-1.775.296l-5.325 6.218c-.591.889-1.479 1.777-2.07 2.369-.296.592-.592.888 0 1.48 1.775 1.777 3.845 3.257 5.62 5.034.296.296.592.888.592 1.184a19.867 19.867 0 0 0 0 5.922c0 .592 0 .888-.592 1.184-1.775 1.777-3.845 3.554-5.62 5.034-.296.296-.592.888 0 1.184.295.296.295.593.591.889 1.48 1.776 2.959 3.553 4.734 5.33.887 1.184 1.775 2.072 2.662 3.256.592.592.592.592 1.183 0 1.184-1.184 2.663-2.369 3.846-3.553.592-.592.888-.592 1.48 0 1.183.888 2.662 1.777 4.141 2.369.888.296.888.592.888 1.48v5.922c0 .296 0 .592.295.592h13.313c.296 0 .296-.296.296-.592v-5.922c0-.592.296-.888.591-1.184 1.775-.592 3.255-1.48 4.438-2.665.296-.296.592-.296.887 0 .592.592 1.184 1.184 2.071 1.777.592.592 1.48 1.184 2.071 1.776.296.296.592.296.888 0l.887-.888c1.775-2.073 3.55-3.85 5.325-5.922.888-.888 1.775-1.776 2.071-2.96v-.297c-.296-.296-.296-.592-.592-.888-1.775-1.777-3.846-3.257-5.62-5.034-.296-.296-.592-.592-.592-1.184.296-2.073.296-3.85 0-5.922.296-.296.296-.888.591-1.184zM26.102 38.196c-5.33 0-9.771-4.738-9.475-10.068 0-5.33 4.441-10.067 10.363-10.067 5.33.297 9.77 4.442 9.77 9.771-.295 6.218-4.737 10.364-10.658 10.364z"/>
            </svg>
            <h3>Configurações</h3>
          </a>
        </li>
      </ul>
    </nav>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style lang="scss">
#footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: $color_white;
  box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.24), 0 0 24px 0 rgba(0, 0, 0, 0.12);
}
.footer__nav ul {
  list-style: none;
  display: block;
}
.footer__nav li {
  float: left;
  width: 25%;
  display: block;
  padding: $gutter / 2 0;
  color: $color_gray;

  &.active {
    color: $color_blue;

    path {
      fill: $color_blue;
    }
  }
}
.footer__nav svg {
  display: block;
  margin: 0 auto $gutter / 2;
  max-width: 30px;
  height: auto;

  path {
    fill: $color_gray;
  }
}
.footer__nav a {
  color: inherit;
  text-decoration: none;
  font-size: 1.2em;
}
.footer__nav h3 {
  font-weight: 400;
}
</style>


