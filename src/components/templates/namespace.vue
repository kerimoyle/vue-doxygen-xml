<template>
  <div class="namespace-container">
    <section id="data.id">
      <h1>Namespace {{ data.name }} reference</h1>
      <brief-description :element="briefDescription" />
      <ul class="namespace-group">
        <section :id="data.id + '_classes'">
          <li class="namespace-group-item"><h2>Classes</h2></li>
          <ul class="class-list">
            <li
              v-for="(namespaceClass, namespaceClassIndex) in data.classes"
              :key="data.name + '_' + namespaceClassIndex"
              class="class-list-item"
            >
              <router-link
                :to="{ path: `${$route.fullPath}/${namespaceClass.refId}` }"
                >{{ namespaceClass.name }}</router-link
              >
            </li>
          </ul>
        </section>
        <section :id="data.id + '_typedefs'" v-if="haveTypeDefs">
          <li class="namespace-group-item"><h2>Type Definitions</h2></li>
          <ul class="class-list">
            <li
              v-for="(namespaceTypeDef, namespaceTypeDefIndex) in typeDefs"
              :key="data.name + '_' + namespaceTypeDefIndex"
              class="class-list-item"
            >
              <span :id="namespaceTypeDef.id">{{
                decodeHTML(namespaceTypeDef.definition.textContent)
              }}</span>
            </li>
          </ul>
        </section>
        <section :id="data.id + '_functions'" v-if="haveFunctions">
          <li class="namespace-group-item"><h2>Functions</h2></li>
          <ul class="class-list">
            <li
              v-for="(namespaceFunctions, namespaceFunctionsIndex) in functions"
              :key="data.name + '_' + namespaceFunctionsIndex"
              class="class-list-item"
            >
              <span :id="namespaceFunctions.id">{{
                decodeHTML(namespaceFunctions.definition.textContent)
              }}</span>
            </li>
          </ul>
        </section>
      </ul>
    </section>
  </div>
</template>

<script>
import BriefDescription from '@/components/BriefDescription'

import { isEmptyTextElement, decodeHTML } from '@/js/utilities'

export default {
  name: 'Namespace',
  components: { BriefDescription },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    briefDescription() {
      let brief = this.data.brief
      if (isEmptyTextElement(brief)) {
        brief = document.createElement('P')
        brief.innerHTML = 'Brief description is missing.'
      }
      return brief
    },
    haveTypeDefs() {
      return this.haveSection('typedef')
    },
    typeDefs() {
      return this.getSection('typedef')
    },
    haveFunctions() {
      return this.haveSection('func')
    },
    functions() {
      return this.getSection('func')
    }
  },
  methods: {
    decodeHTML(text) {
      return decodeHTML(text)
    },
    haveSection(variant) {
      let have = false
      for (let i = 0; !have && i < this.data.sections.length; i++) {
        const section = this.data.sections[i]
        if (section.kind === variant && section.members.length) {
          have = true
        }
      }
      return have
    },
    getSection(variant) {
      let members = undefined
      for (
        let i = 0;
        members === undefined && i < this.data.sections.length;
        i++
      ) {
        let section = this.data.sections[i]
        if (section.kind === variant) {
          members = section.members
        }
      }
      return members
    }
  }
}
</script>

<style scoped></style>
