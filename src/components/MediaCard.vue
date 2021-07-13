<template>
  <div class="media-card flex justify-center">
    <b-card
      :title="media.Title"
      :img-src="getImg"
      :img-alt="media.Title"
      img-top
      tag="article"
      class="mb-2"
    >
      <b-card-text
        style="color: #fff; text-decoration: none; max-width: 300px"
        class="card-plot"
      >
        {{ showShortPlot }}...
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import placeholder from "../assets/img-placeholder.png";

export default {
  name: "MediaCard",
  props: {
    media: {
      type: Object,
      required: true,
    },
  },
  components: {},
  data() {
    return {
      currPlot: "",
    };
  },
  async created() {
    await this.getItem(this.media.imdbID);
    this.currPlot = this.getDetailedItem.Plot;
  },
  methods: {
    ...mapActions(["getItem"]),
  },
  computed: {
    showShortPlot() {
      return this.currPlot.substring(0, 145);
    },
    getImg() {
      return this.media.Poster === "N/A" ? placeholder : this.media.Poster;
    },

    ...mapGetters(["getDetailedItem"]),
  },
};
</script>

<style lang="scss">
.media-card {
  background-color: #1f1f1f;

  // margin: 5px;
  padding: 3px;
  .mb-2 {
    .card-img-top {
      width: 100%;
      max-height: 350px;
      object-fit: cover;
    }
    .card-body {
      h4.card-title {
        color: #fff;
        text-decoration: underline;
      }
      a {
        color: #fff !important;
        text-decoration: none !important;
      }
    }
  }
}
</style>
