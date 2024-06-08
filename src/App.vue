<template>
  <div style="padding: 0.5rem;">
    <div class="map-data">
      <Map class="map" :quakes="quakes"/>
      <Data class="data" :quakes="quakes" />
    </div>
  </div>
</template>

<script>
import getQuakes from './utils/quakes';
import Map from './components/map.vue';
import Data from './components/data.vue';

export default {
  components: { Map, Data },
  data(){
    return {
      quakes: null
    }
  },
  created(){
    this.quakes = getQuakes()
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
