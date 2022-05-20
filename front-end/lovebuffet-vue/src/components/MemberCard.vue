<template>
  <n-card class="card-container" :title="name ? name : 'No name provided'" size="small">
    <template #cover>
      <n-image alt="love-buffet-logo"
               :src="unknownUser"
               :preview-disabled="true"
      />
    </template>
    <n-icon class="icon-btn" size="25" v-if="linkedin">
      <a :href="linkedin" target="_blank">
        <LinkedinIn/>
      </a>
    </n-icon>
    <n-icon class="icon-btn" size="25" v-if="github">
      <a :href="github" target="_blank">
        <Github/>
      </a>
    </n-icon>
    <n-icon class="icon-btn" size="25" v-if="facebook">
      <a :href="facebook" target="_blank">
        <FacebookF/>
      </a>
    </n-icon>
  </n-card>
</template>

<script>
import { NCard, NIcon, NImage } from "naive-ui";
import { LinkedinIn, Github, FacebookF } from "@vicons/fa";
import unknownUser from "../assets/img/user-unknown.png";


export default {
  name: "MemberCard",
  components: {
    NCard, NIcon, NImage, LinkedinIn, Github, FacebookF
  },
  data() {
    return {
      unknownUser: unknownUser
    }
  },
  props: {
    name: String,
    linkedin: String,
    github: String,
    facebook: String
  }
}
</script>

<style scoped>
.icon-btn {
  padding: 0 1vw 0 0;
}
.icon-btn a {
  color: #000;
  transition: color ease 0.4s;
}
.icon-btn a:hover {
  color: #23b35d;
}
.card-container {
  transition: all ease 0.2s;
}
.card-container:hover {
  transform: scale(1.02);
  box-shadow: 0px 0px 7px 5px rgba(0,0,0,0.12);
}
</style>