<script lang="ts">
  import { defineComponent } from 'vue'
  import { useRouter } from 'vue-router'

  export default defineComponent({
    setup(){
      const router = useRouter()

      return {
        router
      }
    }
  })
</script>
<template>
    <div
  class="
    flex
    items-center
    justify-center
    w-screen
    h-screen
    bg-gradient-to-r
    from-yellow-600
    to-yellow-400
  "
>
  <div class="px-40 py-20 bg-white rounded-md shadow-xl lt-md:px-5 lt-md:py-10">
    <div class="flex flex-col items-center">
      <h1 class="font-bold text-yellow-400 text-9xl">404</h1>

      <h6 class="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
        <span class="text-red-500">Oops!</span> Página não existe
      </h6>

      <p class="mb-8 text-center text-gray-500 md:text-lg">
        A página que você está procurando não existe.
      </p>

      <a
        class="px-6 py-2 text-sm font-semibold text-blue-800 bg-blue-100 cursor-pointer"
        @click="router.push('/home')"
        >Retornar</a
      >
    </div>
  </div>
</div>
</template>