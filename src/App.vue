<template>
  <v-app id="app">
    <VuetifyHeader></VuetifyHeader>
    <!-- <Form2></Form2> -->
    <ButtonCounter></ButtonCounter>
    <VuetifyFooter></VuetifyFooter>
    <router-view />
  </v-app>
</template>

<script>
import VuetifyHeader from "@/components/VuetifyHeader";
import VuetifyFooter from "@/components/VuetifyFooter";
import ButtonCounter from "@/components/test/ButtonCounter";
// import Form2 from "@/components/forms/Form2";
// import Form1 from "@/components/Form1";
// import CheckTest from "@/components/CheckList";
export default {
  components: {
    "VuetifyHeader": VuetifyHeader,
    "VuetifyFooter": VuetifyFooter,
    ButtonCounter: ButtonCounter
    // Form2: Form2
    // CheckTest: CheckTest
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
