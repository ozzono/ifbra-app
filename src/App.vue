<template>
  <v-app id="app">
    <VuetifyHeader></VuetifyHeader>
    <Evaluation></Evaluation>
    <!-- <Form1></Form1> -->
    <!-- <Form2></Form2> -->
    <!-- <Form3></Form3> -->
    <!-- <Form4></Form4> -->
    <VuetifyFooter></VuetifyFooter>
  </v-app>
</template>

<script>
export default {
  components: {
    VuetifyHeader: () => import("@/components/VuetifyHeader"),
    VuetifyFooter: () => import("@/components/VuetifyFooter"),
    Evaluation: () => import("@/components/Evaluation"),
    // Form1: () => import("@/components/forms/Form1"),
    // Form2: () => import("@/components/forms/Form2"),
    // Form3: () => import("@/components/forms/Form3"),
    // Form4: () => import("@/components/forms/Form4")
  }
};
</script>
