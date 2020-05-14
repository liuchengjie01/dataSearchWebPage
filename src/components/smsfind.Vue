<template id="smsfind">
  <div class="">
    <div class="">
      <form v-on:submit.prevent="onSubmit" align="left">
        <input type="number" name="" value=0 placeholder="发送号码" v-model.number="smsRecord.send_number">
        <input type="number" name="" value=0 placeholder="接收号码" v-model.number="smsRecord.receive_number">
        <input type="text" name="" value="" placeholder="start_time" v-model="smsRecord.start_time">
        <input type="text" name="" value="" placeholder="end_time" v-model="smsRecord.end_time">
        <input type="submit" name="" value="查询">
        <input type="reset" name="" value="重置">
      </form>
      <button type="button" name="button" @click="showMapFunc">展示关系图</button>
    </div>
    <div class="" v-if="showData">
      <table border="1" align="center">
        <tr>
          <th>ID</th>
          <th>发送号码</th>
          <th>接收号码</th>
          <th>时间戳</th>
          <th>内容</th>
        </tr>
        <tr v-for="(item, index) in smsRecords">
          <td>{{item.id}}</td>
          <td>{{item.send_phone_number}}</td>
          <td>{{item.receive_phone_number}}</td>
          <td>{{item.operate_time}}</td>
          <td>{{item.sms_content}}</td>
        </tr>
      </table>
    </div>
    <div class="" v-if=true id="smsMap" style="width: 1500px;height:1000px;" align="center">

    </div>
  </div>
</template>

<script type="text/javascript">
import axios from 'axios'
export default {
  name: 'SMSFind',
  data () {
    return {
      smsRecord: {
        'receive_number':0,
        'send_number':0,
        'start_time':'',
        'end_time':''
      },
      smsRecords: [{}],
      length: 0,
      showMap:false,
      showData:true
    }
  },
  methods: {
    onSubmit () {
      this.showMap = false
      this.showData = true
      axios({
        url: '/sms/find',
        method: 'post',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        data: JSON.stringify(this.smsRecord)
      }).then((response) => {
        console.log(response.status)
        this.smsRecords = response.data.SMSRecords
        this.length = response.data.SMSRecordsLength
        console.log(this.length)
      }).catch(function(error){
        console.log(error)
      })
    },
    showMapFunc() {
      let mySetData = new Set()
      let myArrayLink = new Array()
      let myMapLink = new Map()
      var smsArray = this.smsRecords
      for(let i = 0; i < smsArray.length; i++){
        mySetData.add(smsArray[i].send_phone_number)
        mySetData.add(smsArray[i].receive_phone_number)
        var str = smsArray[i].send_phone_number + '-' + smsArray[i].receive_phone_number
        if(myMapLink.has(str) == false) {
          myMapLink.set(str, 1)
        } else if (myMapLink.has(str) == true) {
          let cishu = myMapLink.get(str)
          myMapLink.set(str, cishu+1)
        }
      }
      console.log('=======');
      console.log(myMapLink);
      for(var key of myMapLink) {
        console.log(key);
        myArrayLink.push({
          'source':key[0].split('-')[0],
          'target':key[0].split('-')[1],
          'name':key[1],
          'des':key[1],
          'lineStyle':{
            normal: {
              curveness: 0.2*key[1]
            }
          }
        })
      }
      var myArrayData = Array.from(mySetData)
      for (var j = 0; j < myArrayData.length; j++) {
        myArrayData[j] = {'name': myArrayData[j]}
      }
      this.showData = false
      this.showMap = true
      var echarts = require('echarts')
      var myCharts = echarts.init(document.getElementById('smsMap'))
      console.log(myArrayData)
      console.log(myArrayLink)
      var option = {
        title:{ text: '联络图'},
        tooltip:{
          formatter: function(x) {
            return 'test description'
          }
        },
        series: [{
          type: 'graph',
          layout: 'force',
          symbolSize: [80,80],
          roam: true,
          focusNodeAdjacency: true,
          force:{
            repulsion: 500,
            edgeLength: 400
          },
          edgeSymbol: ['circle', 'arrow'],
          edgeSymbolSize: [4, 10],
          edgeLabel: {
            normal: {
              show: true,
              textStyle: {
                fontSize: 20
              },
              formatter: function(x) {
                return x.data.name
              }
            }
          },
          force: {
            repulsion:2500,
            edgeLength: [10,50]
          },
          draggable: true,
          itemStyle: {
            normal: {
              color: '#4b565b',
              fontSize:10
            }
          },
          lineStyle: {
                normal: {
                           width: 4,
                           color: 'blue'

                }
          },
          label: {
                normal: {
                           show: true,
                           textStyle: {
                           }
                       }
          },
          data: myArrayData,
          links: myArrayLink
        }]
      } //finish option
      myCharts.setOption(option)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
