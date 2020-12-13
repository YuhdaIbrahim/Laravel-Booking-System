<template>
    <div class="w-50 align-items-center m-auto">
        <div class="card card-body">
            <form action="">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input
                            type="text"
                            class="form-control"
                            name="name"
                            v-model="user.name"
                            id="name"
                            placeholder="Enter your Name"
                            :class="[{'is-invalid': this.errorFor('name')}]"
                    >
                    <validation-errors :errors="errorFor('name')"></validation-errors>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input
                            type="email"
                            class="form-control"
                            name="email"
                            v-model="user.email"
                            id="email"
                            placeholder="Enter your e-mail"
                            :class="[{'is-invalid': this.errorFor('email')}]"
                    >
                    <validation-errors :errors="errorFor('email')"></validation-errors>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input
                            type="password"
                            name="password"
                            class="form-control"
                            v-model="user.password"
                            id="password"
                            placeholder="Enter your password"
                            :class="[{'is-invalid': this.errorFor('password')}]"
                    >
                    <validation-errors :errors="errorFor('password')"></validation-errors>
                </div>
                <div class="form-group">
                    <label for="password_confirmation">Re-type password</label>
                    <input
                            type="password"
                            name="password_confirmation"
                            class="form-control"
                            v-model="user.password_confirmation"
                            id="password_confirmation"
                            placeholder="Confirm your password"
                            :class="[{'is-invalid': this.errorFor('password_confirmation')}]"
                    >
                    <validation-errors :errors="errorFor('password_confirmation')"></validation-errors>
                </div>
                <button @click.prevent="register" class="btn btn-primary btn-block" :disabled="loading" type="submit">
                    Register
                </button>
                <hr>
                <div>
                    Already have account?
                    <router-link :to="{name: 'login'}" class="font-weight-bold">Sign In here</router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import validatorErrors from "../utils/validatorErrors";
    import { logIn } from "../utils/auth";

    export default {
        name: "Register",
        data() {
            return {
                user: {
                    name: null,
                    email: null,
                    password: null,
                    password_confirmation: null,
                },
                loading: false,
            }
        },
        mixins: [validatorErrors],
        methods: {
            async register() {
                this.loading = true;
                this.errors = null;
                try {
                    const res = await axios.post("/api/register", this.user);
                    if(200 === res.status) {
                        logIn();
                        this.$store.dispatch("loadUser");
                        this.$router.push({ name: "home" });
                    }
                } catch (e) {
                    this.errors = e.response.data.error;
                }
                this.loading = false
            }
        }
    }
</script>

<style scoped>

</style>
