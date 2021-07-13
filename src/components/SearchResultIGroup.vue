<template>
  <div>
    <h3 class="title">{{ title }}</h3>

    <div class="search-item" v-for="(item, idx) in items" :key="idx">
      <router-link
        :to="{
          name: 'item-page',
          params: {
            type: mediaType,
            year: 'All',
            page: 1,
            searchTitle: item.Title,
            id: item.imdbID,
          },
        }"
      >
        <p>{{ item.Title }}</p>
      </router-link>
    </div>
    <p @click="goTo" class="show-all">ShowAll...</p>
  </div>
</template>

<script>
export default {
  name: "SearchItem",
  props: {
    title: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    mediaType: {
      type: String,
      required: true,
    },
  },
  methods: {
    goTo() {
      this.$emit("linkTo", this.mediaType.toLowerCase());
    },
  },
};
</script>

<style scoped lang="scss">
h3.title {
  margin-bottom: 5px;
}
.show-all {
  margin-bottom: 5px;
  font-size: 14px;
  &:hover {
    background-color: lightgray;
    cursor: pointer !important;
  }
}
.search-item {
  font-size: 15px;
  font-weight: 600;
  a {
    color: #1f1f1f;
  }
  &:hover {
    background-color: lightgray;
    cursor: pointer !important;
  }
}
</style>
