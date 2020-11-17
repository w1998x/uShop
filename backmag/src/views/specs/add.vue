<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加商品规格' : '修改商品规格'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancle"
    >
      <el-form :model="form" :rules="rules">
        <el-form-item
          label="规格名称"
          :label-width="formLabelWidth"
          prop="specsname"
        >
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          v-for="(item, index) in arrAttr"
          :key="index"
          label="规格属性"
          :label-width="formLabelWidth"
        >
          <el-input
            class="new"
            v-model="item.value"
            autocomplete="off"
          ></el-input>
          <el-button v-if="index == 0" @click="addAttr" type="primary"
            >新增规格属性</el-button
          >
          <el-button v-else @click="delAttr(item)" type="danger">删除</el-button>
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
import { getSpecsInfo, getSpecsAdd, getSpecsEdit } from "../../util/axios";
export default {
  data() {
    return {
      arrAttr: [
        {
          value: "",
        },
      ],
      formLabelWidth: "120px",
      form: {
        id: "",
        specsname: "",
        attrs: "",
        status: 1,
      },
      rules: {
        specsname: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
    };
  },
  props: ["addInfo"],
  computed: {
    ...mapGetters({
      specsList: "specs/getSpecsList",
    }),
  },

  methods: {
    ...mapActions({
      getSpecsList: "specs/getSpecsListAction",
      getSpecsCount: "specs/getSpecsCountAction",
    }),
    //添加动态表单书剑
    addAttr() {
      if (this.arrAttr.length <= 6) {
        this.arrAttr.push({
          value: "",
        });
      } else {
        this.$message.warning("最多添加六项");
      }
    },
    delAttr(item){
       var index = this.arrAttr.indexOf(item)
        if (index !== -1) {
          this.arrAttr.splice(index, 1)
        }
    },
    reset() {
      this.form = {
        id: "",
        specsname: "",
        attrs: "",
        status: 1,
      };
      this.arrAttr = [
        {
          value: "",
        },
      ];
    },
    cancle() {
      this.addInfo.isShow = false;
      this.reset();
    },

    add() {
      let newArr = this.arrAttr.map((item) => {
        console.log(item);
        return item.value;
      });
      this.form.attrs = newArr.join(",");
      getSpecsAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getSpecsList();
          this.getSpecsCount();
          this.cancle();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    look(id) {
      getSpecsInfo({ id }).then((res) => {
        if (res.data.code == 200) {
          let data = res.data.list[0];
          this.form = data;
          data.attrs.map((item, index) => {
            if (index == 0) {
              this.arrAttr[0].value = item;
            } else {
              this.arrAttr.push({
                value: item,
              });
            }
          });
        }
      });
    },
    update() {
       let newArr = this.arrAttr.map((item) => {
        console.log(item);
        return item.value;
      });
      this.form.attrs = newArr.join(",");
      // console.log(this.form);
      getSpecsEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getSpecsList();
          this.getSpecsCount();
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
.new {
  width: 75%;
}
</style>
