<template>
  <div class="center-layout">
    <div class="rec-box" v-if="!fetchErr">
      <div class="img-section">
        <n-spin size="large" v-if="!imgUrl"/>
        <img :src="imgUrl" :alt="productFullName" v-if="imgUrl">
      </div>
      <div class="title-section">
        <n-skeleton height="25px" width="33%" v-if="!productName"/>
        <n-tooltip trigger="hover" v-if="productName">
          <template #trigger>
            <h2 v-if="productName">{{ productName }}</h2>
          </template>
          {{ productFullName }}
        </n-tooltip>

        <div class="dot-separator">&#x2022</div>
        <n-skeleton height="25px" width="10%" v-if="!caloriesCount"/>
        <p class="energetic-value" v-if="caloriesCount">{{ caloriesCount }} <span class="smaller">kcal</span></p>
      </div>
      <div class="description-section">
        <n-skeleton text :repeat="3" style="width: 90%; margin: 1px 0; height: 25px" v-if="!description"/>
        <n-skeleton text style="width: 50%; height: 25px" v-if="!description"/>
        <p class="description" v-html="description" v-if="description"></p>
        <p class="link" v-if="description">see more</p>
      </div>
    </div>
    <div class="btn-area" v-if="!fetchErr">
      <n-grid x-gap="50" cols="3">
        <n-gi>
          <button id="discard" class="action-btn" @click="getRandomCuisine">
            <ban size="20" color="#ea3c5d"/>
          </button>
        </n-gi>
        <n-gi>
          <button id="delivery" class="action-btn">
            <bicycle size="20" color="#ffd131"/>
          </button>
        </n-gi>
        <n-gi>
          <button id="recipe" class="action-btn" @click="viewProduct">
            <check size="20" color="#23b35d"/>
          </button>
        </n-gi>
      </n-grid>
    </div>
    <n-alert title="An error occurred while retrieving recommendations!" type="error" v-if="fetchErr"></n-alert>
  </div>
<!--  TODO: Hide blobs on mobile-->
  <div id="bl1" class="blob">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path fill="#FF0066" d="M46.3,-15.7C55.2,12.3,54.3,42.9,36.5,57.6C18.7,72.2,-16,71,-34.3,55.7C-52.7,40.4,-54.7,11,-46.3,-16.5C-37.8,-43.9,-18.9,-69.4,-0.1,-69.4C18.7,-69.3,37.4,-43.8,46.3,-15.7Z" transform="translate(100 100)" />
    </svg>
  </div>
  <div id="bl2" class="blob">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path fill="#FF0066" d="M15.7,-27.5C19.4,-15.6,20.7,-9.8,30,0.9C39.3,11.6,56.5,27.1,57.4,40.2C58.3,53.3,42.8,64.1,25.8,69.9C8.8,75.6,-9.6,76.4,-16.5,65.2C-23.5,54.1,-18.8,31.2,-22.2,16.9C-25.5,2.6,-36.8,-2.9,-43.5,-15C-50.1,-27.1,-52,-45.7,-44,-56.8C-35.9,-67.9,-18,-71.6,-6,-64.5C6,-57.3,12,-39.4,15.7,-27.5Z" transform="translate(100 100)" />
    </svg>
  </div>
  <div id="bl3" class="blob">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path fill="#FF0066" d="M21.4,-23.3C32.1,-16.5,48.1,-13.9,55.5,-5C62.8,4,61.4,19.3,52.2,25.2C42.9,31.1,25.8,27.5,10.2,37.1C-5.4,46.7,-19.5,69.6,-33.4,72.8C-47.2,75.9,-60.6,59.4,-62.9,42.6C-65.1,25.8,-56.2,8.7,-45.3,-0.2C-34.5,-9.2,-21.9,-10.1,-14,-17.4C-6.2,-24.8,-3.1,-38.5,1.1,-39.8C5.3,-41.2,10.7,-30.2,21.4,-23.3Z" transform="translate(100 100)" />
    </svg>
  </div>
</template>

<script>
import { NButton, NIcon, NGrid, NGi, NSkeleton, NAlert, NSpin, NTooltip } from "naive-ui";
import { Bicycle, Check, Ban } from "@vicons/fa";
import { fetcher } from "../utils/api";


