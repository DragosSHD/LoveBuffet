<template>
    <div class="center-layout">
      <div class="page-head">
        <h2>Favourites</h2>
        <div class="sort-items">
        </div>
      </div>
      <main>
        <n-grid cols="3">
          <n-gi class="food-frame">
            <div class="cover-img" style="background-image: url('./src/assets/img/burger-demo.jpg')">

            </div>
          </n-gi>
          <n-gi class="food-frame">

          </n-gi>
          <n-gi class="food-frame">

          </n-gi>
        </n-grid>
      </main>
    </div>
</template>

<script>
import { NGrid, NGi, NImage } from "naive-ui"


export default {
  name: "Favourites",
  components: {
    NGrid, NGi, NImage
  }
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
.page-head h2 {
  font-weight: bold;
  font-size: 2.5em;
}
main {
  background-color: #ea3c5d;
  width: 100%;
  height: 100vh;
  max-width: 1200px;
}
.sort-items {
  width: 100px;
  height: 25px;
  background-color: #23b35d;
}
.food-frame {
  margin: 10px;
  border-radius: 50px;
  height: 200px;
  background-color: white;
  overflow: hidden;
}
.cover-img {
  width: 100%;
  height: 100px;
}
</style>