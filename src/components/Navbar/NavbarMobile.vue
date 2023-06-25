<script lang="ts">
  import { computed, defineComponent, ref, h, Component } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useIsMobile } from '../../utils/composables'
  import { NIcon } from 'naive-ui'
  import { useComponentOptions } from '../../store'
  import { findMenuValue } from '../../utils/route'
  import {
    NotificationsOutline as NotificationIcon,
    SettingsOutline as SettingsIcon,
    ClipboardOutline as ClipIcon,
    ChatboxEllipsesOutline as ChatIcon,
    AppsOutline as AppsIcon,
    PeopleCircleOutline as CollaborateIcon,
    BagRemoveSharp as CargoIcon,
  } from '@vicons/ionicons5'

  export default defineComponent({
    setup() {
      const route = useRoute()
      const router = useRouter()

      function renderIcon(icon: Component) {
        return () => h(NIcon, null, { default: () => h(icon) })
      }

      const rota_path = /^(\/[^/]+){2}/
      const mobilePopoverRef = ref(null)
      const componentOptionsRef = useComponentOptions()

      const mobileMenuOptionsRef = computed(() => {
        return [
          {
            key: 'perfil',
            label: 'Perfil de Acesso',
            path: rota_path.exec(route.path)[0],
            icon: renderIcon(AppsIcon),
          },
          {
            key: 'mensagens',
            label: 'Mensagens',
            path: '/home/mensagens',
            icon: renderIcon(ChatIcon),
          },
          {
            key: 'tarefas',
            label: 'Minhas tarefas',
            path: '/home/tarefas',
            icon: renderIcon(ClipIcon),
          },
          {
            key: 'colaborador',
            label: 'Cadastro de Colaborador',
            path: '/home/colaborador',
            icon: renderIcon(CollaborateIcon),
          },
          {
            key: 'usuario',
            label: 'Cadastro de Usuário',
            path: '/home/usuario',
            icon: renderIcon(CollaborateIcon),
          },
          {
            key: 'fornecedores',
            label: 'Cadastro de fornecedor',
            path: '/home/fornecedores',
            icon: renderIcon(CollaborateIcon),
          },
          {
            key: 'cargo',
            label: 'Cadastro de Cargo',
            path: '/home/cargo',
            icon: renderIcon(CargoIcon),
          },
          {
            key: 'component',
            label: 'Mais configurações',
            children: componentOptionsRef.value,
            icon: renderIcon(SettingsIcon),
          },
        ]
      })

      const mobileMenuValueRef = computed(() => {
        return findMenuValue(mobileMenuOptionsRef.value, rota_path)
      })

      function handleUpdateMobileMenu(value: any, { path }: any) {
        if (path) {
          router.push(path)
        }

        mobilePopoverRef.value.setShow(false)
      }

      const isMobileRef = useIsMobile()

      const renderMenuLabel = (option: { label: string }) => {
        return option.label
      }

      return {
        renderMenuLabel,
        mobilePopoverRef,
        mobileMenuOptions: mobileMenuOptionsRef,
        isMobile: isMobileRef,
        handleUpdateMobileMenu,
        mobileMenuValue: mobileMenuValueRef,
        style: computed(() => {
          return { 'grid-template-columns': 'auto 1fr auto' }
        }),
      }
    },
  })
</script>

<template>
  <n-layout-header bordered class="nav" :style="style">
    <n-text tag="div" class="ui-logo" :depth="1">
      <img src="/logo.png" />
      <span v-if="!isMobile">I3M</span>
    </n-text>
    <div :style="!isMobile ? 'display: flex; align-items: center;' : ''">
      <n-auto-complete
        :style="!isMobile ? 'width: 216px; margin-left: 24px' : undefined"
        placeholder="Pesquisar"
        clear-after-select
        blur-after-select
      />
    </div>
    <n-popover
      v-if="isMobile"
      ref="mobilePopoverRef"
      style="padding: 0; width: 288px"
      placement="bottom-end"
      display-directive="show"
      trigger="click"
    >
      <template #trigger>
        <n-icon size="20" style="margin-left: 12px">
          <div i-ic:outline-menu />
        </n-icon>
      </template>
      <div style="overflow: auto; max-height: 79vh" shadow>
        <n-menu
          :value="mobileMenuValue"
          :options="mobileMenuOptions"
          :indent="18"
          :render-label="renderMenuLabel"
          @update:value="handleUpdateMobileMenu"
        />
      </div>
    </n-popover>
  </n-layout-header>
</template>

<style scoped>
  .nav {
    display: grid;
    align-items: center;
    padding: 16px 16px;
  }

  .ui-logo {
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 18px;
  }

  .ui-logo > img {
    margin-right: 12px;
    height: 32px;
    width: 32px;
  }

  .nav-menu {
    padding-left: 36px;
  }

  .nav-picker {
    margin-right: 4px;
  }

  .nav-picker.padded {
    padding: 0 10px;
  }

  .nav-picker:last-child {
    margin-right: 0;
  }

  .nav-end {
    display: flex;
    align-items: center;
  }
</style>

<style>
  .nav-menu .n-menu-item {
    height: calc(var(--header-height) - 1px) !important;
  }
</style>

function exec(path: string) { throw new Error('Function not implemented.') }
