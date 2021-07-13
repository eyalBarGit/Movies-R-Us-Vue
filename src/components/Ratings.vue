<template>
  <div class="ratings">
    <div class="top-ratings-section">
      <p>{{ itemRatings.Source }}</p>
    </div>
    <div class="mid-ratings-section">
      <custom-icon class="star-icon" icon="star"></custom-icon>
    </div>
    <div class="bottom-ratings-section">
      <p>
        {{ itemRatings.Value }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Ratings",
  props: {
    itemRatings: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.ratings {
  max-width: 130px;
  .top-ratings-section {
    height: 45px;
    text-align: center;
    font-size: 18px;
    color: lightgray;
    line-height: 1;
    font-weight: 700;
  }
  .mid-ratings-section {
    text-align: center;
    .star-icon {
      color: #f6ca2a;
    }
  }
  .bottom-ratings-section {
    p {
      text-align: center;
    }
  }

  @media (max-width: 580px) {
    .top-ratings-section {
      font-size: 12px;
      width: 70px;
    }
  }
}
</style>
