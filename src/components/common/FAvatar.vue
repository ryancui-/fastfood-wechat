<template>
  <img :src="src || `${pathname}static/avatar.png`" alt="头像"
       :style="styleObj">
</template>

<script>
  export default {
    props: ['size', 'src', 'unit'],
    data() {
      return {
        pathname: process.env.ASSET_ROOT,
        styleObj: {
          width: this.size + (this.unit || 'rem'),
          height: this.size + (this.unit || 'rem'),
          'border-radius': this.size / 2 + (this.unit || 'rem')
        }
      }
    }
  }
</script>

<style scoped>

</style>
