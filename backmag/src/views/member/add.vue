<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加管理员' : '修改会员'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancle"
    >
      <el-form :model="form" :rules="rules">
        <el-form-item
          label="手机号"
          :label-width="formLabelWidth"
          prop="phone"
        >
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="昵称"
          :label-width="formLabelWidth"
          prop="nickname"
        >
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
          <p>留空则不修改</p>
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
        <el-button @click="update"  type="primary">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getMemberInfo, getMemberEdit } from "../../util/axios";
export default {
  data() {
    return {
      formLabelWidth: "120px",
      form: {
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      },
      rules: {
        nickname: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请选择所属角色", trigger: "blur" },
        ],
      },
    };
  },
  props: ["addInfo"],
  computed: {
    ...mapGetters({
      memberList: "member/getMemberList",
    }),
  },
  methods: {
    ...mapActions({
      getMemberList: "member/getMemberListAction",
    }),
    reset() {
      this.form = {
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      };
    },
    cancle() {
      this.addInfo.isShow = false;
      this.reset();
    },
    look(uid) {
      getMemberInfo({ uid }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.uid = uid;
        }
      });
    },
    update() {
      // console.log(this.form);
      getMemberEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getMemberList();
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
