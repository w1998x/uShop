<template>
  <div>
    <el-table :data="specsList" border style="width: 100%">
      <el-table-column prop="id" label="规格编号" width="180">
      </el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="180">
      </el-table-column>
      <el-table-column prop="attrs" label="规格属性" width="180">
        <template slot-scope="item">
          <div>
            <el-tag v-for="attrName in item.row.attrs" :key="attrName" type="warning">{{attrName}}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="180">
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.status == 1" type="success">启用</el-tag>
            <el-tag v-else type="danger">禁用</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <div>
            <el-button
              @click="edit(item.row.id)"
              type="primary"
              size="small"
              plain
              >编辑</el-button
            >
            <el-button
              type="danger"
              @click="del(item.row.id)"
              size="small"
              plain
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- page-size	每页显示条目个数，支持 .sync 修饰符
         total	总条目数
         current-change	currentPage 改变时会触发
       -->
    <el-pagination
      :page-size="specsSize"
      :total="specsCount"
      background
      layout="prev, pager, next"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getSpecsDelete } from "../../util/axios";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      specsList: "specs/getSpecsList",
      specsCount:'specs/getSpecsCount',
      specsSize:"specs/getSpecsSize"
    }),
  },
  mounted() {
    this.getSpecsList();
    this.getSpecsCount();
  },
  methods: {
    ...mapActions({
      getSpecsList: "specs/getSpecsListAction",
      getSpecsCount:"specs/getSpecsCountAction",
      pageSize:"specs/getPageSizeAction"
    }),
    currentChange(e){
      console.log(e);
      this.pageSize(e)
    },
    del(id) {
      this.$confirm("确认删除这条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          getSpecsDelete({ id }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getSpecsList();
              this.getSpecsCount();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    edit(id) {
      this.$emit("edit", id);
    },
  },
};
</script>

<style lang="" scoped>
.el-pagination {
  float: right;
  margin-top: 20px;
}
</style>
