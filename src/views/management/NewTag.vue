<template>
  <div class="page mood">
    <section class="mood-edit">
      <el-form :label-position="labelPosition" label-width="90px" :model="formData" ref="formName">
        <el-form-item label="新增标签：" size="medium">
          <el-input v-model="tag" class="tag-input" clearable></el-input>
          <el-button type="primary" icon="el-icon-plus" circle @click="addTag"></el-button>
        </el-form-item>
        <el-form-item v-show="formData.tagList.length" label="文章标签：" size="medium" prop="tagList">
          <el-tag
            class="tag-item"
            v-for="tag in formData.tagList"
            :key="tag.name"
            :type="tag.type"
            :disable-transitions="false"
            closable
            @close="deleteTag(tag)"
          >{{tag.name}}</el-tag>
        </el-form-item>
        <el-form-item size="medium" class="btn-list">
          <el-button type="primary" icon="el-icon-plus" round @click="submitForm">新增</el-button>
          <el-button type="warning" icon="el-icon-refresh" round @click="resetForm('formName')">重置</el-button>
        </el-form-item>
      </el-form>
    </section>
    <section class="article-table">
      <el-table
        ref="filterTable"
        empty-text
        :data="tableData"
        class="table-wrapper"
        style="width:100%"
        :header-cell-style="{
            'background-color': '#ecf2fc',
            'color': '#323234',
            'text-align':'center',
            'font-size': '16px'
        }"
      >
        <el-table-column type="selection" width="50" align="center"></el-table-column>
        <el-table-column
          prop="createdAt"
          label="创建日期"
          width="150"
          column-key="createdAt"
          :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
          :filter-method="filterHandler"
          align="center"
          sortable
        ></el-table-column>
        <el-table-column
          prop="updateAt"
          label="更新日期"
          width="150"
          column-key="createdAt"
          :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
          :filter-method="filterHandler"
          align="center"
          sortable
        ></el-table-column>
        <el-table-column prop="author" label="作者" width="100" align="center"></el-table-column>
        <el-table-column
          prop="tag"
          label="标签"
          :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
          align="center"
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
        <el-table-column label="操作" fixed="right" align="center">
          <template slot-scope>
            <el-button type="primary" size="mini">编辑</el-button>
            <el-button type="danger" size="mini">删除</el-button>
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
      labelPosition: 'right',
      tag: '',
      formData: {
        tagList: []
      },
      tableData: [
        {
          type: '公开',
          count: 111,
          createdAt: '2019-04-19 22:53',
          updateAt: '2016-05-03 22:53',
          title: 'vue的响应式原理',
          author: '樊启东',
          tag: ['Vue']
        },
        {
          type: '私密',
          count: 43,
          createdAt: '2016-05-12 22:53',
          updateAt: '2016-05-13 22:53',
          title: '你不知道的JavaScript',
          author: '樊启东',
          tag: ['node.js']
        },
        {
          type: '公开',
          count: 1111,
          createdAt: '2016-05-22 22:53',
          updateAt: '2016-05-23 22:53',
          title: 'vue.js权威指南',
          author: '樊启东',
          tag: ['css']
        },
        {
          type: '公开',
          count: 321,
          createdAt: '2016-06-02 22:53',
          updateAt: '2016-06-03 22:53',
          title: 'node.js 从入门到放弃',
          author: '樊启东',
          tag: ['es6']
        },
        {
          type: '公开',
          count: 321,
          createdAt: '2016-06-02 22:53',
          updateAt: '2016-06-03 22:53',
          title: 'node.js 从入门到放弃',
          author: '樊启东',
          tag: ['es6']
        }
      ]
    };
  },
  computed: {
    // 表单验证
    validateForm() {
      return Object.keys(this.formData).every(val => this.formData[val].length > 0);
    }
  },
  methods: {
    // 新增标签
    addTag() {
      const colorArr = ['', 'success', 'info', 'warning', 'danger'];
      const tagType = colorArr[Math.floor(Math.random() * colorArr.length)];
      let { tagList } = this.formData;
      if (!this.tag.length) {
        this.$message.error('请勿添加空标签！');
        return;
      }
      if (tagList.length >= 3) {
        this.$message.error('最多可添加3个标签');
        return;
      }
      if (tagList.some(val => val.name === this.tag)) {
        this.$message.error('请勿重复添加标签！');
        return;
      }
      tagList.push({ name: this.tag, type: tagType });
      this.tag = '';
    },
    // 删除标签
    deleteTag(tag) {
      let tagList = this.formData.tagList;
      tagList.splice(tagList.indexOf(tag), 1);
    },
    // 表单提交
    submitForm() {
      if (!this.validateForm) {
        this.$message.error('你还有未填项哦~');
        return;
      }
    },
    // 表单重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.tag = '';
    },
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
.mood {
  color: #333;
  &-edit {
    width: 550px;
    .tag-input {
      width: 86%;
      margin-right: 10px;
    }
    .tag-item {
      margin-right: 10px;
    }
    /deep/ .el-form-item__label {
      color: #000;
    }
  }
  &-table {
    width: 1200px;
    margin: auto;
  }
}
@media (max-width: 980px) {
  .mood {
    &-edit {
      width: 100%;
    }
  }
}
</style>
