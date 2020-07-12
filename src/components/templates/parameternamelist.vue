<script>
import { doxygenChildren } from '@/mixins/DoxygenChildren'

export default {
  name: 'parameternamelist',
  mixins: [doxygenChildren],
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      element: this.data.element,
      tagName: 'span'
    }
  }
}
</script>

<style scoped></style>
