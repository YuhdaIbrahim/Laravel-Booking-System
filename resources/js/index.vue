<template>
    <div>
        <nav class="navbar navbar-expand-lg bg-dark border-bottom navbar-dark">
            <div class="container">
                <router-link class="navbar-brand mr-auto" :to="{ name: 'home' }">Laravel BnB</router-link>
                <ul class="navbar-nav ">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name: 'checkout'}">
                            Cart
                            <span v-if="itemsInBasket" class="badge badge-secondary">{{ itemsInBasket }}</span>
                        </router-link>
                    </li>
                    <li class="nav-item" v-if="!isLoggedIn">
                        <router-link class="nav-link" :to="{name: 'register'}">Register</router-link>
                    </li>
                    <li class="nav-item" v-if="!isLoggedIn">
                        <router-link class="nav-link" :to="{name: 'login'}">Sign In</router-link>
                    </li>
                    <li class="nav-item" v-if="isLoggedIn">
                        <router-link class="nav-link" :to="{name: 'account'}">Account</router-link>
                    </li>
                    <li class="nav-item" v-if="isLoggedIn">
                        <a class="nav-link" href="#" @click.prevent="logout">Log Out</a>
                    </li>
                </ul>
            </div>
        </nav>
        <div class="container mt-4 mb-4 pr-4 pl-4">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import { mapState, mapGetters } from 'vuex';

    export default {
        data() {
            return {
                lastSearch: this.$store.state.lastSearch,
            }
        },
        computed: {
            ...mapState({
                lastSearchComputed: 'lastSearch',
                isLoggedIn: "isLoggedIn",
            }),
            ...mapGetters({
                itemsInBasket: "itemsInBasket",
            })
        },
        methods: {
            async logout(){
                try {
                    axios.post("/api/logout");
                    this.$store.dispatch("logout");
                    this.$router.push({ name: "home" });
                } catch (e) {
                    this.$store.dispatch("logout");
                }
            }
        },
    }
</script>
