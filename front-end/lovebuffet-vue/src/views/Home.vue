<template>
  <main>
    <div id="first-container" class="green-container">
      <n-grid class="section-grid" cols="1 m:2" responsive="screen">
        <n-gi>
          <div class="header-box">
            <h1>Love<span style="color: #f5ced5">Buffet</span></h1>
            <h3>Easy, Fast &<br/> Delicious</h3>
            <p>Find Love in food with our<br/> easy to use webapp.</p>
            <n-button id="start-btn" strong round type="info">
              Start
            </n-button>
          </div>
        </n-gi>
        <n-gi span="0 m:1">
          <n-image id="lovebuffet-phone"
                   alt="love-buffet-logo"
                   src="./src/assets/img/lovebuffet-phone.png"
                   width="300"
                   />
        </n-gi>
      </n-grid>
    </div>
    <div class="white-container">

    </div>
  </main>
</template>

<script>
import { NGrid, NGi, NImage, NButton } from "naive-ui";


export default {
  name: "Home",
  components: {
    NGrid, NGi, NImage, NButton
  }
}
</script>

<style scoped>
.green-container {
  background: #23b35d linear-gradient(90deg,  rgba(35, 179, 93, 1) 19%,
                                              rgba(166, 227, 191, 1) 100%,
                                              rgba(255, 255, 255, 1) 100%);
  height: 90vh;
}

#first-container {
  border-radius: 0 0 350px 0;
}
.section-grid {
  padding: 5vh 0;
}
.section-grid > * {
  display: flex;
  align-items: center;
  justify-content: center;
}
.header-box {
  color: #fff;
}
.header-box h1 {
  font-size: 3.2em;
  margin-bottom: 0;
  padding-bottom: 0;
}
.header-box h3 {
  font-size: 3.8em;
  line-height: 1.2em;
  padding: 0;
  margin: 0;
}
.header-box p {
  font-size: 1.5em;
  font-weight: bold;
}
#start-btn {
  padding: 1em 1.5em;
  font-weight: bold;
  font-size: 1.5em;
}
.white-container {
  height: 80vh;
}
</style>