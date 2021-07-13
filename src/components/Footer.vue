<template>
  <div class="footer flex align-center justify-center">
    <button class="back-btn" @click="goBack">BACK</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Footer",
  methods: {
    goBack() {
      const lastVisitedPages = this.getVisitedPages;
      if (
        lastVisitedPages[lastVisitedPages.length - 1] === "showAllPage" ||
        lastVisitedPages.length === 2
      ) {
        this.$router.push({ path: "/" });
      } else {
        this.$router.push(
          `/gallery/${this.routeParamsType}/${this.routeParamsTitle}/${this.routeParamsYear}/${this.routeParamsPageNum}`
        );
      }
      this.removeVisitedPage();
    },
    ...mapActions(["removeVisitedPage"]),
  },
  computed: {
    routeParamsType() {
      return this.$route.params.type;
    },
    routeParamsTitle() {
      return this.$route.params.searchTitle;
    },

    routeParamsPageNum() {
      return +this.$route.params.page;
    },
    routeParamsYear() {
      return this.$route.params.year || undefined;
    },
    ...mapGetters(["getVisitedPages", "getStoredMedia"]),
  },
};
</script>

<style lang="scss" scoped>
.footer {
  height: 150px;
  background-color: lightgray;
  .back-btn {
    background-color: #5a6366;
    border-radius: 8px;
    display: inline-block;
    cursor: pointer;
    color: #ffffff;
    font-family: Arial;
    font-size: 16px;
    font-weight: bold;
    padding: 10px 29px;
    text-decoration: none;
    &:active {
      position: relative;
      top: 1px;
    }
  }
}
</style>
