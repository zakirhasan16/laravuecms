<template>
    <div>
        <form ref="form" method="POST" action="/control">
            <input :value="csrf" name="_token" type="hidden">
            <input type="hidden" name="token" :value="$auth.token()" />
            <input type="hidden" name="redirect" :value="$route.fullPath" />
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        }
    },
    mounted() {
        this.$refs.form.submit();
    }
}
</script>
