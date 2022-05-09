<template>
<h1>History</h1>
</template>

<script>

export default {
  name: "History",
  async beforeMount() {
    if(!localStorage.jwt) {
      await this.$router.push({ path: '/login', query: {msg: "infoLog"} });
    }
  }
}
</script>

<style scoped>

</style>