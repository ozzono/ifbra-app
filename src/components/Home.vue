<template>
  <div>
    <!-- <Evaluation /> -->
    <Report />
    <!-- <Form1 /> -->
    <!-- <Form2 /> -->
    <Form3 />
    <!-- <Form4 /> -->
  </div>
</template>

<script>
export default {
  components: {
    // Evaluation: () => import("@/components/Evaluation"),
    Report: () => import("@/components/Report"),
    // Form1: () => import("@/components/forms/Form1"),
    // Form2: () => import("@/components/forms/Form2"),
    Form3: () => import("@/components/forms/Form3"),
    // Form4: () => import("@/components/forms/Form4")
  }
};
</script>
