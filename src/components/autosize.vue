<template lang="pug">
  textarea(
  @blur="$emit('blur')"
  @keydown.esc="$emit('esc')"
  @keydown.enter.prevent="$emit('enter')"
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
