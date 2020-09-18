<template>
  <div>
    <Evaluation />
    <Form1 />
    <Form2 />
    <Form3 />
    <Report />
    <Form4 />
    <ScrollTop />
  </div>
</template>

<script>
export default {
  components: {
    Evaluation: () => import("@/components/Evaluation"),
    Form1: () => import("@/components/forms/Form1"),
    Form2: () => import("@/components/forms/Form2"),
    Form3: () => import("@/components/forms/Form3"),
    Report: () => import("@/components/Report"),
    Form4: () => import("@/components/forms/Form4"),
    ScrollTop: () => import("@/components/ScrollTop"),
  }
};
</script>
<style>
@media only print {
  .print-hidden {
    display: none;
  }
}
</style>
