<template>
  <footer>
    <n-grid x-gap="10" cols="3 m:2">
      <n-gi>
        <h3>Pages</h3>
        <n-menu :options="pagesOptions"></n-menu>
      </n-gi>
      <n-gi>
        <h3>Profile</h3>
        <n-menu :options="profileOptions"></n-menu>
      </n-gi>
      <n-gi>
      </n-gi>
    </n-grid>
    <n-divider/>
    <p id="copyright">&copy {{ date }} - LoveBuffet</p>
  </footer>
</template>

<script>
import { NGrid, NDivider, NGi, NMenu, NIcon, NImage } from "naive-ui"
import { Home, Heart, Star, History, UserAlt, UserEdit } from "@vicons/fa"
import { h } from "vue";

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const profileOptions = [
  {
    label: "Account",
    key: "account",
    disabled: false,
    icon: renderIcon(UserAlt)
  },
  {
    label: "Edit data",
    key: "edit",
    disabled: false,
    icon: renderIcon(UserEdit)
  }
];

const pagesOptions = [
  {
    label: "Home",
    key: "home",
    disabled: false,
    icon: renderIcon(Home)
  },
  {
    label: "Preferences",
    key: "preferences",
    disabled: false,
    icon: renderIcon(Heart)
  },
  {
    label: "Favourites",
    key: "favourites",
    disabled: false,
    icon: renderIcon(Star)
  },
  {
    label: "History",
    key: "history",
    disabled: false,
    icon: renderIcon(History)
  },
];

export default {
  name: "Footer",
  components: {
    NGrid, NDivider, NGi, NMenu
  },
  data: () => {
    return {
      date: new Date().getFullYear()
    }
  },
  setup() {
    return {
      pagesOptions,
      profileOptions
    }
  }
}
</script>

<style scoped>
footer {
  padding: 0 10vw;
  background-color: #23b35d;
  color: white;
}
#copyright {
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>