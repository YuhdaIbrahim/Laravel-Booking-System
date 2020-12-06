<template>
    <div style="padding: 1.25rem">
        <h6 class="text-uppercase text-secondary font-weight-bolder pt-4">Review List</h6>
        <div v-if="loading">
            Loading Data...
        </div>
        <div v-if="reviews.length > 0 && !loading">
            <div class="border-bottom py-4" v-for="(review, index) in reviews" :key="`review${index}`">
                <div class="row">
                    <div class="col-md-6">Taka Ibrahim</div>
                    <div class="col-md-6 d-flex justify-content-end"><star-rating class="fa-lg" :value="review.rating"></star-rating></div>
                </div>
                <div class="row pb-4">
                    <div class="col-md-12">
                        {{ review.created_at | fromNow }}
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        {{ review.content }}
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "ReviewList",
        props: {
            bookableId: Number,
        },
        data(){
            return {
                loading: false,
                reviews: [],
            }
        },
        created(){
            this.loading = true;
            axios.get(`/api/bookables/${this.bookableId}/reviews`)
            .then(res => this.reviews = res.data.data)
            .catch(err => console.log(err))
            .finally(() => this.loading = false);
        },

    }
</script>

<style scoped>

</style>
