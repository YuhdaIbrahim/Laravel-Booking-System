<template>
    <div>
        <h6 class="text-uppercase text-secondary font-weight-bolder">Check Availability <span v-if="noAvailability"
                                                                                              class="text-danger"
        >(Not Available)</span> <span
                v-if="hasAvailablity" class="text-success"
        >(Available)</span></h6>
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
            <button @click="check" class="btn btn-secondary btn-block" :disabled="loading">Check!</button>
        </div>
    </div>
</template>

<script>
    import { is422 } from "../utils/response";
    import validatorErrors from "../utils/validatorErrors";
    export default {
        mixins: [validatorErrors],
        props: {
            bookableId: Number,
        },
        data() {
            return {
                from: null,
                to: null,
                loading: false,
                status: null,
            }
        },
        methods: {
            check() {
                this.loadng = true;
                this.errors = null;
                axios.get(`/api/bookables/${ this.bookableId }/availability?from=${ this.from }&to=${ this.to }`)
                    .then(res => {
                        this.status = res.status;
                    }).catch(err => {
                    if (is422(err)) {
                        this.errors = err.response.data.errors;
                    }
                    this.status = err.response.status;
                }).finally(() => this.loading = false);
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
