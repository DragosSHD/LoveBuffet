<template>
  <main>
    <div id="central-view" class="center-layout">
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
        <div class="alert-container" v-if="showInfo">
          <n-alert title="You should Log In before using that page!" type="info">
          </n-alert>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import {NAlert, NIcon} from "naive-ui";
import {EnvelopeRegular, LemonRegular, Lock} from "@vicons/fa";
import FormField from "../components/FormField.vue";
import {fetcher} from "../utils/api";


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
      showSuccess: false,
      showInfo: false
    }
  },
  methods: {
    async submitLogin() {
      const res = await fetch(`${this.backend_url}api/users?email=${this.email}`);
      const data = await res.json();
      if(!data) {
          this.showInfo = false;
          this.showError = true;
          this.errorText = "Oops! There's no account registered with this email address!";
      }
      if(data) {
        const auth = await fetch(`${this.backend_url}api/auth`, {
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password
          }),
          method: 'POST'
        });
        if(auth.status === 401) {
            this.showInfo = false;
            this.showError = true;
            this.errorText = "Oops! Your account email or password is incorrect.";
        }
        if(auth.status === 200) {
          const token = await auth.json();
          this.showSuccess = true;
          localStorage.jwt = token;
          await this.$router.push({ path: '/' });
        }
      }
    }
  },
  async beforeMount() {
    if(localStorage.jwt) {
      await this.$router.push({ path: '/account'});
    }
    if(this.$route.query.msg === "infoLog") {
      this.showInfo = true;
    }
  }
}
</script>

<style scoped>
.center-layout {
  min-height: 80vh;
  background: rgb(234,60,93);
  background: linear-gradient(129deg, rgba(234,60,93,0.700717787114846) 0%, rgba(35,179,93,0) 100%);
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
.field-group input {
  border: 0;
  background: transparent;
  border-bottom: 3px solid #23b35d;
}
.form-field input:focus-visible {
  outline: none;
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
  border: 0;
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