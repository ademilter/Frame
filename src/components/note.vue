<template lang="pug">
  .note
    div.handle #
    quill-editor(
    v-model="content"
    :options="editorOption"
    @change="onEditorChange($event)")
</template>

<script>
  export default {
    name: 'Note',

    props: {
      note: {
        required: true,
        type: Object
      }
    },

    data () {
      return {
        content: ''
      }
    },

    created () {
      this.content = this.note.content
    },

    computed: {
      editorOption () {
        return this.$store.getters.editorOption
      }
    },

    methods: {
      onEditorChange ({ quill, html }) {
        this.$store.commit('changeNote', {
          note: this.note,
          content: html
        })
      }
    }
  }
</script>

<style scoped>
  .note {
    background-color: white;
    border-radius: var(--br);

    &.sortable-chosen {
    }

    &.sortable-ghost {
      background-color: #EEE;
    }
  }
</style>
