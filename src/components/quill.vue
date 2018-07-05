<template lang="pug">
  quill-editor(
  v-model="content"
  ref="myQuillEditor"
  :options="editorOption"
  @blur="onEditorBlur($event)"
  @focus="onEditorFocus($event)"
  @ready="onEditorReady($event)")
</template>

<script>
  export default {
    name: 'App',

    data () {
      return {
        // init content
        content: '',
        // editor config
        editorOption: {
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              ['clean']
            ]
          },
          placeholder: 'Compose an epic...',
          theme: 'bubble'
        }
      }
    },

    methods: {
      onEditorBlur () {

      },
      onEditorFocus () {

      },
      onEditorReady () {

      }
    }
  }
</script>

<style>
</style>
