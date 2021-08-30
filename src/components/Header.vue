<style scoped lang="scss">
@import '@scss/header.scss';
</style>

<template>
  <div class="container">
    <header class="header">
      <div @click="homeBtn" class="header__logo">
        Logo
      </div>
      <div class="header__side">
        <BlogSearch></BlogSearch>
        <div @click="postsBtn" class="header__posts">
          <div class="header__posts_icon">
            <img src="@/assets/images/icon/posts.svg" />
          </div>
          <span class="header__posts_title">Посты</span>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import BlogSearch from '@components/Blog/Search.vue'
export default {
  components: {
    BlogSearch,
  },
  methods: {
    homeBtn: function () {
      this.$router.push({ name: 'Blogs', query: { search: '' } })
    },
    postsBtn: function () {
      this.$router.push({ name: 'Blogs', query: { search: '' } })
    },
  },
}
</script>
