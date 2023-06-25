<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import type { MenuOption } from 'naive-ui'
import { useMemo } from 'vooks'
import { useIsMobile, useIsTablet } from '../../utils/composables'
import { useComponentOptions } from '../../store'
import { findMenuValue } from '../../utils/route'

export default defineComponent({
  setup() {

    const componentOptionsRef = useComponentOptions()

    const mobileMenuOptionsRef = computed(() => {
      return [
        {
          key: 'theme',
          label: 'Claro'
        },
        {
          key: 'locale',
          label:'English'
        },
        {
          key: 'component',
          label: 'component',
          children: componentOptionsRef.value
        },
        {
          key: 'github',
          label: 'GitHub'
        }
      ]
    })

    const mobileMenuValueRef = computed(() => {
      return findMenuValue(mobileMenuOptionsRef.value, 'home')
    })

    const menuOptions: MenuOption[] = [
      {
        whateverLabel: 'Perfil de acesso',
        whateverKey: 'hear-the-wind-sing'
      },
      {
        whateverLabel: 'Mensagens',
        whateverKey: 'a-wild-sheep-chase',
        disabled: true
      },
      {
        whateverLabel: 'Minhas tarefas',
        whateverKey: 'a-wild-sheep-chase',
        disabled: true
      },
      {
        whateverLabel: 'Configurações',
        whateverKey: 'Dance Dance Dance',
        whateverChildren: [
          {
            type: 'group',
            whateverLabel: 'Settings',
            whateverKey: 'people',
            whateverChildren: [
              {
                whateverLabel: 'Mais Configurações',
                whateverKey: 'narrator'
              },
              {
                whateverLabel: 'Notificações',
                whateverKey: 'sheep-man'
              }
            ]
          }
        ]
      }
    ]

    const isMobileRef = useIsMobile()
    const isTabletRef = useIsTablet()

    return {
      collapsed: ref(true),
      menuOptions: mobileMenuOptionsRef,
      isMobile: isMobileRef,
      mobileIsMenu: mobileMenuValueRef,
      showSider: useMemo(() => {
        return !isMobileRef.value && !isTabletRef.value
      })
    }
  }
})
</script>

<template>
  <n-layout 
    :has-sider="showSider"
    :position="isMobile ? 'static' : 'absolute'"
  >
    <img src="/logo.png" alt="">
    <n-layout-sider
      :native-scrollbar="false"
      :collapsed-width="0"
      collapse-mode="transform"
      trigger-style="top: 240px;"
      collapsed-trigger-style="top: 240px; right: -20px;"
      bordered
      show-trigger="arrow-circle"
    >
      <n-menu
        :value="mobileMenuValueRef"
        :options="menuOptions"
        :render-label="renderMenuLabel"
        
      />
    </n-layout-sider>
    <n-layout />
  </n-layout>
</template>