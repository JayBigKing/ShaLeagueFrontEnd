<template>
  <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
    <el-form-item
        v-for="(domain, index) in dynamicValidateForm.domains"
        :label="'玩家' + index"
        :key="domain.key"
        :prop="'domains.' + index + '.value'"
    >
      <div class="theAddRole">
      <Select
          v-model="domain.theChoose"
          style="width:200px"
          filterable
          :remote-method="(val)=>remoteAdd(val, index)"
          :loading="domain.loading">
        <Option v-for="(option, index1) in domain.options" :value="option" :key="index1" >{{option.name}}</Option>
      </Select>
        <Select v-model="domain.theRole" style="width:200px">
          <Option v-for="item in roleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Select v-model="domain.theResult" style="width:200px">
          <Option v-for="item in resultList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <el-button @click.prevent="removeDomain(domain)">删除</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
      <el-button @click="addDomain">新增玩家</el-button>
      <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import addMatchConstVar from './addMatchConst'
export default {
  name: 'addMatchByManager',
  created () {
    this.remoteAddHelp('', 0)
    this.dynamicValidateForm.domains[0].theChoose = ''
    this.dynamicValidateForm.domains[0].theResult = -1
    this.dynamicValidateForm.domains[0].theResult = -1
  },
  data () {
    return {
      dynamicValidateForm: {
        domains: [{
          options: [],
          theChoose: '',
          theRole: -1,
          theResult: -1,
          loading: false
        }]
      },
      sendData: {
        winner: '',
        roles: []
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
    }
  },
  methods: {
    submitForm (formName) {
      if (this.checkAllFilled() === true) {
        if (this.checkSame() !== true) {
          this.$alert('错误：存在相同玩家！', '提交结果', {
            confirmButtonText: '确定',
            callback: action => ({
              type: 'error',
              message: `错误：存在相同玩家`
            })
          })
        } else if (this.sendDataProc() !== true) {
          this.$alert('错误：比赛无胜者或无负者！', '提交结果', {
            confirmButtonText: '确定',
            callback: action => ({
              type: 'error',
              message: `错误：比赛无胜者或无负者！`
            })
          })
        } else if (this.checkManNum() !== true) {
          this.$alert('错误：人数不足！至少为2！', '提交结果', {
            confirmButtonText: '确定',
            callback: action => ({
              type: 'error',
              message: `错误：人数不足！至少为2！`
            })
          })
        } else {
          this.postSendTheData()
        }
      } else {
        this.$alert('错误：未填完所有表格！', '提交结果', {
          confirmButtonText: '确定',
          callback: action => ({
            type: 'error',
            message: `错误：未填完所有表格！`
          })
        })
      }
    },
    resetForm (formName) {
      // this.$refs[formName].resetFields()
    },
    removeDomain (item) {
      var index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
      }
    },
    addDomain () {
      let tmpNewDomains = {}
      tmpNewDomains.options = []
      tmpNewDomains.theChoose = ''
      tmpNewDomains.loading = false
      tmpNewDomains.theRole = -1
      tmpNewDomains.theResult = -1
      this.dynamicValidateForm.domains.push(
        tmpNewDomains
      )
      this.remoteAdd('', this.dynamicValidateForm.domains.length - 1)
    },
    remoteAdd (query, index) {
      this.remoteAddHelp(query, index)
    },
    remoteAddHelp (query, index) {
      this.dynamicValidateForm.domains[index].loading = true
      this.$axios.get('/api/player/getByName', {params: {
        name: query
      }}
      ).then(res => {
        this.dynamicValidateForm.domains[index].loading = false
        this.dynamicValidateForm.domains[index].options = res.data.data.data
      })
    },
    checkSame () {
      var sets = new Set()
      for (let i = 0; i < this.dynamicValidateForm.domains.length; i++) {
        if (sets.has(this.dynamicValidateForm.domains[i].theChoose.pid) === true) {
          return false
        } else {
          sets.add(this.dynamicValidateForm.domains[i].theChoose.pid)
        }
      }
      return true
    },
    checkAllFilled () {
      for (let i = 0; i < this.dynamicValidateForm.domains.length; i++) {
        if (this.dynamicValidateForm.domains[i].theChoose === addMatchConstVar.noInputChoose || this.dynamicValidateForm.domains[i].theRole === addMatchConstVar.noInputRoleOrResult ||
        this.dynamicValidateForm.domains[i].theResult === addMatchConstVar.noInputRoleOrResult) {
          return false
        }
      }
      return true
    },
    checkManNum () {
      if (this.dynamicValidateForm.domains.length < 2) { return false } else { return true }
    },
    sendDataProc () {
      var flagWin = false
      var flagLose = false
      var allRoles = []
      for (let i = 0; i < this.dynamicValidateForm.domains.length; i++) {
        if (this.dynamicValidateForm.domains[i].theResult === addMatchConstVar.theWinNumMap) {
          this.sendData.winner = this.dynamicValidateForm.domains[i].theChoose.pid
          flagWin = true
        }
        if (this.dynamicValidateForm.domains[i].theResult === addMatchConstVar.theLoseNumMap) {
          flagLose = true
        }
      }
      if (flagWin === false || flagLose === false) {
        return false
      } else {
        for (let i = 0; i < this.dynamicValidateForm.domains.length; i++) {
          let tmpRole = {}
          tmpRole.givenScore = addMatchConstVar.defaultGivenScore
          tmpRole.id = this.dynamicValidateForm.domains[i].theChoose.pid
          tmpRole.theRole = this.dynamicValidateForm.domains[i].theRole
          tmpRole.result = this.dynamicValidateForm.domains[i].theResult
          allRoles.push(tmpRole)
        }
        this.sendData.roles = allRoles

        return true
      }
    },
    postSendTheData () {
      this.$axios.post('/api/matchSha', {
        'winner': this.sendData.winner,
        'roles': this.sendData.roles
      }
      ).then(res => {
        this.sayingPostStatus(res.status, res.data.code)
        var timer
        clearTimeout(timer) // 清除延迟执行

        timer = setTimeout(() => {
          this.$router.go(0)// 设置延迟执行
        }, 1500)
      })
    },
    sayingPostStatus (status, code) {
      if (status === 200) {
        if (code === 200) {
          this.$alert('新比赛添加成功', '提交结果', {
            confirmButtonText: '确定',
            callback: action => {}
          })
        }
      } else {
        this.$alert('错误：服务器错误！', '提交结果', {
          confirmButtonText: '确定',
          callback: action => ({
            type: 'error',
            message: `错误：服务器错误！`
          })
        })
      }
    }
  }
}
// :rules="{
// required: true, message: '域名不能为空', trigger: 'blur'
// }"
</script>

<style scoped>
.theAddRole{
  display: flex;
  flex-direction: column;
}
</style>
