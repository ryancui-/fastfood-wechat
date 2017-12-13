<template>
  <img :src="src || 'static/avatar.png'" alt="头像"
       :style="styleObj">
</template>

<script>
  export default {
    props: ['size', 'src'],
    data() {
      return {
        styleObj: {
          width: this.size + 'rem',
          height: this.size + 'rem',
          'border-radius': this.size / 2 + 'rem'
        }
      }
    }
  }
</script>

<style scoped>

</style>
