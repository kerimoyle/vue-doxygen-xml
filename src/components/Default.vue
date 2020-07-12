<template>
  <div>
    <h3>Missing: '{{ name }}' from Doxygen XML output</h3>
    <span>It seems the component was not found.</span>
  </div>
</template>

<script>
export default {
  name: 'Default',
  props: {
    name: {
      type: String
    }
  }
}
</script>

<style scoped></style>
