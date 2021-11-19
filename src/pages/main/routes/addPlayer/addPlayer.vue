<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <div class="theName">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      </div>
      <div class="theUpImg">
        <p class="theUpImgText">上传头像</p>
        <el-upload
            class="avatar-uploader"
            action="/api/file/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
          <img v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>

      <el-form-item class="theButtons">
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import apConsts from './addPlayerConst'
export default {
  name: 'addPlayer',
  data () {
    return {
      ruleForm: {
        name: '',
        imageUrl: '',
        imageInEndUrl: ''
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var qs = require('qs')
          this.$axios.post('/api/player/withImg', qs.stringify({
            name: this.ruleForm.name,
            imgSrc: this.ruleForm.imageInEndUrl
          }), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(res => {
            console.info(res)
            alert('添加成功')
          })
        } else {
          alert('添加失败!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleAvatarSuccess (res, file) {
      this.ruleForm.imageUrl = URL.createObjectURL(file.raw)
      this.ruleForm.imageInEndUrl = res.url.slice(apConsts.imageIndexStart)
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
    }
  }
}
</script>

<style>
.theName{
  padding-left: 100px;
  padding-right: 100px;
}
.theUpImg{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /*padding-left: 600px;*/
  /*padding-right: 200px;*/
}
.theUpImgText{
  padding-right: 30px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  font-size: 16px;
  color: #464c5b;
  font-weight: bold;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.theButtons{
  padding-top: 50px;
  padding-left: 500px;
}
</style>
