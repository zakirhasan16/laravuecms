<template>
    <v-select
        v-model="form.educators"
        :options="educatorOptions"
        :reduce="o => o.id"
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
            educatorOptions: []
        }
    },
    mounted() {
        this.request.get('/admin/educators')
            .then(res => {
                this.educatorOptions = res.data.data;
            })
    }
}
</script>

<style scoped>

</style>
