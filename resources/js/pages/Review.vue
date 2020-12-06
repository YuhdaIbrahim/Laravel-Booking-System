<template>
    <div>
        <success v-if="success">
            Thanks you for review!
        </success>
        <fatal-error v-if="error"></fatal-error>
        <div class="row" v-if="!success && !error">
            <div :class="[{'col-md-4': twoColumn }, {'d-none': oneColumn}]">
                <div class="card">
                    <div class="card-body">
                        <div v-if="loading">
                            Loading...
                        </div>
                        <div v-if="hasBooking">
                            <p>Stayed at <router-link :to="{name: 'bookable', params: {id: booking.bookable.bookable_id}}">{{ booking.bookable.title }}</router-link></p>
                            <p>From {{ booking.from }} to {{ booking.to }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div :class="[{'col-md-8':twoColumn},{ 'col-md-12': oneColumn}]">
                <div v-if="loading">
                    loading...
                </div>
                <div v-else>
                    <div v-if="alreadyReviewed">
                        <h3>you already review</h3>
                    </div>
                    <div v-else>
                        <div class="form-group">
                            <label class="text-muted">Select the star rating (1 is worst - 5 is best)</label>
                            <star-rating :value="review.rating" class="fa-3x" v-model="review.rating"></star-rating>
                        </div>
                        <div class="form-group">
                            <label for="content" class="text-muted" >Describe your experience with</label>
                            <textarea
                                    name="content"
                                    v-model="review.content"
                                    id="content"
                                    cols="30" rows="10"
                                    :class="[{'is-invalid': errorFor('content')}]"
                                    class="form-control"></textarea>
                            <validation-errors :errors="errorFor('content')"></validation-errors>
                        </div>
                        <button @click.prevent="submit" :disabled="sending" class="btn btn-lg btn-primary btn-block">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { is404, is422 } from '../utils/response';
    import validatorErrors from "../utils/validatorErrors";

    export default {
        mixins: [validatorErrors],
        name: "Review",
        data() {
          return {
              review: {
                  id: null,
                  rating: 5,
                  content: '',
              },
              existingReview: null,
              loading: false,
              booking: null,
              error: false,
              sending: false,
              success: false,
          }
        },
        async created() {
            this.review.id = this.$route.params.id;
            this.loading = true;
            try {
                this.existingReview = ( await axios.get(`/api/reviews/${ this.review.id }`) ).data.data;
            } catch (err) {
                if(is404(err)){
                    try {
                        this.booking = ( await axios.get(`/api/booking-by-review/${ this.review.id }`) ).data.data;
                    } catch (e) {
                        if(!is404(e)) {
                            this.error = true;
                        }
                    }
                }
            }
            this.loading =false;
        },
        computed: {
            alreadyReviewed(){
                return this.hasReview || !this.booking;
            },
            hasReview(){
                return this.existingReview !== null;
            },
            hasBooking(){
                return this.booking !== null;
            },
            oneColumn(){
                return !this.loading && this.alreadyReviewed;
            },
            twoColumn(){
                return this.loading || !this.alreadyReviewed;
            }
        },
        methods: {
            submit(){
                this.sending = true;
                this.success = false;
                axios.post('/api/reviews', this.review)
                    .then(res => {
                        this.success = res.status === 201;
                    })
                    .catch(err => {
                        if(is422(err)){
                            const errors = err.response.data.errors;

                            if(errors["content"] && _.size(errors)){
                                this.errors = errors;
                                return;
                            }
                        }
                        this.error = true;
                    })
                    .then(() => (this.sending = false));
            },
        }
    }
</script>

<style scoped>

</style>
