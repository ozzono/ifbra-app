<template>
  <div>{{funcoes}}</div>
</template>

<script>
import Funcoes from "@/assets/json/form2.json";
export default {
data: () => ({
      funcoes: Object.values(Funcoes)
    })
}
</script>

<style>

</style>