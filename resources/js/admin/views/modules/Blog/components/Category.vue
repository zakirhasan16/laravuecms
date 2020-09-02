<template>
    <v-select
        v-model="form.category_id"
        :options="categories"
        :reduce="o => o.id"
        :clearable="false"
    >
        <template #no-options>Kayıt Bulunamadı</template>
    </v-select>
</template>

<script>
export default {
    props: {
        form: {
            type: Object,
            required: true
        },
    },
    data() {
        return {
            categories: []
        }
    },
    mounted() {
        this.request.get('/admin/blog-categories')
            .then(res => {
                this.categories = res.data.data;
            })
    }
}
</script>

<style scoped>

</style>
