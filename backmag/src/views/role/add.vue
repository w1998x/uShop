<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加角色' : '修改角色'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancle"
    >
      <el-form :model="form" :rules="rules">
        <el-form-item
          label="角色名称"
          :label-width="formLabelWidth"
          prop="rolename"
        >
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <el-tree
            :data="getMenu"
            show-checkbox
            node-key="id"
            ref="tree"
            default-expand-all
            :props="{
              children: 'children',
              label: 'title',
            }"
            check-strictly
          >
          </el-tree>
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
import { getRoleAdd, getRoleInfo, getRoleEdit } from "../../util/axios";
export default {
  data() {
    return {
      formLabelWidth: "120px",
      form: {
        rolename: "",
        menus: "",
        status: 1,
      },
      rules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
    };
  },
  props: ["addInfo"],
  computed: {
    ...mapGetters({
      getMenu: "menu/getMenuList",
    }),
  },
  mounted() {
    if (this.getMenu.length > 0) {
      this.menuList();
    }
  },
  methods: {
    reset() {
      this.form = {
        rolename: "",
        status: 1,
      };
      this.$refs.tree.setCheckedKeys([]);
    },
    cancle() {
      this.addInfo.isShow = false;
      this.reset();
    },
    ...mapActions({
      menuList: "menu/getMenuListAction",
      roleList: "role/getRoleListAction",
    }),
    add() {
      // this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      this.form.menus = this.$refs.tree.getCheckedKeys().join(",");
      // // console.log(this.form);
      getRoleAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.roleList();
          this.cancle();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    look(id) {
      getRoleInfo({ id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.menus =this.form.menus? this.$refs.tree.setCheckedKeys(
            // JSON.parse(this.form.menus)
            this.form.menus.split(',')
          ):[];
          this.form.id = id;
        }
      });
    },
    update() {
      this.form.menus = this.$refs.tree.getCheckedKeys().join(",");
      // console.log(this.form);
      getRoleEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.roleList();
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
