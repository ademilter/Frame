<template lang="pug">
  .note

    button.handle(
    type="button")
      icon-drag

    button.remove(
    type="button"
    v-if="!removing"
    @click="timerRemove")
      iconRemove
    button.stop(
    type="button"
    v-if="removing"
    @click="stop")
      span {{ countdown }}

    quill-editor(
    ref="editor"
    v-model="content"
    :options="editorOption")
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

    data () {
      return {
        removing: false,
        countdown: null
      }
    },

    components: {
      iconDrag,
      iconRemove
    },

    computed: {
      content: {
        get () {
          return this.note.content
        },
        set (value) {
          this.$store.commit('changeNote', {
            note: this.note,
            content: value
          })
          this.$emit('onScrollUpdate')
        }
      },
      editorOption () {
        return this.$store.state.editorOption
      }
    },

    methods: {
      timerRemove () {
        this.removing = true
        this.countdown = 5
        this.$interval = setInterval(() => {
          this.countdown--
        }, 1000)
        this.$timer = setTimeout(() => {
          this.remove()
        }, this.countdown * 1000)
      },
      remove () {
        this.$store.commit('removeNote', this.note)
        this.$emit('onScrollUpdate')
      },
      stop () {
        this.removing = false
        clearInterval(this.$interval)
        clearTimeout(this.$timer)
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

    .remove,
    .stop {
      padding: 4px;
      line-height: 1;
      border-radius: var(--border-radius);
      transition: var(--transition);
      position: absolute;
      top: 20px;
      right: 10px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: var(--color-light);
      vertical-align: middle;
    }

    .stop {
      opacity: 1;
      font-size: var(--font-size-small);
      background-color: var(--color-shadow);
    }

    .remove {
      opacity: 0;

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
