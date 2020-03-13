<template>
  <div id="app">
    <top-header></top-header>
    <customer-list></customer-list>
    <!-- <api-example></api-example> -->
    <router-view />
  </div>
</template>

<script>
import TopHeader from "@/components/TopHeader";
import CustomerList from "@/components/CustomerList";
// import ApiExample from "@/components/ApiExample";
export default {
  components: {
    "top-header": TopHeader,
    CustomerList
    // "api-example": ApiExample
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
