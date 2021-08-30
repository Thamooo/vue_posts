<style scoped lang="scss">
@import '@scss/variables';
@import '@scss/blog/all.scss';
</style>

<template>
  <div class="container">
    <div class="blogs">
      <div class="blogs__header">
        <h1 class="blogs__header_h1">Посты</h1>
        <div class="blogs__header_search">
          <BlogSearch></BlogSearch>
        </div>
      </div>
      <div v-if="items.length > 0" class="blogs__items">
        <BlogCard
          v-for="item in items"
          v-bind:item="item"
          :key="item.id"
        ></BlogCard>
        <!-- <BlogCard></BlogCard> -->
      </div>
      <div v-if="items.length > 0" class="blogs__pagination">
        <button
          @click="paginatePrev"
          class="blogs__pagination_prev blogs__pagination_item"
        >
          <img src="@icons/arrow_left.svg" />
        </button>
        <button
          v-for="page in pages"
          :key="page.page"
          :page="page.page"
          class="blogs__pagination_page blogs__pagination_item"
          @click="paginatePage"
          :class="{ 'blogs__pagination_item-active': page.active }"
        >
          {{ page.page }}
        </button>
        <button
          @click="paginateNext"
          class="blogs__pagination_next blogs__pagination_item"
        >
          <img src="@icons/arrow_right.svg" />
        </button>
      </div>
      <div v-else-if="loading" class="blogs__notfound">
        <h2 class="blogs__loading-h2">Загружается...</h2>
      </div>
      <div v-else class="blogs__notfound">
        <h2 class="blogs__notfound-h2">К сожалению, постов не обнаружено</h2>
      </div>
    </div>
  </div>
</template>

<script>
import BlogCard from '@components/Blog/Card.vue'
import BlogSearch from '@components/Blog/Search.vue'

const axios = require('axios')

export default {
  components: {
    BlogCard,
    BlogSearch,
  },
  data() {
    return {
      loading: true,
      per_page: 9,
      page: 1,
      items: {},
      total_pages: 1,
      pages: {},
      search: '',
    }
  },
  watch: {
    page: function () {
      this.loadData()
    },
    $route(to) {
      if (to.query.search != undefined) {
        this.page = 1
        this.search = to.query.search
        this.loadData()
      }
    },
  },
  mounted() {
    if (this.$route.query.search != undefined) {
      this.search = this.$route.query.search
    }
    this.loadData()
  },
  methods: {
    loadData: function () {
      this.loading = true
      axios
        .get(
          'http://localhost:3000/posts?_embed=comments&_page=' +
            this.page +
            '&_limit=' +
            this.per_page +
            '&q=' +
            this.search,
          {
            crossdomain: true,
            headers: {
              'Test-Header': 'Link',
            },
          },
        )
        .then((response) => {
          this.loading = false
          this.items = response.data
          this.paginate(response.headers['x-total-count'])
        })
    },
    paginate: function (total_items) {
      this.total_pages = Math.ceil(total_items / this.per_page)
      let pages = []
      for (let i = 1; i <= this.total_pages; i++) {
        pages.push({
          page: i,
          active: this.page == i,
        })
      }

      let to_return = []
      if (this.total_pages <= 5) {
        to_return = pages
      } else {
        if (this.page == 1) {
          to_return = pages.slice(0, 3).concat(pages[this.total_pages - 1])
        } else if (this.page == this.total_pages) {
          to_return = [pages[0]].concat(pages.slice(-3))
        } else if (this.page == 2) {
          to_return = [
            pages[0],
            pages[this.page - 1],
            pages[this.page],
            pages[this.total_pages - 1],
          ]
        } else if (this.page == pages.length - 1) {
          to_return = [
            pages[0],
            pages[this.page - 2],
            pages[this.page - 1],
            pages[this.page],
          ]
        } else {
          to_return = [
            pages[0],
            pages[this.page - 2],
            pages[this.page - 1],
            pages[this.page],
            pages[pages.length - 1],
          ]
        }
        to_return.forEach(function (val, key) {
          if (
            val.page != '...' &&
            to_return[key + 1] != undefined &&
            val.page + 1 != to_return[key + 1].page
          ) {
            to_return.splice(key + 1, 0, {
              page: '...',
              active: false,
            })
          }
        })
      }
      this.pages = to_return
    },
    paginatePage: function (e) {
      let page = e.currentTarget.getAttribute('page')
      if (e.currentTarget.getAttribute('page') != '...') {
        this.page = page
      }
    },
    paginatePrev: function () {
      if (this.page > 1) {
        this.page--
      }
    },
    paginateNext: function () {
      if (this.page < this.total_pages) {
        this.page++
      }
    },
  },
}
</script>
