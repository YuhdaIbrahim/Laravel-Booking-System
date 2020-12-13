<template>
    <div class="w-50 align-items-center m-auto">
        <div class="card card-body">
            <form action="">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input
                            type="email"
                            class="form-control"
                            name="email"
                            v-model="email"
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
                            v-model="password"
                            id="password"
                            placeholder="Enter your password"
                            :class="[{'is-invalid': this.errorFor('password')}]"
                    >
                    <validation-errors :errors="errorFor('password')"></validation-errors>
                </div>
                <button @click.prevent="login" class="btn btn-primary btn-block" :disabled="loading" type="submit">
                    Login
                </button>
                <hr>
                <div>
                    No Account yet?
                    <router-link :to="{name: 'register'}" class="font-weight-bold">Register here</router-link>
                </div>
                <div>
                    Forgotten password?
                    <router-link :to="{name: 'home'}" class="font-weight-bold">Reset password</router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import validatorErrors from "../utils/validatorErrors";
    import { logIn } from "../utils/auth";

    export default {
        name: "Login",
        data() {
            return {
                email: null,
                password: null,
                loading: false,
            }
        },
        mixins: [validatorErrors],
        methods: {
            async login() {
                this.loading = true;
                this.errors = null;
                try {
                    await axios.get('/sanctum/csrf-cookie');
                    await axios.post("api/login", {
                        email: this.email,
                        password: this.password,
                    });
                    logIn();
                    this.$store.dispatch("loadUser");
                    this.$router.push({ name: "home" });
                } catch (e) {
                    this.errors = e.response.data.errors;
                }
                this.loading = false
            }
        }
    }
</script>

<style scoped>

</style>
