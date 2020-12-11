<template>
    <div v-if="loading" class="text-center">
        <transition name="fade">
            <i class="fa fa-circle-o-notch fa-spin"></i>
        </transition>
    </div>
    <div v-else>
        <div class="row">
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
                <Availability class="mb-4" :bookable-id="this.$route.params.id"
                              @availability="checkPrice($event)"></Availability>
                <transition name="fade">
                    <price-breakdown v-if="price" :price="price"></price-breakdown>
                </transition>
                <transition name="fade">
                    <button @click="addToBasket" :disabled="inBasketAlreadyFromGetters"
                            class="btn btn-outline-secondary btn-block"
                            v-if="price">Book now
                    </button>
                </transition>
                <transition name="fade">
                    <button @click="removeFromBasket" class="btn btn-outline-danger btn-block"
                            v-if="inBasketAlreadyFromGetters">
                        Remove from Cart
                    </button>
                </transition>
                <transition name="fade">
                    <div v-if="inBasketAlreadyFromGetters" class="mt-4 text-muted warning">You already add to cart</div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import Availability from '../components/Availability';
    import ReviewList from "../components/ReviewList";
    import PriceBreakdown from "../components/PriceBreakdown";
    import { mapState } from 'vuex';

    export default {
        components: {
            Availability,
            ReviewList,
            PriceBreakdown
        },
        data() {
            return {
                bookable: null,
                loading: false,
                price: null,
            }
        },
        created() {
            this.loading = true;
            let id = this.$route.params.id;
            axios.get(`/api/bookables/${ id }`).then(res => {
                this.bookable = res.data.data;
                this.loading = false;
            }).catch(err => console.log(err));
        },
        computed: {
            ...mapState({
                lastSearch: 'lastSearch',
            }),
            inBasketAlreadyFromGetters() {
                if (!this.bookable) {
                    return false;
                }
                return this.$store.getters.inBasketAlready(this.bookable.id);
            }
        },
        methods: {
            async checkPrice(has) {
                this.price = null;
                if (!has) {
                    return;
                }
                try {
                    this.price = ( await axios.get(`/api/bookables/${ this.bookable.id }/price?from=${ this.lastSearch.from }&to=${ this.lastSearch.to }`) ).data.data;
                } catch (e) {
                    this.price = null;
                }
            },
            addToBasket() {
                this.$store.dispatch('addToBasket', {
                    bookable: this.bookable,
                    price: this.price,
                    dates: this.lastSearch,
                });
            },
            removeFromBasket() {
                this.$store.dispatch('removeFromBasket', this.bookable.id);
            }
        }
    }
</script>

<style scoped>
    .warning {
        font-size: 0.7rem;
    }
</style>
