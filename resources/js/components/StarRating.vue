<template>
    <div class="d-flex">
        <i class="fa fa-star" v-for="star in fullStars" :key="`full${star}`" @click="$emit('input', star)"></i>
        <i class="fa fa-star-half-empty" v-if="halfStar" ></i>
        <i class="fa fa-star-o" v-for="star in emptyStars" :key="`empty${star}`" @click="$emit('input', fullStars + star)"></i>
    </div>
</template>

<script>
    export default {
        name: "StarRating",
        props: {
            value: Number
        },
        computed: {
          halfStar() {
              const fraction = Math.round((this.value - Math.floor(this.value)) * 100);
              return fraction > 0 && fraction < 50;
          },
          fullStars(){
              return Math.round(this.value);
          },
          emptyStars(){
              return 5 - Math.ceil(this.value);
          },
        },
    }
</script>

<style scoped>
</style>
