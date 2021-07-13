<template>
  <div class="search-results">
    <hr class="menu-devider" />
    <div v-if="getMoviesList" class="movies" key="b">
      <SearchResultIGroup
        @linkTo="goToGallery"
        title="Movies"
        :items="topFiveMovies"
        mediaType="movie"
      />
    </div>
    <div v-if="getGamesList" class="games">
      <SearchResultIGroup
        @linkTo="goToGallery"
        title="Games"
        :items="topFiveGames"
        mediaType="game"
      />
    </div>
    <div v-if="getSeriesList" class="series">
      <SearchResultIGroup
        @linkTo="goToGallery"
        title="Series"
        :items="topFiveSeries"
        mediaType="series"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SearchResultIGroup from "./SearchResultIGroup";

export default {
  name: "SearchBarList",
  props: {
    searchTitle: {
      type: String,
      required: true,
    },
  },
  components: {
    SearchResultIGroup,
  },
  methods: {
    goToGallery(galleryType) {
      this.closeResultList();
      this.$router.push(`/gallery/${galleryType}/${this.searchTitle}/All/1`);
    },
    ...mapActions(["closeResultList"]),
  },
  computed: {
    topFiveGames() {
      return this.getGames.gamesList.slice(0, 5);
    },
    topFiveMovies() {
      return this.getMovies.moviesList.slice(0, 5);
    },
    topFiveSeries() {
      return this.getSeries.seriesList.slice(0, 5);
    },
    getSeriesList() {
      return this.getSeries.seriesList;
    },
    getGamesList() {
      return this.getGames.gamesList;
    },
    getMoviesList() {
      return this.getMovies.moviesList;
    },

    ...mapGetters(["getMovies", "getGames", "getSeries"]),
  },
};
</script>

<style scoped>
.search-results {
  padding-top: 5px;
  padding-bottom: 10px;
  width: 100%;
}

hr.menu-devider {
  margin-bottom: 5px;
  border: 1px solid lightgray;
}
</style>
