<template>
  <div ref="map" id="map" style="width: 100vw; height: 100vh;"></div>
</template>

<script>
import getEarthquakes from '../utils/earthquakes';
import L from 'leaflet'
import "leaflet/dist/leaflet.css"

export default {
  name: 'Map',

  props: {
    earthquakes: []
  },

  data(){
    return {
      map: null
    }
  },

  mounted(){
    this.createMap()
    const earthq = getEarthquakes()
    earthq.subscribe(this.addQuakePoint)
  },

  beforeUnmount(){
    if(this.map){
      this.map.remove()
    }
  },

  methods: {
    createMap: function(){
      this.map = L.map(this.$refs.map).setView([33.858631, -118.279602], 7);
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);
    },

    addQuakePoint: function(quake){
      const coords = quake.geometry.coordinates;
      const size = quake.properties.mag * 10000;
      L.circle([coords[1], coords[0]], size).addTo(this.map);
    }
  },
}
</script>

<style>
.map {
  outline: solid 0.1rem red;
}
</style>