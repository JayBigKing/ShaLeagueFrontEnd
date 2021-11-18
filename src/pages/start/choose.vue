<template>
  <div class="choose">
  <el-dropdown>
  <span class="el-dropdown-link">
    xiala<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>哈哈</el-dropdown-item>
      <el-dropdown-item>黑欸</el-dropdown-item>
      <el-dropdown-item>yeh</el-dropdown-item>
      <el-dropdown-item disabled>你啊</el-dropdown-item>
      <el-dropdown-item divided>天天</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
    <Button type="success">Success</Button>
  <img :src="testImg"  style="width:100px; height:130px">
  </div>
</template>

<script>
export default {
  name: 'choose',
  data () {
    return {
      activeName: '1',
      testImg: 'http://127.0.0.1:7899/img/202111/-a9268a8bc16e425db56db70687d4e7a6.jpg'
    }
  },
  methods: {
    haha (key) {
      alert(key)
    }
  }
}
</script>

<style>
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
