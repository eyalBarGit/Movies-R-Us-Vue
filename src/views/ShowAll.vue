<template>
  <div key="show" class="show-all-page">
    <section class="top-search-bar-section flex align-center justify-center">
      <div
        class="
          top-search-bar
          margin-center
          white-text
          flex
          align-center
          justify-center
        "
      >
        <SearchBar />
      </div>
    </section>
    <div class="show-all-page-main-content container margin-center">
      <h2>
        Search {{ capitalizeSearchType }}s by "{{ routeParamsSearchTitle }}"
      </h2>
      <div class="top-bar align-center flex space-between">
        <div class="filter-section flex align-center">
          <p class="filter-label">select year</p>
          <b-form-select
            @change="onFilterYears(selectedYear)"
            v-model="selectedYear"
            :options="options"
          ></b-form-select>
        </div>
        <button class="graph-btn" @click="onCreateGraph">Create Graph</button>
      </div>
      <Spinner v-if="getPaginatedPage.Error"></Spinner>

      <div v-if="getPaginatedPage.Search" class="grid">
        <div
          class="media-card"
          v-for="(mediaItem, idx) in getPaginatedPage.Search"
          :key="idx"
        >
          <router-link
            :to="{
              name: 'item-page',
              params: {
                type: routeParamsType,
                searchTitle: routeParamsTitle,
                year: routeParamsYear,
                page: routeParamsPageNum,
                id: mediaItem.imdbID,
              },
            }"
          >
            <MediaCard :media="mediaItem" />
          </router-link>
        </div>
      </div>
      <div class="pagination-and-charts">
        <Pagination
          :edgeNavigation="true"
          v-model="page"
          :records="getResultCount"
          :per-page="perPage"
          @paginate="getPage"
          class="pagination-bar flex"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MediaCard from "../components/MediaCard";
import Pagination from "vue-pagination-2";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner.vue";

export default {
  name: "ShowAll",
  components: {
    MediaCard,
    Pagination,
    SearchBar,
    Footer,
    Spinner,
  },
  data() {
    return {
      media: null,
      selectedYear: null,
      options: [{ value: "All", text: "All" }],
      page: 1,
      perPage: 10,
    };
  },
  async created() {
    await this.loadPage();
    this.setFilterYears();
    this.getResultCount;
    this.onAddToVisitedPage();
    this.setPageNum();
    this.setSelectedYear();
  },

  methods: {
    setFilterYears() {
      for (let i = 2021; i >= 1900; i--) {
        const year = { value: i, text: i };
        this.options.push(year);
      }
    },

    async onFilterYears() {
      await this.getPage(1);
    },

    async getPage(page) {
      const nextRoute = `/gallery/${this.routeParamsType}/${this.routeParamsTitle}/${this.selectedYear}/${page}`;
      const currRoute = this.getCurrRoute;
      if (currRoute === nextRoute) return;
      this.$router.push(nextRoute);
      await this.loadPage();
    },
    async loadPage() {
      const currPage = {
        searchTitle: this.routeParamsTitle,
        pageNum: this.routeParamsPageNum,
        mediaType: this.routeParamsType,
        year: this.routeParamsYear,
      };
      await this.paginatePage(currPage);
    },
    onCreateGraph() {
      this.$router.push(
        `/graph/${this.routeParamsType}/${this.routeParamsTitle}/${this.selectedYear}/${this.routeParamsPageNum}`
      );
    },
    onAddToVisitedPage() {
      const lastVisitedPages = this.getVisitedPages;
      if (lastVisitedPages.includes("showAllPage")) return;
      this.addVisitedPage("showAllPage");
    },
    setPageNum() {
      this.page = this.routeParamsPageNum;
    },
    setSelectedYear() {
      this.selectedYear = this.routeParamsYear;
    },
    ...mapActions(["paginatePage", "addVisitedPage", "createChartsData"]),
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
      return this.$route.params.year;
    },
    routeParamsSearchTitle() {
      const searchBy = this.$route.params.searchTitle;
      const titleCapitalized =
        searchBy.charAt(0).toUpperCase() + searchBy.slice(1);
      return titleCapitalized;
    },
    capitalizeSearchType() {
      const capitalizedSearchType =
        this.routeParamsType.charAt(0).toUpperCase() +
        this.routeParamsType.slice(1);
      return capitalizedSearchType;
    },
    getResultCount() {
      return parseInt(this.getPaginatedPage?.totalResults);
    },
    getCurrRoute() {
      return this.$route.fullPath;
    },

    ...mapGetters([
      "getStoredMedia",
      "getPaginatedPage",
      "getVisitedPages",
      "getFilteredMedia",
    ]),
  },
  watch: {
    $route(to, from) {
      this.loadPage();
      // react to route changes...
    },
  },
};
</script>

<style  lang="scss" >
.show-all-page {
  min-height: 88vh;
  .top-search-bar-section {
    position: relative;
    background-color: black;
    padding: 10px;
    height: 50px;
    .top-search-bar {
      background-color: black;
      border-radius: 45px;
      position: absolute;
      top: 1px;
      .search-bar {
        color: #fff;
        .search-item {
          a {
            color: #fff;
            cursor: pointer;
          }
        }
      }

      input {
        color: #fff;
      }
    }
  }
  .show-all-page-main-content {
    .filter-section {
      .filter-label {
        margin-right: 5px;
      }
    }
    .grid {
      height: 100%;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 10px;
    }

    .pagination-and-charts {
      margin-top: 20px;
      margin-bottom: 20px;
      .VuePagination {
        width: 100%;
        nav {
          width: 100% !important;
          display: flex;
          flex-direction: column;
          align-items: center;
          ul.VuePagination__pagination.pagination {
            align-items: center;
            justify-content: center;
            list-style: none;
            li {
              margin-left: 5px;
              margin-right: 5px;
              box-shadow: inset 0px 1px 0px 0px #ffffff;
              background: linear-gradient(to bottom, #f9f9f9 5%, #e9e9e9 100%);
              background-color: #f9f9f9;
              border-radius: 6px;
              border: 1px solid #dcdcdc;
              display: inline-block;
              cursor: pointer;
              color: #666666;
              font-family: Arial;
              font-size: 10px;
              font-weight: bold;
              padding: 3px 9px;
              text-decoration: none;
              text-shadow: 0px 1px 0px #ffffff;

              &:hover {
                background: linear-gradient(
                  to bottom,
                  #e9e9e9 5%,
                  #f9f9f9 100%
                );
                background-color: #e9e9e9;
              }
              &:active {
                position: relative;
                top: 1px;
              }
            }
          }
        }
        p.VuePagination__count {
          display: inline-block;
        }
      }
    }
  }
  .top-bar {
    margin-bottom: 5px;
    .graph-btn {
      background-color: black;
      border: none;
      color: #fff;
      padding: 10px;
      cursor: pointer;
      &:active {
        transform: scale(0.9);
      }
    }
  }
}
</style>
