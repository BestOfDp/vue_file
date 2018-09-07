<template>
  <div id="blog">
    <vue-markdown v-highlight :source="content"></vue-markdown>
  </div>
</template>

<script>
  import VueMarkdown from 'vue-markdown'
  import hljs from 'highlight.js'
  import 'highlight.js/styles/googlecode.css'

  export default {
    name: 'blog',
    data() {
      return {
        content: '# hah \n测试![tab_bg.PNG](0)'
      }
    },
    components: {
      VueMarkdown
    },
    created() {
    },
    mounted() {
      let blocks = document.getElementById('blog').querySelectorAll('pre code')
      blocks.forEach((block) => {
        hljs.highlightBlock(block)
      })
    }
  }
</script>
