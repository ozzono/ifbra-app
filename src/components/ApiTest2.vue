<template>
  <div></div>
</template>

<script>
import axios from "axios";
const baseDomain = "localhost:8000";
const baseUrl = `${baseDomain}/api`;
export default axios.create({
  baseUrl
});
</script>

<style lang="scss" scoped></style>
