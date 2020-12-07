<template>
    <div>
        <h6 class="text-uppercase text-secondary font-weight-bolder">price breakdown</h6>
        <div class="py-2 pb-2 border-bottom border-top d-flex justify-content-between">
            <div class="font-weight-normal">Price ${{ price.breakdown.room_price }} x {{ price.breakdown.days }} Days</div>
            <span class="font-weight-bolder">${{ price.total }}</span>
        </div>
        <div class="py-2 pb-2 border-bottom border-top d-flex justify-content-between">
            <div class="font-weight-normal">Total</div>
            <span class="font-weight-bolder">${{ price.total }}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PriceBreakdown",
        props: {
            price: Object
        }
    }
</script>

<style scoped>

</style>
