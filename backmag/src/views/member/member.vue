<template>
  <div>
    <el-bread></el-bread>
    <v-table @edit='edit'></v-table>
    <v-dialog ref="dialog" :addInfo="addInfo"></v-dialog>
   
  </div>
</template>

<script>
import elBread from "../../components/el-Bread";
import vTable from "./list";
import vDialog from "./add";

export default {
  data() {
    return {
      addInfo: {
        isShow: false, //弹窗打开关闭
        isAdd: true, //添加还是编辑
      },
    };
  },
  components: {
    elBread,
    vTable,
    vDialog,
  },
  methods: {
    edit(e){
      this.addInfo.isShow=true;
      this.addInfo.isAdd = false;
      this.$refs.dialog.look(e)
    }
  },
};
</script>

<style lang="" scoped>
.el-button {
  margin-bottom: 20px;
}

</style>
