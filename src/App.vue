<template>
  <Map :earthquake="earthquake"/>
</template>

<script>
import Map from './components/map.vue';
import getEarthquakes from './utils/earthquakes';

export default {
  components: { Map },
  data: function(){
    return {
      earthquake: 0,
    }
  },

  mounted(){
    const earthq = getEarthquakes()
    earthq.subscribe(this.updateMap)
  },

  methods: {
    updateMap: function(val){
      console.log("val: ", val)
      this.earthquake += 1
    },
  }
}
</script>

<style scoped>
</style>
