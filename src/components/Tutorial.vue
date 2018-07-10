<template>
  <div id="tutorial" :class="status === 'show' ? '' : 'hidden'">
    <div class="tutorial__wrapper" :style="{ marginLeft: movement }">
      <div class="tutorial__item">
        <img src="../assets/images/img_tutorial_1.png" alt="Imagem ilustrativa">
        <h2>Tempo real!</h2>
        <p>Avance para ver os 2 passos simples para receber alertas do seu distrito ou zona de São Paulo.</p>
      </div>
      <div class="tutorial__item">
        <img src="../assets/images/img_tutorial_2.png" alt="Imagem ilustrativa">
        <h2>Seus distritos</h2>
        <p>Escolha um ou mais distritos (bairros) ou toda zona para seguir.</p>
      </div>
      <div class="tutorial__item">
        <img src="../assets/images/img_tutorial_3.png" alt="Imagem ilustrativa">
        <h2>Alertas</h2>
        <p>Faça o breve cadastro e acompanhe alertas sobre seu(s) distrito(s).</p>
      </div>
    </div>
    <div class="tutorial__footer">
      <a href="#" class="tutorial__skip" @click="skip">PULAR</a>
      <ul class="tutorial__bullets">
        <li v-for="(item, i) in cardsQt" :key="i" :class="activeCard === i ? 'active' : ''">{{ i }}</li>
      </ul>
      <a href="#" class="tutorial__next" @click="nextItem">NEXT</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tutorial',
  props: {
    status: String,
  },
  data() {
    return {
      activeCard: 0,
      touchStart: 0,
      touchEnd: 0,
      movement: '0',
      cardsQt: 3,
      ongoingTouches: [],
    };
  },
  mounted() {
    this.handleTouch();
    if (window.outerWidth <= 768) {
      this.ongoingTouches = [{ screenX: window.outerWidth * 2 }];
    }
  },
  methods: {
    copyTouch(touch) {
      return { screenX: touch.screenX };
    },
    nextItem() {
      if (this.activeCard < this.cardsQt - 1 ) {
        this.activeCard = this.activeCard + 1;

        if (window.outerWidth <= 768) {
          this.movement = `-${this.activeCard * 100}%`;
        } else {
          this.movement = `-${this.activeCard * (100 / 2)}%`;
        }
      }
    },
    swipeCard(movement) {
      if (movement === 'left' && this.activeCard < this.cardsQt - 1) {
        this.activeCard = this.activeCard + 1;
      } else if (movement === 'right' && this.activeCard > 0) {
        this.activeCard = this.activeCard - 1;
      }

      if (window.outerWidth <= 768) {
        this.movement = `-${this.activeCard * 100}%`;
      } else {
        this.movement = `-${this.activeCard * (100 / 2)}%`;
      }
    },
    handleTouch() {
      const gestureZone = document.querySelector('#tutorial');

      if (window.outerWidth <= 768) {
        gestureZone.addEventListener('touchstart', (event) => {
          this.ongoingTouches.push(this.copyTouch(event.changedTouches[0]));
          this.touchStart = event.changedTouches[0].screenX;
        }, false);

        gestureZone.addEventListener('touchmove', (event) => {
          const currentTouch = event.changedTouches[0].screenX;
          this.handleMove(currentTouch);
        }, false);

        gestureZone.addEventListener('touchend', (event) => {
          this.touchEnd = event.changedTouches[0].screenX;
          this.handleGesture(this.touchStart, this.touchEnd);
        }, false);
      } else {
        gestureZone.addEventListener('mousedown', (event) => {
          if (event.target.localName !== 'button') {
            this.touchStart = event.screenX;
          }
        }, false);

        gestureZone.addEventListener('mouseup', (event) => {
          if (event.target.localName !== 'button') {
            this.touchEnd = event.screenX;
            this.handleGesture(this.touchStart, this.touchEnd);
          }
        }, false);
      }
    },
    handleMove(current) {
      const lastItem = this.ongoingTouches[this.ongoingTouches.length - 1];
      const currentMovement = parseFloat(this.movement, 10);
      const movWidth = Math.abs(lastItem.screenX - current);
      if (lastItem && movWidth > 30) {
        if (current < lastItem.screenX) {
          const newMovement = currentMovement - 1;
          this.movement = `${newMovement}%`;
        } else if (current > lastItem.screenX) {
          const newMovement = currentMovement + 1;
          this.movement = `${newMovement}%`;
        }
      }
    },
    handleGesture(start, end) {
      const handleWidth = Math.abs(end - start);
      let move = false;
      if (window.outerWidth <= 768) {
        if (handleWidth > 50) {
          move = true;
        }
      } else {
        if (handleWidth > 60) {
          move = true;
        }
      }

      if (move) {
        if (end < start) {
          this.swipeCard('left');
        } else if (end > start) {
          this.swipeCard('right');
        }
      } else {
        this.movement = `-${this.activeCard * 100}%`;
      }
    },
    skip() {
      this.$emit('skip');
    },
  },
};
</script>

<style lang="scss">
#tutorial {
  position: relative;
  width: 100%;
  height: 100%;
  background: $color_white;
  overflow: hidden;
  transition: opacity 500ms;

  &.hidden {
    opacity: 0;
  }
}
.tutorial__wrapper {
  width: 300%;
  height: 100%;
  display: table;
  transition: margin-left 250ms;
}
.tutorial__item {
  width: 33.33%;
  display: inline-block;
  height: 100%;
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: center;
  padding: 8% $gutter;

  &:nth-child(2) {
    background-image: url('../assets/images/bg_tutorial_2.png');
  }
  &:nth-child(3) {
    background-image: url('../assets/images/bg_tutorial_3.png');
  }
}
.tutorial__item h2 {
  font-size: 2.6em;
  margin: $gutter 0;
}
.tutorial__item p {
  font-size: 2em;
}
.tutorial__footer {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
  padding: $gutter;
}
.tutorial__skip {
  position: absolute;
  left: $gutter;
  top: $gutter;
  color: inherit;
  text-decoration: none;
  font-size: 1.4em;
}
.tutorial__next {
  position: absolute;
  right: $gutter;
  top: $gutter;
  display: block;
  width: 12px;
  height: 20px;
  font-size: 0;
  background-image: url('../assets/images/next.png');
  background-size: contain;
  background-repeat: no-repeat;
}
.tutorial__bullets {
  display: inline-block;
  list-style: none;
  margin: 0;
  padding: 0;
  line-height: 0;
  vertical-align: top;
}
.tutorial__bullets li {
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 2px solid $color_gray;
  font-size: 0;
  margin-left: $gutter / 2;

  &.active {
    border: 2px solid $color_blue;
  }
}
</style>

