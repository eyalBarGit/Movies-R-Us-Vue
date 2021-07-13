<template>
  <transition-group class="animated fadeInDown" tag="div">
    <div key="item-page-transition" class="item-page">
      <div @click="toggleSearch" class="hero">
        <section
          class="top-search-bar-section flex align-center justify-center"
        >
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

        <section class="hero-main-content container margin-center white-text">
          <div class="top-section flex align-center space-between">
            <div class="title">
              <h1>{{ getDetailedItem.Title }}</h1>
              <p>
                {{ getDetailedItem.Year }} | {{ getDetailedItem.Rated }} |
                <span v-if="this.getDetailedItem.Runtime">
                  {{ getRunTime }}</span
                >
              </p>
            </div>

            <div class="ratings-section">
              <div
                key="transitioned-ratings"
                v-if="getDetailedItem.Ratings"
                class="other-ratings flex"
              >
                <Ratings
                  v-for="(rating, idx) in getDetailedItem.Ratings"
                  :itemRatings="rating"
                  :key="idx"
                />
              </div>
            </div>
          </div>
          <hr />

          <div class="middle-section">
            <section class="img-section flex justify-center">
              <img :src="getImg" alt="" srcset="" />
            </section>
            <p>{{ getDetailedItem.Genre }}</p>
          </div>
          <hr />

          <div class="bottom-section white-text">
            <button @click="onOpenNoteModal" class="note-btn">
              Add a note
            </button>
            <section class="description">
              <h2 style="text-decoration: underline">Description</h2>
              <p>
                {{ getDetailedItem.Plot }}
              </p>
              <h3 class="underline">Writer</h3>
              <p>
                {{ getDetailedItem.Writer }}
              </p>
              <h3 class="underline">Actors</h3>
              <p>
                {{ getDetailedItem.Actors }}
              </p>
              <h3 class="underline">Awards</h3>
              <p>
                {{ getDetailedItem.Awards }}
              </p>
            </section>
          </div>
        </section>
      </div>
      <ModalComp :showModal="showModal" @sendNote="onSendNote" />
    </div>
  </transition-group>
</template>

<script>
import SearchBar from "../components/SearchBar";
import { mapActions, mapGetters } from "vuex";
import Ratings from "../components/Ratings";
import ModalComp from "../components/ModalComp";
import Swal from "sweetalert2";
import Footer from "../components/Footer";
import placeholder from "../assets/img-placeholder.png";

export default {
  name: "MediaItemDetails",
  components: {
    SearchBar,
    Ratings,
    ModalComp,
    Footer,
  },
  data() {
    return {
      showModal: false,
    };
  },
  async created() {
    this.clearDetailedItem();
    await this.getCurrItem();
    this.onAddToVisitedPage();
  },
  methods: {
    async getCurrItem(id = this.$route.params.id) {
      await this.getItem(id);
    },
    toggleSearch() {
      this.closeResultList();
    },
    onSendNote(note) {
      note.moveiId = this.$route.params.id;
      this.sendNote(note);
    },
    showSuccessMessage() {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "sent",
        showConfirmButton: false,
        timer: 1000,
        background: "#223d3d",
        iconColor: "lightgreen",
      });
    },
    onOpenNoteModal() {
      this.showModal = true;
      setTimeout(() => {
        this.$modal.show("my-modal");
      }, 0);
    },
    onAddToVisitedPage() {
      const lastVisitedPages = this.getVisitedPages;
      if (lastVisitedPages.includes("detailsPage")) return;
      this.addVisitedPage("detailsPage");
    },

    ...mapActions([
      "getItem",
      "closeResultList",
      "sendNote",
      "addVisitedPage",
      "clearDetailedItem",
    ]),
  },
  computed: {
    getRunTime() {
      if (this.getDetailedItem.Runtime === "N/A") return;
      const runtime = parseInt(this.getDetailedItem.Runtime);
      const hours = runtime / 60;
      const hoursDifference = Math.floor(runtime / 60);
      const minutes = Math.floor((hours - hoursDifference) * 60);

      return hoursDifference + "h " + minutes + "min ";
    },
    getImg() {
      return this.getDetailedItem.Poster === "N/A"
        ? placeholder
        : this.getDetailedItem.Poster;
    },
    ...mapGetters(["getDetailedItem", "getVisitedPages", "getNoteResponse"]),
  },
  watch: {
    ["getNoteResponse"]: function () {
      if (!this.getNoteResponse) return;
      this.showSuccessMessage();
    },
    $route(to, from) {
      this.getCurrItem();
    },
  },
};
</script>

<style  lang="scss">
.item-page {
  background-color: #1f1f1f;
  .hero {
    min-height: 88vh;
    position: relative;
    width: 100%;

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

    .hero-main-content {
      .top-section {
        height: 100%;
        padding-top: 40px;
        .title {
          h1 {
            font-size: 55px;
            font-weight: 400;
          }
        }
      }
      .middle-section {
        padding-top: 25px;
      }
      .bottom-section {
        position: relative;
        .note-btn {
          -webkit-border-radius: 10px;
          -moz-border-radius: 10px;
          border-radius: 10px;
          color: #ffffff;
          font-size: 16px;
          font-weight: 100;
          padding: 3px 15px;
          background-color: #4d5156;
          -webkit-box-shadow: 1px 1px 20px 0 #000000;
          -moz-box-shadow: 1px 1px 20px 0 #000000;
          box-shadow: 1px 1px 20px 0 #000000;
          text-shadow: 1px 1px 20px #000000;
          border: solid #ffffff 1px;
          cursor: pointer;
          text-align: center;
          position: absolute;
          top: 0;
          right: 0;
        }
      }
    }
  }
  .white-text {
    color: #fff !important;
  }

  hr {
    border: 1px solid rgb(75, 75, 75);
  }
}

@media (max-width: 768px) {
  .hero {
    .top-search-bar-section {
      .top-search-bar {
        width: 85vw;
      }
    }

    .hero-main-content {
      .top-section {
        .title {
          h1 {
            font-size: 22px;
          }
          p {
            font-size: 12px;
            span {
              margin-right: 5px;
            }
            span:not(:first-child) {
              margin-left: 5px;
            }
          }
        }
      }
    }
  }
}
@media (max-width: 580px) {
  .hero {
    .hero-main-content {
      .top-section {
        .title {
          h1 {
            font-size: 20px !important;
          }
          p {
            font-size: 12px;
            span {
              margin-right: 5px;
            }
            span:not(:first-child) {
              margin-left: 5px;
            }
          }
        }
      }
    }
  }
}
</style>
