<template lang="pug">
  textarea(
  @blur="$emit('blur', $event)"
  @keydown.esc="$emit('esc', $event)"
  @keydown.enter="$emit('enter', $event)"
  @input="$emit('input', $event.target.value)")
    | {{ value }}
</template>

<script>
  import autosize from 'autosize'

  export default {
    name: 'autosize',
    props: ['value'],
    mounted () {
      autosize(this.$el)
    }
  }
</script>
