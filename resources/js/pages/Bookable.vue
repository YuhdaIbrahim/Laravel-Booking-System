<template>
    <div v-if="loading">Data is Loading...</div>
    <div v-else class="row">
        <div class="col-md-8">
            <div class="card mb-4">
                <div class="card-header">
                    <h5 class="card-title">{{ bookable.title }}</h5>
                </div>
                <div class="card-body">
                    <p class="card-text">
                        {{ bookable.description }}
                    </p>
                </div>
            </div>
            <ReviewList :bookable-id="this.$route.params.id"></ReviewList>
        </div>
        <div class="col-md-4">
            <Availability :bookable-id="this.$route.params.id"></Availability>
        </div>
    </div>

</template>

<script>
    import Availability from '../components/Availability';
    import ReviewList from "../components/ReviewList";
    export default {

        components: {
            Availability,
            ReviewList
        },
        data(){
            return {
                bookable: null,
                loading: false,
            }
        },
        created() {
            this.loading = true;
            let id = this.$route.params.id;
            axios.get(`/api/bookables/${id}`).then(res =>   {
                this.bookable = res.data.data;
                this.loading = false;
            }).catch(err => console.log(err));
        }
    }
</script>
