<template>
  <main>
    <div class="center-layout">
      <div class="page-head">
        <h2>Favourites</h2>
        <div class="sort-items">
        </div>
      </div>
    </div>
  </main>
</template>

<script>

export default {
  name: "Favourites"
}
</script>

<style scoped>
.page-head {
  width: 100%;
  max-width: 1200px;
  background-color: red;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.sort-items {
  width: 100px;
  height: 25px;
  background-color: #23b35d;
}
</style>