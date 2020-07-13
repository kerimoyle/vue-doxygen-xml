<template>
  <div class="home">
    <img alt="Project logo" src="@/assets/logo.svg" />
    <doxygen-xml msg="Welcome to Doxygen XML" />
  </div>
</template>

<script>
// @ is an alias to /src
import DoxygenXml from '@/components/DoxygenXml.vue'

export default {
  name: 'Home',
  components: {
    DoxygenXml
  }
}
</script>

<style lang="scss" scoped>
img {
  width: 17em;
}
</style>
