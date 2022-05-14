<template>
  <div class="center-layout">
    <div class="window">
      <h2>Account Options</h2>
      <n-button type="primary">
        Edit Info
      </n-button>
      <n-button type="info" @click="logOut">
        Log Out
      </n-button>
      <n-popconfirm
          @positive-click=""
          @negative-click="">
        <template #trigger>
          <n-button type="error">
            Delete Account
          </n-button>
        </template>
        Are you sure you want to delete your account?
      </n-popconfirm>
    </div>
  </div>
</template>

<script>
import { NButton, NPopconfirm } from "naive-ui";
import { useMessage } from "naive-ui";


export default {
  name: "Account",
  components: {
    NButton, NPopconfirm
  },
  methods: {
    async logOut() {
      localStorage.removeItem("jwt");
      await this.$router.push({ path: '/'});
    }
  }
}
</script>

<style scoped>
.center-layout {
  min-height: 60vh;
}
.window {
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 20vh;
  width: 80%;
}
</style>