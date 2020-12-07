<template>
    <div>
        <h6 class="text-uppercase text-secondary font-weight-bolder">Check Availability
            <transition name="fade">
                <span v-if="noAvailability" class="text-danger">(Not Available)</span>
                <span v-if="hasAvailablity" class="text-success">(Available)</span>
            </transition>
        </h6>
        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="from">From</label>
                <input
                        id="from"
                        type="text"
                        v-model="from"
                        class="form-control form-control-sm"
                        placeholder="Start Date"
                        @keyup.enter="check"
                        :class="[{'is-invalid': this.errorFor('from')}]"
                />
                <validation-errors :errors="errorFor('from')"></validation-errors>
            </div>
            <div class="form-group col-md-6">
                <label for="to">To</label>
                <input
                        id="to"
                        type="text"
                        v-model="to"
                        class="form-control form-control-sm"
                        placeholder="End Date"
                        @keyup.enter="check"
                        :class="[{'is-invalid': this.errorFor('to')}]"
                />
                <validation-errors :errors="errorFor('to')"></validation-errors>
            </div>
            <button @click="check" class="btn btn-secondary btn-block" :disabled="loading">
                <span v-if="!loading">Check</span>
                <span v-if="loading"><i class="fa fa-circle-o-notch fa-spin"></i> Checking</span>
            </button>
        </div>
    </div>
</template>

<script>
    import { is422 } from "../utils/response";
    import validatorErrors from "../utils/validatorErrors";

    export default {
        mixins: [validatorErrors],
        props: {
            bookableId: [String, Number],
        },
        data() {
            return {
                from: this.$store.state.lastSearch.from,
                to: this.$store.state.lastSearch.to,
                loading: false,
                status: null,
            }
        },
        methods: {
            async check() {
                this.loading = true;
                this.errors = null;
                this.status = null;
                
                try {
                    this.status = (await axios.get(`/api/bookables/${ this.bookableId }/availability?from=${ this.from }&to=${ this.to }`) ).status;
                    this.$emit('availability', this.hasAvailablity);
                } catch (e) {
                    if (is422(e)) {
                        this.errors = e.response.data.errors;
                    }
                    this.status = e.response.status;
                    this.$emit('availability', this.hasAvailablity);
                }
                this.loading = false;
                this.$store.dispatch('setLastSearch', { from: this.from, to: this.to });
            },
        },
        computed: {
            hasErrors() {
                return 422 === this.status && this.errors !== null;
            },
            hasAvailablity() {
                return 200 === this.status;
            },
            noAvailability() {
                return 404 === this.status;
            }
        }
    }
</script>

<style scoped>
    label {
        font-size: 0.7rem;
        text-transform: uppercase;
        color: gray;
        font-weight: bolder;
    }
</style>
