<template>
  <div id="app">
    <ATM msg="Welcome to ATM"/>
  </div>
</template>

<script>
import ATM from './view/ATM.vue'

export default {
  name: 'App',
  components: {
    ATM
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 120px;
  margin-left: 2%;
  margin-right: 2%;
}
</style>
