<template>
  <div class="page tag">
    <section class="tag-edit">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" :label-position="labelPosition" label-width="100px">
        <el-form-item label="新增标签：" size="medium" prop="tagName">
          <el-input v-model="ruleForm.tagName" size="medium" class="tag-input" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" icon="el-icon-plus" @click="submitForm('ruleForm')">添加</el-button>
        </el-form-item>
        <el-form-item v-show="ruleForm.tagList.length" label="文章标签：" size="medium" prop="tagList">
          <el-tag class="tag-item" v-for="tag in ruleForm.tagList" :key="tag.name" :type="tag.type" :disable-transitions="false" closable @close="deleteTag(tag)">{{tag.name}}</el-tag>
        </el-form-item>
      </el-form>
    </section>
    <section class="article-table">
      <el-table ref="filterTable" empty-text :data="tableData" class="table-wrapper" style="width:100%" :header-cell-style="{
            'background-color': '#ecf2fc',
            'color': '#323234',
            'text-align':'center',
            'font-size': '16px'
        }">
        <el-table-column type="selection" width="50" align="center"></el-table-column>
        <el-table-column prop="createdAt" label="创建日期" width="150" column-key="createdAt" align="center" sortable></el-table-column>
        <el-table-column prop="updateAt" label="更新日期" width="150" column-key="createdAt" align="center" sortable></el-table-column>
        <el-table-column prop="author" label="作者" width="100" align="center"></el-table-column>
        <el-table-column prop="tag" label="标签" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.tag === '家' ? 'success' : 'primary'" disable-transitions v-for="(item, index) in scope.row.tag" :key="index">{{item}}</el-tag>
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
import { createTag } from '@/api/getData';
export default {
  data() {
    return {
      labelPosition: 'left',
      rules: {
        tagName: [
          { required: true, message: '请输入标签名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ]
      },
      ruleForm: {
        tagName: '',
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
  methods: {
    // 新增标签
    addTag() {
      const colorArr = ['', 'success', 'info', 'warning', 'danger'];
      const tagType = colorArr[Math.floor(Math.random() * colorArr.length)];
      let { tagName, tagList } = this.ruleForm;
      tagList.push({ name: tagName, type: tagType });
      this.ruleForm.tagName = '';
    },
    // 删除标签
    deleteTag(tag) {
      let tagList = this.ruleForm.tagList;
      tagList.splice(tagList.indexOf(tag), 1);
    },
    // 新增
    async handleCreate() {
      const params = {
        ...this.formData,
        createAt: Date.now()
      };
      const res = await createTag(params);
      if (res.code === 1) {
        this.$message.success(res.msg);
        this.handleQuery();
        return;
      }
      this.$message.error(res.msg);
    },
    // 表单提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return;
        }
        this.addTag();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.tag {
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
  .tag {
    &-edit {
      width: 100%;
    }
  }
}
</style>
