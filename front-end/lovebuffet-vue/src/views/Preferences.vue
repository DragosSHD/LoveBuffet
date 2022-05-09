<template>
<h1>Preferences</h1>
</template>

<script>
export default {
  name: "Preferences",
  async beforeMount() {
    if(!localStorage.jwt) {
      await this.$router.push({ path: '/login', query: {msg: "infoLog"} });
    }
  }
}
</script>

<style scoped>

</style>