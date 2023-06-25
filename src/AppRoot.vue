<script lang="ts">
  import {
    computed,
    defineComponent,
  } from 'vue'
  import App from './App.vue'
  import {
    ptBR,
    datePtBR,
    NConfigProvider,
  } from 'naive-ui'
  import { useIsMobile } from './utils/composables'
  import { themeOverrides } from './styles/theme-naive-ui'

  export default defineComponent({
    components: { App },
    setup() {
      const isMobileRef = useIsMobile()

      const configProviderRef =
        NConfigProvider

      const themeNameRef = 'os-theme'

      return {
        themeEditorStyle: computed(
          () => {
            return isMobileRef.value
              ? 'right: 18px; bottom: 24px;'
              : undefined
          }
        ),
        ptBR,
        datePtBR,
        themeName: themeNameRef,
        configProvider:
          configProviderRef,
        themeOverrides,
      }
    },
  })
</script>

<template>
  <n-config-provider
    :theme-overrides="themeOverrides"
    abstract
  >
    <n-loading-bar-provider>
      <n-message-provider
        closable
        keep-alive-on-hover
      >
        <n-dialog-provider>
          <App />
        </n-dialog-provider>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>
