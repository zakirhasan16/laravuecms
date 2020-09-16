<template>
    <div>
        <b-container class="pt-5 pb-5">
            <b-row>
                <b-col sm="4" v-for="blog in blogs" :key="'blog-'+blog.id">
                    <b-card :img-src="blog.media && blog.media.image ? blog.media.image.src : ''" :title="blog.title">
                        <router-link :to="{name:'BlogDetail', params: {url: blog.url}}">Detaylar</router-link>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            blogs: []
        }
    },
    watch: {
        '$route.query': {
            handler(val) {
              this.getBlogs();
            },
            deep: true
        }
    },
    methods: {
        getBlogs() {
            this.axios.get(`/blogs`, {params: {q : this.$route.query.q}})
                .then(res => {
                    this.blogs = res.data.data;
                })
        }
    },
    created() {
        this.getBlogs();
    }
}
</script>

<style scoped>

</style>
