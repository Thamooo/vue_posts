<style lang="scss">
@import '@scss/globals.scss';
</style>

<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link>
    |
    <router-link to="/about">About</router-link>
  </div>
  <router-view /> -->
  <div>
    <Header></Header>
    <router-view />
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@components/Header.vue'
import Footer from '@components/Footer.vue'

export default {
  components: {
    Header,
    Footer,
  },
}
</script>
