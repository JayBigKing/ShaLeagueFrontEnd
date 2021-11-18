<template>
    <div>
        <el-card class="crumbs-card">
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/main/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/main/first' }">图书列表</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </el-card>
        <el-card class="container">
            图书列表
            <el-table
                    :data="books"
                    style="width: 100%">
                <el-table-column
                        prop="id"
                        label="id"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="书名"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="author"
                        label="作者"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="price"
                        label="价格">
                </el-table-column>
            </el-table>

            <div class="block">
                <span class="demonstration">完整功能</span>
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="100"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="400">
                </el-pagination>
            </div>

        </el-card>
    </div>
</template>

<script>
import { _getBookList } from '@api/api'
export default {
  name: 'BookList',
  data () {
    return {
      books: []
    }
  },
  created () {
    this.getBook()
  },
  methods: {
    getBook () {
      _getBookList().then(res => {
        this.books = res.data
      })
    }
  }
}
</script>

<style scoped>

</style>
