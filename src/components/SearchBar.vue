<template>
  <div class="search-bar flex column justify-center">
    <div class="search-bar-container">
      <form class="flex align-center" @submit.prevent="onSearch">
        <custom-icon icon="search"></custom-icon>
        <input
          @click="openSearchList"
          @input="onStartTyping"
          v-model="searchTitle"
          type="text"
          placeholder="I'm looking for..."
          ref="input"
        />
      </form>
      <SearchResultsList
        :searchTitle="searchTitle"
        v-if="getNum"
        class="dropdown"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import _ from "lodash";
import SearchResultsList from "./SearchResultsList";
export default {
  name: "SearchBar",
  components: {
    SearchResultsList,
  },
  data() {
    return {
      searchTitle: null,
    };
  },

  mounted() {
    this.focusInput();
  },
  methods: {
    async onSearch() {
      await this.query(this.searchTitle);
    },
    onStartTyping({ keyCode }) {
      if (!this.searchTitle) this.clearList();
      if (this.searchByLength < 3) return;
      if (keyCode === 8) return;
      this.debounce();
    },
    debounce: _.debounce(
      function () {
        this.openSearchList();
        this.query(this.searchTitle);
      },
      200,
      { maxWait: 1000 }
    ),
    focusInput() {
      this.$refs.input.focus();
    },
    openSearchList() {
      this.openResultList();
    },
    ...mapActions(["query", "clearList", "openResultList"]),
  },

  computed: {
    getNum() {
      return this.searchTitle && this.getIsResultOpen;
    },
    searchByLength() {
      return this.searchTitle?.length;
    },
    ...mapGetters(["getMovies", "getGames", "getSeries", "getIsResultOpen"]),
  },
};
</script>

<style lang="scss" scoped>
.search-bar {
  border: 1px solid rgb(211, 211, 211);
  border-radius: 50px;
  width: 550px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  -webkit-box-shadow: 0px 5px 5px -8px #000000;
  box-shadow: 0px 5px 5px -8px #000000;
  transition: 0.15s ease-in-out;
  &:hover {
    -webkit-box-shadow: 0px 0px 12px -4px #000000;
    box-shadow: 0px 0px 12px -4px #000000;
  }
  .search-bar-container {
    position: relative;
    input {
      width: 100%;
      border: none;
      background-color: transparent;
      font-size: 18px;
      padding-left: 15px;
    }
  }
}
.results {
  margin: 0 auto;
  width: 80%;
  background-color: lightgray;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .search-bar {
    width: 80vw;
  }
}
</style>
