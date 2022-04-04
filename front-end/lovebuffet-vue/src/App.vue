<template>
  <Navbar />
  <h1>Hello World!</h1>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  name: 'App',
  components: {
    Navbar
  }
}

</script>

<style>
@import './assets/base.css';

</style>
