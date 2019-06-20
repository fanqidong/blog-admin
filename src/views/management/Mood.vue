<template>
  <div class="page mood">
    <section class="mood-edit">
      <el-form :label-position="labelPosition" label-width="100px" :model="formData" ref="formName">
        <el-form-item label="心情标签：" size="medium" prop="tag">
          <el-input v-model="formData.tag" class="tag-input" clearable></el-input>
          <el-button type="primary" icon="el-icon-plus" circle @click="addTag"></el-button>
        </el-form-item>
        <el-form-item v-if="formData.tagList.length">
          <el-tag
            class="tag-item"
            v-for="(tag,index) in formData.tagList"
            :key="tag.name"
            :type="tag.type"
            @click="deleteTag(index)"
          >{{tag.name}}</el-tag>
        </el-form-item>
        <el-form-item label="心情来源：" size="medium" prop="region">
          <el-input v-model="formData.origin" clearable></el-input>
        </el-form-item>
        <el-form-item label="心情内容：" size="medium" prop="type">
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
  name: 'Mood',
  data() {
    return {
      labelPosition: 'right',
      formData: {
        tag: '',
        tagList: [],
        origin: '',
        content: ''
      },
      formRule: [
        {
          type: 'tags',
          desc: '标签呢~'
        },
        {
          type: 'content',
          desc: '内容呢~'
        }
      ]
    }
  },
  methods: {
    // 新增标签
    addTag() {
      const colorArr = ['', 'success', 'info', 'warning', 'danger']
      const tagType = colorArr[Math.floor(Math.random() * colorArr.length)]
      let { tag, tagList } = this.formData
      if (!tag.length) {
        this.$message.error('请勿添加空标签！')
        return
      }
      if (tagList.length >= 3) {
        this.$message.error('最多可添加3个标签')
        tag = ''
        return
      }
      if (tagList.some(val => val.name === tag)) {
        this.$message.error('请勿重复添加标签！')
        return
      }
      tagList.push({ name: tag, type: tagType })
      tag = ''
    },
    // 删除标签
    deleteTag(index) {
      this.tagList.splice(index, 1)
    },
    // 表单提交
    submitForm() {
      this.formRule.forEach(rule => {
        if (!this.formData[rule.type].length) {
          this.$message({
            type: 'success',
            msg: rule.desc
          })
        }
      })
    },
    // 表单重置
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.formData.tagList = []
    }
  }
}
</script>

<style lang="scss" scoped>
.mood {
  color: #333;
  &-edit {
    max-width: 500px;
    padding: 20px;
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
}
</style>

