<template>
  <div>
    <el-table :data="goodsList" border style="width: 100%">
      <el-table-column prop="id" label="商品编号" width="160">
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="160">
      </el-table-column>
      <el-table-column prop="price" label="商品价格" width="160">
      </el-table-column>
      <el-table-column prop="market_price" label="市场价格" width="160">
      </el-table-column>
      <el-table-column label="图片" width="160">
        <template slot-scope="item">
          <div>
            <img class="img" :src="$imgUrl+item.row.img" alt="">
          </div>
        </template>
      </el-table-column>
       <el-table-column  label="是否新品">
          <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.isnew == 1" type="success">是</el-tag>
            <el-tag v-else type="danger">否</el-tag>
          </div>
        </template>
      </el-table-column>
       <el-table-column label="是否热卖">
          <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.ishot == 1" type="success">是</el-tag>
            <el-tag v-else type="danger">否</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" >
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.status == 1" type="success">启用</el-tag>
            <el-tag v-else type="danger">禁用</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
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
      :page-size="goodsSize"
      :total="goodsCount"
      background
      layout="prev, pager, next"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getGoodsDelete } from "../../util/axios";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      goodsList: "goods/getGoodsList",
      goodsCount:'goods/getGoodsCount',
      goodsSize:"goods/getGoodsSize"
    }),
  },
  mounted() {
    this.getGoodsList();
    this.getGoodsCount();
  },
  methods: {
    ...mapActions({
      getGoodsList: "goods/getGoodsListAction",
      getGoodsCount:"goods/getGoodsCountAction",
      pageSize:"goods/getPageSizeAction"
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
          getGoodsDelete({ id }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getGoodsList();
              this.getGoodsCount();
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
.img{
  width: 100px;
}
</style>
