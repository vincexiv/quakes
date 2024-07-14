<template>
  <div class="map-data">
    <Map class="map" :quakes="quakes" :hoverRow="hoverRow" :clickRow="clickRow"/>

    <div class="data-container">
      <div class="buttons">
        <button v-on:click="()=>setActive('earthquakes')" :class="activeState('earthquakes')">
          Earthquakes
          <span :class="['earthquakes', 'notification-icon']"></span>
        </button>
        <button v-on:click="()=>setActive('tweets')" :class="activeState('tweets')">
          Tweets
          <span :class="['tweets', 'notification-icon']"></span>
        </button>
      </div>

      <Quakes v-show="activeItem == 'earthquakes'"
        :quakes="quakes"
        :socket="socket"
        :rowHover="rowHover"
        :rowClick="rowClick"
        :scrollTop="scrollDataTop"/>
      <Tweets v-show="activeItem == 'tweets'"
        :scrollTop="scrollTweetsTop"
        :socket="socket"/>
    </div>

  </div>
</template>

<script>
import { getQuakes, getSocket } from './utils/observables';
import Map from './components/map.vue';
import Quakes from './components/quakes.vue';
import makeResizableAndDraggable from './utils/interact';
import Tweets from './components/tweets.vue';

export default {
  components: { Map, Quakes, Tweets },
  data(){
    return {
      activeItem: 'earthquakes',
      quakes: null,
      socket: null,
      scrollDataTop: false,
      scrollTweetsTop: false,
      hoverRow: { row: null, state: false },
      clickRow: null
    }
  },
  created(){
    this.quakes = getQuakes()
    this.socket = getSocket()

  },
  mounted(){
    this.$nextTick(()=>{
      makeResizableAndDraggable('.data-container')
    })
  },
  methods: {
    rowHover: function(hover){
      this.hoverRow = hover
    },
    rowClick: function(click){
      this.clickRow = click
    },
    setActive(item){
      this.activeItem = item
      this.scrollDataTop = true
      window.queueMicrotask(() => {
        const notificationIcon = document.querySelector(`.${item}.notification-icon`)
        notificationIcon.style.display = 'none'
      })
      window.queueMicrotask(() => {
        this.scrollDataTop = false
      })
    },
    activeState(item){
      if(this.activeItem === item){
        return 'active'
      } else {
        return 'inactive'
      }
    }
  },
}

</script>

<style scoped>
.map-data {
  position: relative;
  width: 100vw;
  height: 100vh;
}
.map {
  position: absolute;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

.data-container,
.data-container * {
  -ms-touch-action: none;
  touch-action: none;
}

.buttons {
  position: absolute;
  display: flex;
  gap: 0.5rem;
  top: -2rem;
  left: 0;
}

button.active {
  background-color: rgb(3, 163, 226);
}

.data-container {
  /* outline: solid 0.1rem black; */
  outline: solid 0.1rem rgba(0, 0, 0, 0.3);
  position: fixed;
  right: 1rem;
  top: 4rem;
  width: 400px;
  height: calc(100vh - 6rem);
  min-height: 10rem;
  z-index: 999;
  padding: 0.5rem;
  
  background: rgba(146, 146, 146, 0.25);
  backdrop-filter: blur( 4px );
  -webkit-backdrop-filter: blur( 4px );
  border-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
}
</style>
