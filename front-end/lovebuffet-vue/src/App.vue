<template>
  <Navbar />
  <router-view></router-view>
  <n-config-provider :theme-overrides="themeOverrides">
    <Footer />
  </n-config-provider>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import { NConfigProvider } from "naive-ui";

const themeOverrides = {
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
      themeOverrides
    }
  }
}

</script>

<style>
@import './assets/base.css';
</style>
