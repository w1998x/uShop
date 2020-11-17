<template>
  <div>
    <!-- 面包屑 -->
    <el-bread></el-bread>
    <!-- 添加按钮 -->
    <el-button type="primary" plain size="small" @click="isAdd">添加</el-button>
    <!-- 表格渲染 -->
    <v-list @edit='edit'></v-list>
    <!-- 弹框表单 -->
    <v-dialog ref="dialog" @cancle="cancle" :addInfo="addInfo"></v-dialog>
  </div>
</template>

<script>
import elBread from "../../components/el-Bread";
import vList from "./list";
import vDialog from "./add";
export default {
  data() {
    return {
      addInfo: {
        //用于打开弹框
        isShow: false,
        //用于区分是添加还是编辑
        isAdd: true,
      },
    };
  },
  components: {
    elBread,
    vList,
    vDialog,
  },
  methods: {
    isAdd() {
      this.addInfo.isShow = true;
      this.addInfo.isAdd = true
    },
    cancle(e) {
      this.addInfo.isShow = e;
    },
    edit(e){
      console.log(e,'eeeee');
      //打开弹框
      this.addInfo.isShow=true
      //告诉弹框你是一个编辑
      this.addInfo.isAdd=false
      //获取弹框的函数
      // console.log(this.$refs.dialog);
      this.$refs.dialog.look(e)
    }
  },
};
</script>
<style lang="stylus" scoped>
.el-button
  margin-bottom  20px
</style>
