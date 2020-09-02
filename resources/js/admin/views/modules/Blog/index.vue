<template>
    <router-view :module="module"></router-view>
</template>

<script>
import module from "./module";
export default {
    data() {
        return {
            module
        }
    },
}
</script>

<style scoped>

</style>
