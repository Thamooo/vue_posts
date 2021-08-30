<style scoped lang="scss">
@import '@scss/blog/search.scss';
</style>

<template>
  <label class="blog__search">
    <i class="blog__search_icon">
      <img src="@/assets/images/icon/search.svg" />
    </i>
    <input
      v-model="search"
      @keyup="sendData"
      placeholder="Поиск"
      class="blog__search_input"
    />
  </label>
</template>

<script>
export default {
  data() {
    return {
      search: '',
    }
  },
  methods: {
    sendData: function (e) {
      if (this.$route.name != 'Blogs') {
        if (e.keyCode == 13) {
          this.$router.push({ name: 'Blogs', query: { search: this.search } })
        }
      } else {
        this.$router.push({ name: 'Blogs', query: { search: this.search } })
      }
    },
  },
}
</script>
