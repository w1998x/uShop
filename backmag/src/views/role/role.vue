<template>
  <div>
      <el-bread></el-bread>
       <el-button @click="add" type="primary" size="small" plain>添加</el-button>
       <v-table @edit='edit'></v-table>
       <v-dialog ref="dialog" :addInfo='addInfo'></v-dialog>
  </div>
</template>
 
<script>
import elBread from "../../components/el-Bread";
import vTable from "./list"
import vDialog from './add'
import {getRoleEdit} from '../../util/axios'
export default {
  data() {
    return {
      addInfo:{
        isShow:false,//弹窗打开关闭
        isAdd:true //添加还是编辑
      }
    };
  },
  components: {
    elBread,
    vTable,
    vDialog
  },
  methods: {
    add(){
      this.addInfo.isShow = true
      this.addInfo.isAdd = true
    },
   edit(e){
     this.addInfo.isShow = true
     this.addInfo.isAdd = false
     this.$refs.dialog.look(e)
   },
  
  },
};
</script>

<style lang="" scoped>
.el-button{
 margin-bottom:20px;
}
 
</style>
