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
      tagName: 'li'
    }
  }
}
</script>

<style scoped></style>
