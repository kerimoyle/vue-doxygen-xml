import DoxygenXml from '@/components/DoxygenXml'
import index from '@/components/templates/index'
import * as DoxygenStore from '@/store/modules/doxygen'

function install(Vue, options = {}) {
  if (!options.store) {
    console.error('Please provide a store!!')
  }

  // Vue.component('your-component', yourComponent)

  options.store.registerModule('doxygen', DoxygenStore)
}

export { DoxygenXml, index }
export default { install }
