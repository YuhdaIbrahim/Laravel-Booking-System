<template>
    <div>
        <div v-if="loading">
            loading...
        </div>
        <div v-else>
            <div v-if="alreadyReviewed">
                <h3>you already review</h3>
            </div>
            <div v-else>
                <div class="form-group">
                    <label class="text-muted">Select the star rating (1 is wors - 5 is best)</label>
                    <star-rating :value="review.rating" class="fa-3x" v-model="review.rating"></star-rating>
                </div>
                <div class="form-group">
                    <label for="content" class="text-muted" >Describe your experience with</label>
                    <textarea name="content" v-model="review.content" id="content" cols="30" rows="10" class="form-control"></textarea>
                </div>
                <button class="btn btn-lg btn-primary btn-block">Submit</button>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Review",
        data() {
          return {
              review: {
                  rating: 5,
                  content: '',
              },
              existingReview: [],
              loading: false,
          }
        },
        created() {
            this.loading = true;
            axios.get(`/api/reviews/${this.$route.params.id}`)
                .then(res => this.existingReview = res.data.data)
                .catch(err => console.log(err))
                .finally(() => this.loading = false);
        },
        computed: {
            alreadyReviewed(){
                return this.existingReview.length !== 0;
            }
        }
    }
</script>

<style scoped>

</style>
