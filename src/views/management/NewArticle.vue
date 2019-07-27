<template>
  <div class="page edit">
    <el-form :inline="true" :model="formData" :label-position="position" :label-width="formLabelWidth" ref="formName" class="edit-form" size="medium">
      <section>
        <el-form-item label="作者：" prop="author">
          <el-input v-model="formData.author" placeholder="作者..."></el-input>
        </el-form-item>
        <el-form-item label="标题：" prop="title">
          <el-input v-model="formData.title" placeholder="标题..."></el-input>
        </el-form-item>
        <el-form-item label="分类：" prop="tag">
          <el-select v-model="formData.category" multiple placeholder="请选择..." size="small">
            <el-option v-for="item in categoryOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签：" prop="tag">
          <el-select v-model="formData.tag" multiple placeholder="请选择..." size="small">
            <el-option v-for="item in tagOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="封面：" class="poster-img" prop="cover">
          <el-input v-model="formData.cover" @input="checkImg" placeholder="支持图片上传、链接..." size="medium"></el-input>
          <i class="el-icon-upload icon-pic" @click="uploadImg"></i>
        </el-form-item>
        <el-button v-show="formData.cover" type="primary" class="btn-preview" round @click="onImgChange">预览</el-button>
        <el-form-item v-show="previewImg">
          <input type="file" name="img" ref="uploadImg" @change="onPreviewImgChange" hidden />
          <div class="preview-img shadow">
            <img :src="previewImg" alt />
            <div class="preview-cover">
              <i class="el-icon-view" @click="previewBigImg" title="查看大图"></i>
              <i class="el-icon-delete" @click="deleteImg" title="删除图片"></i>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="摘要：" prop="title" style="display:block;">
          <el-input style="min-width:200px;" class="article-desc" type="textarea" :autosize="{ minRows: 6}" v-model="formData.desc" placeholder="文章摘要..." maxlength="50" show-word-limit></el-input>
        </el-form-item>
      </section>
      <section class="btn-list fixed">
        <el-button type="primary" @click="submitForm('public')" size="medium">公开发布</el-button>
        <el-button type="success" @click="submitForm('private')" size="medium">私密发布</el-button>
        <el-button type="warning" @click="resetForm('formName')" size="medium">重置</el-button>
      </section>
      <section class="md-edit">
        <mavon-editor v-model="formData.mdContent" placeholder="骚年，开始你的表演..." :boxShadow="false" :autofocus="false" />
      </section>
    </el-form>
  </div>
</template>

<script>
import { newArticle, queryCategory } from '@/api/getData';
export default {
  data() {
    return {
      previewImg: '',
      formLabelWidth: '60px',
      position: 'left',
      formData: {
        author: '',
        category: [],
        title: '',
        desc: '',
        cover: '',
        mdContent: '',
        tag: [],
        htmlContent: ''
      },
      tagOptions: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      categoryOptions: []
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
    // 表单提交
    async submitForm(type) {
      const html = document.getElementsByClassName('v-show-content-html')[0].innerText;
      this.formData.htmlContent = html;
      if (!this.validateForm) {
        this.$message.error('你还有未填项哦~');
        return;
      }
      const params = {
        ...this.formData,
        readCount: 0,
        state: type,
        createAt: new Date(),
        updateAt: new Date()
      };
      const res = await newArticle(params);
      if (res.code === 1) {
        this.$message.success(res.msg);
        return;
      }
      this.$message.error(res.msg);
    },
    // 清空表单
    resetForm() {
      Object.assign(this.$data, this.$options.data());
    },
    // 获取分类列表
    async getCategories() {
      try {
        const res = await queryCategory();
        res.data.forEach(item => {
          this.categoryOptions.push({
            label: item.title,
            value: item._id
          });
        });
      } catch (error) {
        console.log(error);
      }
    }
  },
  created() {
    this.getCategories();
  }
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
    padding: 20px 0;
    &.fixed {
      position: fixed;
      right: 20px;
      bottom: 0px;
      z-index: 9999;
    }
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

