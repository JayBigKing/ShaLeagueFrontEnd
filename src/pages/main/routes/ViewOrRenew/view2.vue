<template>
<div class="view2">
  <div class="bigSaying">
    <p class="yonghuSaying">用户信息</p>
    </div>

  <div class="roughInfo">
    <div class="theAvatar">
    <Avatar  icon="square" size="200" :src="userImg"/>
      </div>
    <div class="textSaying">
      <div class="textSaying1">
        <div>
        <p >玩家名：{{pname}}</p>
        </div>
        <div class="playerWin">
        <p>胜率:{{pData.allWinProbability}}</p>
        </div>
        <div>
        <p >积分:{{pScore}}</p>
        </div>
      </div>
      <div class="textSaying2">
        <div>
        <p >总场次：{{pData.allTimes}}</p>
        </div>
        <div class="allWinTimes">
        <p>胜场:{{pData.allWinTimes}}</p>
        </div>

        <div>
        <p >负场:{{pData.allLoseTimes}}</p>
        </div>
      </div>
    </div>
    </div>
  <div class="theDetails">
      <p class="DatailsSaying">各角色战绩</p>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column
          fixed
          prop="name"
          label="角色"
          width="300">
      </el-table-column>
      <el-table-column
          prop="win"
          label="胜率"
          width="300">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="500">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

</div>
</template>

