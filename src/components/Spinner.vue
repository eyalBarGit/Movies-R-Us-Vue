<template>
  <div class="text-center">
    <h2>No match here</h2>
    <beat-loader></beat-loader>
  </div>
</template>

<script>
import BeatLoader from "vue-spinner/src/PulseLoader.vue";

export default {
  name: "Spinner",
  components: {
    BeatLoader,
  },
};
</script>

<style scoped>
</style>
