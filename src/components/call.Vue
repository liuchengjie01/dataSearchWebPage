<template id="call">
  <div>
    <p>
      <router-link to="/call/all">全部</router-link>
      <router-link to="/call/find">条件查询</router-link>
    </p>
    <router-view></router-view>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'Call'
}
</script>
