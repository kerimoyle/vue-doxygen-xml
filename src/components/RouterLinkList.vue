<template>
  <div>
    <template v-for="link in links.slice(0, lastIndex)">
      <router-link :to="link.refId" :key="link.refId">{{
        link.name
      }}</router-link>
      <span v-if="linkCount > 1" :key="'span_' + link.refId">, </span>
    </template>
    <template v-if="linkCount > 1">
      <span>and </span>
    </template>
    <router-link :to="links[lastIndex].refId">{{
      links[lastIndex].name
    }}</router-link>
  </div>
</template>

<script>
export default {
  name: 'RouterLinkList',
  props: {
    links: {
      type: Array
    }
  },
  computed: {
    linkCount() {
      return this.links.length
    },
    lastIndex() {
      return this.links.length - 1
    }
  }
}
</script>

<style scoped></style>
