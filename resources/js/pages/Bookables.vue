<template>
    <div>
        <div v-if="loading" class="text-center"><i class="fa fa-circle-o-notch fa-spin"></i></div>
        <transition name="fade" v-else>
            <div>
                <div class="row mb-4" v-for="row in rows" :key="`row${row}`">
                    <div class="col d-flex align-items-stretch" v-for="(item, index) in bookablesInRow(row) "
                         :key="'row' + row + index">
                        <Bookable v-bind="item"></Bookable>
                    </div>
                    <div class="col" v-for="p in placeHoklderInRow(row)" :key="`placeholder${row + p}`"></div>
                </div>
            </div>
        </transition>

    </div>
</template>

<script>
    import BookableListItem from '../components/BookableListItem';

    export default {
        components: {
            Bookable: BookableListItem
        },
        data() {
            return {
                bookables: null,
                loading: false,
                columns: 3,
            }
        },
        computed: {
            rows() {
                return this.bookables ? Math.ceil(this.bookables.length / this.columns) : 0
            }
        },
        methods: {
            bookablesInRow(row) {
                return this.bookables.slice(( row - 1 ) * this.columns, row * this.columns)
            },
            placeHoklderInRow(row) {
                return this.columns - this.bookablesInRow(row).length;
            }
        },
        created() {
            this.loading = true;

            //const p = new Promise((resolve, reject) => {
            //    console.log(resolve);
            //    console.log(reject);
            //    setTimeout(() => reject("Hello"), 3000);
            //}).then(result => console.log(`Success ${result}`)).catch(result => console.log(`Error ${result}`));
            //console.log(p);

            const request = axios.get('/api/bookables').then(res => {
                this.bookables = res.data.data;
                this.loading = false;
            }).catch(err => console.log(err));
        },
    }
</script>
