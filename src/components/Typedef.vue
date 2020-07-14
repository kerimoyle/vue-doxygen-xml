<template>
  <dl :id="data.id" class="typedef">
    <dt>
      {{ processedDefinition }}
    </dt>
    <dt>
      <brief-description :data="briefDescription" />(
      <linked-text :item="linkedText" />)
    </dt>
  </dl>
</template>

<script>
import { decodeHTML } from '@/js/utilities'

import BriefDescription from '@/components/BriefDescription'
import LinkedText from '@/components/LinkedText'

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
    briefDescription() {
      return { element: this.data.brief }
    },
    linkedText() {
      return this.data.typedefType
    }
  }
}
</script>
