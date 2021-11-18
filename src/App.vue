<template>
  <div id="app">
<!--    -&#45;&#45;原来的&#45;&#45;-->
<!--    <keep-alive :include="keepAliveComponents">-->
<!--      <router-view />-->
<!--    </keep-alive>-->
<!--    -&#45;&#45;原来的&#45;&#45;-->
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
  computed: {
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
