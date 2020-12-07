<template>
    <div v-if="loading" class="text-center"><i class="fa fa-circle-o-notch fa-spin"></i></div>
    <transition v-else name="fade">
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
                <Availability class="mb-4" :bookable-id="this.$route.params.id" @availability="checkPrice($event)"></Availability>
                <transition name="fade">
                    <price-breakdown v-if="price" :price="price"></price-breakdown>
                </transition>
                <transition name="fade">
                    <button class="btn btn-outline-secondary btn-block" v-if="price" >Book now</button>
                </transition>
            </div>
        </div>
    </transition>


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
                lastSearch: 'lastSearch'
            }),
        },
        methods: {
            async checkPrice(has) {
                if (!has) {
                    this.price = null;
                    return;
                }
                try {
                    this.price = ( await axios.get(`/api/bookables/${ this.bookable.id }/price?from=${ this.lastSearch.from }&to=${ this.lastSearch.to }`) ).data.data;
                } catch (e) {
                    this.price = null;
                }
            }
        }
    }
</script>
