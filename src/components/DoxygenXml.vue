<template>
  <div class="doxygen-xml">
    <doxygen-component :component-data="data"></doxygen-component>
  </div>
</template>

<script>
// import { mapActions } from 'vuex'
// import { getPageStem } from '@/router/modules/doxygen'

import DoxygenComponent from '@/components/DoxygenComponent'

export default {
  name: 'DoxygenXml',
  components: {
    DoxygenComponent
  },
  props: {
    data: Object
  }
  //   this.registerBaseURL({ baseUrl: this.baseURL, routeURL })
  // },
  // methods: {
  //   ...mapActions('doxygen', ['registerBaseURL'])
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/*
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
*/
</style>
