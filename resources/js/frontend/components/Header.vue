<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-container>
                <b-navbar-brand :to="{name:'Home'}">Laravel-Vue CMS</b-navbar-brand>

                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav>
                        <b-nav-item-dropdown text="Blog" right>
                            <b-dropdown-item v-for="category in categories" :key="'category-'+category.id" :to="{ name: 'CategoryBlogs', params: { url: category.url} }">{{category.title}}</b-dropdown-item>
                        </b-nav-item-dropdown>
                    </b-navbar-nav>

                    <b-navbar-nav class="ml-auto">
                        <b-nav-form @submit.prevent="search">
                            <b-form-input size="sm" class="mr-sm-2" v-model="form.q" placeholder="Arama Yap"></b-form-input>
                            <b-button size="sm" class="my-2 my-sm-0" type="submit" variant="success">Ara</b-button>
                        </b-nav-form>
                    </b-navbar-nav>
                </b-collapse>
            </b-container>
        </b-navbar>
    </div>
</template>

<script>
export default {
    data() {
        return {
            categories: [],
            form: {
                q: ''
            }
        }
    },
    methods: {
        search() {
            this.$router.push({name: 'SearchResults', query: this.form});
        }
    },
    mounted() {
        this.axios.get('/blog-categories')
            .then(res => {
                this.categories = res.data;
            })
    }
}
</script>

<style scoped>

</style>
