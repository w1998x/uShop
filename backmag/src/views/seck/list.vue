<template>
  <div>
    <el-table :data="seckList" border style="width: 100%">
      <el-table-column prop="title" label="活动" width="180">
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
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getSeckDelete } from "../../util/axios";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      seckList: "seck/getSeckList"
    }),
  },
  mounted() {
    this.getSeckList();
  },
  methods: {
    ...mapActions({
      getSeckList: "seck/getSeckListAction",
    }),
   
    del(uid) {
      this.$confirm("确认删除这条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          getSeckDelete({ uid }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getSeckList();
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
