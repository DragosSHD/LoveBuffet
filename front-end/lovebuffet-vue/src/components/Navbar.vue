<template>
  <nav>
    <n-grid x-gap="12" cols="3 m:4 l:5" item-responsive responsive="screen">
      <n-gi class="grid-item center" span="1 m:0">
        <n-icon class="hamburger-btn" :class="{active: showMenu}" :size="iconSize" v-on:click="toggleMenu">
          <Bars/>
        </n-icon>
      </n-gi>
      <n-gi class="grid-item center">
        <n-image alt="love-buffet-logo"
                 src="./src/assets/img/logo.png"
                 width="120"
                 preview-disabled></n-image>
      </n-gi>
      <n-gi class="grid-item" span="0 m:2 l:3">
        <n-menu id="desk-menu" mode="horizontal" :options="menuOptions"/>
      </n-gi>
      <n-gi class="grid-item center">
        <n-icon :size="iconSize" color="#ea3c5d">
          <UserRegular/>
        </n-icon>
      </n-gi>
    </n-grid>
    <n-menu class="mobile-menu" :class=" { hide: !showMenu }" mode="vertical" :options="menuOptions" :collapsed="!showMenu"/>
  </nav>
</template>

<script>
import { NMenu, NGrid, NGi, NImage, NIcon } from "naive-ui";
import { Bars, UserRegular } from "@vicons/fa";
import { ref, h } from "vue";
import { RouterLink } from "vue-router";

const menuOptions = [
  {
    label: "Preferences",
    key: "preferences",
    disabled: true,
  },
  {
    label: "Favourites",
    key: "favourites",
    disabled: true
  },
  {
    label: "History",
    key: "history",
    disabled: true
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
      showMenu: false
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
    color: #23b35d;
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
  .center {
    justify-content: center;
  }
</style>