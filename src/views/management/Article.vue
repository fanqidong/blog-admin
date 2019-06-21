<template>
  <div class="page article-container">
    <section class="article-content">文章列表</section>
    <section class="article-table">
      <el-button @click="resetDateFilter">清除日期过滤器</el-button>
      <el-button @click="clearFilter">清除所有过滤器</el-button>
      <el-table ref="filterTable" :data="tableData" class="table-wrapper" style="width:100%">
        <el-table-column
          prop="date"
          label="开始日期"
          sortable
          width="180"
          column-key="date"
          :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
          :filter-method="filterHandler"
        ></el-table-column>
        <el-table-column
          prop="date"
          label="最后编辑日期"
          sortable
          width="180"
          column-key="date"
          :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
          :filter-method="filterHandler"
        ></el-table-column>
        <el-table-column prop="name" label="心情来源" width="180"></el-table-column>
        <el-table-column prop="address" label="心情内容" :formatter="formatter"></el-table-column>
        <el-table-column
          prop="tag"
          label="标签"
          :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.tag === '家' ? 'primary' : 'success'"
              disable-transitions
              v-for="(item, index) in scope.row.tag"
              :key="index"
            >{{item}}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '原创',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: ['家', '加']
        },
        {
          date: '2016-05-04',
          name: '原创',
          address: '上海市普陀区金沙江路 1517 弄',
          tag: '公司'
        },
        {
          date: '2016-05-01',
          name: '摘抄',
          address: '上海市普陀区金沙江路 1519 弄',
          tag: '家'
        },
        {
          date: '2016-05-03',
          name: '掘金',
          address: '上海市普陀区金沙江路 1516 弄',
          tag: '公司'
        }
      ]
    };
  },
  methods: {
    resetDateFilter() {
      this.$refs.filterTable.clearFilter('date');
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
</style>

