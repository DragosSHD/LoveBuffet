<template>
  <main>
    <div class="center">
      <div class="title-box">
        <h2>Sign in</h2>
      </div>
      <div class="floating-box">
        <div class="icon-box">
          <n-icon size="7em" color="#23b35d">
            <LemonRegular/>
          </n-icon>
        </div>
        <form>
          <div class="form-field">
            <div class="field-icon">
              <n-icon>
                <EnvelopeRegular/>
              </n-icon>
            </div>
            <span class="field-group">
              <label for="email">Email</label>
              <input type="email" name="email" id="email">
            </span>
          </div>
          <div class="form-field">
            <div class="field-icon">
              <n-icon>
                <Lock/>
              </n-icon>
            </div>
            <span class="field-group">
              <label for="password">Password</label>
              <input type="password" name="password" id="password">
            </span>
          </div>
          <input class="submit-btn" type="submit" value="Sign In">
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import { NIcon } from "naive-ui";
import { LemonRegular, EnvelopeRegular, Lock } from "@vicons/fa";


export default {
  name: "Login",
  components: {
    NIcon, LemonRegular, EnvelopeRegular, Lock
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
  border: 0px;
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