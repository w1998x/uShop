<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd?'添加菜单':'编辑菜单'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancle"
    >
      <el-form :model="form" :rules="rules" ref="formDialog">
        <el-form-item
          prop="title"
          label="菜单名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="pid" label="上级菜单" :label-width="formLabelWidth">
          <el-select
            v-model="form.pid"
            placeholder="请选择"
            @change="changeMenu"
          >
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in menuList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" :label-width="formLabelWidth">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>
        <el-form-item
          label="菜单图标"
          :label-width="formLabelWidth"
          v-if="form.type === 1"
        >
          <el-select v-model="form.icon" placeholder="请选择">
            <el-option
              v-for="item in iconList"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" :label-width="formLabelWidth" v-else>
          <!-- <el-input v-model="form.url" autocomplete="off"></el-input> -->
          <el-select v-model="form.url" placeholder="请选择">
            <el-option
              v-for="item in indexRoutes"
              :key="item.path"
              :label="item.name"
              :value="item.path"
            >
            </el-option>
          </el-select>
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
        <el-button v-if="addInfo.isAdd" @click="add('formDialog')" type="primary">添 加</el-button>
        <el-button v-else @click="update('formDialog')" type="primary">编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//引入封装好的接口
import { getMenuAdd ,getMenuInfo,getMenuEdit} from "../../util/axios";
import { mapActions, mapGetters } from "vuex";
import { indexRoutes } from "../../router";
export default {
  data() {
    return {
      formLabelWidth: "120px",
      indexRoutes: indexRoutes,
      form: {
        pid: 0, //上级分类编号
        titel: "", //标题
        icon: "", //图标
        type: 1, //类型1目录2菜单
        url: "", //菜单地址
        status: 1, //状态1正常2禁用
      },
      rules: {
        title: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        pid: [{ required: true, message: "请选择上级名称", trigger: "blur" }],
      },
      iconList: [
        "el-icon-s-tools",
        "el-icon-setting",
        "el-icon-s-goods",
        "el-icon-goods",
        "el-icon-menu",
      ],
    };
  },
  computed: {
    ...mapGetters({
      menuList: "menu/getMenuList",
    }),
  },
  props: ["addInfo"],
  methods: {
    ...mapActions({
      getMenuList: "menu/getMenuListAction",
    }),
    reset() {
      this.form = {
        pid: 0, //上级分类编号
        titel: "", //标题
        icon: "", //图标
        type: 1, //类型1目录2菜单
        url: "", //菜单地址
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
          getMenuAdd(this.form)
            .then((res) => {
              if (res.data.code == 200) {
                this.$message.success(res.data.msg);
                this.cancle();
                this.getMenuList();
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
    changeMenu() {
      if (this.form.pid === 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
    //查看一条数据事件
    look(id){
      // console.log(id);
      getMenuInfo({id})
      .then(res=>{
        if(res.data.code==200){
          this.form=res.data.list
          //当前表单中没有id，创建一个id，给编辑按钮用
          this.form.id = id
        }else{
          this.$message.error(res.data.msg)
        }
      })
    },
     update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          getMenuEdit(this.form)
            .then((res) => {
              if (res.data.code == 200) {
                this.$message.success(res.data.msg);
                this.cancle();
                this.getMenuList();
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
  },
};
</script>

<style lang="" scoped>
</style>
