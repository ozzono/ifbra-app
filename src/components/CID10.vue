<template>
  <v-container>
    <DevAlert />
  </v-container>
</template>

<script>
export default {
  components: { DevAlert: () => import("@/components/DevAlert") }
};
</script>

<style></style>
