<template>
  <div>
    <Evaluation />
    <Form1 />
    <Form2 />
    <Form3 />
    <Report />
    <Form4 />
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
    Form4: () => import("@/components/forms/Form4")
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
