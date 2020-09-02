<template>
    <div>
        <base-page-heading :title="module.title">
            <template #extra>
                <b-button variant="success" class="mr-1 mb-3" :to="{name: `${module.route_key}-index`}">
                    <i class="fa fa-fw fa-bars mr-1"></i> Listeye Dön
                </b-button>
            </template>
        </base-page-heading>
        <div class="content">
            <base-block :title="module.key + ' Ekle'" fx-shadow class="pb-3">
                <b-form @submit.prevent="onSubmit">
                    <FormCreator :form="form" :fields="module.form_fields"></FormCreator>
                    <b-form-group>
                        <b-button
                            type="submit"
                            variant="success"
                            block
                        >
                            KAYDET
                        </b-button>
                    </b-form-group>
                </b-form>
            </base-block>
        </div>
    </div>
</template>

<script>
import FormCreator from "../../../components/FormCreator"

export default {
    components: {
        FormCreator
    },
    props: {
        module: {
            type: Object,
            required: true
        },
    },
    data() {
        return {
            form: {
                media: {},
                educators: [],
                modules: []
            }
        }
    },
    watch: {
        'form.title'(val) {
            this.form.url = urlify(val);
        }
    },
    methods: {
        onSubmit() {
            this.form.educators = this.form.educators.map(i => i.id ? i.id : i)
            let formData = this.makeFormData(this.form, '')
            formData.append('_method', 'PUT')

            this.request.post(`/admin/${this.module.route_key}/${this.$route.params.id}`, formData)
                .then(res => {
                    this.$router.push({name: `${this.module.route_key}-index`})
                })
        }
    },
    mounted() {
        this.request.get(`/admin/${this.module.route_key}/${this.$route.params.id}`)
            .then(res => {
                this.form = res.data.data;
            })
    }
}
</script>

<style scoped>

</style>
