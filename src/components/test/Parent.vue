<template>
  <div>
      <Child message="test"></Child>
  </div>
</template>

<script>
import Child from "@/components/test/Child";
export default {
    name:"Parent",
    components:{
        Child
    }
}
</script>

<style>

</style>