<template>
  <main>
    <div class="center-layout">
      <div class="title-box">
        <h2>Log in</h2>
      </div>
      <div class="floating-box">
        <div class="icon-box">
          <n-icon size="7em" color="#23b35d">
            <LemonRegular/>
          </n-icon>
        </div>
        <form @submit.prevent="submitLogin">
          <FormField v-model="email" name="email" type="email" >
            <EnvelopeRegular/>
          </FormField>
          <FormField v-model="password" name="password" type="password">
            <Lock/>
          </FormField>
          <input class="submit-btn" type="submit" value="Log In">
        </form>
        <p>Don't have an account yet? Register <router-link to="/register">here</router-link>.</p>
        <div class="alert-container" v-if="showError">
          <n-alert :title="errorText" type="error">
          </n-alert>
        </div>
        <div class="alert-container" v-if="showSuccess">
          <n-alert title="Logged in!" type="success">
          </n-alert>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import {NIcon, NAlert} from "naive-ui";
import {EnvelopeRegular, LemonRegular, Lock} from "@vicons/fa";
import FormField from "../components/FormField.vue";


export default {
  name: "Login",
  components: {
    NIcon, LemonRegular, EnvelopeRegular, Lock, FormField, NAlert
  },
  data () {
    return {
      submit: false,
      email: "",
      password: "",
      errorText: "An error occurred",
      showError: false,
      showSuccess: false
    }
  },
  methods: {
    async submitLogin() {
      const res = await fetch(`api/users?email=${this.email}`);
      const data = await res.json();
      const user = data[0];
      console.log(user);
      if(!user || user.password !== this.password) {
        this.showError = true;
        this.errorText = "Oops! Your account email or password is incorrect.";
      }
      if(user && user.password === this.password) {
       this.showError = false;
       this.showSuccess = true;
      }

    }
  }
}
</script>

<style scoped>
.center-layout {
  min-height: 80vh;
  background: linear-gradient(90deg, #ea3c5d 19%, rgba(166,227,191,1) 100%, rgba(255,255,255,1) 100%);
}
.title-box {
  width: 100%;
  max-width: 700px;
  text-align: left;
}
.floating-box {
  background-color: #FFFFFF;
  width: 100%;
  max-width: 700px;
  border-radius: 25px 0 25px 0;
  padding: 5vh 0;
  box-shadow: 1px 1px 5px 1px #000000;
}
.icon-box {
  border-radius: 50%;
  border: 3px solid #23b35d;
  display: inline-block;
  padding: 25px;
  margin: 2em 0;
  min-width: 100px;
  min-height: 100px;
}
.icon-box > * {
  vertical-align: middle;
}
.title-box h2 {
  font-size: 3em;
  text-transform: uppercase;
  color: #23b35d;
}
.form-field {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #efefef;
  padding: 1vh 0;
  margin: 1vh 10vw;
}
.field-group {
  display: flex;
  flex-direction: column;
  justify-content: left;
  text-align: left;
  font-weight: bold;
  color: #838383;
}
.field-group input {
  border: 0;
  background: transparent;
  border-bottom: 3px solid #23b35d;
}
.form-field input:focus-visible {
  outline: none;
}
.field-icon {
  display: inline-block;
  margin-right: 50px;
  border-radius: 50%;
  background-color: #f5ced5;
  font-size: 3em;
  min-width: 80px;
  min-height: 80px;
}
.field-icon > * {
  vertical-align: middle;
}
.submit-btn {
  border-radius: 10%;
  background-color: #f5ced5;
  font-weight: bold;
  font-size: 1.5em;
  padding: 0.5em 2em;
  border: 0px;
  cursor: pointer;
  margin: 1.5em 0;
  transition: all ease 0.2s;
}
.submit-btn:hover {
  color: #23b35d;
  transform: scale(0.95);
}
.alert-container {
  margin: 0 20px;
}
</style>