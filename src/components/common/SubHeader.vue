<template>
  <div class="sub-header">
    <span>{{name}}</span>
  </div>
</template>

<script>
  export default {
    props: ['name']
  }
</script>

<style scoped lang="scss">
  @import "src/styles/custom.scss";

  .sub-header {
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      padding: 0 5px;
      border-left: 3px solid $theme-color;
      border-right: 3px solid $theme-color;
      font-size: 17px;
      color: $theme-color;
      line-height: 16px;
    }
  }
</style>
