<template>
  <main>
    <div class="center">
      <div class="title-box">
        <h2>Register</h2>
      </div>
      <div class="floating-box">
        <div class="icon-box">
          <n-icon size="7em">
            <AddressCardRegular/>
          </n-icon>
        </div>
        <form @submit.prevent="submitRegister">
          <FormField v-model="email" name="email" type="email">
            <Envelope/>
          </FormField>
          <FormField v-model="username" type="text" name="username">
            <User/>
          </FormField>
          <FormField v-model="password" type="password" name="password">
            <Unlock/>
          </FormField>
          <FormField v-model="confirmPassword" type="password" name="confirmPassword">
            <Lock/>
          </FormField>
          <input class="submit-btn" type="submit" value="Register">
        </form>
        <p>You already have an account? Log in <router-link to="/login">here</router-link>.</p>
      </div>
    </div>
  </main>
</template>

<script>
import FormField from "../components/FormField.vue";
import EmailAutoField from "../components/EmailAutoField.vue";
import { Lock, Envelope, AddressCardRegular, Unlock, User } from "@vicons/fa";
import { NAutoComplete, NIcon } from "naive-ui";
import { computed, ref } from "vue";


export default {
  name: "Register",
  components: {
    FormField, Envelope, AddressCardRegular, Lock, NIcon, NAutoComplete, EmailAutoField,
    Unlock, User
  },
  data() {
    return {
      email: "",
      username: "",
      password: "",
      confirmPassword: ""
    }
  },
  methods: {
    submitRegister() {
      if(this.password !== this.confirmPassword) {
        alert("Password does not match!");
        this.confirmPassword = "";
      } else {
        alert("email: " + this.email + "\n" +
            "username: " + this.username + "\n" +
            "password: " + this.password + "\n" +
            "confPass: " + this.confirmPassword);
      }

    }
  }
}
</script>

<style scoped>
.center {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  padding: 0 2vw 10vh;
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
  color: #23b35d;
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
</style>