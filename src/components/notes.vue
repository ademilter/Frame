<template lang="pug">
  .Column.Notes

    .Column-header
      h3.title NOTE
      button(
      class="btn --small new"
      type="button"
      @click="addNote")
        iconPlus
        span New

    .Column-body(ref="scrollParent")
      VuePerfectScrollbar(
      class="scroll-area"
      v-if="isShow"
      tagname="div"
      ref="ps")

        Draggable.content(
        v-model="notes"
        @start="onDragStart"
        @end="onDragEnd"
        ref="notes"
        :options="{ animation: 120, handle: '.handle' }")

          note(
          v-for="note in notes"
          :key="note.id"
          @onScrollUpdate="scrollUpdate"
          :note="note")
</template>

<script>
  import note from './note'
  import iconPlus from './icon-plus'

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

    mounted () {
      const h = this.$refs.scrollParent.clientHeight
      this.$refs.scrollParent.style.height = `${h}px`
      this.isShow = true

      window.addEventListener('resize', this.scrollUpdate)
    },

    beforeDestroy () {
      window.removeEventListener('resize', this.scrollUpdate)
    },

    computed: {
      notes: {
        get () {
          return this.$store.state.notes
        },
        set (value) {
          this.$store.commit('updateNotes', value)
          this.scrollUpdate()
        }
      }
    },

    methods: {
      addNote () {
        this.$store.commit('addNote')
        this.scrollUpdate()
        this.$nextTick().then(() => {
          const lastNote = this.$refs.notes.$children.pop()
          lastNote.$refs.editor.quill.focus()
        })
      },
      scrollUpdate () {
        this.$refs.ps.update()
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

<style>
  .Column.Notes {
    background-color: var(--color-note);

    .Column-header {
      .new {
        background-color: var(--color-note-primary);
      }
    }

    .content.drag-start .handle {
      display: none;
    }

  }
</style>