<script>
import globalVar from '../../../../global'
export default {
  name: 'view2',
  created () {
    this.pname = this.$route.query.name
    this.pid = this.$route.query.pid
    this.$axios.get('/api/playerImage/getByPid/' + this.pid
    ).then(res => {
      this.userImg = globalVar.theUserImgFront + res.data.data.imgUrl
      console.info(this.userImg)
    })

    this.$axios.get('/api/player/getDetail/' + this.pid
    ).then(res => {
      this.pData = res.data.data
      this.pScore = res.data.data.score
      this.reShapeRoughData()
      this.reshapeDetail()
    })

    // this.$axios.get('/api/score/getByPid/' + this.pid
    // ).then(res => {
    //   this.pScore = res.data.data.score
    // })
  },
  data () {
    return {
      pname: '',
      pid: '',
      userImg: '',
      pData: {},
      tableData: [],
      pScore: 0
    }
  },
  methods: {
    reShapeRoughData () {
      if (this.pData.allWinProbability !== -1) {
        this.pData.allWinProbability = this.pData.allWinProbability * 100
        this.pData.allWinProbability = this.pData.allWinProbability.toString()
        this.pData.allWinProbability = this.pData.allWinProbability.slice(0, 5) + '%'
      } else {
        this.pData.allWinProbability = '暂无数据'
      }
    },
    handleClick (rowData) {
      // let alertMsg = '总场次：' + rowData.times + '' +
      // '\r\n胜场：' + rowData.winTimes + '\r\n' +
      //     '负场：' + rowData.loseTimes + '\r\n' +
      //     '胜率：' + rowData.win + '\r\n' +
      //     '负率：' + rowData.lose + '\r\n'
      let newDatas = []
      const h = this.$createElement
      newDatas.push(h('p', null, rowData.name + '战绩'))
      newDatas.push(h('p', null, '总场次：' + rowData.times))
      newDatas.push(h('p', null, '胜场：' + rowData.winTimes))
      newDatas.push(h('p', null, '负场：' + rowData.loseTimes))
      newDatas.push(h('p', null, '胜率：' + rowData.win))
      newDatas.push(h('p', null, '负率：' + rowData.lose))
      this.$alert(h('div', null, newDatas), rowData.name + '战绩', {
        confirmButtonText: '确定',
        callback: action => {
        }
      })
    },
    reshapeDetail () {
      if (this.pData.lordTimes !== 0) {
        let tmp1 = {}
        let p = 0
        tmp1.name = '主公'
        p = this.pData.lordWinProbability * 100
        tmp1.win = p.toString().slice(0, 5) + '%'
        p = this.pData.lordLoseProbability * 100
        tmp1.lose = p.toString().slice(0, 5) + '%'
        tmp1.times = this.pData.lordTimes.toString()
        tmp1.winTimes = this.pData.lordWinTimes.toString()
        tmp1.loseTimes = this.pData.lordLoseTimes.toString()
        this.tableData.push(tmp1)
        // this.tableData.name = '主公'
        // this.tableData.win = this.pData.lordWinProbability.toString().slice(0, 5)
      } else {
        let tmp2 = {}
        tmp2.name = '主公'
        tmp2.win = '暂无数据'
        tmp2.lose = '暂无数据'
        tmp2.times = this.pData.lordTimes.toString()
        tmp2.winTimes = this.pData.lordWinTimes.toString()
        tmp2.loseTimes = this.pData.lordLoseTimes.toString()
        this.tableData.push(tmp2)
      }

      if (this.pData.courtierTimes !== 0) {
        let tmp1 = {}
        let p = 0
        tmp1.name = '忠臣'
        p = this.pData.courtierWinProbability * 100
        tmp1.win = p.toString().slice(0, 5) + '%'
        p = this.pData.courtierLoseProbability * 100
        tmp1.lose = p.toString().slice(0, 5) + '%'
        tmp1.times = this.pData.courtierTimes.toString()
        tmp1.winTimes = this.pData.courtierWinTimes.toString()
        tmp1.loseTimes = this.pData.courtierLoseTimes.toString()
        this.tableData.push(tmp1)
        // this.tableData.name = '主公'
        // this.tableData.win = this.pData.lordWinProbability.toString().slice(0, 5)
      } else {
        let tmp2 = {}
        tmp2.name = '忠臣'
        tmp2.win = '暂无数据'
        tmp2.lose = '暂无数据'
        tmp2.times = this.pData.courtierTimes.toString()
        tmp2.winTimes = this.pData.courtierWinTimes.toString()
        tmp2.loseTimes = this.pData.courtierLoseTimes.toString()
        this.tableData.push(tmp2)
      }

      if (this.pData.rebelTimes !== 0) {
        let tmp1 = {}
        let p = 0
        tmp1.name = '反贼'
        p = this.pData.rebelWinProbability * 100
        tmp1.win = p.toString().slice(0, 5) + '%'
        p = this.pData.rebelLoseProbability * 100
        tmp1.lose = p.toString().slice(0, 5) + '%'
        tmp1.times = this.pData.rebelTimes.toString()
        tmp1.winTimes = this.pData.rebelWinTimes.toString()
        tmp1.loseTimes = this.pData.rebelLoseTimes.toString()
        this.tableData.push(tmp1)
        // this.tableData.name = '主公'
        // this.tableData.win = this.pData.lordWinProbability.toString().slice(0, 5)
      } else {
        let tmp2 = {}
        tmp2.name = '反贼'
        tmp2.win = '暂无数据'
        tmp2.lose = '暂无数据'
        tmp2.times = this.pData.rebelTimes.toString()
        tmp2.winTimes = this.pData.rebelWinTimes.toString()
        tmp2.loseTimes = this.pData.rebelLoseTimes.toString()
        this.tableData.push(tmp2)
      }

      if (this.pData.traitorTimes !== 0) {
        let tmp1 = {}
        let p = 0
        tmp1.name = '内奸'
        p = this.pData.traitorWinProbability * 100
        tmp1.win = p.toString().slice(0, 5) + '%'
        p = this.pData.traitorLoseProbability * 100
        tmp1.lose = p.toString().slice(0, 5) + '%'
        tmp1.times = this.pData.traitorTimes.toString()
        tmp1.winTimes = this.pData.traitorWinTimes.toString()
        tmp1.loseTimes = this.pData.traitorLoseTimes.toString()
        this.tableData.push(tmp1)
        // this.tableData.name = '主公'
        // this.tableData.win = this.pData.lordWinProbability.toString().slice(0, 5)
      } else {
        let tmp2 = {}
        tmp2.name = '内奸'
        tmp2.win = '暂无数据'
        tmp2.lose = '暂无数据'
        tmp2.times = this.pData.traitorTimes.toString()
        tmp2.winTimes = this.pData.traitorWinTimes.toString()
        tmp2.loseTimes = this.pData.traitorLoseTimes.toString()
        this.tableData.push(tmp2)
      }
    }
  }
}
</script>

<style scoped>
.view2{
}
.bigSaying{
  color: #f3f5f9;
}
.yonghuSaying{
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  font-size: 30px;
  color: #464c5b;
  font-weight: bold;
}
.roughInfo{
  background-color: #FFFFFF;
  display: flex;
  flex-direction: row;
}
.theAvatar{
  padding-left: 50px;
}
.textSaying{
  padding-left: 100px;
  padding-top: 40px;
  display: flex;
  flex-direction: column;
}
.textSaying1{
  font-size: 25px;
  display: flex;
  flex-direction: row;
}
.textSaying2{
  font-size: 25px;
  padding-top: 50px;
  display: flex;
  flex-direction: row;
}
.playerWin{
  padding-left: 160px;
  padding-right: 160px;
}
.allWinTimes{
  padding-left: 160px;
  padding-right: 160px;
}
.DatailsSaying{
  margin-top: 30px;
  margin-bottom: 30px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  font-size: 30px;
  color: #464c5b;
  font-weight: bold;
}
</style>
