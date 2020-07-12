<template>
  <anonymous-component
    :component-data="data"
    :component-type="componentType"
  ></anonymous-component>
</template>

<script>
import AnonymousComponent from '@/components/AnonymousComponent'
import { updateDoxygenRoute } from '@/router/index'

export default {
  name: 'HelpSubPage',
  props: {
    data: {
      type: Object,
      required: true
    },
    componentType: {
      type: String,
      required: true
    }
  },
  components: { AnonymousComponent },
  beforeRouteUpdate(to, from, next) {
    if (to.path === from.path) {
      if (to.hash && to.hash !== from.hash) {
        window.location.hash = to.hash
        window.scrollTo({
          top: document.querySelector(to.hash).offsetTop,
          behavior: 'smooth'
        })
      }
    } else {
      updateDoxygenRoute(to, next)
    }
  }
}
</script>

<style scoped></style>
