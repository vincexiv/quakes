<template>
  <div style="padding: 0.5rem;">
    <div class="map-data">
      <Map class="map" />
      <Data class="data" />
    </div>
  </div>
</template>

<script>
import Map from './components/map.vue';
import Data from './components/data.vue';

export default {
  components: { Map, Data },
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
