<template>
  <div class="map-data">
    <Map class="map" :quakes="quakes" :hoverRow="hoverRow" :clickRow="clickRow"/>
    <div class="data-container">
      <Data :quakes="quakes" :rowHover="rowHover" :rowClick="rowClick"/>
    </div>
  </div>
</template>

<script>
import { getQuakes } from './utils/observables';
import Map from './components/map.vue';
import Data from './components/data.vue';

export default {
  components: { Map, Data },
  data(){
    return {
      quakes: null,
      hoverRow: { row: null, state: false },
      clickRow: null
    }
  },
  created(){
    this.quakes = getQuakes()
  },
  methods: {
    rowHover: function(hover){
      this.hoverRow = hover
    },
    rowClick: function(click){
      this.clickRow = click
    }
  }
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

.data-container {
  outline: solid 0.1rem black;
  position: absolute;
  right: 1rem;
  top: 1rem;
  width: 400px;
  height: calc(100vh - 2rem);
  z-index: 999;
  padding: 0.5rem;
  
  background: rgba(146, 146, 146, 0.25);
  backdrop-filter: blur( 4px );
  -webkit-backdrop-filter: blur( 4px );
  border-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
}
</style>
