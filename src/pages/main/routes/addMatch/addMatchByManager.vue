<template>
  <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
    <el-form-item
        v-for="(domain, index) in dynamicValidateForm.domains"
        :label="'玩家' + index"
        :key="domain.key"
        :prop="'domains.' + index + '.value'"
        :rules="{
      required: true, message: '域名不能为空', trigger: 'blur'
    }"
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
  },
  data () {
    return {
      dynamicValidateForm: {
        domains: [{
          value: '请选择玩家',
          options: [],
          theChoose: '',
          theRole: 0,
          theResult: 0,
          loading: false
        }]
      },
      sendData: {},
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.checkSame() !== true) {
            console.log('error submit!!')
            return false
          } else if (this.sendDataProc() !== true) {
            alert('submit')
          } else {
            this.$alert('这是一段内容', '标题名称', {
              confirmButtonText: '确定',
              callback: action => {}
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    removeDomain (item) {
      var index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
      }
    },
    addDomain () {
      let tmpNewDomains = {}
      tmpNewDomains.value = ''
      tmpNewDomains.options = []
      tmpNewDomains.theChoose = ''
      tmpNewDomains.load = ''
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
        console.info(this.dynamicValidateForm.domains[index].options[0])
      })
    },
    checkSame () {
      let sets = new Set()
      for (let i = 0; i < this.dynamicValidateForm.domains.length - 1; i++) {
        if (sets.add(this.dynamicValidateForm.domains[i].theChoose.pid) === false) {
          return false
        }
      }
      return true
    },
    sendDataProc () {
      var flagWin = false

      for (let i = 0; i < this.dynamicValidateForm.domains.length - 1; i++) {
        if (this.dynamicValidateForm.domains[i].theResult === 1) {
          this.sendData.winner = this.dynamicValidateForm.domains[i].theChoose.pid
          flagWin = true
          break
        }
      }
      if (flagWin === false) {
        return false
      } else {
        for (let i = 0; i < this.dynamicValidateForm.domains.length - 1; i++) {
          let tmpRole = {}
          tmpRole.givenScore = addMatchConstVar.defaultGivenScore
          tmpRole.id = this.dynamicValidateForm.domains[i].theChoose.pid
          tmpRole.theRole = this.dynamicValidateForm.domains[i].theRole
          tmpRole.result = this.dynamicValidateForm.domains[i].theResult
          this.sendData.push(tmpRole)
        }
        return true
      }
    }
  }
}
</script>

<style scoped>
.theAddRole{
  display: flex;
  flex-direction: column;
}
</style>
