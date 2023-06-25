<script lang='ts'>
    import { defineComponent } from 'vue'
    import { getSearchResults, maxIcons, autoIncrement } from '../../store'

    export default defineComponent({
        setup(){
            const qtd_icons = ref()
            const { search, icons } = getSearchResults()
            
            const formatador = Intl.NumberFormat('pt', { notation: 'compact' })

            watchEffect(() => {
                qtd_icons.value = formatador.format(icons.value.length)
            })

            return {
                search,
                icons,
                maxIcons,
                qtd_icons,
                autoIncrement
            }
        }
    })
</script>

<template>
  <div class="p-6 w-full help-page">
    <div flex items-center justify-between mb-2>
        <p class="opacity-75">
            Busque o ícone referente a função
        </p>
        <p class="opacity-75">
            {{ qtd_icons }} ícones
        </p>
    </div>

    <div flex items-center>
        <div class="hidden md:flex items-center h-9 rounded outline-none px-4 w-8 b-1">
            <Icon icon="carbon:search" class=" text-xl m-auto flex-none opacity-60" />
            <form class="flex-auto" role="search" method="get" @submit.prevent>
                <input
                ref="input"
                v-model="search"
                aria-label="Search"
                border="none" class="outline-none w-full py-1 px-4 m-0 bg-transparent font-normal dark:text-gray-200"
                name="s"
                placeholder="Pesquisar ícone..."
                autofocus
                autocomplete="off"
                >
            </form>
        </div>
        <button v-if="icons.length > maxIcons" @click="autoIncrement(maxIcons += 5)"
            ml-2 rounded p-2 font-400 border-none bg-yellow cursor-pointer hover:bg-yellow-500
        >
            Ver mais
        </button>
    </div>
  </div>
</template>

<style lang="postcss">
.help-page p {
  @apply text-black/60;
}
.help-page a {
  @apply text-primary opacity-75 hover:opacity-100;
}
</style>
