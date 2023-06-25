<template>
  <div class="sidebar" :class="isOpened ? 'open' : ''" :style="cssVars">
    <div class="logo-details" style="margin: 18px 14px 12px 14px">
      <img v-if="logo" :src="logo" alt="menu-logo" class="menu-logo icon" />
      <i v-else class="bx icon" :class="menuIcon" />
      <div class="logo_name" :style="logo == '/logo_dark.png' ? 'color:white;' : 'color:black;'">
        {{ menuTitle }}
      </div>
      <i
        class="bx"
        :class="isOpened ? 'bx-menu-alt-right' : 'bx-menu'"
        id="btn"
        @click="isOpened = !isOpened"
      />
    </div>

    <div flex justify-center items-center>
      <input type="checkbox" class="checkbox" id="checkbox" v-model="isTheme" @click="theme()">
      <label for="checkbox" class="label" bg-gray-700 dark:bg-gray-100>
        <Icon icon="ion-md-moon" class="text-pink" />
        <Icon icon="ri-sun-line" class="text-yellow" />
        <div class='ball' bg-white dark:bg-gray-600 />
      </label>
    </div>

    <div
      style="
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex-grow: 1;
        max-height: calc(100% - 60px);
      "
    >
      <div id="my-scroll" style="margin: 6px 14px 0 14px">
        <ul class="nav-list" style="overflow: visible">
          <li v-if="isSearch" @click="isOpened = true">
            <i class="bx bx-search" />
            <input
              class="input-search-sidebar"
              type="text"
              :placeholder="isOpened ? searchPlaceholder : null"
              @input="$emit('search-input-emit', $event.target.value)"
            />
            <span class="tooltip">{{ searchTooltip }}</span>
          </li>

          <span v-for="(menuItem, index) in menuItems" :key="index">
            <li>
              <a :href="menuItem.path" @click="isOpen = index" :class="menuItem.path == `#${$route.path}` ? 'bg-gray-300 dark:bg-gray-500' : null">
                <span
                  min-w-13
                  text-center
                  h-16
                  flex
                  justify-center
                  items-center
                  text-gray-500
                  style="line-height: 60px; font-size: 28px"
                >
                  <!-- <p :class="menuItem.icon || 'bx-square-rounded'"></p> -->
                  <Icon :icon="menuItem.icone" class="m-auto text-2xl mr-4 text-gray-900 dark:text-yellow-5" />
                </span>
                <span class="links_name">{{ menuItem.descricao }}</span>
                <span v-if="menuItem.propriedades">
                  <span v-if="index == isOpen">
                    <Icon icon="ic:outline-arrow-drop-up" class="m-auto text-xl ml-2" />
                  </span>
                  <span v-else>
                    <Icon icon="ic:outline-arrow-drop-down" class="m-auto text-xl ml-2" />
                  </span>
                </span>
              </a>
              <div v-if="isOpened">
                <div class="pt-2 pl-4" v-if="menuItem.propriedades" v-show="index == isOpen || isMenuVisible">
                  <ul class="flex flex-col pl-2 border-l border-gray-300">
                    <li v-for="propriedades of menuItem.propriedades">
                      <a :href="propriedades.path" class="inline-block w-full text-black px-4 py-2 text-xs rounded hover:bg-gray-700 hover:text-black">
                        {{ propriedades.descricao }}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </span>
        </ul>
      </div>

      <div v-if="isLoggedIn" class="profile">
        <div class="profile-details">
          <img v-if="profileImg" :src="profileImg" alt="profileImg" />
          <i v-else class="bx bxs-user-rectangle" />
          <div class="name_job">
            <div class="name">
              {{ dadosUsuario.nome_sobrenome }}
            </div>
            <div class="job">
              {{ profileRole }}
            </div>
          </div>
        </div>
        <i cursor-pointer v-if="isExitButton" id="log_out" @click.stop="sair">
          <Icon icon="bx:log-out" class="flex justify-center mt-3" />
        </i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { isOpenSidebar, dataUser } from '../../store'
  import { useAuthStore } from '../../store/auth'
  import { useDialog } from 'naive-ui'
  import { isDark } from '../../composables'
  export default {
    props: {
      //! Menu settings
      isMenuOpen: {
        type: Boolean,
        default: true,
      },
      menuTitle: {
        type: String,
        default: 'I3M',
      },
      menuLogo: {
        type: String,
        default: isDark.value ? '/logo_dark.png' : '/logo-transparent.png',
      },
      menuIcon: {
        type: String,
        default: 'bxl-c-plus-plus',
      },
      isPaddingLeft: {
        type: Boolean,
        default: true,
      },
      menuOpenedPaddingLeftBody: {
        type: String,
        default: '250px',
      },
      menuClosedPaddingLeftBody: {
        type: String,
        default: '78px',
      },
      //! Menu items
      menuItems: {
        type: Array,
        default: () => [
          {
            path: '#/home/rh',
            descricao: 'Administrativo',
            icon: 'i-mdi:office-building-cog-outline',
          },
          {
            path: '#/home/rh',
            descricao: 'Configurações',
            icon: 'i-carbon:collaborate',
          },
        ],
      },
      //! Search
      isSearch: {
        type: Boolean,
        default: true,
      },
      searchPlaceholder: {
        type: String,
        default: 'Buscar',
      },
      searchTooltip: {
        type: String,
        default: 'Buscar',
      },
      //! Profile detailes
      profileImg: {
        type: String,
        default: '/profile.png',
      },
      profileName: {
        type: String,
        default: 'Rafael Siqueira',
      },
      profileRole: {
        type: String,
        default: 'Administrador',
      },
      isExitButton: {
        type: Boolean,
        default: true,
      },
      isLoggedIn: {
        type: Boolean,
        default: true,
      },
      //! Styles
      bgColor: {
        type: String,
        default: '#F7F7FF',
      },
      secondaryColor: {
        type: String,
        default: '#F7F0F5',
      },
      homeSectionColor: {
        type: String,
        default: '#e4e9f7',
      },
      logoTitleColor: {
        type: String,
        default: '#333',
      },
      iconsColor: {
        type: String,
        default: '#333',
      },
      itemsTooltipColor: {
        type: String,
        default: '#e4e9f7',
      },
      searchInputTextColor: {
        type: String,
        default: '#333',
      },
      menuItemsHoverColor: {
        type: String,
        default: '#E8E8E8',
      },
      menuItemsTextColor: {
        type: String,
        default: '#333',
      },
      menuFooterTextColor: {
        type: String,
        default: '#333',
      },
    },
    data() {
      return {
        isOpened: isOpenSidebar,
        authStore: useAuthStore(),
        dialog: useDialog(),
        logo:  isDark.value ? '/logo_dark.png' : '/logo-transparent.png'
      }
    },
    mounted() {
      window.document.body.style.paddingLeft =
        this.isOpened && this.isPaddingLeft ? this.menuOpenedPaddingLeftBody : this.menuClosedPaddingLeftBody
    },
    methods: {
      sair() {
        this.dialog.warning({
          title: 'Confirmar',
          content: 'Deseja realmente sair?',
          positiveText: 'Sim',
          negativeText: 'Não',
          onPositiveClick: () => {
            this.authStore.logout()
          },
          onNegativeClick: () => {},
        })
      },
      theme() {
        isDark.value = !isDark.value
        isDark.value ? this.logo = '/logo_dark.png' : this.logo = '/logo-transparent.png'
      }
    },
    computed: {
      dadosUsuario() {
        interface usuario {
          id?: number
          tipo?: number
          email: string
          nome: string
          status: boolean
        }

        const dados_usuario: usuario = dataUser.value

        let nome_sobrenome: any = dados_usuario.nome.split(' ')
          nome_sobrenome = `${nome_sobrenome[0]} ${nome_sobrenome.pop()}`

        return {
          ...dados_usuario,
          nome_sobrenome
        }
      },
      cssVars() {
        return {
          '--bg-color': isDark.value ? '#181A1B' : this.bgColor,
          '--secondary-color': isDark.value ? '#25282A' : this.secondaryColor,
          '--home-section-color': this.homeSectionColor,
          '--logo-title-color': this.logoTitleColor,
          '--icons-color': isDark.value ? '#EAB10E' : this.iconsColor,
          '--items-tooltip-color': this.itemsTooltipColor,
          '--serach-input-text-color': isDark.value ? '#fffef2' : this.searchInputTextColor,
          '--menu-items-hover-color': isDark.value ? '#888' : this.menuItemsHoverColor,
          '--menu-items-text-color': isDark.value ? '#C8C3BC' : this.menuItemsTextColor,
          '--menu-footer-text-color': isDark.value ? '#C8C3BC' : this.menuFooterTextColor,
        }
      },
      isTheme() {
        return isDark.value ?? true
      }
    },
    watch: {
      isOpened() {
        window.document.body.style.paddingLeft =
          this.isOpened && this.isPaddingLeft
            ? this.menuOpenedPaddingLeftBody
            : this.menuClosedPaddingLeftBody
      },
    },
  }
