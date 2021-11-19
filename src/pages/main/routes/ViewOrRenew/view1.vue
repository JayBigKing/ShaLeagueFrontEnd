<template>
  <div>
    <Row>
      <Col span="12" style="padding-right:10px">
        <Select
            v-model="model13"
            filterable
            :remote-method="remoteMethod1"
            :loading="loading1">
          <Option v-for="(option, index) in options1" :value="option" :key="index" >{{option.name}}</Option>
        </Select>
      </Col>
    </Row>
    <Button type="primary" icon="ios-search" v-on:click="searchThePlayer()">查询</Button>
  </div>
</template>

<script>
export default {
  name: 'view1',
  created () {
    this.$axios.get('/api/player/getByName', {params: {
      name: ''
    }}
    ).then(res => {
      this.options1 = res.data.data.data
    })
  },
  data () {
    return {
      model13: '',
      loading1: false,
      options1: []
    }
  },
  methods: {
    remoteMethod1 (query) {
      if (query !== '') {
        this.loading1 = true
        this.$axios.get('/api/player/getByName', {params: {
          name: query
        }}
        ).then(res => {
          this.loading1 = false
          this.options1 = res.data.data.data
        })
      } else {
        this.options1 = []
      }
    },
    searchThePlayer () {
      this.$router.push({path: '/main/ViewOrRenew/view2', query: {pid: this.model13.pid, name: this.model13.name}})
    }
  }

}
</script>
