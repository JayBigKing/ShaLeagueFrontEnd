<template>
  <div>
    <div class="thePos">
    <div v-if="addNewFlag === false">
    <el-button type="success" @click="addNewMatch">添加新比赛</el-button>
    </div>
    <div v-else>
    <vue-qr :correctLevel="3" :autoColor="false" colorDark="#313a90"  :logoSrc="logoSrc" :text="codeUrl" :size="300" :margin="0" :logoMargin="3"></vue-qr>
    </div>
    </div>
    </div>
</template>

<script>
import VueQr from 'vue-qr'
import addMatchConstVar from './addMatchConst'
export default {
  name: 'addMatchByPlayer',
  created () {
    this.addNewFlag = false
  },
  data () {
    return {
      addNewFlag: false,
      theMid: 0,
      theTime: '',
      logoSrc: require('../../../../../static/images/logoSha/logoSha.png'),
      // bgSrc: require('../assets/img/bgSrc.png'),
      // http://localhost:9300/#/playerAddMatch/addMatchFillRole?mid=1461962241350893569&mdate=2021-11-20T15%3A38%3A54.9436882
      codeUrl: addMatchConstVar.theIPandPort + '/playerAddMatch/addMatchFillRole?mid=' + this.theMid + '&mdate=' + this.theTime
    }
  },
  components: {
    VueQr
  },
  methods: {
    addNewMatch () {
      this.$axios.post('/api/matchSha/createOnlyOneMatchSha'
      ).then(res => {
        this.theMid = res.data.data.mid
        this.theTime = res.data.data.mdate
        // this.$router.push({path: '/playerAddMatch/addMatchFillRole', query: {mid: this.theMid, mdate: this.theTime}})
        this.addNewFlag = true
      })
    }
  }
}

</script>

<style scoped>
.thePos{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
}
</style>
