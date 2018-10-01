<template>
  <main>
    <Header :refresh="true" @refresh="refresh"/>
    <section id="alerts">
      <ul class="alerts__type">
        <li @click="changeType('me')" :class="this.type === 'me' ? 'active' : ''">Meus alertas</li>
        <li @click="changeType('city')" :class="this.type === 'city' ? 'active' : ''">Alertas da cidade</li>
      </ul>
      <a class="alerts_new-alert" href="#" @click.prevent="$router.push('/new-alert')">Enviar um alerta</a>
      <ul class="alerts__list" v-if="selectedAlerts.length > 0">
        <li class="alerts__item" v-for="alert in selectedAlerts" :key="alert.id">
          <span class="alert__time">{{ formatDate(alert.created_at) }}</span>
          <div class="alert__content">
            <div :class="`alert__level ${alert.level}`">Nível {{ alert.level }}</div>
            <div class="alert__description">
              <h3>{{ alert.description }}</h3>
              <h4>Distritos alertados:</h4>
              <span v-for="(district, index) in alert.alert_districts" :key="district.district_id">
                {{ district.district.name }}{{ index !==  alert.alert_districts.length - 1 ? ',' : ''}}
              </span>
            </div>
          </div>
        </li>
      </ul>
      <div v-else class="alerts__empty">
        <img src="../assets/images/wink.png" alt="Emoji feliz">
        <h2>Tudo tranquilo, sem alertas nos distritos seguidos</h2>
      </div>
    </section>
    <Footer />
  </main>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import swal from 'sweetalert';

export default {
  name: 'Alerts',
  components: {
    Header,
    Footer,
  },
  mounted() {
    this.checkUser();
    setTimeout(() => {
      if (this.userType === 'registered') {
        this.loadAlerts('GET_ALERTS');
        if (this.selectedDistricts.length <= 0) {
          swal('Você precisa selecionar os distritos que quer seguir ;)')
          this.$router.push('/districts');
        }
      } else {
        swal('Você precisa se registrar para ver os alertas da cidade');
        this.$router.push('/districts');
      }
    }, 100);
  },
  data() {
    return {
      userType: '',
      selectedAlerts: [],
      type: 'me',
    };
  },
  computed: {
    alerts() {
      return this.$store.state.alerts;
    },
    alertsCity() {
      return this.$store.state.alertsCity;
    },
    selectedDistricts() {
      return this.$store.state.selectedDistricts;
    },
  },
  methods: {
    refresh() {
      if (this.type === 'me') {
        this.loadAlerts('GET_ALERTS');
      } else {
        this.loadAlerts('GET_ALERTS_CITY');
      }
    },
    formatDate(date) {
      if (date) {
        const day = date
          .split(' ')[0]
          .split('-')
          .reverse()
          .join('.');

        const hour = date.split(' ')[1].split(':');

        return `${day} às ${hour[0]}h${hour[1]}`;
      }

      return date;
    },
    checkUser() {
      if (localStorage.getItem('rdalgus') !== null) {
        this.userType = 'registered';
      }
    },
    loadAlerts(type) {
      this.$store.dispatch(type)
        .then(() => {
          if (type === 'GET_ALERTS') {
            this.selectedAlerts = this.alerts;
          } else {
            this.selectedAlerts = this.alertsCity;
          }
        })
        .catch(() => {
          swal('Ocorreu um erro ao carregar os alertas, recarregue a página.')
        });
    },
    changeType(type) {
      this.type = type;
      if (type === 'me') {
        if (this.alerts.length < 1) {
          this.loadAlerts('GET_ALERTS');
        } else {
          this.selectedAlerts = this.alerts;
        }
      } else {
        if (this.alertsCity.length < 1) {
          this.loadAlerts('GET_ALERTS_CITY');
        } else {
          this.selectedAlerts = this.alertsCity;
        }
      }
    }
  }
}
</script>

<style lang="scss">
#alerts {
  background-color: $color_grayLight;
  min-height: 700px;
}
.alerts__type {
  width: 100%;
  display: table;
  background-color: $color_blue;
  list-style: none;
}
.alerts__type li {
  width: 50%;
  float: left;
  display: block;
  color: $color_blackLight;
  font-size: 2em;
  font-weight: 300;
  padding: 0 0 $gutter;
  border-bottom: 4px solid $color_blue;
  transition: border 300ms;

  &.active {
    border-bottom: 4px solid $color_blueDark;
  }
}
.alerts__empty {
  background-image: url('../assets/images/elements_bg.png');
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: bottom;
  padding: 10% $gutter 50%;
}
.alerts__empty img {
  max-width: 50%;
  margin: 0 auto;
  display: block;
}
.alerts__empty h2 {
  font-size: 2.6em;
  margin: $gutter * 2 0;
}
.alerts__list {
  width: 100%;
  padding: $gutter * 1.5 $gutter;
  list-style: none;
}
.alerts__item {
  text-align: left;
  margin-bottom: $gutter;
}
.alert__content {
  display: flex;
  background-color: $color_white;
}
.alert__level {
  flex: 1;
  background-repeat: no-repeat;
  background-size: 80% auto;
  background-position: center;
  font-size: 0;

  &.emergency {
    background-image: url('../assets/images/icon-emergency.png');
    background-color: #f54f4f;
  }
  &.attention {
    background-image: url('../assets/images/icon-attention.png');
    background-color:#f6dc35;
  }
  &.alert {
    background-image: url('../assets/images/icon-alert.png');
    background-color: #f1a225;
  }
  &.overflow {
    background-image: url('../assets/images/icon-overflow.png');
    background-color: #f6dc35;
  }
}
.alert__description {
  flex: 4;
  padding: $gutter;
}
.alert__description h3 {
  font-size: 2em;
  margin-bottom: $gutter / 2;
}
.alert__description h4 {
  font-size: 1.4em;
}
.alert__description span {
  font-size: 1.2em;
}
.alert__time {
  font-size: 1.2em;
  margin-bottom: $gutter / 3;
  display: block;
}
.alerts_new-alert {
  width: 100%;
  display: block;
  background-color: #10a1ba;
  color: $color_white;
  text-decoration: none;
  font-size: 2em;
  font-weight: 300;
  padding: $gutter / 2 $gutter;
}
</style>

