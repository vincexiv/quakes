<template>
  <div ref="map" class="map">
    Amazing stuff!! {{ earthquake }}
  </div>
</template>

<script>

export default {
  name: 'Map',
  props: {
    earthquake: Number
  },
}
</script>

<style>
.map {
  outline: solid 0.1rem red;
}
</style>