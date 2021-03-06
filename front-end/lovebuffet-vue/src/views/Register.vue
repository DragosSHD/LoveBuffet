<template>
  <main>
    <div class="center-layout">
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
          <n-popover :show="emailErr" placement="top">
            <template #trigger>
              <FormField v-model="email" name="email" type="email" @click="emailErr = false" @blur="checkEmailExists">
                <Envelope/>
              </FormField>
            </template>
            <span class="errText">
              There's already an account with this email!
            </span>
          </n-popover>
          <n-popover :show="userErr" placement="top">
            <template #trigger>
              <FormField v-model="username" type="text" name="username" @click="userErr = false" @blur="checkUsernameExists">
                <User/>
              </FormField>
            </template>
            <span class="errText">
              This username is taken!
            </span>
          </n-popover>
          <n-popover :show="passErr" placement="top">
            <template #trigger>
              <FormField v-model="password" type="password" name="password" @click="passErr = false">
                <Unlock/>
              </FormField>
            </template>
            <span class="errText">
              Password is too short!
            </span>
          </n-popover>
          <n-popover :show="confPassErr" placement="top">
            <template #trigger>
              <FormField v-model="confirmPassword" type="password" name="confirmPassword" @click="confPassErr = false">
                <Lock/>
              </FormField>
            </template>
            <span class="errText">
              Password does not match!
            </span>
          </n-popover>
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
import { NAutoComplete, NIcon, NPopover } from "naive-ui";
import {fetcher} from "../utils/api";


export default {
  name: "Register",
  components: {
    FormField, Envelope, AddressCardRegular, Lock, NIcon, NAutoComplete, EmailAutoField,
    Unlock, User, NPopover
  },
  data() {
    return {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      emailErr: false,
      passErr: false,
      userErr: false,
      confPassErr: false
    }
  },
  methods: {
    submitRegister() {
      if(this.password !== this.confirmPassword) {
        this.confPassErr = true;
        this.confirmPassword = "";
      }
      if(this.password === this.confirmPassword) {
        this.createUser({
          username: this.username,
          email: this.email,
          password: this.password
        });
      }
    },
    async createUser(data) {
      if(await this.uniqueCredentials(data)) {
        const res = await fetch(`${this.backend_url}api/users`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        if(res.status === 201) {
          await this.$router.push({ path: '/login' });
        } else {
          console.log(res);
        }
      }
    },
    async checkUsernameExists() {
      const userFound = await fetcher(`${this.backend_url}api/users?username=${this.username}`);
      if(userFound) {
        this.userErr = true;
      }
    },
    async checkEmailExists() {
      const emailFound = await fetcher(`${this.backend_url}api/users?email=${this.email}`);
      if(emailFound) {
        this.emailErr = true;
      }
    },
    async uniqueCredentials(data) {
      const userFound = await fetcher(`${this.backend_url}api/users?username=${data.username}`);
      const emailFound = await fetcher(`${this.backend_url}api/users?email=${data.email}`);
      if(userFound) {
        this.userErr = true;
        return false;
      }
      if(emailFound) {
        this.emailErr = true;
        return false;
      }
      return true;
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
.errText {
  color: red;
}
</style>