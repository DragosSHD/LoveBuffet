<template>
  <div class="form-field">
    <div class="field-icon">
      <n-icon>
        <slot/>
      </n-icon>
    </div>
    <span class="field-group">
              <label :for="name">{{ name }}</label>
              <input :value="modelValue" :type="type" :name="name" :id="name" @input="$emit('update:modelValue', $event.target.value)" @blur="$emit('blur', $event.target.value)" required>
    </span>
  </div>
</template>

<script>
import { NIcon } from "naive-ui";

export default {
  name: "FormField",
  components: {
    NIcon
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
</style>