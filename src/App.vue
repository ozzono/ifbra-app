<template>
  <v-app id="app">
    <VuetifyHeader></VuetifyHeader>
    <Form3></Form3>
    <VuetifyFooter></VuetifyFooter>
  </v-app>
</template>

<script>
import VuetifyHeader from "@/components/VuetifyHeader";
import VuetifyFooter from "@/components/VuetifyFooter";
import Form3 from "@/components/forms/Form3";
// import CheckTest from "@/components/CheckList";
export default {
  icons: {
    iconfont: "fa"
  },
  components: {
    VuetifyHeader: VuetifyHeader,
    VuetifyFooter: VuetifyFooter,
    Form3: Form3
    // CheckTest: CheckTest
  }
};
</script>

<style></style>
