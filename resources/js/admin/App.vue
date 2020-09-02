<template>
  <div>
      <router-view></router-view>
      <notifications group="foo" position="top right" class="mt-5 mr-1" />
  </div>
</template>

<style lang="scss">
// Main Stylesheet
@import './assets/scss/main';

// Bootstrap Vue Stylesheet
@import '~bootstrap-vue/src/index';

</style>

<script>
export default {

}
</script>
