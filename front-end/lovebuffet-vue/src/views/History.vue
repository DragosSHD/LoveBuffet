<template>
  <div class="center-layout">
    <div class="page-head">
      <h2>History</h2>
      <div class="sort-items">
      </div>
    </div>
    <main>
      <n-grid cols="3">
        <n-gi class="food-frame" v-for="product in products">
          <div class="cover-img">
            <img :src="product.image" alt="cover-img">
          </div>
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
          <div class="date-added">
            <p>{{ getFormattedDate(product.date) }}</p>
          </div>
        </n-gi>
      </n-grid>
    </main>
  </div>
</template>

<script>
import {NGi, NGrid, NImage, NTag} from "naive-ui"
import {fetcher} from "../utils/api";

export default {
  name: "History",
  components: {
    NGrid, NGi, NImage, NTag
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
    const history = await fetcher(`${this.backend_url}api/history/${user.id}`);
    this.products = history;
  },
  methods: {
    getFormattedDate(date) {
      const localDate = new Date(date);
      return localDate.getDate() + '/'
          + (localDate.getMonth() + 1) + '/'
          + localDate.getFullYear() + " ("
          + localDate.getHours() + ":"
          + (localDate.getMinutes()<10?'0':'') + localDate.getMinutes() + ")";
    }
  }
}
</script>

<style scoped>
.center-layout {
  background: rgb(234,60,93);
  background: linear-gradient(129deg, rgba(234,60,93,0.700717787114846) 0%, rgba(35,179,93,0) 100%);
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
.cover-img {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.product-title {
  font-size: 1.8em;
  margin: 0;
}
.product-title > * {
  margin: 0;
}
.date-added {
  font-size: 1.2em;
}
.cover-img img {
  object-fit: cover;
}
</style>