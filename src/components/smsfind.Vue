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
    </div>
    <div class="">
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
      length: 0
    }
  },
  methods: {
    onSubmit () {
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
    }
  }
}
</script>

<style lang="css" scoped>
</style>
