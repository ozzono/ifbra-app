<template>
  <v-app id="app">
    <VuetifyHeader></VuetifyHeader>
    <Evaluation></Evaluation>
    <Form1></Form1>
    <Form2></Form2>
    <Form3></Form3>
    <Form4></Form4>
    <VuetifyFooter></VuetifyFooter>
  </v-app>
</template>

<script>
import VuetifyHeader from "@/components/VuetifyHeader";
import VuetifyFooter from "@/components/VuetifyFooter";
import Form1 from "@/components/forms/Form1";
import Form2 from "@/components/forms/Form2";
import Form3 from "@/components/forms/Form3";
import Form4 from "@/components/forms/Form4";
import Evaluation from "@/components/Evaluation";
export default {
  components: {
    VuetifyHeader: VuetifyHeader,
    VuetifyFooter: VuetifyFooter,
    Form1: Form1,
    Form2: Form2,
    Form3: Form3,
    Form4: Form4,
    Evaluation: Evaluation
  }
};
</script>

<style></style>
