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
                    type="text"
                    v-model="from"
                    class="form-control form-control-sm"
                    placeholder="Start Date"
                    @keyup.enter="check"
                    :class="[{'is-invalid': this.errorFor('from')}]"
                />
                <div class="invalid-feedback" v-for="(error, index) in this.errorFor('from')" :key="`from${index}`"
                >{{ error }}</div>
            </div>
            <div class="form-group col-md-6">
                <label for="to">To</label>
                <input
                    type="text"
                    v-model="to"
                    class="form-control form-control-sm"
                    placeholder="End Date"
                    @keyup.enter="check"
                    :class="[{'is-invalid': this.errorFor('to')}]"
                />
                <div class="invalid-feedback" v-for="(error, index) in this.errorFor('to')" :key="`from${index}`"
                >{{ error }}</div>
            </div>
            <button @click="check" class="btn btn-secondary btn-block" :disabled="loading">Check!</button>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            bookableId: Number,
        },
        data(){
            return {
                from: null,
                to: null,
                loading: false,
                status: null,
                errors: null,
            }
        },
        methods: {
            check(){
                this.loadng = true;
                this.errors = null;
                axios.get(`/api/bookables/${this.bookableId}/availability?from=${this.from}&to=${this.to}`)
                .then(res => {
                    this.status = res.status;
                }).catch(err => {
                    if(422 === err.response.status){
                        this.errors = err.response.data.errors;
                    }
                    this.status = err.response.status;
                }).finally(() => this.loading = false);
            },
            errorFor(field){
                return this.hasErrors && this.errors[field] ? this.errors[field] : null;
            }
        },
        computed: {
            hasErrors(){
                return 422 === this.status && this.errors !== null;
            },
            hasAvailablity(){
                return 200 === this.status;
            },
            noAvailability(){
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
