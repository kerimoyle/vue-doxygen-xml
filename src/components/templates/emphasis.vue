<script>
import { doxygenChildren } from '@/mixins/DoxygenChildren'

export default {
  name: 'emphasis',
  mixins: [doxygenChildren],
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      tagName: 'em',
      element: this.data.element
    }
  }
}
</script>

<style scoped></style>
