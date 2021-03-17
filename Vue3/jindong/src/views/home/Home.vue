<template>
  <div class="wrapper">
    <StaticPart />
    <NearBy />
  </div>
  <Docker />
</template>
<script>
import Docker from '../../components/Docker';
import StaticPart from './StaticPart';
import NearBy from './NearBy';
export default {
  name: 'Home',
  components: {Docker, StaticPart, NearBy}
}
</script>

<style lang="scss">
@import '../../styles/variable.scss';
.wrapper {
  position: absolute;
  overflow-y: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: .5rem;
  padding: 0 .18rem;
  box-sizing: border-box;
}
</style>