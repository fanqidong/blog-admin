<template>
  <div class="page edit">
    <el-button class="btn-add" type="primary" @click="isModifyShow = true">新增分类</el-button>
    <!-- 分类表格 -->
    <section class="category-table">
      <el-table border stripe empty-text :data="tableData" v-loading="loading" style="width: 100%" size="medium" :header-cell-style="{
            'background-color': '#ecf2fc',
            'color': '#323234',
            'text-align':'center',
            'font-size': '16px'
        }">
        <el-table-column prop="createAt" label="创建日期" width="170" align="center" :formatter="formatCreateTime"></el-table-column>
        <el-table-column prop="updateAt" label="更新日期" width="170" align="center" :formatter="formatUpdateTime"></el-table-column>
        <el-table-column prop="title" label="标题" width="150" align="center">
          <template slot-scope="scope">
            <a href="https://www.luckydong.cn/category" target="_blank">{{scope.row.title}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="desc" label="摘要" align="center"></el-table-column>
        <el-table-column prop="cover" label="封面" align="center" width="150">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>链接: {{ scope.row.cover }}</p>
              <div slot="reference" class="name-wrapper">
                <img :src="scope.row.cover" class="category-cover" alt />
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <!-- 编辑分类弹窗 -->
    <section class="category-edit">
      <el-dialog center width="480px" :title="isEdit? '编辑分类' :'新增分类'" :visible.sync="isModifyShow" :before-close="handleClose">
        <section class="category-form">
          <el-form :inline="true" :model="formData" :label-position="position" :label-width="formLabelWidth" ref="formName" class="edit-form" size="medium">
            <el-form-item label="分类标题：" prop="author">
              <el-input v-model="formData.title" placeholder="名称..." clearable></el-input>
            </el-form-item>
            <el-form-item label="分类封面：" class="poster-img" prop="cover">
              <el-input v-model="formData.cover" @input="checkImg" placeholder="支持图片上传、链接..." size="medium" clearable></el-input>
              <i class="el-icon-upload icon-pic" @click="uploadImg"></i>
            </el-form-item>
            <el-button v-show="formData.cover" type="primary" class="btn-preview" round @click="onImgChange">预览</el-button>
            <el-form-item v-show="previewImg" class="preview-img">
              <input type="file" name="img" ref="uploadImg" @change="onPreviewImgChange" hidden />
              <div class="preview-img shadow">
                <img :src="previewImg" alt />
                <div class="preview-cover">
                  <i class="el-icon-view" @click="previewBigImg" title="查看大图"></i>
                  <i class="el-icon-delete" @click="deleteImg" title="删除图片"></i>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="分类摘要：" prop="title">
              <el-input style="min-width:250px;" class="article-desc" type="textarea" :autosize="{ minRows: 6}" v-model="formData.desc" placeholder="分类摘要..." maxlength="50" show-word-limit></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="btn-list">
            <el-button type="primary" @click="submitForm" size="medium" v-if="!isEdit">添加</el-button>
            <el-button type="success" @click="handleUpdate" size="medium" v-else>更新</el-button>
            <el-button type="warning" @click="resetForm" size="medium">重置</el-button>
          </div>
        </section>
      </el-dialog>
    </section>
    <!-- 确认弹窗 -->
    <section>
      <el-dialog title="提示" :visible.sync="isConfirmShow" width="30%" :before-close="handleClose">
        <span>确认删除当前分类吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="isConfirmShow = false">取 消</el-button>
          <el-button type="primary" @click="confirmOk">确 定</el-button>
        </span>
      </el-dialog>
    </section>
  </div>
</template>

<script>
import { createCategory, queryCategory, updateCategory, deleteCategory } from '@/api/getData';
import dayjs from 'dayjs';
export default {
  name: 'Category',
  data() {
    return {
      loading: false,
      isEdit: false,
      previewImg: '',
      isModifyShow: false,
      isConfirmShow: false,
      formLabelWidth: '85px',
      position: 'right',
      tableData: [],
      rowId: '',
      createAt: '',
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
      if (!this.validateForm) {
        this.$message.error('你还有未填项哦~');
        return;
      }
      this.isModifyShow = false;
      this.handleCreate();
      this.resetForm();
    },
    // 清空表单
    resetForm() {
      this.previewImg = '';
      Object.assign(this.$data.formData, this.$options.data().formData);
    },
    // 编辑弹窗关闭
    handleClose(done) {
      done();
      this.resetForm();
      setTimeout(() => {
        this.isEdit = false;
      }, 300);
    },
    // 获取
    async handleQuery() {
      this.loading = true;
      const res = await queryCategory();
      if (res.code === 1) {
        this.tableData = res.data;
        this.loading = false;
        return;
      }
      this.$message.error(res.msg);
    },
    // 新增
    async handleCreate() {
      const params = {
        ...this.formData,
        createAt: Date.now()
      };
      const res = await createCategory(params);
      if (res.code === 1) {
        this.$message.success(res.msg);
        this.handleQuery();
        return;
      }
      this.$message.error(res.msg);
    },
    // 确认删除
    async confirmOk() {
      const res = await deleteCategory({ _id: this.rowId });
      if (res.code === 1) {
        this.$message.success(res.msg);
        this.handleQuery();
        this.isConfirmShow = false;
        return;
      }
      this.$message.error(res.msg);
    },
    // 删除
    handleDelete(row) {
      this.rowId = row._id;
      this.isConfirmShow = true;
    },
    // 编辑
    handleEdit(row) {
      this.isModifyShow = true;
      this.isEdit = true;
      this.rowId = row._id;
      this.createAt = row.createAt;
      this.formData.title = row.title;
      this.formData.desc = row.desc;
      this.formData.cover = row.cover;
    },
    // 更新
    async handleUpdate() {
      if (!this.validateForm) {
        this.$message.error('你还有未填项哦~');
        return;
      }
      let createAt = this.createAt;
      let params = { id: this.rowId, ...this.formData, createAt };
      const res = await updateCategory(params);
      if (res.code === 1) {
        this.handleQuery();
        this.resetForm();
        this.isModifyShow = false;
        this.$message.success(res.msg);
        return;
      }
      this.$message.error(res.msg);
    },
    formatCreateTime(row) {
      return dayjs(row.createAt).format('YYYY-MM-DD HH:mm:ss');
    },
    formatUpdateTime(row) {
      return dayjs(row.UpdateAt).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  created() {
    this.handleQuery();
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.category {
  &-cover {
    max-width: 80px;
    max-height: 60px;
  }
}
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
  &-add {
    margin: 10px 0 20px;
  }
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
  display: block;
  text-align: center;
  position: relative;
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

