<template>
  <div class="page">
    <div class="">
      <form class="" v-on:submit.prevent="onSubmit" align="left">
        <input type="number" name="phoneNumber" value=0 placeholder="目标号码" v-model.number="phoneNumber">
        <input type="text" name="startTime" value="" placeholder="起始时间" v-model="startTime">
        <input type="text" name="endTime" value="" placeholder="截止时间" v-model="endTime">
        <input type="radio" name="provider" value="network" v-model="provider">network
        <input type="radio" name="provider" value="gps" v-model="provider">gps
        <input type="submit" name="" value="提交">
        <input type="reset" name="" value="重置">
      </form>
      <button type="button" name="button" @click="showMap">展示轨迹</button>
    </div>
    <div id="allmap">
      <!-- <p>后期也许改造成table</p> -->
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'Location',
  data () {
    return {
      phoneNumber:0,
      startTime:"2006-01-02 15:04:05",
      endTime:"2006-01-02 15:04:05",
      provider:"",
      locationArray:[{}]
    }
  },
  methods: {
    onSubmit() {
      var formData = new FormData()
      formData.append('phoneNumber', this.phoneNumber)
      formData.append('startTime', this.startTime)
      formData.append('endTime', this.endTime)
      formData.append('provider', this.provider)
      console.log("provider ==> "+this.provider)
      console.log("phoneNumber ===> "+this.phoneNumber)
      console.log('formData ===> '+formData['provider'])
      axios({
        url: '/location/search',
        method: 'post',
        headers: {
          'Content-Type':'application/x-www-form-urlencoded'
        },
        data: qs.stringify({'provider':this.provider, 'startTime':this.startTime, 'endTime':this.endTime, 'phoneNumber':this.phoneNumber})
      }).then((response) => {
        console.log(response.status)
        this.locationArray = response.data.location
        console.log(this.locationArray)
        // var aaa = this.locationArray
        // console.log(aaa)
      }).catch(function(error) {
        console.log(error)
      })
    },
    showMap() {
      // window.open('../map.html')
      console.log('here come into showMap')
      var map = new BMap.Map('allmap')
      console.log('finish allmap');
      // map.addControl(new BMap.ScaleControl())
      map.addControl(new BMap.MapTypeControl({
		mapTypes:[
            BMAP_NORMAL_MAP,
            BMAP_HYBRID_MAP
        ]}));
        // map.addControl(new BMap.ScaleControl());
      console.log('finish add Control');
      map.enableScrollWheelZoom(true)
      console.log('finish enable wheel zoom');

      var pointArray = [{}]
      var locArray = this.locationArray
      // var locArray = [{longitude:106.652024,latitude:26.617221},{longitude:106.652024,latitude:26.614221},{longitude:106.654024,latitude:26.612221},{longitude:106.657024,latitude:26.612221}]
      console.log('pointArray ===> ' + pointArray)
      // this.addMarker(map, pointArray[(locArray.length)-1],'end')
      var longSum = 0.0000
      var latSum = 0.0000
      for (var i = 0; i < locArray.length; i++) {
        console.log(i);
        console.log(locArray[i].longitude + '==' + locArray[i].latitude);
        pointArray.push(new BMap.Point(locArray[i].longitude, locArray[i].latitude))
        longSum = longSum + locArray[i].longitude
        latSum = latSum + locArray[i].latitude
      }
      console.log(pointArray.length);
      console.log(pointArray);
      /*
      test module
      */
      var initPoint = new BMap.Point(longSum/locArray.length, latSum/locArray.length)
      map.centerAndZoom(initPoint, 14.5)
      console.log('finish centerAndZoom');
      map.clearOverlays()
      var startPoint = new BMap.Point(this.locationArray[0].longitude, this.locationArray[0].latitude)
      this.addMarker(map, startPoint, new BMap.Point(this.locationArray[this.locationArray.length-1].longitude, this.locationArray[this.locationArray.length-1].latitude))
      var testPoint1 = new BMap.Point(113.3444, 27.0332)
      var testPoint2 = new BMap.Point(113.3500, 27.0332)
      var deleteFirstArray = pointArray.slice(1, pointArray.length)
      var polyline = new BMap.Polyline(deleteFirstArray,
        {
          strokeColor: 'green',
          strokeWeight: 4,
          strokeOpacity:0.5,
          strokeStyle:'dashed'
        }
      )
      console.log('polyline ===> '+polyline);
      map.addOverlay(polyline)
      console.log('map ===> '+polyline.getMap());
      console.log("getOverlays ===> "+map.getOverlays());
      // window.open('../map.html'?)
    },
    addMarker(map,point1, point2) {
      var myBeginIcon = new BMap.Icon("http://e.hiphotos.baidu.com/image/pic/item/7e3e6709c93d70cfaf72bca2f0dcd100bba12b90.jpg", new BMap.Size(20,35), {imageOffset: new BMap.Size(0, 0)});//人
      var myEndIcon = new BMap.Icon("http://b.hiphotos.baidu.com/image/pic/item/b58f8c5494eef01f534c096ae8fe9925bd317dc0.jpg", new BMap.Size(20,35), {imageOffset: new BMap.Size(0, 0)});//人
      var carMk2 = new BMap.Marker(
              point1,//起始点的经纬度
              {icon:myBeginIcon});
      map.addOverlay(carMk2);

      var carMk = new BMap.Marker(
              point2,//终点的经纬度
              {icon:myEndIcon});
      map.addOverlay(carMk);
    }
  }
}
</script>

<style>
  .page,#allmap {width: 100%;height: 900px;overflow: hidden;margin:0;font-family:"微软雅黑";}
</style>
