<script lang="ts">
  import { defineComponent } from 'vue'
  import { Home } from '../pages'
 

  export default defineComponent({
    components: { Home },
    setup() {
     
      return {
        
      }
    },
  })
</script>
<style>

</style>

<template>
  <n-layout position='static'>
    <Home/>
    <router-view />
  </n-layout>
</template>
