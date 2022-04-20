<template>
  <nav>
    <n-grid x-gap="12" cols="3 m:4 l:5" item-responsive responsive="screen">
      <n-gi class="grid-item center-nav" span="1 m:0">
        <n-icon class="hamburger-btn" :class="{active: showMenu}" :size="iconSize" v-on:click="toggleMenu">
          <Bars/>
        </n-icon>
      </n-gi>
      <n-gi class="grid-item center-nav">
        <router-link to="/">
          <n-image id="site-logo"
                   alt="love-buffet-logo"
                   src="./src/assets/img/logo.png"
                   width="120"
                   preview-disabled/>
        </router-link>
      </n-gi>
      <n-gi class="grid-item" span="0 m:2 l:3">
        <n-menu id="desk-menu" mode="horizontal" :options="menuOptions"/>
      </n-gi>
      <n-gi class="grid-item center-nav">
        <router-link to="/login">
          <n-icon class="user-icon" :size="iconSize">
            <UserRegular/>
          </n-icon>
        </router-link>
      </n-gi>
    </n-grid>
    <n-menu class="mobile-menu" :class=" { hide: !showMenu }" mode="vertical" :options="menuOptions" :collapsed="!showMenu"/>
  </nav>
</template>

<script>
import { NMenu, NGrid, NGi, NImage, NIcon } from "naive-ui";
import { Bars, UserRegular } from "@vicons/fa";
import { ref, h, watch } from "vue";
import { RouterLink } from "vue-router";

const menuOptions = [
  {
    label: () =>
      h(
        RouterLink,
          {
            to: '/preferences'
          },
          () => 'Preferences'
      ),
    key: "preferences",
    disabled: false,
  },
  {
    label: () =>
        h(
            RouterLink,
            {
              to: '/favourites'
            },
            () => 'Favourites'
        ),
    key: "favourites",
    disabled: false
  },
  {
    label: () =>
        h(
            RouterLink,
            {
              to: '/history'
            },
            () => 'History'
        ),
    key: "history",
    disabled: false
  }
]

export default {
  name: 'Navbar',
  components: {
    NMenu, NGrid, NGi, NImage, Bars, NIcon,
    UserRegular
  },
  data: () => {
    return {
      iconSize: 30,
      showMenu: false,
    }
  },
  watch: {
    $route (to, from) {
      this.eraseMenu();
    }
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    eraseMenu() {
      this.showMenu = false;
    }
  },
  setup() {
    return {
      activeKey: ref(null),
      menuOptions
    };
  },
  created() {
    window.addEventListener("resize", this.eraseMenu);
  }
};
</script>

<style scoped>
  nav{
    -webkit-box-shadow: 0 5px 7px 0 rgba(0,0,0,0.37);
    box-shadow: 0 5px 7px 0 rgba(0,0,0,0.37);
    padding: 15px 0 15px 0;
  }
  #site-logo {
    transition: all ease .3s;
  }
  #site-logo:hover {
    opacity: 70%;
  }
  .hamburger-btn {
    color: #23b35d;
    transition: color ease .4s;
  }
  .hamburger-btn.active {
    color: #ea3c5d;
  }

  #desk-menu {
    font-size: 1.5em;
    font-weight: bold;
  }
  .mobile-menu {
    position: absolute;
    font-size: 1.5em;
    font-weight: bold;
    color: #23b35d;
    height: 100%;
    margin-top: 10px;
    background: rgba(255, 255, 255, 50);
    width: 100%;
    z-index: 10;
    transition: all ease .6s;
  }

  .mobile-menu.hide {
    height: 0;
    padding: 0;
  }

  .grid-item {
    display: flex;
    align-items: center;
  }
  .center-nav {
    justify-content: center;
  }
  .user-icon {
    color: #ea3c5d;
    transition: color ease 0.3s;
  }
  .user-icon:hover {
    color: #23b35d;
  }
</style>