</script>

<style>
  /* Google Font Link */
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');
  @import url('https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css');
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }
  body {
    transition: all 0.5s ease;
  }

  .activeLink {
    background: #d8d9da !important;
  }
  .menu-logo {
    width: 30px;
    margin: 0 10px 0 10px;
  }
  .sidebar {
    position: relative;
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 0;
    top: 0;
    height: 95%;
    min-height: min-content;
    width: 78px;
    background: var(--bg-color);
    z-index: 99;
    transition: all 0.5s ease;
  }
  .sidebar.open {
    width: 250px;
  }
  .sidebar .logo-details {
    height: 60px;
    display: flex;
    align-items: center;
    position: relative;
  }
  .sidebar .logo-details .icon {
    opacity: 0;
    transition: all 0.5s ease;
  }
  .sidebar .logo-details .logo_name {
    color: var(--logo-title-color);
    font-size: 20px;
    font-weight: 600;
    opacity: 0;
    transition: all 0.5s ease;
  }
  .sidebar.open .logo-details .icon,
  .sidebar.open .logo-details .logo_name {
    opacity: 1;
  }
  .sidebar .logo-details #btn {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    font-size: 22px;
    transition: all 0.4s ease;
    font-size: 23px;
    text-align: center;
    cursor: pointer;
    transition: all 0.5s ease;
  }
  .sidebar.open .logo-details #btn {
    text-align: right;
  }
  .sidebar i {
    color: var(--icons-color);
    /* height: 60px; */
    min-width: 50px;
    font-size: 28px;
    text-align: center;
    line-height: 60px;
  }
  .sidebar .nav-list {
    margin-top: 20px;
  }
  .sidebar li {
    position: relative;
    margin: 8px 0;
    list-style: none;
  }
  .sidebar li .tooltip {
    position: absolute;
    top: -20px;
    left: calc(100% + 15px);
    z-index: 3;
    background: var(--items-tooltip-color);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 15px;
    font-weight: 400;
    opacity: 0;
    white-space: nowrap;
    pointer-events: none;
    transition: 0s;
  }
  .sidebar li:hover .tooltip {
    opacity: 1;
    pointer-events: auto;
    transition: all 0.4s ease;
    top: 50%;
    transform: translateY(-50%);
  }
  .sidebar.open li .tooltip {
    display: none;
  }
  .sidebar .input-search-sidebar {
    font-size: 15px;
    color: var(--serach-input-text-color);
    font-weight: 400;
    outline: none;
    height: 50px;
    width: 100%;
    width: 50px;
    border: none;
    border-radius: 12px;
    transition: all 0.5s ease;
    background: var(--secondary-color);
  }
  .sidebar.open .input-search-sidebar {
    padding: 0 20px 0 50px;
    width: 100%;
  }
  .sidebar .bx-search {
    position: absolute;
    top: -6%;
    left: 2px;
    transform: translateY(-50%);
    font-size: 22px;
    background: var(--secondary-color);
    color: var(--icons-color);
    height: 0;
  }
  .sidebar.open .bx-search:hover {
    background: var(--secondary-color);
    color: var(--icons-color);
  }
  .sidebar .bx-search:hover {
    background: var(--menu-items-hover-color);
    color: var(--bg-color);
  }
  .sidebar li a {
    display: flex;
    height: 100%;
    width: 100%;
    border-radius: 12px;
    align-items: center;
    text-decoration: none;
    transition: all 0.4s ease;
  }
  .sidebar li a:hover {
    background: var(--menu-items-hover-color);
  }
  .sidebar li a .links_name {
    color: var(--menu-items-text-color);
    font-size: 15px;
    font-weight: 400;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: 0.4s;
  }
  .sidebar.open li a .links_name {
    opacity: 1;
    pointer-events: auto;
  }
  .sidebar li a:hover .links_name,
  .sidebar li a:hover i {
    transition: all 0.5s ease;
    color: var(text-white);
  }
  .sidebar div.profile {
    position: relative;
    height: 60px;
    width: 78px;
    padding: 10px 14px;
    background: var(--secondary-color);
    transition: all 0.5s ease;
    overflow: hidden;
  }
  .sidebar.open div.profile {
    width: 250px;
  }
  .sidebar div .profile-details {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
  }
  .sidebar div img {
    height: 62px;
    width: 99px;
    object-fit: cover;
    border-radius: 6px;
    margin-right: 10px;
  }
  .sidebar div.profile .name,
  .sidebar div.profile .job {
    font-size: 15px;
    font-weight: 400;
    color: var(--menu-footer-text-color);
    white-space: nowrap;
  }
  .sidebar div.profile .job {
    font-size: 12px;
  }
  .sidebar .profile #log_out {
    position: absolute;
    top: 55%;
    right: 0;
    transform: translateY(-50%);
    background: var(--secondary-color);
    width: 100%;
    height: 60px;
    line-height: 60px;
    border-radius: 0px;
    transition: all 0.5s ease;
  }
  .sidebar.open .profile #log_out {
    width: 50px;
    background: var(--secondary-color);
    opacity: 0;
  }
  .sidebar.open .profile:hover #log_out {
    opacity: 1;
  }
  .sidebar.open .profile #log_out:hover {
    opacity: 1;
    color: red;
  }
  .sidebar .profile #log_out:hover {
    color: red;
  }
  .home-section {
    position: relative;
    background: var(--home-section-color);
    min-height: 100vh;
    top: 0;
    left: 78px;
    width: calc(100% - 78px);
    transition: all 0.5s ease;
    z-index: 2;
  }
  .sidebar.open ~ .home-section {
    left: 250px;
    width: calc(100% - 250px);
  }
  .home-section .text {
    display: inline-block;
    color: var(--bg-color);
    font-size: 25px;
    font-weight: 500;
    margin: 18px;
  }
  .my-scroll-active {
    overflow-y: auto;
  }
  #my-scroll {
    overflow-y: auto;
    height: calc(100% - 60px);
  }
  #my-scroll::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 420px) {
    .sidebar li .tooltip {
      display: none;
    }
  }

  .checkbox {
    opacity: 0;
    position: absolute;
  }
  
  .label {
    width: 40px;
    height: 18px;
    display: flex;
    border-radius:50px;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    position: relative;
    transform: scale(1.5);
  }
  
  .ball {
    width: 15px;
    height: 15px;
    position: absolute;
    top: 1.490px;
    left: 3px;
    border-radius: 50%;
    transition: transform 0.2s linear;
  }
  
  .checkbox:checked + .label .ball{
    transform: translateX(18px);
  }
</style>
