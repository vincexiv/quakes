<template>
  <div ref="map"></div>
</template>

<script>
import L from 'leaflet'
import "leaflet/dist/leaflet.css"

export default {
  name: 'Map',

  props: { 
    quakes: Object,
    hoverRow: Object,
    clickRow: Object
  },

  data(){
    return {
      map: null,
      codeLayers: {},
      quakeLayer: null
    }
  },

  mounted(){
    this.map = L.map(this.$refs.map).setView([33.858631, -118.279602], 7)
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map)

    this.quakeLayer = L.layerGroup([]).addTo(this.map);

    this.quakes.subscribe(this.addQuakePoint)
  },

  beforeUnmount(){
    if(this.map){
      this.map.remove()
    }
  },

  methods: {
    addQuakePoint: function(quake){
      if(quake && quake.type !== 'error'){
        const coords = quake.geometry.coordinates;
        const size = quake.properties.mag * 10000;
        const circle = L.circle([coords[1], coords[0]], size).addTo(this.map);

        this.quakeLayer.addLayer(circle)
        this.codeLayers[quake.id] = this.quakeLayer.getLayerId(circle)
      } else {
        console.warn("Failed to load quake data")
        console.error(quake.details)
      }
    },
  },

  watch: {
    "hoverRow": function(){
      const circle = this.quakeLayer.getLayer(this.codeLayers[this.hoverRow.row.id]);
      circle.setStyle({ color: this.hoverRow.state ? '#ff0000' : '#0000ff' });
    },
    "clickRow": function(){
      const circle = this.quakeLayer.getLayer(this.codeLayers[this.hoverRow.row.id]);
      this.map.panTo(circle.getLatLng());
    }
  }
}
</script>

<style>
</style>