
<script lang="ts">
    import { defineComponent } from 'vue'

    export default defineComponent({
        props: {
            numPerfis: {
                type: String
            },
            descricao: {
                type: String
            },
            icon: {
                type: String
            }
        },
        setup(props){
            
            const nums = props.numPerfis
            const descricao = props.descricao
            const icon = props.icon
            
            return {
                nums,
                descricao,
                icon
            }
        }
    })
</script>

<template>
    <div hover:bg-yellow-400 active:bg-yellow-400 hover:text-white
        active:text-white w-2 h-32 rd-2 flex flex-col justify-center 
        items-center  py-1 px-2 b="1 gray-200" shadow text-gray
    >
        <Icon :icon="icon" class="text-3xl" />
        <span text-5 mt-2>{{ nums }}</span>
        <span text-center>{{ descricao }}</span>
    </div>
</template>