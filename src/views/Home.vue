<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
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
