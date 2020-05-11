import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Hello from '@/components/hello'
import App from '@/App'
import CallAll from '@/components/callall'
import CallFind from '@/components/callfind'
import Call from '@/components/call'
import SMSFind from '@/components/smsfind'
import SMSAll from '@/components/smsall'
import SMS from '@/components/sms'
import Location from '@/components/location'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/helloworld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/hello',
      name: 'hello',
      component: Hello
    },
    {
      path: '/call',
      name: 'call',
      component: Call,
      children: [
        // {path:'/', component: Call},
        // {path: '/all', component: CallAll},
        // {path: '/find', component: CallFind}
      ]
    },
    {
      path: '/call/all',
      name: 'callall',
      component: CallAll
    },
    {
      path: '/call/find',
      name: 'callfind',
      component: CallFind
    },
    {
      path: '/sms',
      name: 'sms',
      component: SMS
    },
    {
      path: '/sms/find',
      name: 'smsfind',
      component: SMSFind
    },
    {
      path: '/sms/all',
      name: 'smsall',
      component: SMSAll
    },
    {
      path: '/location',
      component: Location
    }
  ]
})
