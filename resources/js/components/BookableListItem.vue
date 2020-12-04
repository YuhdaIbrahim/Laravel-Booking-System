<template>
    <div class="card w-100">
        <div class="card-header">
            <router-link :to="{ name: 'bookable', params: {id}}">
                <h5 class="card-title">{{ title }}</h5>
            </router-link>
        </div>
        <div class="card-body">
            <p class="card-text">
                {{ description}}
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            title: String,
            description: String,
            id: Number,
        },

    }
</script>
