<template>
  <div class="graph-page container margin-center flex column">
    <div class="main-content">
      <h1>Graph page!</h1>
      <div class="main-content flex column space-between">
        <transition-group
          name="top-chart-transition"
          class="animated fadeInDownBig"
        >
          <div key="1" v-if="isTopChartVisible">
            <Chart :options="chartOptions.topChart" />
          </div>
          <div class="flex justify-center" key="2" v-else>
            Not enough data to display chart..
          </div>
          <div key="3" v-if="isPieVisible">
            <Chart key="3" :options="chartOptions.donut" />
          </div>
          <div v-else class="flex justify-center" key="4">
            Not enough data to display pie chart..
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { Chart } from "highcharts-vue";
import Footer from "../components/Footer";

export default {
  name: "GraphPage",
  components: {
    Chart,
    Footer,
  },
  data() {
    return {
      isChanged: false,
      items: [],
      chartOptions: {
        topChart: {
          title: { text: "Votes Graph" },
          tooltip: {
            shared: true,
            useHTML: true,
            backgroundColor: "#FCFFC5",
            borderColor: "black",
            borderRadius: 10,
            borderWidth: 3,
            formatter() {
              return `
            <strong>${this.points[0]?.series.name}</strong>
              : 
              ${this.points[0].point.votesCount}
               <br>
             <strong>${this.points[1]?.series.name} </strong>
              :
              ${this.points[1]?.y}
              <br>
             <strong>${this.points[0].point.releasedAt} </strong>
             :
             ${this.points[0].point.released}
                `;
            },
          },
          xAxis: {
            categories: [],
            crosshair: true,
          },
          yAxis: {
            crosshair: true,
          },
          series: [
            {
              name: "imdb votes",
              type: "bar",
              data: [],
            },
            {
              name: "imdb ratings",
              type: "line",
              data: [],
            },
          ],
        },
        donut: {
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: "pointer",
              dataLabels: {
                enabled: true,
                format: "<b>{point.name}</b>: {point.percentage:.1f} %",
              },
              tooltip: {
                useHTML: true,
                pointFormat: "<b>{point.boxOffice} </b>",
              },
            },
          },
          title: { text: "Movie Revenues" },
          allowPointSelect: true,
          chart: {
            type: "pie",
          },
          categories: [],
          series: [
            {
              data: [],
            },
          ],
        },
      },
    };
  },
  async created() {
    await this.loadPage();
    this.onAddToVisitedPage();
    await this.sortByYear(this.getPaginatedPage);
    await this.onGetdetailedItems();
  },

  methods: {
    async onGetdetailedItems() {
      this.getSortedChart.map(async (item) => {
        const imdbVotes = item.imdbVotes.split(",").join("");
        const imdbRating = item.imdbRating;

        const lineChartItem = {
          name: item.Title,
          y: parseInt(imdbVotes),
          votesCount: item.imdbVotes,
          releasedAt: "releasedAt:",
          released: item.Released,
          Year: item.Year,
        };
        if (lineChartItem.votesCount !== "N/A") {
          this.chartOptions.topChart.xAxis.categories.push(lineChartItem.name);
          this.chartOptions.topChart.series[0].data.push(lineChartItem);
          this.chartOptions.topChart.series[1].data.push(
            parseFloat(imdbRating)
          );
        }
        let boxOffice = parseFloat(item.BoxOffice.substring(1));

        const pieData = {
          name: item.Title,
          y: boxOffice,
          boxOffice: item.BoxOffice,
        };

        if (typeof boxOffice === "number") {
          this.chartOptions.donut.series[0].data.push(pieData);
        }
      });
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

    onAddToVisitedPage() {
      const lastVisitedPages = this.getVisitedPages;
      if (lastVisitedPages.includes("graphPage")) return;
      this.addVisitedPage("graphPage");
    },

    ...mapActions([
      "addVisitedPage",
      "paginatePage",
      "addToChartItems",
      "sortByYear",
    ]),
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
    isPieVisible() {
      return this.chartOptions.donut.series[0].data.length > 0;
    },
    isTopChartVisible() {
      return this.chartOptions.topChart.series[0].data.length > 0;
    },
    ...mapGetters([
      "getDetailedItem",
      "getVisitedPages",
      "getPaginatedPage",
      "getSortedChart",
    ]),
  },
};
</script>

<style scoped>
.graph-page {
  padding: 20px;
  min-height: 88vh;
  margin-bottom: 5px;
  align-items: stretch;
}
</style>

