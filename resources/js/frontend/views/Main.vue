<template>
    <div>
        <Header />
        <transition enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut" mode="out-in">
            <router-view />
        </transition>
    </div>
</template>

<script>
import Header from "../components/Header";
export default {
    components: {
        Header
    },
}
</script>

<style scoped>

</style>
