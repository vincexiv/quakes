<template>
  <Map :earthquakes="earthquakes"/>
</template>

<script>
import Map from './components/map.vue';
import getEarthquakes from './utils/earthquakes';

export default {
  components: { Map },
  data: function(){
    return {
      earthquakes: [],
    }
  },

  mounted(){
    const earthq = getEarthquakes()
    earthq.subscribe(this.updateMap)
  },

  methods: {
    updateMap: function(earthquake){
      this.earthquakes.push(earthquake)
    },
  }
}
</script>

<style scoped>
</style>
