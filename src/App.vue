<template>
  <div id="app flex column space-between">
    <div>
      <router-view />
      <div class="footer">
        <Footer class="footer" v-if="!this.getRoute" />
      </div>
    </div>
  </div>
</template>



<script>
import Footer from "./components/Footer";
export default {
  components: {
    Footer,
  },
  created() {
    this.getRoute;
  },
  computed: {
    getRoute() {
      return this.$route.path === "/";
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
}
</style>
