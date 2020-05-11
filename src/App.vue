//default directory is my-project/src
<template>
  <div id="app">
    <h2>Welcome to Monitor Page</h2>
    <!-- <img src="./assets/index.jpg" alt="A laugh Dog" width="180" height="220"> -->
    <p>
        <router-link to="/">首页</router-link>
        <router-link to="/hello">你好</router-link>
        <router-link to="/sms">短信查询</router-link>
        <router-link to="/call">通话查询</router-link>
        <!-- <router-link :to="{ path: '/location', name: 'location', params: {color :'red'} }">位置查询</router-link> -->
        <router-link :to="{ path: '/location'}">位置查询</router-link>
        <!-- <a href="javascript:void(0)" @click="openHtml">location</a> -->
    </p>
    <hr>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    openHtml() {
      // window.open('./map.html','_blank')
      window.location.href='./map.html'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
