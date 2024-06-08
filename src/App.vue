<template>
  <div style="padding: 0.5rem;">
    <div class="map-data">
      <Map class="map" :quakes="quakes" :hoverRow="hoverRow" :clickRow="clickRow"/>
      <Data class="data" :quakes="quakes" :rowHover="rowHover" :rowClick="rowClick"/>
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
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 70vw;
}

.map {
  height: 80vh;
}
</style>