export default {


  name: "Recommendation",
  components: {
    NButton, NIcon, Bicycle, Ban, Check, NGrid, NGi, NSkeleton, NAlert, NSpin,
    NTooltip
  },
  data () {
    return {
      productId: "",
      productName: "",
      productFullName: "",
      imgUrl: "",
      caloriesCount: "",
      description: "",
      fetchErr: false,
      cuisine: "american"
    }
  },
  methods: {
    async getFoodApiKey() {
      const data = await fetcher(`${this.backend_url}api/foodApi`);
      return data ? data.key : "err";
    },
    getRandomCuisine() {
      const choices = ["american", "african", "british", "cajun",
                      "french", "german", "greek", "italian", "irish",
                      "jewish"];
      this.cuisine = choices[Math.floor(Math.random() * 10)];
      this.productName = "";
      this.imgUrl = "";
      this.description = "";
      this.productFullName = "";
      this.caloriesCount = "";
      this.changeProduct();
    },
    async changeProduct() {
      const apiKey = await this.getFoodApiKey();
      const data = {};
      const DESC_LIMIT = 350;
      const TITLE_LIMIT = 15;

      if(apiKey !== "err") {
        data.overview = await fetcher(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&minCalories=5&number=1&cuisine=${this.cuisine}`);
        data.details = await fetcher(`https://api.spoonacular.com/recipes/${data.overview.results[0].id}/summary?apiKey=${apiKey}`);
      }
      if(data.overview && data.details) {
        this.fetchErr = false;
        const recipe = data.overview.results[0];
        this.productId = recipe.id;
        this.productFullName = recipe.title;
        this.caloriesCount = recipe.nutrition.nutrients[0].amount;
        this.imgUrl = recipe.image;
        this.productName = recipe.title.slice(0, TITLE_LIMIT);
        if(recipe.title.length > TITLE_LIMIT) {
          this.productName += "...";
        }
        this.description = data.details.summary.slice(0, DESC_LIMIT);
        if(data.details.summary.length > DESC_LIMIT) {
          this.description += "...";
        }
      }
      if(apiKey === "err" || !data) {
        this.fetchErr = true;
      }
    },
    async viewProduct() {
      await this.addToHistory(this.productId, this.productName, this.imgUrl);
      //TODO: Redirect to recipe
    },
    async addToHistory(api_id, title, image) {
      fetcher(`${this.backend_url}api/recipes`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          api_id: api_id,
          title: title,
          image: image
        })
      }).then(async recipe => {
        const data = await fetcher(`${this.backend_url}api/history/add`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            "userToken": localStorage.jwt,
            "recipeId": recipe.id
          })
        });
      });
    }
  },
  async mounted() {
    await this.changeProduct();
  }
}
</script>

<style scoped>
.center-layout {
  background: rgb(234,60,93);
  background: linear-gradient(90deg, rgba(234,60,93,0.1516981792717087) 19%, rgba(255,255,255,0.3337710084033614) 100%);
  min-height: 85vh;

}
.rec-box {
  margin: 20px 0;
  width: 35%;
  min-width: 350px;
  min-height: 550px;
  border-radius: 50px;
  overflow: hidden;
  -webkit-box-shadow: 5px 5px 5px -3px rgba(0,0,0,0.5);
  box-shadow: 5px 5px 5px -3px rgba(0,0,0,0.5);
}
.img-section {
  background-color: #fff;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.img-section img {
  min-width: 100%;
}
.title-section {
  background-color: #fff;
  min-height: 70px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid #d0d0d0;
}
.description-section {
  background-color: #fff;
  min-height: 180px;
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  padding: 20px;
  flex-wrap: wrap;
}
h2 {
  text-transform: uppercase;
}
.dot-separator {
  font-size: 3em;
  margin: 0 15px;
}
.energetic-value {
  font-size: 1.1em;
  font-weight: bold;
}
.smaller {
  font-weight: normal;
}
.description {
  margin: 0;
  width: 90%;
  text-align: left;
  word-break: break-all;
}
.link {
  color: #23b35d;
}
.link:hover {

  cursor: pointer;
  text-decoration: underline;
}
.btn-area {
  margin: 20px 0;
}
.action-btn {
  -webkit-box-shadow: 5px 5px 5px -3px rgba(0,0,0,0.5);
  box-shadow: 5px 5px 5px -3px rgba(0,0,0,0.5);
  background-color: #fff;
  border: 0;
  width: 75px;
  height: 75px;
  padding: 15px;
  border-radius: 50%;
  display: inline-block;
  transition: all ease 0.1s;
}
.action-btn:hover {
  -webkit-box-shadow: 1px 1px 1px 0 rgba(0,0,0,0.5);
  box-shadow: 1px 1px 1px 0 rgba(0,0,0,0.5);
  transform: scale(0.9);
  cursor: pointer;
}
.action-btn > * {
  vertical-align: middle;
}
.blob {
  position: absolute;
  opacity: 40%;
  z-index: -1;
}
#bl1 {
  width: 500px;
  height: 500px;
  top: 60vh;
  left: 5vw;
}
#bl2 {
  width: 500px;
  height: 500px;
  top: 20vh;
  right: -2vw;
}
#bl3 {
  width: 500px;
  height: 500px;
  top: -2vh;
  left: -2vw;
}
</style>