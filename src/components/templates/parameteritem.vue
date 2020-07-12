<script>
import { doxygenChildren } from '@/mixins/DoxygenChildren'

export default {
  name: 'parameteritem',
  mixins: [doxygenChildren],
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      tagName: 'li',
      element: this.data.element
    }
  }
}
</script>

<style scoped></style>
