<template>
  <div style="padding: 0.5rem;">
    <div class="map-data">
      <Map class="map" :quakes="quakes" :hoverRow="hoverRow"/>
      <Data class="data" :quakes="quakes" :rowHover="rowHover"/>
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
      hoverRow: { row: null, state: false }
    }
  },
  created(){
    this.quakes = getQuakes()
  },
  methods: {
    rowHover: function(hover){
      this.hoverRow = hover
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
