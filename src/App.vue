<template>
  <Map :earthquake="earthquake"/>
</template>

<script>
import Map from './components/map.vue';
import getEarthquakes from './utils/map';

export default {
  components: { Map },
  data: function(){
    return {
      earthquake: 0,
    }
  },

  mounted(){
    this.earthquakes()
  },

  methods: {
    earthquakes: function(){
      const earthq = getEarthquakes()
      earthq.subscribe(this.updateMap)
    },
    updateMap: function(val){
      this.earthquake = val
    }
  }
}
</script>

<style scoped>
</style>
