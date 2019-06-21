<template>
  <div class="page edit">
    <el-form :inline="true" :model="formData" class="edit-form">
      <el-form-item label="文章标题：">
        <el-input v-model="formData.title" placeholder="标题..." size="medium"></el-input>
      </el-form-item>
      <el-form-item>
        <el-form-item label="新增标签：" size="medium">
          <el-input v-model="tag" class="tag-input" clearable></el-input>
        </el-form-item>
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
    </el-form>
    <section class="md-edit">
      <mavon-editor v-model="formData.mdContent" placeholder="骚年，开始你的表演..." :boxShadow="false"/>
    </section>
    <section class="btn-list">
      <el-button type="primary" @click="submitForm('public')" size="medium">公开发布</el-button>
      <el-button type="success" @click="submitForm('private')" size="medium">私密发布</el-button>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tag: '',
      formData: {
        title: '',
        tagList: [],
        mdContent: ''
      }
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
    submitForm(type) {
      console.log(type);
      if (!this.validateForm) {
        this.$message.error('你还有未填项哦~');
        return;
      }
      this.$message.error('正在提交~');
    }
  },
  watch: {}
};
</script>

<style lang="scss" scoped>
/deep/ .edit-form {
  .el-form-item__label {
    color: #000;
  }
}
/deep/ .v-note-wrapper {
  max-width: 100%;
  min-height: 600px;
}
/deep/.tag-item {
  margin-right: 10px;
}
.btn-list {
  padding-top: 20px;
}
</style>

