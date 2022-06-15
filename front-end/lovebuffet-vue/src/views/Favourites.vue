<template>
  <div class="center-layout">
    <div class="page-head">
      <h2>Favourites</h2>
      <div class="sort-items">
      </div>
    </div>
    <main>
      <div class="empty-container" v-if="!products.length">
        <n-empty size="huge" description="There's nothing in your favourites">
          <template #extra>
            <n-button size="small" @click="$router.push({ path: '/' });">
              Find Something New
            </n-button>
          </template>
        </n-empty>
      </div>
      <n-grid cols="1 m:2 l:3" responsive="screen" v-if="products.length">
        <n-gi class="food-frame" v-for="product in products">
          <router-link :to="'/recipe?id=' + product.api_id">
            <div class="cover-img">
              <img :src="product.image" alt="cover-img">
            </div>
          </router-link>
          <div class="product-title">
            <h3>{{ product.title }}</h3>
          </div>
          <div class="tag-section">
            <n-tag type="success" v-if="true">
              Recipe
            </n-tag>
            <n-tag type="info" v-if="false">
              Delivery
            </n-tag>
          </div>
        </n-gi>
      </n-grid>
    </main>
  </div>
</template>

<script>
import {NButton, NEmpty, NGi, NGrid, NImage, NTag} from "naive-ui"
import {fetcher} from "../utils/api";

export default {
  name: "Favourites",
  components: {
    NGrid, NGi, NImage, NTag, NEmpty, NButton
  },
  data() {
    return {
      products: [],
    }
  },
  async beforeMount() {
    if(!localStorage.jwt) {
      await this.$router.push({ path: '/login', query: {msg: "infoLog"} });
    }
  },
  async mounted() {
    const user = await fetcher(`${this.backend_url}api/auth/checkJWT`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        token: localStorage.jwt
      })
    });
    this.products = await fetcher(`${this.backend_url}api/favourites/${user.id}`);
  },
  methods: {

  }
}
</script>

<style scoped>
.center-layout {
  background: rgb(234,60,93);
  background: linear-gradient(129deg, rgba(234,60,93,0.1516981792717087) 0%, rgba(35,179,93,0) 100%);
}
.page-head {
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.page-head h2 {
  font-weight: bold;
  font-size: 2.5em;
}
main {
  width: 100%;
  max-width: 1200px;
}
.sort-items {
  width: 100px;
  height: 25px;
  /*background-color: #23b35d;*/
}
.food-frame {
  margin: 10px;
  padding: 0 0 20px 0;
  border-radius: 50px;
  min-height: 200px;
  background-color: white;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  -webkit-box-shadow: 5px 5px 4px -1px rgba(0,0,0,0.37);
  box-shadow: 5px 5px 4px -1px rgba(0,0,0,0.37);
}
.product-title {
  font-size: 1.8em;
  margin: 0;
}
.product-title > * {
  margin: 0;
}
.cover-img img {
  object-fit: cover;
  width: 100%;
  overflow: hidden;
  min-height: 250px;
  height: 25vh;
}
.empty-container {
  min-height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>