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
                educators: [],
                modules: []
            }
        }
    },

    watch: {
        'form.title'(val) {
            this.form.url = urlify(val)
        }
    },
    methods: {
        onSubmit() {
            let formData = this.makeFormData(this.form, '')

            this.request.post(`/admin/${this.module.route_key}`, formData)
                .then(res => {
                    this.$router.push({name: `${this.module.route_key}-index`})
                })
        }
    },
}
</script>

<style scoped>

</style>
