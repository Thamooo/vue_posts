<style scoped lang="scss">
@import '@scss/variables';
@import '@scss/blog/card.scss';
</style>

<template>
  <div @click="openBlog" class="blog__card">
    <div class="blog__card_img-holder">
      <img class="blog__card_img" src="@images/saly.jpg" />
      <img class="blog__card_img-mob" src="@images/saly_mob.jpg" />
    </div>
    <div class="blog__card_body">
      <div class="blog__card_body_details">
        <h2 class="blog__card_body_details-h2">{{ item.title }}</h2>
        <p class="blog__card_body_details-p">
          {{ body }}
        </p>
      </div>
      <div class="blog__card_actions">
        <div class="blog__card_actions_item">
          <i class="blog__card_actions_item-message">
            <img src="@icons/message.svg" />
          </i>
          <span class="blog__card_actions_item-message-counter">
            {{ item.comments.length }}
          </span>
        </div>
        <router-link v-bind:to="'/single/?id=' + item.id + '&editable=true'">
          <div class="blog__card_actions_item">
            <i class="blog__card_actions_item-pen">
              <img src="@icons/pen.svg" />
            </i>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
  },
  data() {
    return {}
  },
  computed: {
    body: function () {
      let data = this.item.body
      if (data.length > 55) {
        return data.substring(0, 55) + '...'
      }
      return data
    },
  },
  methods: {
    openBlog: function () {
      this.$router.push({ name: 'Single', query: { id: this.item.id } })
    },
  },
  mounted() {},
}
</script>
