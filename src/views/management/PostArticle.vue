<template>
  <div class="page edit">
    <el-form :inline="true" :model="formData" ref="formName" class="edit-form">
      <section>
        <el-form-item label="文章标题：" prop="title">
          <el-input v-model="formData.title" placeholder="标题..." size="medium"></el-input>
        </el-form-item>
        <el-form-item label="文章简介：" prop="title">
          <el-input
            type="textarea"
            :rows="4"
            v-model="formData.desc"
            placeholder="介绍..."
            size="medium"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-form-item label="新增标签：" size="medium">
            <el-input v-model="tag" class="tag-input" clearable @keyup.enter="addTag"></el-input>
          </el-form-item>
        </el-form-item>
        <el-button
          circle
          type="primary"
          class="btn-plus"
          icon="el-icon-plus"
          size="medium"
          @click="addTag"
        ></el-button>
        <el-form-item v-show="formData.tagList.length" label="文章标签：" size="medium" prop="tagList">
          <el-tag
            class="tag-item"
            v-for="tag in formData.tagList"
            :key="tag.name"
            :type="tag.type"
            :disable-transitions="false"
            @close="deleteTag(tag)"
            closable
          >{{tag.name}}</el-tag>
        </el-form-item>
        <el-form-item label="封面图片：" class="poster-img" prop="posterUrl">
          <el-input v-model="formData.posterUrl" placeholder="支持图片上传、链接..." size="medium"></el-input>
          <i class="el-icon-upload icon-pic" @click="uploadImg"></i>
        </el-form-item>
        <el-button type="primary" class="btn-preview" round size="medium" @click="onImgChange">预览</el-button>
        <el-form-item v-show="previewImg">
          <input type="file" name="img" ref="uploadImg" @change="onPreviewImgChange" hidden>
          <div class="preview-img shadow">
            <img :src="previewImg" alt>
            <div class="preview-cover">
              <i class="el-icon-view" @click="previewBigImg" title="查看大图"></i>
              <i class="el-icon-delete" @click="deleteImg" title="删除图片"></i>
            </div>
          </div>
        </el-form-item>
      </section>
      <section class="md-edit">
        <mavon-editor
          v-model="formData.mdContent"
          placeholder="骚年，开始你的表演..."
          :boxShadow="false"
          :autofocus="false"
        />
      </section>
      <section class="btn-list">
        <el-button type="primary" @click="submitForm('public')" size="medium">公开发布</el-button>
        <el-button type="success" @click="submitForm('private')" size="medium">私密发布</el-button>
        <el-button type="warning" @click="resetForm('formName')" size="medium">重置</el-button>
      </section>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tag: '',
      previewImg: '',
      formData: {
        title: '',
        desc: '',
        tagList: [],
        mdContent: '',
        posterUrl: ''
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
    // 预览大图
    previewBigImg() {
      this.$alert(`<img src='${this.formData.previewImg}' alt>`, {
        dangerouslyUseHTMLString: true
      });
    },
    // 删除图片
    deleteImg() {
      this.formData.previewImg = '';
    },
    // button 模拟表单点击
    uploadImg() {
      this.$refs.uploadImg.click();
    },
    // 输入url显示图片
    onImgChange() {
      this.previewImg = this.formData.posterUrl;
    },
    // 图片预览
    onPreviewImgChange() {
      const file = this.$refs.uploadImg.files[0];
      if (!file.type.includes('image')) {
        this.$message.error('上传文件格式错误！');
        return;
      }
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = event => {
        this.previewImg = event.target.result;
      };
    },
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
        this.tag = '';
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
      if (!this.validateForm) {
        this.$message.error('你还有未填项哦~');
        return;
      }
      this.$message.success('正在提交~');
    },
    // 清空表单
    resetForm(formName) {
      Object.assign(this.$data, this.$options.data());
    }
  },
  watch: {}
};
</script>

<style lang="scss" scoped>
/deep/ .edit-form {
  .el-form-item__label {
    color: #000;
    font-weight: 700;
  }
}
/deep/ .v-note-wrapper {
  max-width: 100%;
  min-height: 600px;
}
/deep/.tag-item {
  margin-right: 10px;
  cursor: pointer;
}
/deep/ .el-message-box__wrapper {
  overflow-y: hidden;
}
.btn {
  &-list {
    padding-top: 20px;
  }
  &-upload {
    margin-right: 10px;
  }
  &-preview {
    margin-bottom: 20px;
  }
}
.preview-img {
  position: relative;
  border: 1px solid #eee;
  border-radius: 5px;
  img {
    width: 66px;
    height: 66px;
    border-radius: 5px;
  }
  .preview-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    line-height: 66px;
    text-align: center;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.6);
    i {
      color: #fff;
      font-size: 18px;
      cursor: pointer;
      margin: 0 6px;
      cursor: pointer;
    }
  }
  &:hover {
    .preview-cover {
      display: block;
    }
  }
}
/deep/.poster-img {
  position: relative;
  .icon-pic {
    position: absolute;
    right: 2px;
    top: 0;
    font-size: 36px;
    color: #4ba3fe;
  }
  input {
    padding-right: 40px;
  }
}
@media (min-width: 980px) {
  .btn-plus {
    margin-right: 10px;
  }
}
</style>

