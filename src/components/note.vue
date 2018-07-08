<template lang="pug">
  .note

    button.handle(
    type="button")
      icon-drag

    .options
      .remove(@click="remove") sil

    quill-editor(
    v-model="content"
    :options="editorOption"
    @change="onEditorChange($event)")
</template>

<script>
  import iconDrag from './icon-drag'

  export default {
    name: 'Note',

    props: {
      note: {
        required: true,
        type: Object
      }
    },

    components: {
      iconDrag
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
        return this.$store.state.editorOption
      }
    },

    methods: {
      remove () {
        this.$store.commit('removeNote', this.note)
        this.$emit('onRemove')
      },
      onEditorChange ({ quill, html }) {
        this.$store.commit('changeNote', {
          note: this.note,
          content: html
        })
      }
    }
  }
</script>

<style>
  .note {
    padding-left: 30px;
    padding-right: 30px;
    position: relative;

    &:not(:last-child):after {
      content: "";
      display: block;
      border-bottom: var(--border-line-height) solid var(--border-line-color);
    }

    &.sortable-chosen {
    }

    &.sortable-ghost {
      background-color: #EEFAFD;
    }

    .handle {
      color: var(--color-lighter);
      transition: var(--transition);
      transform: translateX(-100%);
      opacity: 0;
      position: absolute;
      left: 0;
      top: 19px;
      cursor: ns-resize;
    }

    &:hover .handle {
      opacity: 1;
      transform: translateX(0);
    }

    .options {
      display: none;
      position: absolute;
      right: 0;
      top: 0;
    }
  }
</style>
