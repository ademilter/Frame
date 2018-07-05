<template lang="pug">
  .App
    .cols
      .col
        .deneme(@click="change") {{ asd }}
        .add(@click="add") ekle
        div.note(
        v-for="q in count"
        :key="q")
          quill
      .col sfgdfg
      .col asdsg asdasd
</template>

<script>
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.bubble.css'
  import quill from './components/quill'

  export default {
    name: 'App',

    components: {
      quill
    },

    data () {
      return {
        count: []
      }
    },

    computed: {
      asd () {
        return this.$store.getters.deneme
      }
    },

    methods: {
      add () {
        this.count.unshift(Date())
      },
      change () {
        this.$store.commit('change')
      }
    }
  }
</script>

<style>

  :root {
    --deneme: 10px;
  }

  * {
    margin: 0;
    padding: 0;
    border: 0;
  }

  .App {
    font: 16px/1.5 Arial;
    position: fixed;
    overflow: hidden;
    size: 100vw;
    height: 100vh;
    color: #333;
    background-color: #FFF;
  }

  .cols {
    height: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(33%, 1fr));
  }

  .col {
    padding: 20px;
    border: 1px solid #DDD;
  }

  .note {
    border-top: 1px solid #DDD;

    .ql-editor {
      padding-left: 0;
      padding-right: 0;
    }

    .ql-editor.ql-blank::before {
      left: 0;
      font-style: normal;
      right: 0;
    }
  }

</style>
