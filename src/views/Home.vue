<template>
  <div @click="toggleSearch" class="home container margin-center">
    <div class="search-bar-section margin-center flex justify-center">
      <SearchBar key="1" @warning="warning" @disableWarning="disableWarning" />
    </div>
    <div class="warning-letters flex justify-center">
      <p v-if="isWarning">search starts after 3 letters</p>
    </div>
  </div>
</template>

<script>
import SearchBar from "../components/SearchBar";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    SearchBar,
  },
  data() {
    return {
      isWarning: false,
    };
  },
  created() {
    sessionStorage.clear();
    this.onAddToVisitedPage();
  },
  methods: {
    toggleSearch() {
      this.closeResultList();
    },
    onAddToVisitedPage() {
      const lastVisitedPages = this.getVisitedPages;
      if (lastVisitedPages.includes("mainPage")) return;
      this.addVisitedPage("mainPage");
    },
    warning() {
      return (this.isWarning = true);
    },
    disableWarning() {
      return (this.isWarning = false);
    },
    ...mapActions(["closeResultList", "addVisitedPage"]),
  },
  computed: {
    ...mapGetters(["getIsResultOpen", "getVisitedPages"]),
  },
};
</script>
<style scoped lang="scss">
.home {
  padding-top: 10%;
  height: 90vh;
  .search-bar-section {
    width: 100%;
  }
}
</style>
