<template>
  <div class="addMatchFillRole">
    <div class="timeOutSaying" v-if="hasTimeOut === true">
      <el-result icon="error" title="错误提示" subTitle="填报时间已过！">
      </el-result>
    </div>
    <div v-else-if="hasFilled === false">
      <div class="theRemainTime">
        <div class="theStaticSaying">剩余填报时间：</div>
        <div class="theTime">{{remainTime.remainMinute}}分{{remainTime.remainSeconde}}秒</div>
      </div>
    <div  class="fillTable">
    <el-form ref="dynamicValidateForm" :model="dynamicValidateForm" label-width="80px">
      <el-form-item label="玩家">
        <Select
            v-model="dynamicValidateForm.domains.theChoose"
            style="width:200px"
            filterable
            :remote-method="remoteAdd"
            :loading="dynamicValidateForm.loading">
          <Option v-for="(option, index1) in dynamicValidateForm.domains.options" :value="option" :key="index1" >{{option.name}}</Option>
        </Select>
      </el-form-item>
      <el-form-item label="角色">
        <Select v-model="dynamicValidateForm.domains.theRole" style="width:200px">
          <Option v-for="item in roleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </el-form-item>

      <el-form-item label="胜负">
        <Select v-model="dynamicValidateForm.domains.theResult" style="width:200px">
          <Option v-for="item in resultList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </el-form-item>
    </el-form>
    </div>
    <div class="theButton">
      <el-button type="primary" @click="submitForm()">提交</el-button>
    </div>
    </div>
    <div v-else>
      <div v-if="dynamicValidateForm.domains.theResult === 0 ">
      <el-result icon="success" title="成功提示" subTitle="填报成功！下次加油哦！">
      </el-result>
      </div>
      <div v-else>
        <el-result icon="success" title="成功提示" subTitle="填报成功！恭喜杀爆！">
        </el-result>
      </div>
    </div>

  </div>
</template>

<script>
import addMatchConstVar from './addMatchConst'
export default {
  name: 'addMatchFillRole',
  created () {
    this.mid = this.$route.query.mid
    this.mdate = this.$route.query.mdate
    this.theCreateTime = new Date(this.mdate)
    // eslint-disable-next-line no-implied-eval
    this.interValTime = setInterval(this.checkTime, addMatchConstVar.defaultCallTimeCheckTime)
    // this.checkTime()
    this.dynamicValidateForm.domains.theChoose = ''
    this.dynamicValidateForm.domains.theRole = -1
    this.dynamicValidateForm.domains.theResult = -1
    this.remoteAdd('')
  },
  beforeDestroy () {
    clearInterval(this.interValTime)
  },
  data () {
    return {
      mid: '',
      mdate: '',
      theCreateTime: '',
      interValTime: '',
      remainTime: {
        remainMinute: 0,
        remainSeconde: 0
      },
      hasFilled: false,
      hasTimeOut: false,
      dynamicValidateForm: {
        domains: {
          options: [],
          theChoose: '',
          theRole: -1,
          theResult: -1,
          loading: false
        }
      },
      roleList: [
        {
          value: 0,
          label: '主公'
        },
        {
          value: 1,
          label: '忠臣'
        },
        {
          value: 2,
          label: '反贼'
        },
        {
          value: 3,
          label: '内奸'
        }
      ],
      resultList: [
        {
          value: 0,
          label: '失利'
        },
        {
          value: 1,
          label: '胜利'
        }
      ]
      // errorSaying: addMatchConstVar.errorSaying,
      // okSayintg: addMatchConstVar.okSayintg,
      // test: addMatchConstVar.test
    }
  },
  methods: {
    remoteAdd (query) {
      this.dynamicValidateForm.domains.loading = true
      this.$axios.get('/api/player/getByName', {
        params: {
          name: query
        }
      }
      ).then(res => {
        this.dynamicValidateForm.domains.loading = false
        this.dynamicValidateForm.domains.options = res.data.data.data
      })
    },
    submitForm () {
      if (this.checkAllFilled() === false) {
        addMatchConstVar.methods.errorSaying('错误：未填完所有表格！')
      } else {
        this.postSendTheData()
      }
    },
    postSendTheData () {
      this.$axios.post('/api/score/createByMid', {
        'id': this.dynamicValidateForm.domains.theChoose.pid,
        'mid': this.mid,
        'theRole': this.dynamicValidateForm.domains.theRole,
        'result': this.dynamicValidateForm.domains.theResult,
        'givenScore': addMatchConstVar.defaultGivenScore
      }
      ).then(res => {
        this.sayingPostStatus(res.status, res.data.code)
        this.hasFilled = true
      })
    },
    checkAllFilled () {
      if (this.dynamicValidateForm.domains.theChoose === addMatchConstVar.noInputChoose || this.dynamicValidateForm.domains.theRole === addMatchConstVar.noInputRoleOrResult ||
          this.dynamicValidateForm.domains.theResult === addMatchConstVar.noInputRoleOrResult) {
        return false
      }
      return true
    },
    sayingPostStatus (status, code) {
      if (status === 200) {
        if (code === 200) {
          addMatchConstVar.methods.okSayintg('新玩家添加成功！')
        }
      } else {
        addMatchConstVar.methods.errorSaying('错误：服务器错误！')
      }
    },
    checkTime () {
      var nowDate = new Date()
      var overTime = parseInt(nowDate - this.theCreateTime)
      if (overTime > addMatchConstVar.maxFilledTime) {
        this.hasTimeOut = true
      } else {
        this.setRemainTime(addMatchConstVar.maxFilledTime - overTime)
      }
    },
    setRemainTime (theOverTime) {
      var theMinutes = theOverTime / addMatchConstVar.minToMilliSec
      var leave = theOverTime % (addMatchConstVar.minToMilliSec)
      var theSeconds = leave / addMatchConstVar.secondToMilliSec

      this.remainTime.remainMinute = parseInt(theMinutes)
      this.remainTime.remainSeconde = parseInt(theSeconds)
    }

  }
}
</script>

<style scoped>
.theRemainTime{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 20px;
}
.fillTable{
  display: flex;
  justify-content: center;
  align-items: center;
}
.theButton{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
