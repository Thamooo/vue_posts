<style scoped lang="scss">
@import '@scss/variables';
@import '@scss/blog/comments.scss';
</style>

<template>
  <div class="blog__single__comments">
    <h2 class="blog__single__comments__h2">Комментарии</h2>
    <div
      v-for="comment in comments"
      :key="comment.id"
      class="blog__single__comments__single"
    >
      <div class="blog__single__comments__single__img-holder">
        <img
          class="blog__single__comments__single__img-holder_img"
          src="@images/profile.jpg"
        />
      </div>
      <div class="blog__single__comments__single__details">
        <div class="blog__single__comments__single__details-title">
          {{ comment.name }}
        </div>
        <div class="blog__single__comments__single__details-comment">
          {{ comment.body }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comments: Object,
  },
  data() {
    return {
      empty: true,
    }
  },
  mounted() {},
}
</script>
