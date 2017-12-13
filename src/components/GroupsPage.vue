<template>
  <p>Groups page.</p>
</template>

<script>
  export default {
    created() {
      this.$store.commit('setMainTitle', '点餐中');
    }
  }
</script>
