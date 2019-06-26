<template>
  <div class="page edit">
    <el-form
      :inline="true"
      :model="formData"
      :label-position="position"
      :label-width="formLabelWidth"
      ref="formName"
      class="edit-form"
      size="medium"
    >
      <section>
        <el-form-item label="分类名称：" prop="author">
          <el-input v-model="formData.title" placeholder="名称..."></el-input>
        </el-form-item>
        <el-form-item label="封面：" class="poster-img" prop="cover">
          <el-input
            v-model="formData.cover"
            @input="checkImg"
            placeholder="支持图片上传、链接..."
            size="medium"
          ></el-input>
          <i class="el-icon-upload icon-pic" @click="uploadImg"></i>
        </el-form-item>
        <el-button
          v-show="formData.cover"
          type="primary"
          class="btn-preview"
          round
          @click="onImgChange"
        >预览</el-button>
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
        <el-form-item label="分类摘要：" prop="title" style="display:block;">
          <el-input
            style="min-width:200px;"
            class="article-desc"
            type="textarea"
            :autosize="{ minRows: 6}"
            v-model="formData.desc"
            placeholder="分类摘要..."
            maxlength="50"
            show-word-limit
          ></el-input>
        </el-form-item>
      </section>
      <section class="btn-list">
        <el-button type="primary" @click="submitForm('public')" size="medium">提交</el-button>
        <el-button type="warning" @click="resetForm('formName')" size="medium">重置</el-button>
      </section>
    </el-form>
  </div>
</template>

<script>
import { getCategory } from '@/api/getData';

export default {
  data() {
    return {
      previewImg: '',
      formLabelWidth: '85px',
      position: 'left',
      formData: {
        title: '',
        desc: '',
        cover: ''
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
      this.$alert(`<img src='${this.previewImg}' alt>`, {
        dangerouslyUseHTMLString: true
      });
    },
    // 删除图片
    deleteImg() {
      this.previewImg = '';
    },
    // button 模拟表单点击
    uploadImg() {
      this.$refs.uploadImg.click();
    },
    checkImg() {
      !this.formData.cover && (this.previewImg = '');
    },
    // 输入url显示图片
    onImgChange() {
      this.previewImg = this.formData.cover;
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
    submitForm() {
      this.handleCategory();
      //   console.log(type);
      //   if (!this.validateForm) {
      //     this.$message.error('你还有未填项哦~');
      //     return;
      //   }
      //   this.$message.success('正在提交~');
    },
    // 清空表单
    resetForm() {
      Object.assign(this.$data, this.$options.data());
    },
    async handleCategory() {
      let res = await getCategory(this.formData);
      console.log(res);
      //   if (res.code === 1) {
      //     this.$message.success('登录成功');
      //     this.isLoading = false;
      //     this.$router.replace({
      //       path: '/admin'
      //     });
      //     return;
      //   }
      //   this.$message.error(res.msg);
    }
  },
  mounted() {},
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
  min-height: 400px;
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
    margin: 0 20px 20px 0;
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
/deep/.article {
  &-desc {
    textarea {
      resize: none;
    }
  }
}
@media (min-width: 980px) {
  .btn-plus {
    margin-right: 10px;
  }
}
</style>

