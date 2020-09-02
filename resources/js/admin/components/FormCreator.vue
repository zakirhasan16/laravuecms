<template>
    <div>
        <template v-for="field in fields">
            <template v-if="field.row">
                <b-form-row>
                    <b-col v-for="(formItem, fi_index) in field.items" :key="'item'+fi_index" :sm="formItem.col">
                        <b-form-group :label="formItem.label">
                            <template v-if="formItem.component">
                                <template v-if="formItem.component === 'v-select'">
                                    <v-select
                                        v-model="form[formItem.name]"
                                        :options="selectOptions[formItem.name]"
                                        :label="formItem.optionLabel || 'label'"
                                        :placeholder="formItem.placeholder"
                                        :reduce="formItem.reduce"
                                    >
                                        <template #no-options>Kayıt Bulunamadı</template>
                                    </v-select>
                                </template>
                                <template v-else-if="formItem.component === 'ejs-richtexteditor'">
                                    <ejs-richtexteditor
                                        :is="formItem.component"
                                        v-model="form[formItem.name]"
                                    />
                                </template>
                                <template v-else>
                                    <component
                                        :is="formItem.component"
                                        :form="form"
                                    />
                                </template>
                            </template>
                            <template v-else-if="!formItem.type || formItem.type === 'text'">
                                <b-form-input
                                    v-model="form[formItem.name]"
                                />
                            </template>
                            <template v-else>
                                <b-form-input
                                    v-model="form[formItem.name]"
                                    :type="formItem.type || 'text'"
                                />
                            </template>
                        </b-form-group>
                    </b-col>
                </b-form-row>
            </template>
            <template v-else>
                <template v-if="field.type === 'file'">
                    <template v-if="form.media && form.media[field.name]">
                        <b-form-row>
                            <b-col sm="9">
                                <b-form-group :label="field.label">
                                    <b-form-file
                                        v-model="form[field.name]"
                                        :placeholder="field.label"
                                    />
                                </b-form-group>
                            </b-col>
                            <b-col sm="3">
                                <b-button block variant="success" style="margin-top: 30px;" :href="form.media[field.name].src" target="_blank">
                                    <i class="fa fa-fw fa-image mr-1"></i> Dosyayı Gör
                                </b-button>
                            </b-col>
                        </b-form-row>
                    </template>
                    <template v-else>
                        <b-form-group :label="field.label">
                            <b-form-file
                                v-model="form[field.name]"
                                :placeholder="field.label"
                            />
                        </b-form-group>
                    </template>
                </template>
                <template v-else>
                    <b-form-group :label="field.label">
                        <template v-if="(!field.type && !field.component) || field.type === 'text'">
                            <b-form-input
                                v-model="form[field.name]"
                                :type="field.type || 'text'"
                            />
                        </template>
                        <template v-else-if="field.component">
                            <template v-if="field.component === 'v-select'">
                                <v-select
                                    v-model="form[field.name]"
                                    :options="selectOptions[field.name]"
                                    :label="field.optionLabel || 'label'"
                                    :placeholder="field.placeholder"
                                    :reduce="field.reduce"
                                >
                                    <template #no-options>Kayıt Bulunamadı</template>
                                </v-select>
                            </template>
                            <template v-else-if="field.component === 'ejs-richtexteditor'">
                                <ejs-richtexteditor
                                    :is="field.component"
                                    v-model="form[field.name]"
                                />
                            </template>
                            <template v-else>
                                <component
                                    :is="field.component"
                                    :form="form"
                                />
                            </template>
                        </template>
                    </b-form-group>
                </template>
            </template>
        </template>
    </div>
</template>

<script>
import Vue from "vue";
import { RichTextEditorPlugin, Toolbar, Link, Image, Count, HtmlEditor, QuickToolbar } from "@syncfusion/ej2-vue-richtexteditor";

Vue.use(RichTextEditorPlugin);
export default {
    props: {
        form: {
            type: Object,
            required: true
        },
        fields: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            selectOptions: {}
        }
    },
    created() {
        this.fields.filter(f => f.component === 'v-select').forEach(f => {
            this.$set(this.selectOptions, f.name, []);
        })
        this.fields.filter(f => f.component === 'v-select' && f.getOptions).forEach(f => {
            this.request.get(f.getOptions)
                .then(res => {
                    if(f.name === 'parent_id' && this.$route.params && this.$route.params.id) {
                        this.$set(this.selectOptions, f.name, res.data.data.filter(d => d.id !== parseInt(this.$route.params.id)))
                    } else {
                        this.$set(this.selectOptions, f.name, res.data.data);
                    }
                })
        })
    },
    provide: {
        richtexteditor:[Toolbar, Link, Image, Count, HtmlEditor, QuickToolbar]
    },
}
</script>

<style scoped>

</style>
