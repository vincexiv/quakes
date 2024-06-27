<template>
  <div ref="map" class="data"></div>
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
    this.map = L.map(this.$refs.map, { attributionControl:false }).setView([33.858631, -118.279602], 7)
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
      this.hoverRow.forEach(row => {
        const circle = this.quakeLayer.getLayer(this.codeLayers[row.row.id]);
        circle.setStyle({ color: row.color });
      })
    },
    "clickRow": function(){
      const circle = this.quakeLayer.getLayer(this.codeLayers[this.clickRow.id]);
      this.map.panTo(circle.getLatLng());
    }
  }
}
</script>

<style scoped>
</style>