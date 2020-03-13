<template>
    <div>
        <div class="list-group">
            <li class="list-group-item" v-for="funcao in services.funcoes">
                {{funcao.tipo}}
            </li>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>