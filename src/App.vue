<template>
  <v-app id="app">
    <top-header></top-header>
    <CheckTest></CheckTest>
    <router-view />
  </v-app>
</template>

<script>
import TopHeader from "@/components/TopHeader";
// import Form2 from "@/components/Form2";
// import Form1 from "@/components/Form1";
import CheckTest from "@/components/CheckList";
export default {
  components: {
    "top-header": TopHeader,
    // form1: Form1
    // form2: Form2
    CheckTest: CheckTest
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
