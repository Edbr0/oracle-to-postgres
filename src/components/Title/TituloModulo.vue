

<script lang="ts">
    import { defineComponent } from 'vue'

    export default defineComponent({
        props: {
                titulo: {
                type: String
            },
            subtitulo:{
                type:String
            }
        },
        setup(props){
            
            const titulo = props.titulo
            const subtitulo = props.subtitulo
            
            return {
                titulo,
                subtitulo
            }
        }
    })
</script>

<template>
    <div flex items-center b-b="1 solid #ededed" w-8>
        <span text-yellow-500 text-5 mr-2>{{titulo}}</span>
        <span v-if="subtitulo" i-ic:sharp-keyboard-arrow-right text-5></span>
        <span text-5 ml-2>{{subtitulo}}</span>
    </div>
</template>

<style>

</style>