<template>
  <div id="app">
    <!--    原来的-->
<!--    <keep-alive :include="keepAliveComponents">-->
<!--      <router-view />-->
<!--    </keep-alive>-->
    <!--    原来的-->
    <router-view v-if="isRouterAlive"></router-view>

  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  provide () {
    // 原来没有provide
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      // 原来return为空
      isRouterAlive: true
    }
  },
  computed: { // 原来的
    ...mapState({
      keepAliveComponents: state => state.routecache.keepAliveComponents
    })
  },
  methods: {
    // 原来没有methods
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }

}
</script>
