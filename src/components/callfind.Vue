<template id="callfind">
  <div class="">
  <div class="">
    <form v-on:submit.prevent="onSubmit" align="left">
      去电:<input type="number" name="send_phone_number" value=0 placeholder="拨打号码" v-model.number="callRecord.send_phone_number">
      来电:<input type="number" name="receive_phone_number" v-model.number="callRecord.receive_phone_number" placeholder="接通号码" value=0>
      <input type="text" placeholder="start_time" name="" value="" v-model="callRecord.start_time">
      <input type="text" placeholder="end_time" name="" value="" v-model="callRecord.end_time">
      <input type="submit" name="" value="查询">
      <input type="reset" name="" value="重置">
    </form>
  </div>
  <div class="">
  <table border="1" align="center">
    <tr>
      <th>ID</th>
      <th>去电号码</th>
      <th>接通号码</th>
      <th>接通时间</th>
      <th>挂断时间</th>
      <th>音频</th>
    </tr>
    <tr v-for="(item, index) in callRecords">
      <td>{{item.id}}</td>
      <td>{{item.send_phone_number}}</td>
      <td>{{item.receive_phone_number}}</td>
      <td>{{item.start_call_time}}</td>
      <td>{{item.end_call_time}}</td>
      <!-- <td @click="getAudio(item.audio_file_name, item.id)">
        <video :id="item.id" preload="auto" controls>
          {{item.audio_file_name}}
        </video>
    </td> -->
    <td>
      <video :src="`http://192.168.0.101:9000/static/${item.audio_file_name}`" preload="metadata" controls>

      </video>
    </td>
    </tr>
  </table>
  </div>
  </div>
</template>

<script type="text/javascript">
import axios from 'axios'
export default {
  name: 'CallFind',
  data () {
    return {
      callRecord: {
        'send_phone_number': 0,
        'receive_phone_number': 0,
        'start_time': '',
        'end_time': ''
      },
      callRecords: [{}]
    }
  },
  methods: {
    onSubmit () {
      // let formData = new FormData()
      // formData.append('send_phone_number', this.callRecord['send_phone_number'])
      // formData.append('receive_phone_number', this.callRecord['receive_phone_number'])
      console.log('start_time ====> ' + this.callRecord.start_time)
      console.log('end_time ====>' + this.callRecord.end_time)
      axios({
        method: 'post',
        url: '/call/find',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        data: JSON.stringify(this.callRecord)
      }).then((response) => {
        console.log('status_code ==>' + response.status)
        console.log('response_data ===>' + response.data)
        this.callRecords = response.data.callRecords
        console.log(this.callRecords)
      }).catch(function(error){
        console.log(error);
      })
    },
    getAudio(name, id) {
      axios({
        url: '/call/play?name=' + name,
        method: 'get',
        responseType: 'blob'
      }).then((response) => {
        console.log(response.status)
        console.log(response.data)
        let audioUrl = window.URL.createObjectURL(response.data)
        var v = document.getElementById(id)
        v.src = audioUrl
        v.autoplay = false
        let promiser = v.play()
        v.onended = () => {
          //do something here when audio is ended
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
