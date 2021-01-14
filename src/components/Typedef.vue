<template>
  <dl :id="data.id" class="typedef">
    <dt class="typedef-name">
      {{ processedName }} 
    </dt>
    <dt>
      <BriefDescription :data="briefDescription" />
      (<LinkedText :item="linkedText" :class="'typedef-linked-text'" />)
    </dt>
        <dt class="typedef-definition">
      {{ processedDefinition }}
    </dt>
  </dl>
</template>

<script>
import { decodeHTML } from '../js/utilities'

import BriefDescription from './BriefDescription'
import LinkedText from './LinkedText'

export default {
  name: 'Typedef',
  components: { LinkedText, BriefDescription },
  props: {
    data: {
      type: Object
    }
  },
  computed: {
    processedDefinition() {
      return decodeHTML(this.data.definition)
    },
    processedName() {
      return this.data.name
    },
    briefDescription() {
      return { element: this.data.brief }
    },
    linkedText() {
      return this.data.typedefType
    }
  }
}
</script>
