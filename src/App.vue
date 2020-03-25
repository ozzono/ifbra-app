<template>
  <div id="app">
    <top-header></top-header>
    <form2></form2>
    <router-view />
  </div>
</template>

<script>
import TopHeader from "@/components/TopHeader";
import Form2 from "@/services/Form2";
export default {
  components: {
    "top-header": TopHeader,
    // CustomerList
    "form2": Form2
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
