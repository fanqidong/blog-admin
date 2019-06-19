<template>
  <div class="page mood">
    <section class="mood-edit">
      <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
        <el-form-item label="心情标签：" size="medium">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域：" size="medium">
          <el-input v-model="formLabelAlign.region"></el-input>
        </el-form-item>
        <el-form-item label="心情内容：" size="medium">
          <el-input
            type="textarea"
            :autosize="{ minRows: 6}"
            placeholder="有什么要说的吗？"
            v-model="formLabelAlign.type"
          ></el-input>
        </el-form-item>
        <el-form-item size="medium">
          <el-button type="primary">提交</el-button>
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
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      }
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
  }
}
</style>

