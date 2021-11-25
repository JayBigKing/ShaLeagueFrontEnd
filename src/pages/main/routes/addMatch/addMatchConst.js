// import Vue from '_vue@2.6.14@vue'

import Vue from 'vue'
import {MessageBox} from 'element-ui'

const defaultGivenScore = -1
const noInputChoose = ''
const noInputRoleOrResult = -1
const atLeastMan = 2
const theLoseNumMap = 0
const theWinNumMap = 1
const theIP = 'http://42.193.3.41:'
const theIPandPort = theIP + '7899/#/'
const maxFilledMin = 10
const maxfilledRemainSeconde = 0
const secondToMilliSec = 1000
const minToMilliSec = 60 * secondToMilliSec
const maxFilledTime = maxFilledMin * minToMilliSec + maxfilledRemainSeconde * secondToMilliSec
const defaultCallTimeCheckTime = 500

Vue.prototype.$mb = MessageBox
export default {
  defaultGivenScore,
  noInputChoose,
  noInputRoleOrResult,
  atLeastMan,
  theLoseNumMap,
  theWinNumMap,
  theIPandPort,
  secondToMilliSec,
  minToMilliSec,
  maxFilledTime,
  defaultCallTimeCheckTime,
  methods: {
    errorSaying (errorText) {
      Vue.prototype.$mb.alert(errorText, '提交结果', {
        confirmButtonText: '确定',
        callback: action => ({
          type: 'error',
          message: errorText
        })
      })
    },
    okSayintg (Text) {
      Vue.prototype.$mb.alert(Text, '提交结果', {
        confirmButtonText: '确定',
        callback: action => {}
      })
    }
  }
}
