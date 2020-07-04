<template>
  <v-select
    :items="items"
    outlined
    justify="center"
    class="align-start"
  ></v-select>
</template>

<script>
export default {
  data: () => ({
    items: [25, 50, 75, 100]
  })
};
</script>

<style></style>
