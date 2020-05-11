<template lang="html">
  <div class="sms">
    <p>
      <router-link to="/sms/all">全部</router-link>
      <router-link to="/sms/find">条件查询</router-link>
    </p>
    <router-view></router-view>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'SMS'
}
</script>

<style lang="css" scoped>
</style>
