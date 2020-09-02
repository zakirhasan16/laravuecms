<template>
    <div>
        <base-page-heading
            title="Şifre Değiştir"
        />
        <div class="content">
            <base-block>
                <b-form @submit.prevent="onSubmit">
                    <b-form-group
                        label="Aktif Şifre"
                    >
                        <b-form-input
                            v-model="form.current_password"
                            @blur="$v.form.current_password.$touch()"
                            type="password"
                        />
                        <b-form-invalid-feedback :state="currentPasswordErrors.length < 0">{{currentPasswordErrors[0]}}</b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group
                        label="Yeni Şifre"
                    >
                        <b-form-input
                            v-model="form.new_password"
                            @blur="$v.form.new_password.$touch()"
                            type="password"
                        />
                        <b-form-invalid-feedback :state="newPasswordErrors.length < 0">{{newPasswordErrors[0]}}</b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group
                        label="Yeni Şifre (Tekrar)"
                    >
                        <b-form-input
                            v-model="form.re_new_password"
                            @blur="$v.form.re_new_password.$touch()"
                            type="password"
                        />
                        <b-form-invalid-feedback :state="reNewPasswordErrors.length < 0">{{reNewPasswordErrors[0]}}</b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group>
                        <b-button type="submit" variant="success" :disabled="$v.form.$invalid">Kaydet</b-button>
                    </b-form-group>
                </b-form>
            </base-block>
        </div>
    </div>
</template>

<script>
import { required, sameAs, minLength, not } from 'vuelidate/src/validators'
export default {
    data() {
        return {
            form: {}
        }
    },
    computed: {
        currentPasswordErrors() {
            const errors = [];
            if(!this.$v.form.current_password.$dirty) return errors;
            !this.$v.form.current_password.required && errors.push('Aktif Şifre Alanı Zorunludur.');
            !this.$v.form.current_password.minLength && errors.push('Aktif Şifre Alanı En Az 6 Haneli olmalıdır.');
            return errors;
        },
        newPasswordErrors() {
            const errors = [];
            if(!this.$v.form.new_password.$dirty) return errors;
            !this.$v.form.new_password.required && errors.push('Yeni Şifre Alanı Zorunludur.');
            !this.$v.form.new_password.minLength && errors.push('Yeni Şifre Alanı En Az 6 Haneli olmalıdır.');
            !this.$v.form.new_password.notSameAs && errors.push('Yeni Şifre Eski Şifre İle Aynı Olmamalıdır.');
            return errors;
        },
        reNewPasswordErrors() {
            const errors = [];
            if(!this.$v.form.re_new_password.$dirty) return errors;
            !this.$v.form.re_new_password.required && errors.push('Yeni Şifre (Tekrar) Alanı Zorunludur.');
            !this.$v.form.re_new_password.minLength && errors.push('Yeni Şifre (Tekrar) Alanı En Az 6 Haneli olmalıdır.');
            !this.$v.form.re_new_password.sameAs && errors.push('Şifreler Uyuşmuyor.');
            return errors;
        },
    },
    validations: {
        form: {
            current_password: {
                required,
                minLength: minLength(6)
            },
            new_password: {
                required,
                minLength: minLength(6),
                notSameAs: not(sameAs('current_password'))
            },
            re_new_password: {
                required,
                minLength: minLength(6),
                sameAs: sameAs('new_password')
            },
        }
    },
    methods: {
        onSubmit() {
            this.request.post('/admin/change-password', this.form)
                .then(res => {
                    this.$auth.logout();
                })
        }
    },
}
</script>

<style scoped>

</style>
