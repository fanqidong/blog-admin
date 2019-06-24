<template>
  <div class="page mood">
    <section class="mood-edit">
      <el-form :label-position="labelPosition" label-width="90px" :model="formData" ref="formName">
        <el-form-item label="新增标签：" size="medium">
          <el-input v-model="tag" class="tag-input" clearable></el-input>
          <el-button type="primary" icon="el-icon-plus" circle @click="addTag"></el-button>
        </el-form-item>
        <el-form-item v-show="formData.tagList.length" label="心情标签：" size="medium" prop="tagList">
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
        <el-form-item label="心情来源：" size="medium" prop="origin">
          <el-input v-model="formData.origin" clearable></el-input>
        </el-form-item>
        <el-form-item label="心情内容：" size="medium" prop="content">
          <el-input
            type="textarea"
            :autosize="{ minRows: 6}"
            placeholder="有什么要说的吗？"
            v-model="formData.content"
          ></el-input>
        </el-form-item>
        <el-form-item size="medium" class="btn-list">
          <el-button type="primary" icon="el-icon-thumb" round @click="submitForm">提交</el-button>
          <el-button type="warning" icon="el-icon-refresh" round @click="resetForm('formName')">重置</el-button>
        </el-form-item>
      </el-form>
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
        tagList: [],
        origin: '',
        content: ''
      },
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
  .mood{
    &-edit{
      width: 100%;
    }
  }
}
</style>

