<template>
  <p>Profile Page.</p>
</template>

<script>
  export default {
    created() {
      this.$store.commit('setMainTitle', '我的信息');
    }
  }
</script>
