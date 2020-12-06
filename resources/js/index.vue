<template>
    <div>
        <nav class="navbar bg-dark border-bottom navbar-dark">
            <div class="container">
                <router-link class="navbar-brand mr-auto" :to="{ name: 'home' }">Laravel BnB</router-link>
            </div>
        </nav>
        <div class="container mt-4 mb-4 pr-4 pl-4">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';

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
        },
    }
</script>
