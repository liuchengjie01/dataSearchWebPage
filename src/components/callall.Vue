<template id="callall">
  <div>
    <h3>全部通话记录</h3>
    <table border="1" align="center">
      <tr>
        <th>ID</th>
        <th>去电号码</th>
        <th>接通号码</th>
        <th>接通时间</th>
        <th>挂断时间</th>
        <th>音频</th>
      </tr>
      <tr>
        <td>0</td>
        <td>1234</td>
        <td>5678</td>
        <td>2019-09-02 18:29:01</td>
        <td></td>
        <td>
          <audio src="http://192.168.0.101:9000/static/周杰伦+-+简单爱.mp3" controls preload="metadata">

          </audio>
        </td>
      </tr>
      <tr v-for="(callRecord, index) in callRecords">
        <td>{{callRecord.id}}</td>
        <td>{{callRecord.send_phone_number}}</td>
        <td>{{callRecord.receive_phone_number}}</td>
        <td>{{callRecord.start_call_time}}</td>
        <td>{{callRecord.end_call_time}}</td>
        <td>
          <audio :src="`http://192.168.0.101:9000/static/${callRecord.audio_file_name}`" preload="metadata" controls>

          </audio>
        </td>
      </tr>
    </table>
    <p>{{length}}</p>
  </div>
</template>

<script type="text/javascript">
import axios from 'axios'
export default {
  name: 'CallAll',
  data () {
    return {
      // callRecords: {
      //   id: 0,
      //   SendPhoneNumber: 0,
      //   ReceivePhoneNumber: 0,
      //   StartCallTime: null,
      //   EndCallTime: null,
      //   AudioFileName : ''
      // }
      callRecords: [{id:1,SendPhoneNumber:111,ReceivePhoneNumber:222,StartCallTime:"aaaaa",EndCallTime:"aaasdsd", AudioFileName:"hnu"}],
      length:0
    }
  },
  methods: {
    getData() {
      axios({
        url: '/call/all',
        method: 'get'
      }).then((response) => {
        // call_records = response.data
        this.callRecords = response.data.callRecords
        this.length = response.data.callRecordLength
        console.log(response.data.message)
        console.log(response.data.callRecords)
      }).catch(function(error){
        console.log(error);
      })
    }
  },
  created() {
    this.getData()
  }
}
</script>
