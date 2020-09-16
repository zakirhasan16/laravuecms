<template>
    <div>
        <b-container class="pt-5 pb-5">
            <template v-if="blog.media.image">
                <img :src="blog.media.image.src" :alt="blog.title" class="img-fluid">
            </template>
            <h2>{{blog.title}}</h2>
            <div v-html="blog.content"></div>
        </b-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            blog: {
                media: {
                    image: null
                }
            }
        }
    },
    created() {
        this.axios.get(`/blog/${this.$route.params.url}`)
            .then(res => {
                this.blog = res.data.data;
            })
    }
}
</script>

<style scoped>

</style>
