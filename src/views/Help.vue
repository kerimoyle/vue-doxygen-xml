<template>
  <anonymous-component :component-data="data"></anonymous-component>
</template>

<script>
// @ is an alias to /src
import { updateDoxygenRoute } from '@/router/modules/doxygen'
import AnonymousComponent from '@/components/AnonymousComponent'

// This is horrible relies 100% on the fact that the page has finished loading by the time this fires.
const scrollDelay = 500

const isInViewport = function(elem) {
  const bounding = elem.getBoundingClientRect()
  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  )
}

const updateRoute = function(to, next) {
  updateDoxygenRoute(to, next)
  if (to.hash) {
    setTimeout(() => {
      const toHash = document.querySelector(to.hash)
      if (toHash) {
        window.scrollTo({
          top: toHash.offsetTop,
          behavior: 'smooth'
        })
      }
    }, scrollDelay)
  }
}

export default {
  name: 'Home',
  components: {
    AnonymousComponent
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    updateRoute(routeTo, next)
  },
  beforeRouteUpdate(to, from, next) {
    if (to.path === from.path) {
      if (to.hash) {
        const toElem = document.querySelector(to.hash)
        if (toElem && !isInViewport(toElem)) {
          window.location.hash = to.hash
          window.scrollTo({
            top: toElem.offsetTop,
            behavior: 'smooth'
          })
        }
      }
    } else {
      updateRoute(to, next)
    }
  },
  props: ['data']
}
</script>
