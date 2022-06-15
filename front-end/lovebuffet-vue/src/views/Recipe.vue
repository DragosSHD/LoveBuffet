<template>
  <div class="center-layout">
    <div class="window">
      <h2>Recipe #{{ id }}</h2>
      <div class="center-spin" v-show="showSpinner">
        <n-spin>
          <template #description>
            Fetching recipe...
          </template>
        </n-spin>
      </div>
      <div class="center-alert" v-show="isError">
        <n-alert title="404" type="warning">
          {{ errMessage }}
        </n-alert>
      </div>
      <div class="recipe-content" v-show="!showSpinner && !isError">
        <div class="title-bar">
          <h1>{{ title }}</h1>
          <n-button tertiary circle type="primary" @click="addToFavourites">
            <template #icon>
              <n-icon><HeartRegular v-show="!isFavourite"/><Heart v-show="isFavourite"/></n-icon>
            </template>
          </n-button>
        </div>
        <div class="recipe-img">
          <img :src="imageUrl" alt="">
        </div>
        <div class="tags-area">
          <n-tag type="success" v-for="dishType in dishTypes">
            {{ dishType }}
          </n-tag>
        </div>
        <div class="instructions-area">
          <p v-html="description"></p>
        </div>
        <div class="ingredients-area">
          <ul>
            <li v-for="ingredient in ingredients">
              {{ ingredient.original }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {fetcher, getFoodApiKey} from "../utils/api";
import { NTag, NSpin, NButton, NIcon, NAlert } from "naive-ui";
import { HeartRegular, Heart } from "@vicons/fa";

export default {
  name: "Recipe",
  components: {
    NTag, NSpin, NButton, NIcon, HeartRegular, Heart, NAlert
  },
  data() {
    return {
      id: "",
      title: "",
      imageUrl: "",
      description: "",
      ingredients: [],
      dishTypes: [],
      showSpinner: true,
      isFavourite: false,
      isError: false,
      errMessage: ""
    }
  },
  methods: {
    async addToFavourites() {
      const res = await fetch(`${this.backend_url}api/favourites/add`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          "userToken": localStorage.jwt,
          "recipeId": this.id
        })
      });
      if(res.status === 201) {
        this.isFavourite = true;
      }
      if(res.status === 204) {
        this.isFavourite = false;
      }
    },
    async checkIfFavourite(recipeId) {
      const res = await fetch(`${this.backend_url}api/favourites/isFavourite/1?recipeId=${recipeId}`);
      if(res.status === 302) {
        this.isFavourite = true;
      }
      if(res.status === 404) {
        this.isFavourite = false;
      }
    }
  },
  watchQuery: ["id"],
  async mounted() {
    this.id = this.$route.query.id;
    if(!this.id) {
      await this.$router.push({ path: '/'});
    }
    if(this.id) {
      const apiKey = await getFoodApiKey();
      const data = await fetcher(`https://api.spoonacular.com/recipes/${this.id}/information?apiKey=${apiKey}&includeNutrition=false`);
      if(!data) {
        this.showSpinner = true;
      }
      if(data) {
        this.showSpinner = false;
        if(data.code === 404) {
          this.isError = true;
          this.errMessage = `Product with id: #${this.id} was not found!`;
        }
        if(data.code !== 404) {
          this.title = data.title;
          this.imageUrl = data.image;
          this.description = data.summary;
          this.dishTypes = data.dishTypes;
          this.ingredients = data.extendedIngredients;
        }
      }
    }
    await this.checkIfFavourite(this.id);
  }
}
</script>

<style scoped>
.window {
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 20vh;
  max-width: 1150px;
  min-width: 300px;
  width: 95%;
}
.instructions-area > * {
  text-align: justify;
}
.tags-area {
  display: flex;
}
.tags-area > * {
  margin: 0 10px 0 0 ;
}

.center-spin {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
}
.title-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.center-alert {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
}

.recipe-img > img {
  width: 100%;
  height: auto;
  max-width: 550px;
}
</style>