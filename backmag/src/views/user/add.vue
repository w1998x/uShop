<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加管理员' : '修改管理员'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancle"
    >
      <el-form :model="form" :rules="rules">
        <el-form-item
          label="所属角色"
          :label-width="formLabelWidth"
          prop="roleid"
        >
          <el-select v-model="form.roleid" placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="管理员名称"
          :label-width="formLabelWidth"
          prop="username"
        >
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.password" autocomplete="off"></el-input>
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
        <el-button @click="add" v-if="addInfo.isAdd" type="primary"
          >添 加</el-button
        >
        <el-button @click="update" v-else type="primary">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getUserInfo,getUserAdd,getUserEdit } from "../../util/axios";
export default {
  data() {
    return {
      formLabelWidth: "120px",
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        roleid: [
          { required: true, message: "请选择所属角色", trigger: "blur" },
        ],
      },
    };
  },
  props: ["addInfo"],
  computed: {
    ...mapGetters({
      roleList: "role/getRoleList",
      userList:"user/getUserList",
   }),
  },
  mounted() {
    if (this.roleList.length == 0) {
      this.getRoleList();
    }
  },
  methods: {
    ...mapActions({
      getRoleList: "role/getRoleListAction",
      getUserList:"user/getUserListAction",
      getUserCount:"user/getUserCountAction"
    }),
    reset() {
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
    },
    cancle() {
      this.addInfo.isShow = false;
      this.reset();
    },

    add() {
      getUserAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getUserList();
          this.getUserCount()
          this.cancle();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    look(uid) {
      getUserInfo({ uid }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.uid = uid;
        }
      });
    },
    update() {
      // console.log(this.form);
      getUserEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getUserList();
          this.getUserCount()
          this.cancle();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
  },
};
</script>

<style lang="" scoped>
</style>
