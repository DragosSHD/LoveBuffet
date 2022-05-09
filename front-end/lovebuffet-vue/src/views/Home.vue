<template>
  <main>
    <div id="first-container" class="green-container">
      <n-grid class="section-grid" cols="1 m:2" responsive="screen">
        <n-gi>
          <div class="header-box">
            <h1>Love<span style="color: #f5ced5">Buffet</span></h1>
            <h3>Easy, Fast &<br/> Delicious</h3>
            <p>Find Love in food with our<br/> easy to use webapp.</p>
            <n-button id="start-btn" :round="true" type="info">
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
    <div class="container white-panel">
      <n-grid y-gap="50" class="section-grid" cols="1 m:2" responsive="screen">
        <n-gi span="1 m:0">
          <n-icon size="350" color="#23b35d">
            <AppleAlt/>
          </n-icon>
        </n-gi>
        <n-gi>
          <div class="description-box">
            <h4>About us</h4>
            <h2>Love for Food &<br/>Quality</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ut massa enim. Quisque tellus augue, gravida ac odio eget, pretium volutpat libero. Nunc imperdiet, ipsum ut scelerisque rutrum, eros nunc commodo massa, et blandit risus dolor quis risus. Morbi quis enim luctus, rhoncus mauris eu, commodo elit. Curabitur mollis elementum orci, vitae vulputate nunc accumsan et. Aliquam commodo, sapien eu consectetur hendrerit, nulla odio lobortis leo, feugiat finibus ipsum neque at ipsum.</p>
          </div>
        </n-gi>
        <n-gi span="0 m:1">
          <n-icon size="350" color="#23b35d">
            <AppleAlt/>
          </n-icon>
        </n-gi>
      </n-grid>
    </div>
    <div class="container green-panel">
      <n-grid y-gap="50" class="section-grid" cols="1 m:2" responsive="screen">
        <n-gi>
          <n-icon size="350" color="#fff">
            <DrumstickBite/>
          </n-icon>
        </n-gi>
        <n-gi>
          <div class="description-box">
            <h4>The app</h4>
            <h2>Find the best match&<br/>for your tastes</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ut massa enim. Quisque tellus augue, gravida ac odio eget, pretium volutpat libero. Nunc imperdiet, ipsum ut scelerisque rutrum, eros nunc commodo massa, et blandit risus dolor quis risus. Morbi quis enim luctus, rhoncus mauris eu, commodo elit. Curabitur mollis elementum orci, vitae vulputate nunc accumsan et. Aliquam commodo, sapien eu consectetur hendrerit, nulla odio lobortis leo, feugiat finibus ipsum neque at ipsum.</p>
          </div>
        </n-gi>
      </n-grid>
    </div>
    <div class="container">
      <div class="center">
        <h2>Our Team</h2>
      </div>
      <div id="team-row">
        <n-grid x-gap="25" y-gap="25"
                id="team-members"
                class="section-grid" cols="1 m:3"
                responsive="screen">
          <n-gi>
            <MemberCard name="Dragos Dobre"
                        facebook="https://www.facebook.com"
                        linkedin="https://www.linkedin.com"
                        github="https://github.com"/>
          </n-gi>
          <n-gi>
            <MemberCard name="Radu-Cristian Dobre"
                        facebook="https://www.facebook.com"
                        linkedin="https://www.linkedin.com"
                        github="https://github.com"/>
          </n-gi>
          <n-gi><MemberCard name="Iulia-Elena Teodorescu"
                            facebook="https://www.facebook.com"
                            linkedin="https://www.linkedin.com"
                            github="https://github.com"/></n-gi>
        </n-grid>
      </div>
    </div>
  </main>
</template>

<script>
import { NGrid, NGi, NImage, NButton, NIcon, NCard } from "naive-ui";
import { AppleAlt, DrumstickBite, LinkedinIn, Github, FacebookF } from "@vicons/fa";
import MemberCard from "../components/MemberCard.vue";

export default {
  name: "Home",
  components: {
    NGrid, NGi, NImage, NButton, AppleAlt, NIcon, DrumstickBite, NCard,
    LinkedinIn, Github, FacebookF, MemberCard
  },
  beforeMount() {
    if(localStorage.jwt) {
      this.$router.push({ path: "/recommendation" });
    }
  }
}
</script>

<style scoped>
.green-container {
  background: #23b35d linear-gradient(90deg,  rgba(35, 179, 93, 1) 20%,
                                              rgba(166, 227, 191, 1) 100%);
  min-height: 90vh;
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
.container {
  min-height: 70vh;
}
.description-box {
  max-width: 70%;
  text-align: justify;
}
.description-box h4 {
  font-size: 1.2em;
  color: #ea3c5d;
}
.description-box h2 {
  font-size: 2.5em;
  margin: 0;
  line-height: 1.2em;
}
.description-box p {
  font-size: 1.2em;
  line-height: 1.4em;
}
.green-panel {
  background: #23b35d linear-gradient(90deg,  rgba(166, 227, 191, 1) 20%,
                                              rgba(35, 179, 93, 1) 100%);
  border-radius: 350px 0 0 0 ;
  color: #FFF;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
#team-row {
  padding: 0 10vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>