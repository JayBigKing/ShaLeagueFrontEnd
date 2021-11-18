<template>
  <div class="start">
    <div class="theImg">
      <el-image
          style="width: 400px; height: 300px"
          :src="url"
          :fit="fitt"></el-image>
      </div>
    <router-view/>
<!--    <div class="theQuestion">-->
<!--      <p class="staticSaying">请回答下述问题-->
<!--      </p>-->
<!--      <p class="theDynamicQues">{{theQuestion}}-->
<!--      </p>-->
<!--      <div class="theInput">-->
<!--      <el-input-->
<!--          placeholder="请输入答案"-->
<!--          v-model="inputAnswer"-->
<!--          clearable>-->
<!--      </el-input>-->

<!--      </div>-->
<!--      <el-button type="success" round v-on:click="checkAnswer()">提交回答</el-button>-->
<!--    </div>-->
  </div>

</template>

<script>
export default {
  name: 'start',
  data () {
    return {
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      fitt: 'contain',
      url: '../../static/images/start/startD.png'
    }
  },
  created () {
    this.$router.push('/start/admit')
  }
  // inject: ['reload'],
  // created () {
  //   this.getQustion()
  // },
  // data () {
  //   return {
  //     fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
  //     fitt: 'contain',
  //     url: '../../static/images/start/startD.png',
  //     theQuestion: '',
  //     theQuestionId: '',
  //     inputAnswer: ''
  //   }
  // },
  // methods: {
  //   getQustion () {
  //     this.$axios.get('/api/enterQuestion/getAQuestionByRand').then(res => {
  //       this.theQuestionId = res.data.data.qid
  //       this.theQuestion = res.data.data.qdescription
  //       console.info(this.theQuestionId)
  //     })
  //   },
  //   checkAnswer () {
  //     this.$axios.post('/api/enterQuestion/checkAnswer', {
  //       id: this.theQuestionId.toString(),
  //       Qanswer: this.inputAnswer
  //     }).then(res => {
  //       if (res.data.code === 200) {
  //         const h = this.$createElement
  //         this.$message({
  //           message: h('p', null, [
  //             h('span', null, '回答'),
  //             h('i', { style: 'color: teal' }, '正确')
  //           ])
  //         })
  //         this.$router.push('/start/choose')
  //       } else {
  //         const h = this.$createElement
  //         this.$message({
  //           message: h('p', null, [
  //             h('span', null, '回答'),
  //             h('i', { style: 'color: #ff1111' }, '错误')
  //           ])
  //         })
  //         this.reload()
  //       }
  //     })
  //   }
  // }
}
</script>

<style>
.theImg {
  display: flex;
  justify-content: center;
  align-items: center;
}
/*.theQuestion{*/
/*  text-align: center;*/
/*}*/
/*.staticSaying{*/
/*  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;*/
/*  font-size: 16px;*/
/*  color: #464c5b;*/
/*  font-weight: bold;*/
/*}*/
/*.theDynamicQues{*/
/*  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;*/
/*}*/
/*.theInput{*/
/*  padding-left: 400px;*/
/*  padding-right: 400px;*/
/*}*/
</style>
