<template>
  <span>
    <template v-if="item.reference === null && item.text">
      {{ decodedText }}
    </template>
    <template v-else-if="item.reference !== null">
      {{ preDecodedText }}
      <router-link
        :to="{
          path: derivedLink.path,
          hash: derivedLink.hash
          // params: item.link.params,
        }"
        >{{ decodedText }}</router-link
      >
      {{ postDecodedText }}
    </template>
  </span>
</template>

<script>
import { mapGetters } from 'vuex'
import { decodeHTML } from '@/js/utilities'

export default {
  name: 'LinkedText',
  props: {
    item: {
      type: Object
    },
    link: {
      type: Object
    }
  },
  computed: {
    ...mapGetters({
      getPageIdForReferenceId: 'doxygen/getPageIdForReferenceId'
    }),
    decodedText() {
      if (this.item.reference !== null) {
        return this.item.linkedText
      }
      return decodeHTML(this.item.text)
    },
    preDecodedText() {
      const preText = this.item.text.split(this.item.linkedText)[0]
      return decodeHTML(preText)
    },
    postDecodedText() {
      const preText = this.item.text.split(this.item.linkedText)[1]
      return decodeHTML(preText)
    },
    derivedLink() {
      if (this.link) {
        return this.link
      }
      let derivedLink = { path: undefined, hash: undefined }
      if (this.item.reference.refKind === 'member') {
        derivedLink.hash = this.item.reference.refId
        derivedLink.path = this.getPageIdForReferenceId(derivedLink.hash)
      } else if (this.item.reference.refKind === 'compound') {
        derivedLink.path = this.item.reference.refId
        derivedLink.hash = ''
      } else {
        console.log('Found a doxygen ref that is not being handled! Eeek.')
      }

      return derivedLink
    }
  }
}
</script>

<style scoped></style>
