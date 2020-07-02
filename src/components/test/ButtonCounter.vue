<template>
    <div id="components-demo">botao
        <button-counter></button-counter>
    </div>
</template>

<script>
export default {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
}
</script>

<style>

</style>