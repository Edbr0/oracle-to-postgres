<script lang="ts">
  import { useMessage } from 'naive-ui'
  import { defineComponent } from 'vue'


  export default defineComponent({
    setup() {
     // window.$ = useMessage()
    },
  })
</script>

<template>
  <router-view></router-view>
</template>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
</style>