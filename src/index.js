import DoxygenXml from './components/DoxygenXml.vue'
export { updateDoxygenRoute } from '@/router/modules/doxygen'
import * as DoxygenStore from '@/store/modules/doxygen'

function install(Vue, options = {}) {
  if (!options.store) {
    console.error('Please provide a store!!')
  }

  // Vue.component('your-component', yourComponent)

  options.store.registerModule('doxygen', DoxygenStore)
}

export { DoxygenXml }
export default { install }
