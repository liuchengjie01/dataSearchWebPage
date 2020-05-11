<template>
  <div>
    <h3>here is hello page</h3>
    <p>{{ greet }}</p>
    <!-- <a href="http://192.168.0.101:8080/dataSearch/static/was.3gp" download="a.3gp">was.3gp</a>
    <video
    src="../assets/was.3gp"
    preload="auto" poster="../assets/index.jpg" controls>
    测试音频
  </video> -->
  <br>
  <video
  src="http://192.168.0.101:9000/static/mixkit-womans-feet-splashing-in-the-pool-1261.mp4"
  preload="auto"  controls>
  测试音频
</video>
<br>
<audio src="http://192.168.0.101:9000/static/周杰伦+-+简单爱.mp3" preload="metadata" controls>

</audio>
  </div>

</template>

<!-- Vue.component('componentIndex',{
  template: '#index-template'
}); -->
<script type="text/javascript">

export default {
  name: 'Hello',
  data () {
    return {
      greet: 'This is my hello page!'
    }
  }
}

</script>
