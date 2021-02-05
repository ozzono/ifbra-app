<template>
  <v-container>
    <Disclaimer />
  </v-container>
</template>

<script>
export default {
  components: {
    Disclaimer: () => import("@/components/Disclaimer")
  }
};
</script>
