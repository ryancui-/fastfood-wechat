<template>
  <div class="sub-header">
    <span class="bar"></span>
    <span class="title">{{name}}</span>
    <span class="bar"></span>
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

    .bar {
      width: 3px;
      height: 16px;
      border-radius: 1.5px;
      background-color: $theme-color;
    }

    .title {
      padding: 0 5px;
      font-size: 17px;
      color: $theme-color;
      line-height: 16px;
    }
  }
</style>
