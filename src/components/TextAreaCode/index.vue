<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import Prism from 'prismjs';
  import 'prismjs/themes/prism-okaidia.css';
  import 'prismjs/components/prism-sql';

  export default defineComponent({

    props : {
        content: {
            type: Object,
        }
    },

    directives: {
        prism: {
            mounted(el) {
                Prism.highlightElement(el.querySelector('code'));
            }
        },
    },

    setup(props){

        type TProps = {
                text: string,
                type:string
            }
        const content = computed(():TProps =>{
            setTimeout(()=> {
                const code : Element = document.querySelector('#code');
                Prism.highlightElement(code);
            }, 1000)
            return {
                text: props.content?.text,
                type: props.content?.type
            }
        })

        return {
            content
        }
    }
})

</script>
<style scoped>
  .fundo-black{
    background: rgb(16, 16, 20);
  }
  .w-card-input{
    width: 600px;
    height: 100%;
  }
</style>
<template>
    <n-space vertical>
        <div v-prism>
            <pre><code id="code" :class="`language-${content.type}`">
            {{ content.text ? content.text : 'Ex:  select yousql from here;' }}
            </code></pre>
        </div>
    </n-space>
</template>