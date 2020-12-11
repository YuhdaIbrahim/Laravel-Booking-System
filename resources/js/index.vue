<template>
    <div>
        <nav class="navbar bg-dark border-bottom navbar-dark">
            <div class="container">
                <router-link class="navbar-brand mr-auto" :to="{ name: 'home' }">Laravel BnB</router-link>
                <router-link class="btn text-white" :to="{name: 'checkout'}">
                    Cart
                    <span v-if="itemsInBasket" class="badge badge-secondary">{{ itemsInBasket }}</span>
                </router-link>
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
                lastSearchComputed: 'lastSearch'
            }),
            ...mapGetters({
                itemsInBasket: "itemsInBasket",
            })
        },
    }
</script>
