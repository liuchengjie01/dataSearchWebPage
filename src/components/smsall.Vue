<template lang="html">
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
</template>

<script>
import axios from 'axios'
export default {
  name: 'SMSAll',
  data() {
    return {
      smsRecords:[{}],
      length: 0
    }
  },
  methods: {
    getData() {
      axios({
        url: '/sms/all',
        method: 'get',
      }).then((response) => {
        this.smsRecords = response.data.SMSRecords
        this.length = response.data.SMSRecordsLength
        // console.log(this.length)
      }).catch((error) => {
        console.log(error);
      })
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style lang="css" scoped>
</style>
