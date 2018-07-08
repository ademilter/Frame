<template lang="pug">
  .note

    button.handle(
    type="button")
      icon-drag

    button.remove(
    type="button"
    @click="remove")
      iconRemove

    quill-editor(
    v-model="content"
    :options="editorOption"
    @change="onEditorChange($event)")
</template>

<script>
  import iconDrag from './icon-drag'
  import iconRemove from './icon-remove'

  export default {
    name: 'Note',

    props: {
      note: {
        required: true,
        type: Object
      }
    },

    components: {
      iconDrag,
      iconRemove
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
        this.$emit('onScrollUpdate')
      },
      onEditorChange ({ quill, html }) {
        this.$store.commit('changeNote', {
          note: this.note,
          content: html
        })
        this.$emit('onScrollUpdate')
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

    .remove {
      opacity: 0;
      padding: 5px;
      border-radius: var(--border-radius);
      transition: var(--transition);
      position: absolute;
      top: 18px;
      right: 10px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-top: -1px;
      color: var(--color-light);

      &:hover {
        color: red;
      }

      .icon {
        width: 16px;
        height: 16px;
      }
    }

    &:hover {
      .handle {
        opacity: 1;
        transform: translateX(0);
      }
      .remove {
        opacity: 1;
      }
    }
  }
</style>
