<template>
  <div ref="map"></div>
</template>

<script>
import L from 'leaflet'
import "leaflet/dist/leaflet.css"

export default {
  name: 'Map',

  props: { quakes: Object },

  data(){
    return {
      map: null
    }
  },

  mounted(){
    this.createMap()
    this.quakes.subscribe(this.addQuakePoint)
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
      if(quake && quake.type !== 'error'){
        const coords = quake.geometry.coordinates;
        const size = quake.properties.mag * 10000;
        L.circle([coords[1], coords[0]], size).addTo(this.map);
      } else {
        console.warn("Failed to load quake data")
        console.error(quake.details)
      }
    }
  },
}
</script>

<style>
</style>