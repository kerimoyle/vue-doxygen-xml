<template>
  <div class="help">
    <doxygen-index :data="data" />
  </div>
</template>

<script>
// @ is an alias to /src
import DoxygenIndex from '@/components/DoxygenIndex.vue'

export default {
  name: 'Home',
  components: {
    DoxygenIndex
  },
  props: ['data']
}
</script>
