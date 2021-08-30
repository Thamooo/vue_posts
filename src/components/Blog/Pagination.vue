<template>
  <ul v-show="props.showPagination" class="blogs__pagination">
    <li
      v-if="props.hasEdgeNav"
      :class="props.theme.firstPage"
      @click="props.setFirstPage"
    >
      <button type="button" v-bind="props.firstPageProps">
        {{ props.texts.first }}
      </button>
    </li>

    <li :class="props.theme.prev" @click="props.setPrevPage">
      <button type="button" v-bind="props.prevProps">
        {{ props.texts.prevPage }}
      </button>
    </li>

    <li
      v-for="page in props.pages"
      :key="page"
      :class="props.pageClasses(page)"
      v-on="props.pageEvents(page)"
    >
      <button type="button" v-bind="props.aProps" :class="props.theme.link">
        {{ page }}
      </button>
    </li>

    <li :class="props.theme.next" @click="props.setNextPage">
      <button type="button" v-bind="props.nextProps">
        {{ props.texts.nextPage }}
      </button>
    </li>

    <li
      v-if="props.hasEdgeNav"
      :class="props.theme.lastPage"
      @click="props.setLastPage"
    >
      <button type="button" v-bind="props.lastPageProps">
        {{ props.texts.last }}
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['props'],
}
</script>
