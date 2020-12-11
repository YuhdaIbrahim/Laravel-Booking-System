<template>
    <div>
        <success v-if="success">
            Congratulations on your purchase!
        </success>
        <div class="row" v-else >
            <div class="col-md-8" v-if="itemsInBasket">
                <div class="form-row">
                    <div class="col-md-6 form-group">
                        <label for="first">First Name</label>
                        <input
                                id="first"
                                type="text"
                                name="first_name"
                                :class="[{'is-invalid': this.errorFor('customer.first_name')}]"
                                class="form-control"
                                v-model="customer.first_name">
                        <validation-errors :errors="errorFor('customer.first_name')"></validation-errors>
                    </div>
                    <div class="col-md-6 form-group">
                        <label for="last">Last Name</label>
                        <input id="last"
                               :class="[{'is-invalid': this.errorFor('customer.last_name')}]"
                               type="text" name="last_name" class="form-control" v-model="customer.last_name">
                        <validation-errors :errors="errorFor('customer.last_name')"></validation-errors>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-md-12 form-group">
                        <label for="email">Email</label>
                        <input id="email"
                               :class="[{'is-invalid': this.errorFor('customer.email')}]"
                               type="email" name="email" class="form-control" v-model="customer.email">
                        <validation-errors :errors="errorFor('customer.email')"></validation-errors>

                    </div>
                </div>
                <div class="form-row">
                    <div class="col-md-6 form-group">
                        <label for="street">Street</label>
                        <input id="street"
                               :class="[{'is-invalid': this.errorFor('customer.street')}]"
                               type="text" name="street" class="form-control" v-model="customer.street">
                        <validation-errors :errors="errorFor('customer.street')"></validation-errors>

                    </div>
                    <div class="col-md-6 form-group">
                        <label for="city">City</label>
                        <input id="city"
                               :class="[{'is-invalid': this.errorFor('customer.city')}]"
                               type="text" name="city" class="form-control" v-model="customer.city">
                        <validation-errors :errors="errorFor('customer.city')"></validation-errors>

                    </div>
                </div>
                <div class="form-row">
                    <div class="col-md-6 form-group">
                        <label for="country">Country</label>
                        <input id="country"
                               :class="[{'is-invalid': this.errorFor('customer.country')}]"
                               type="text" name="country" class="form-control" v-model="customer.country">
                        <validation-errors :errors="errorFor('customer.country')"></validation-errors>

                    </div>
                    <div class="col-md-4 form-group">
                        <label for="state">State</label>
                        <input id="state"
                               :class="[{'is-invalid': this.errorFor('customer.state')}]"
                               type="text" name="state" class="form-control" v-model="customer.state">
                        <validation-errors :errors="errorFor('customer.state')"></validation-errors>

                    </div>
                    <div class="col-md-2 form-group">
                        <label for="zip">Zip</label>
                        <input id="zip"
                               :class="[{'is-invalid': this.errorFor('customer.zip')}]"
                               type="text" name="zip" class="form-control" v-model="customer.zip">
                        <validation-errors :errors="errorFor('customer.zip')"></validation-errors>

                    </div>
                </div>
                <hr>
                <div class="form-row">
                    <div class="col-md-12 form-group">
                        <button type="submit" :disabled="loading" class="btn btn-lg btn-primary btn-block" @click.prevent="book" >Book Now</button>
                    </div>
                </div>
            </div>
            <div class="col-md-8" v-else>
                <div class="jumbotron jumbotron-fluid text-center"><h1>Empty Cart, Book now and Pay here!</h1></div>
            </div>
            <div class="col-md-4">
                <div class="d-flex justify-content-between">
                    <h6 class="text-uppercase text-secondary font-weight-bolder">Your Cart</h6>
                    <h6 class="badge badge-secondary text-uppercase">
                        <span v-if="itemsInBasket">{{ itemsInBasket }}</span>
                        <span v-else>Empty</span>
                    </h6>
                </div>
                <transition-group tag="div" name="list">
                    <div v-for="item in basket" :key="item.bookable.id">
                        <div class="pt-2 pb-2 border-top d-flex justify-content-between">
                        <span>
                            <router-link :to="{name: 'bookable', params: {id: item.bookable.id}}">{{ item.bookable.title }}</router-link>
                        </span>
                            <span class="font-weight-bold">${{ item.price.total }}</span>
                        </div>
                        <div class="pt-2 pb-2 d-flex justify-content-between">
                        <span>
                            From {{ item.dates.from }}
                        </span>
                            <span>To {{ item.dates.to }}</span>
                        </div>

                        <div class="pt-2 pb-2 text-right">
                            <button class="btn btn-sm btn-outline-danger"
                                    @click="$store.dispatch('removeFromBasket', item.bookable.id)">
                                <i class="fa fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </transition-group>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapState } from 'vuex';
    import validatorErrors from "../utils/validatorErrors";

    export default {
        name: "Checkout",
        data(){
            return {
                loading: false,
                bookingAttempted: false,
                customer: {
                    first_name: null,
                    last_name: null,
                    email: null,
                    street: null,
                    city: null,
                    country: null,
                    state: null,
                    zip: null,
                }
            }
        },
        computed: {
            ...mapGetters(['itemsInBasket']),
            ...mapState({
                basket: state => state.basket.items
            }),
            success(){
                return !this.loading && this.itemsInBasket === 0 && this.bookingAttempted;
            }
        },
        methods: {
            async book(){
                this.loading = true;
                this.errors = null;
                this.bookingAttempted = false;
                try{
                    await axios.post(`/api/checkout`, {
                        customer: this.customer,
                        bookings: this.basket.map(item => ({
                            bookable_id: item.bookable.id,
                            from: item.dates.from,
                            to: item.dates.to
                        }))
                    });
                    this.bookingAttempted = true;
                    this.$store.dispatch("clearBasket");
                } catch (e) {
                    this.errors = e.response.data.errors;
                }
                this.loading = false;
            }
        },
        mixins: [validatorErrors],
    }
</script>

<style scoped>
    h6.badge {
        font-size: 100%;
    }
</style>
