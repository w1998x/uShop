<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加菜单' : '编辑菜单'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancle"
    >
      <el-form :model="form" :rules="rules" ref="formDialog">

        <el-form-item
          prop="title"
          label="标题"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" :label-width="formLabelWidth">
          <!-- 
            el-upload  属性
            action	必选参数，上传的地址 
            list-type	文件列表的类型
            on-preview	点击文件列表中已上传的文件时的钩子
            on-remove	文件列表移除文件时的钩子
            auto-upload	是否在选取文件后立即进行上传
            on-change	文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
            file-list	上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]
            limit	最大允许上传个数
            on-exceed	文件超出个数限制时的钩子
            -->
          <el-upload
            list-type="picture-card"
            action="#"
            :auto-upload="false"
            :on-preview="onPreview"
            :on-remove="onRemove"
            :on-change="onChange"
            :file-list="fileList"
            :limit="1"
            :on-exceed="onExceed"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button
          v-if="addInfo.isAdd"
          @click="add('formDialog')"
          type="primary"
          >添 加</el-button
        >
        <el-button v-else @click="update('formDialog')" type="primary"
          >编 辑</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
//引入封装好的接口
import { getBannerAdd, getBannerInfo, getBannerEdit } from "../../util/axios";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      formLabelWidth: "120px",
      form: {
        id: 0, //分类编号
        title: "", //轮播图名称
        img: "", //图片(文件，一般用于二级分类)
        status: 1, //状态1正常2禁用
      },
      rules: {
        title: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ]
      },
      dialogImageUrl: "",
      dialogVisible: false,
      imgUrl: "",
      fileList: [], //文件上传列表
    };
  },
  computed: {
    ...mapGetters({
      bannerList: "banner/getBannerList",
    }),
  },
  props: ["addInfo"],
  methods: {
    ...mapActions({
      getBannerList: "banner/getBannerListAction",
    }),
    reset() {
      this.form = {
        id: 0, //分类编号
        title: "", //轮播图名称
        img: "", //图片(文件，一般用于二级分类)
        status: 1, //状态1正常2禁用
      };
    },
    cancle() {
      this.$emit("cancle", false);
      this.reset();
    },
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //form表单提交时，有文件上传，要用FormData
          //把普通的表单改成FormData形式
          let data = this.form;
          let file = new FormData();
          //必须通过append添加属性
          for (let i in data) {
            file.append(i, data[i]);
          }
          //添加img参数
          file.append("img", this.imgUrl);
          getBannerAdd(file)
            .then((res) => {
              if (res.data.code == 200) {
                this.$message.success(res.data.msg);
                this.cancle();
                this.getBannerList();
              } else {
                this.$message.error(res.data.msg);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //图片上传触发的函数
    onChange(file) {
      // console.log(file);
      this.imgUrl = file.raw;
    },
    changeMenu() {
      if (this.form.pid === 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
    //查看一条数据事件
    look(id) {
      // console.log(id);

      getBannerInfo({ id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          //当前表单中没有id，创建一个id，给编辑按钮用
          this.form.id = id;
          //图片格式转换
          this.fileList = this.form.img
            ? [{ url: `${this.$imgUrl}${this.form.img} ` }]
            : [];
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = this.form;
          let file = new FormData();
          for (let i in data) {
            file.append(i, data[i]);
          }
          //如果新传了图片，this.imgUrl就有值，就赋值给this.imgUrl，如果没有新添加的图片，就用上一次的图片
          this.imgUrl = this.imgUrl ? this.imgUrl : this.form.img;
          file.append("img", this.imgUrl);

          getBannerEdit(file)
            .then((res) => {
              if (res.data.code == 200) {
                this.$message.success(res.data.msg);
                this.cancle();
                this.getBannerList();
              } else {
                this.$message.error(res.data.msg);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    onPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    onRemove(file, fileList) {},
    onExceed(files, fileList){
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      }
    }
 
};
</script>

<style lang="" scoped>
</style>
