<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
    props: {
        descricao: String,
        contador: Number || String
    },
    setup(props) {
        const descricao = computed(() => {
            return props.descricao || ''
        })

        const contador = computed(() => {
            return props.contador || 0
        })

        return {
            descricao,
            contador
        }
    },
})
</script>

<template>
    <div h-32 w-4 rounded-2 b="1 gray-300" flex flex-col justify-center items-center>
        <span text-5 text-gray-400 font-600>{{ descricao }}</span>
        <span text-7 text-black font-700 dark:text-gray-200>{{ contador }}</span>
    </div>
</template>