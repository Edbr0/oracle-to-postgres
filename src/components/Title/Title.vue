
<script lang="ts">
    import { defineComponent } from 'vue'

    export default defineComponent({
        props: {
                titulo: {
                type: String
            }
        },
        setup(props){
            
            const titulo = props.titulo
            
            return {
                titulo
            }
        }
    })
</script>

<template>
    <span text-4 font-600 text-gray-400>{{ titulo }}</span>
    <div b="b gray-300" />
</template>

<style>

</style>