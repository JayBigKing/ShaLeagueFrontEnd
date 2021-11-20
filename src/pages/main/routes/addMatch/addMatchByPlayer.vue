<template>
  <div>
    <div v-if="addNewFlag === false">
    <el-button type="success" @click="addNewMatch">添加新比赛</el-button>
    </div>
    <div v-else>
    <vue-qr :correctLevel="3" :autoColor="false" colorDark="#313a90"  :logoSrc="logoSrc" :text="codeUrl" :size="95" :margin="0" :logoMargin="3"></vue-qr>
    </div>
    </div>
</template>

<script>
import VueQr from 'vue-qr'
export default {
  name: 'addMatchByPlayer',
  created () {
    this.addNewFlag = false
  },
  data () {
    return {
      addNewFlag: false,
      theMid: 0,
      logoSrc: require('../../../../../static/images/logoSha/logoSha.png'),
      // bgSrc: require('../assets/img/bgSrc.png'),
      codeUrl: '/main/addMatch/addMatchFillRole'
    }
  },
  components: {
    VueQr
  },
  methods: {
    addNewMatch () {
      this.addNewFlag = true
    }
  }
}

</script>

<style scoped>

</style>
