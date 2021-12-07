<template>
    <div class="rankList">
      <template>
        <el-table
            class="theTable"
            :data="tableData"
            stripe
            style="width: 100%"
            @row-click = "clickToDetail">
          <el-table-column
              prop="date"
              label=""
              width="300">

            <template   slot-scope="scope">
              <img :src="scope.row.imgSrc"  min-width="70" height="70" />
            </template>
          </el-table-column>
          <el-table-column
              prop="name"
              label="玩家"
              width="300">
          </el-table-column>
          <el-table-column
              prop="score"
              label="积分"
              width="400">
          </el-table-column>
          <el-table-column
              prop="win"
              label="胜率">
          </el-table-column>
        </el-table>
      </template>

    </div>
</template>

<script>
import globalVar from '../../../../global'
export default {
  name: 'RankList',
  data () {
    return {
      tableData: []
    }
  },
  created () {
    this.getRankList()
  },
  methods: {
    getRankList () {
      this.$axios.get('/api/score/list'
      ).then(res => {
        this.tableData = res.data.data.data
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].win !== undefined) {
            let p = this.tableData[i].win * 100
            this.tableData[i].win = p.toString() + '%'
          } else {
            this.tableData[i].win = '0.0%'
          }
          this.tableData[i].imgSrc = globalVar.theUserImgFront + this.tableData[i].imgSrc
        }
      })
    },
    clickToDetail (row, column, event) {
      this.$router.push({path: '/main/ViewOrRenew/view2', query: {pid: row.Pid, name: row.name}})
    }
  }
}
</script>

<style scoped>
.theTable{
  cursor: pointer;  /*鼠标悬停变小手*/
}
</style>
