<template>
  <div class="page article-container">
    <section class="article-content">文章列表</section>
    <section class="article-table">
      <el-button @click="resetDateFilter">清除日期过滤器</el-button>
      <el-button @click="clearFilter">清除所有过滤器</el-button>
      <el-table ref="filterTable" :data="tableData" class="table-wrapper" style="width:100%">
        <el-table-column
          prop="createdAt"
          label="创建日期"
          sortable
          column-key="createdAt"
          :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
          :filter-method="filterHandler"
           align="center"
        ></el-table-column>
        <el-table-column
          prop="updateAt"
          label="更新日期"
          sortable
          column-key="createdAt"
          :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
          :filter-method="filterHandler"
           align="center"
        ></el-table-column>
        <el-table-column prop="title" label="文章标题" width="180"></el-table-column>
        <el-table-column prop="address" label="文章内容"></el-table-column>
        <el-table-column
          prop="tag"
          label="标签"
          :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.tag === '家' ? 'success' : 'primary'"
              disable-transitions
              v-for="(item, index) in scope.row.tag"
              :key="index"
            >{{item}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="count" label="阅读量" width="80" ></el-table-column>
        <el-table-column prop="type" label="类型" width="80"></el-table-column>
        <el-table-column label="操作" fixed="right">
          <template slot-scope>
            <el-button type="primary" size="mini">修改</el-button>
            <el-button type="dange" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <section class="article-pagination">
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          type: '公开',
          count: 111,
          createdAt: '2019-04-19 22:53',
          updateAt: '2016-05-03 22:53',
          title: 'vue的响应式原理',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: ['Vue', 'JavaScript']
        },
        {
          type: '私密',
          count: 43,
          createdAt: '2016-05-12 22:53',
          updateAt: '2016-05-13 22:53',
          title: '你不知道的JavaScript',
          address: '上海市普陀区金沙江路 1517 弄',
          tag: ['node.js']
        },
        {
          type: '公开',
          count: 1111,
          createdAt: '2016-05-22 22:53',
          updateAt: '2016-05-23 22:53',
          title: 'vue.js权威指南',
          address: '上海市普陀区金沙江路 1519 弄',
          tag: ['css']
        },
        {
          type: '公开',
          count: 321,
          createdAt: '2016-06-02 22:53',
          updateAt: '2016-06-03 22:53',
          title: 'node.js 从入门到放弃',
          address: '上海市普陀区金沙江路 1516 弄',
          tag: ['es6']
        }
      ]
    };
  },
  methods: {
    resetDateFilter() {
      this.$refs.filterTable.clearFilter('createdAt');
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    formatter(row) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    }
  }
};
</script>

<style lang="scss" scoped>
.article {
  &-content {
    padding: 10px;
  }
}
/deep/ .el-tag {
  margin-right: 4px;
}
.article-pagination {
  padding: 20px 0;
  text-align: center;
}
</style>

