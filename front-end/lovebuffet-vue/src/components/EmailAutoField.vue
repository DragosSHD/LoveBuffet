<template>
  <div class="form-field">
    <div class="field-icon">
      <n-icon>
        <slot/>
      </n-icon>
    </div>
    <span class="field-group">
              <label>{{ name }}</label>
              <n-auto-complete
                  v-model:value="value"
                  :input-props="{
                    autocomplete: 'disabled'
                  }"
                  :options="options"
                  placeholder="Email"
              />
    </span>
  </div>
</template>

<script>
import { NIcon, NAutoComplete } from "naive-ui";
import {computed, ref} from "vue";

export default {
  name: "EmailAutoField",
  components: {
    NIcon, NAutoComplete
  },
  data() {
    const valueRef = ref("");
    return {
      value: valueRef,
      options: computed(() => {
        return ["@gmail.com", "@yahoo.com"].map((suffix) => {
          const prefix = valueRef.value.split("@")[0];
          return {
            label: prefix + suffix,
            value: prefix + suffix
          };
        })
      })
    }
  },
  props: {
    modelValue: String,
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
}
</script>

<style scoped>
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
</style>