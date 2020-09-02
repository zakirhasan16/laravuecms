<template>
    <div>
        <b-container>
            <b-row style="height: 100vh;" align-h="center" align-v="center">
                <b-col sm="4">
                    <b-card title="Giriş Yap">
                        <notifications group="foo" position="top center" class="mt-5"/>
                        <b-form @submit.prevent="onSubmit">
                            <b-form-group
                                label="Email Adresi"
                            >
                                <b-form-input
                                    v-model="form.email"
                                    @blur="$v.form.email.$touch()"
                                ></b-form-input>
                            </b-form-group>
                            <b-form-group
                                label="Şifreniz"
                            >
                                <b-form-input
                                    v-model="form.password"
                                    @blur="$v.form.password.$touch()"
                                    type="password"
                                ></b-form-input>
                            </b-form-group>
                            <b-form-group>
                                <b-button
                                    type="submit"
                                    block
                                    variant="success"
                                    :disabled="$v.form.$invalid"
                                >
                                    Giriş Yap
                                </b-button>
                            </b-form-group>
                        </b-form>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import { required, email } from 'vuelidate/src/validators'

export default {
    data() {
        return {
            form: {
                email: '',
                password: ''
            }
        }
    },
    validations: {
        form: {
            email: {
                required,
                email
            },
            password: {
                required
            }
        }
    },
    methods: {
        onSubmit() {
            const that = this;
            this.$auth.login({
                data: this.form,
            }).then(res => {
                that.$notify({
                    type: 'success',
                    title: 'Başarılı !',
                    text: 'Başarıyla Giriş Yapıldı. Yönlendiriliyorsunuz.',
                    group: 'foo'
                })
            }).catch(err => {
                that.$notify({
                    type: 'error',
                    title: 'Başarısız !',
                    text: 'Email veya Şifre Hatalı.',
                    group: 'foo'
                })
            })
        }
    },
}
</script>

<style scoped>

</style>
