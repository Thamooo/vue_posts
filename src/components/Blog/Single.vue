<style scoped lang="scss">
@import '@scss/variables';
@import '@scss/blog/single.scss';
</style>

<template>
  <div class="container">
    <div v-if="!error && !loading" class="blog__single">
      <div class="blog__single__header">
        <button @click="goBack" class="blog__single__header__button">
          <span class="blog__single__header__button-icon"></span>
          <span class="blog__single__header__button-title">Назад</span>
        </button>
        <span class="blog__single__header__text">Пост</span>
      </div>
      <div class="blog__single__img-holder">
        <img class="blog__single__img-holder_img" src="@images/blog.png" />
        <img
          class="blog__single__img-holder_img-mob"
          src="@images/blog_mob.png"
        />
      </div>
      <h1 class="blog__single__h1">
        {{ post.title }}
      </h1>
      <p v-if="!editable" class="blog__single__p">
        {{ post.body }}
      </p>
      <div class="blog__single__edit">
        <button
          @click="editChangeBody"
          v-if="!editable"
          class="blog__single__edit_button"
        >
          <img
            class="blog__single__edit_button-icon"
            src="@icons/pen_purple.svg"
          />
          <span class="blog__single__edit_button-title">
            Редактировать текст
          </span>
        </button>
        <div v-else class="blog__single__edit_form">
          <textarea
            :value="post.body"
            @keyup="handleChangeBody"
            class="blog__single__edit_form__textarea"
          ></textarea>
          <div class="blog__single__edit_form__buttons">
            <button
              @click="saveChangeBody"
              class="button button__primary blog__single__edit_form__buttons__button"
            >
              Сохранить изменения
            </button>
            <button
              @click="cancelChangeBody"
              class="button button__secondary blog__single__edit_form__buttons__button"
            >
              Отменить
            </button>
          </div>
        </div>
      </div>
      <BlogComments v-bind:comments="this.post.comments"></BlogComments>
    </div>
    <div v-if="error && !loading" class="blog__single-notfound">
      <div class="blog__single-notfound__text">
        Постов не найдено
      </div>
    </div>
    <div v-if="loading" class="blog__single-loading">
      <div class="blog__single-loading__text">
        Загружается...
      </div>
    </div>
  </div>
</template>

<script>
import BlogComments from '@components/Blog/Comments.vue'

const axios = require('axios')

export default {
  components: {
    BlogComments,
  },
  data() {
    return {
      loading: true,
      error: false,
      id: 0,
      editable: false,
      post: {},
      changed_comment: '',
    }
  },
  watch: {
    editable: function () {
      this.routerChange()
    },
  },
  mounted() {
    let query = this.$route.query
    let id = parseInt(query.id)
    if (isNaN(id) && parseInt(query.id) == 0) {
      this.error = true
      return
    } else {
      this.id = id
    }

    if (query.editable) {
      this.editable = true
    }

    this.loadData()
  },
  methods: {
    loadData: function () {
      this.loading = true
      axios
        .get('http://localhost:3000/posts?_embed=comments&id=' + this.id, {
          crossdomain: true,
          headers: {
            'Test-Header': 'Link',
          },
        })
        .then((response) => {
          this.loading = false
          this.post = response.data[0]
        })
    },
    handleChangeBody: function (e) {
      this.changed_comment = e.target.value
    },
    editChangeBody: function () {
      console.log(this.$router)
      this.editable = true
    },
    saveChangeBody: function () {
      if (this.changed_comment != this.post.body) {
        axios
          .patch('http://localhost:3000/posts/' + this.id, {
            body: this.changed_comment,
          })
          .then((response) => {
            this.post.body = response.data.body
            this.editable = false
          })
      } else {
        this.editable = false
      }
    },
    cancelChangeBody: function () {
      this.editable = false
    },
    routerChange: function () {
      let query = Object.assign({}, this.$route.query)
      if (this.editable == false) {
        delete query.editable
      } else {
        query.editable = true
      }
      this.$router.replace({ query })
    },
    goBack: function () {
      this.$router.go(-1)
    },
  },
}
</script>
