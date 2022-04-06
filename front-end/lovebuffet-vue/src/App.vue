<template>
  <n-config-provider :theme-overrides="themeOverridesNav">
    <Navbar />
  </n-config-provider>
  <router-view></router-view>
  <n-config-provider :theme-overrides="themeOverridesFooter">
    <Footer />
  </n-config-provider>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import { NConfigProvider } from "naive-ui";

const themeOverridesFooter = {
  Menu: {
    itemColorActive: 'rgba(255,255,255,0.0)',
    itemColorActiveHover: '#FFFFFF',
    itemTextColor: '#FFFFFF',
    itemTextColorActive: '#FFFFFF',
    itemTextColorActiveHover: "#000000",
    itemIconColor: '#FFFFFF',
    itemIconColorActive: '#FFFFFF',
    itemIconColorHover: '#ea3c5d',
    paddingLeft: '10px',
    itemIconColorActiveHover: '#ea3c5d'
  }
}
const themeOverridesNav = {
  Menu: {
    itemTextColor: '#FFFFFF',
    itemIconColor: '#FFFFFF',
    itemIconColorHover: '#ea3c5d',
    paddingLeft: '10px'
  }
}

export default {
  name: 'App',
  components: {
    Navbar, Footer, NConfigProvider
  },
  setup() {
    return {
      themeOverridesFooter,
      themeOverridesNav
    }
  }
}

</script>

<style>
@import './assets/base.css';
</style>
