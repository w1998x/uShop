<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加秒杀' : '修改秒杀'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancle"
    >
      <el-form :model="form" :rules="rules">
        <el-form-item
          label="活动名称"
          :label-width="formLabelWidth"
          prop="title"
        >
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="活动期限" :label-width="formLabelWidth">
          <el-date-picker
            v-model="timer"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="一级分类" :label-width="formLabelWidth">
          <el-select v-model="form.first_cateid" @change="changeCate()">
            <el-option value label="请选择" disabled></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" :label-width="formLabelWidth">
          <el-select v-model="form.second_cateid" @change="changeGoods()">
            <el-option value label="请选择" disabled></el-option>
            <el-option
              v-for="item in secondArr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品" :label-width="formLabelWidth">
          <el-select v-model="form.goodsid">
            <el-option value label="请选择" disabled></el-option>
            <el-option
              v-for="item in goodsArr"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
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
import {
  getGoodsList,
  getSeckAdd,
  getSeckEdit,
  getSeckInfo,
} from "../../util/axios";
export default {
  data() {
    return {
      formLabelWidth: "120px",
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      rules: {
        title: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
      secondArr: [],
      goodsArr: [],
      timer: "",
    };
  },
  props: ["addInfo"],
  computed: {
    ...mapGetters({
      cateList: "cate/getCateList",
      seckList: "seck/getSeckList",
    }),
  },
  mounted() {
    this.getCateList();
  },
  methods: {
    ...mapActions({
      getCateList: "cate/getCateListAction",
      getSeckList: "seck/getSeckListAction",
    }),
    reset() {
      this.form = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
      this.timer=""
    },
    cancle() {
      this.addInfo.isShow = false;
      this.reset();
    },
    //点击一级分类出现二级分类列表
    changeCate(n) {
      let index = this.cateList.findIndex((item) => {
        return this.form.first_cateid == item.id;
      });
      this.secondArr = this.cateList[index].children;
      //清空二级和三级下拉列表的内容
      if (!n) {
        this.form.second_cateid = "";
        this.form.goodsid = "";
      }
    },
    //点击二级分类出现商品列表
    changeGoods(n) {
      getGoodsList({
        fid: this.form.first_cateid,
        sid: this.form.second_cateid,
      }).then((res) => {
        if (res.data.code == 200) {
          this.goodsArr = res.data.list;
          if (!n) {
            this.form.goodsid = "";
          }
        }
      });
    },
    add() {
      //给开始时间和结束时间赋值
      this.form.begintime = new Date(this.timer[0]).getTime();
      this.form.endtime = new Date(this.timer[1]).getTime();
      getSeckAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getSeckList();
          this.cancle();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    look(id) {
      getSeckInfo({ id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
          this.timer=[new Date(parseFloat(this.form.begintime)),new Date(parseFloat(this.form.endtime))]
          //清空之前的双向数据绑定
          this.changeCate(true)
           this.changeGoods(true)
        }
      });
    },
    update() {
      // console.log(this.form);
      getSeckEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getSeckList();
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
