<template lang="pug">
  .Column

    .Column-header
      h3.title NOTE
      button(
      class="btn small new"
      type="button"
      @click="addNote")
        iconPlus
        span New

    .Column-body

      .empty-state(
      v-if="!hasActiveTasks")
        | Geçici notlarını buraya yaz ve unutma!

      Draggable(
      v-model="notes"
      @start="onDragStart"
      @end="onDragEnd"
      ref="notes"
      :options="{ animation: 120, handle: '.handle' }")

        note(
        v-for="note in notes"
        :key="note.id"
        :note="note")

</template>

<script>
  import note from './note'
  import iconPlus from '@/icons/plus'

  export default {
    name: 'Notes',

    components: {
      note,
      iconPlus
    },

    data () {
      return {
        isShow: false
      }
    },

    computed: {
      notes: {
        get () {
          return this.$store.state.notes
        },
        set (value) {
          this.$store.commit('updateNotes', value)
        }
      }
    },

    methods: {

      addNote () {
        this.$store.commit('addNote')
        this.$nextTick().then(() => {
          const lastNote = this.$refs.notes.$children.pop()
          lastNote.$refs.editor.quill.focus()
        })
      },

      onDragStart (el) {
        el.target.classList.add('drag-start')
      },

      onDragEnd (el) {
        el.target.classList.remove('drag-start')
      }

    }
  }
</script>

<style scoped>
  .Column {
    background-color: var(--color-note);

    &-header {
      .new {
        background-color: var(--color-note-primary);
      }
    }

    /deep/ {

      .drag-start {
        .handle {
          display: none;
        }
      }

    }

  }
</style>

<style>
  .ql-container {
    font: inherit;

    .ql-editor {
      padding: 20px 0;
      line-height: inherit;

      &.ql-blank::before {
        left: 0;
        font-style: normal;
        right: 0;
      }
    }
  }
</style>
