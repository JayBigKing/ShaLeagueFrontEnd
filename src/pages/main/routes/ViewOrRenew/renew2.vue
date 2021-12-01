<template>
  <div class="renew2">
  <div class="bigSaying">
    <p class="yonghuSaying">用户信息</p>
  </div>

  <div class="roughInfo">
    <div class="theAvatar">
      <Avatar  icon="square" size="200" :src="userImg"/>

      <el-upload
          class="upload-demo1"
          action="/api/file/upload"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :on-remove="removeTheImg"
          multiple
          :limit="1"
          :on-exceed="handleExceed"
      >
        <el-button size="small" type="primary">更改头像</el-button>
      </el-upload>
    </div>

    <div class="textSaying">
      <div class="textSaying1">
          <p class="playNameStaticSaying1">玩家名：</p>
          <el-input class="playNameInput1" v-model="pname" placeholder="pname" />
        <el-button type="info" v-on:click="returnName()" round>还原</el-button>
      </div>
    </div>
  </div>
    <el-button class="successButton1" type="success" v-on:click="renewSubmit()"  round>提交修改</el-button>
  </div>
</template>

<script>
import globalVar from '../../../../global'
import apConsts from '../addPlayer/addPlayerConst'

export default {
  name: 'renew2',
  created () {
    this.pname = this.originName = this.$route.query.name
    this.pid = this.$route.query.pid
    this.$axios.get('/api/playerImage/getByPid/' + this.pid
    ).then(res => {
      this.userImg = this.originImg = globalVar.theUserImgFront + res.data.data.imgUrl
    })
    this.$axios.get('/api/player/' + this.pid
    ).then(res => {
      console.info(res)
      this.pname = this.originName = res.data.data.name
    })
  },
  data () {
    return {
      pname: '',
      originName: '',
      pid: '',
      originImg: '',
      userImg: '',
      imageUrl: '',
      imageInEndUrl: ''
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.imageInEndUrl = res.url.slice(apConsts.imageIndexStart)
      this.userImg = globalVar.theUserImgFront + this.imageInEndUrl
    },
    removeTheImg (file, fileList) {
      this.userImg = this.originImg
      this.$axios.post('/api/file/delete/', {
        'fileStrEnd': this.imageInEndUrl
      }
      ).then(res => {
      })
    },
    handleExceed () {
      alert('错误！一个人只能有一张头像哦！')
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    returnName () {
      this.pname = this.originName
    },
    renewSubmit () {
      console.info(this.pname)
      this.$axios.post('/api/player/renew', {
        'pid': this.pid,
        'pname': this.pname,
        'imgSrc': this.imageInEndUrl
      }
      ).then(res => {
        console.log(res)
        alert('修改成功！')
        var timer
        clearTimeout(timer) // 清除延迟执行

        timer = setTimeout(() => {
          this.$router.go(0)// 设置延迟执行
        }, 1800)
      })
    }

  }
}
</script>

<style scoped>
.bigSaying{
  color: #f3f5f9;
}
.yonghuSaying{
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  font-size: 30px;
  color: #464c5b;
  font-weight: bold;
}
.theAvatar{
  padding-left: 50px;
  display: flex;
  flex-direction: column;
}
.roughInfo{
  background-color: #FFFFFF;
  display: flex;
  flex-direction: row;
}
.playNameStaticSaying1{
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  padding-right: 30px;
}
.playNameInput1{
  padding-right: 30px;
}
.textSaying{
  padding-left: 400px;
  padding-top: 120px;
  display: flex;
  flex-direction: column;
}
.textSaying1{
  display: flex;
  flex-direction: row;
}
.upload-demo1{
  margin-left: 70px;
  margin-top: 40px;
}
.successButton1{
  margin-top: 40px;
  margin-left: 800px;
}
</style>

<!--multiple-->
<!--:limit="3"-->
