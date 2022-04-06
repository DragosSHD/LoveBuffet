<template>
  <footer>
    <n-grid x-gap="10" cols="1 s:2 m:3 l:3" responsive="screen">
      <n-gi>
        <h3>Pages</h3>
        <n-menu :indent="15"
                v-model:value="activeKey"
                :options="pagesOptions"></n-menu>
      </n-gi>
      <n-gi span="0 s:1">
        <h3>Profile</h3>
        <n-menu :indent="15"
                :options="profileOptions"></n-menu>
      </n-gi>
      <n-gi span="0 m:1">
      </n-gi>
    </n-grid>
    <n-divider/>
    <p id="copyright">&copy {{ date }} - LoveBuffet</p>
  </footer>
</template>

<script>
import { NGrid, NDivider, NGi, NMenu, NIcon } from "naive-ui"
import { Home, Heart, Star, History, UserAlt, UserEdit } from "@vicons/fa"
import { h, ref } from "vue";
import {RouterLink} from "vue-router";

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const profileOptions = [
  {
    label: 'Account',
    key: 'account',
    disabled: true,
    icon: renderIcon(UserAlt)
  },
  {
    label: 'Edit data',
    key: 'edit',
    disabled: true,
    icon: renderIcon(UserEdit)
  }
];

const pagesOptions = [
  {
    label: () =>
        h(
            RouterLink,
            {
              to: '/'
            },
            () => 'Home'
        ),
    key: 'home',
    disabled: false,
    icon: renderIcon(Home)
  },
  {
    label: () =>
        h(
            RouterLink,
            {
              to: '/preferences'
            },
            () => 'Preferences'
        ),
    key: 'preferences',
    disabled: false,
    icon: renderIcon(Heart)
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
    key: 'favourites',
    disabled: false,
    icon: renderIcon(Star)
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
    key: 'history',
    disabled: false,
    icon: renderIcon(History)
  },
];

export default {
  name: 'Footer',
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
      activeKey: ref('history'),
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
  padding-bottom: 25px;
}

</style>