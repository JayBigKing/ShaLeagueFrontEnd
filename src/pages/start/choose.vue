<template>
  <div class="choose">
    <div class="buttonList">
      <div class="button1">
    <Button type="success" size="large" v-on:click="toShaLeague()">杀超联赛</Button>
      </div>
    <Button type="info" size="large" v-on:click="toOthers()">其他Jay空间</Button>
    </div>
  </div>
</template>

<script>
import globalVar from '../../global'
import { _getUserInfo } from '@api/user'
export default {
  name: 'choose',
  created () {
    _getUserInfo().then(res => {
      console.info(res)
      if (res.data.id === globalVar.errorSessionId) {
        this.$Notice.warning({
          title: 'Notification title',
          desc: 'Session 失效',
          duration: 2
        })
        var timer
        clearTimeout(timer) // 清除延迟执行

        timer = setTimeout(() => { // 设置延迟执行
        }, 1000)
        this.$router.push('/start/admit')
      }
    })
  },
  data () {
    return {
      activeName: '1',
      testImg: 'http://127.0.0.1:7899/img/202111/-a9268a8bc16e425db56db70687d4e7a6.jpg'
    }
  },
  methods: {
    toShaLeague () {
      this.$router.push('/main')
    },
    toOthers () {
      this.$Message.warning('暂时没有')
    }
  }
}
</script>

<style>
.buttonList{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.button1{
  padding-bottom: 20px;
}
</style>
