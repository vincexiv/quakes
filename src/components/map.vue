<template>
  <div ref="map" id="map" style="width: 100vw; height: 100vh;"></div>
</template>

<script>
import L from 'leaflet'
import "leaflet/dist/leaflet.css"

export default {
  name: 'Map',

  props: {
    earthquakes: Array
  },

  data(){
    return {
      map: null
    }
  },

  mounted(){
    this.map = L.map(this.$refs.map).setView([33.858631, -118.279602], 7);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);
  },

  beforeUnmount(){
    if(this.map){
      this.map.remove()
    }
  },

  created(){
    console.log("earthquakes: ", this.earthquakes)

  }
}
</script>

<style>
.map {
  outline: solid 0.1rem red;
}
</style>