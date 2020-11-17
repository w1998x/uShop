<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加商品' : '修改商品'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancle"
      @opened="createEditor"
    >
      <el-form :model="form" :rules="rules" ref="rules">
        <el-form-item
          prop="first_cateid"
          label="一级分类"
          :label-width="formLabelWidth"
        >
          <el-select v-model="form.first_cateid" @change="changeCate(false)">
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

        <el-form-item
          prop="second_cateid"
          label="二级分类"
          :label-width="formLabelWidth"
        >
          <el-select v-model="form.second_cateid">
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

        <el-form-item
          label="商品名称"
          :label-width="formLabelWidth"
          prop="goodsname"
        >
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth" prop="price">
          <el-input v-model.number="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="市场价格"
          :label-width="formLabelWidth"
          prop="market_price"
        >
          <el-input
            v-model.number="form.market_price"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
          <!-- 
            el-upload  属性
            action	必选参数，上传的地址 
            list-type	文件列表的类型
            on-preview	点击文件列表中已上传的文件时的钩子
            on-remove	文件列表移除文件时的钩子
            auto-upload	是否在选取文件后立即进行上传
            on-change	文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
            file-list	上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]
            limit	最大允许上传个数
            on-exceed	文件超出个数限制时的钩子
            -->
          <el-upload
            list-type="picture-card"
            action="#"
            :auto-upload="false"
            :on-preview="onPreview"
            :on-remove="onRemove"
            :on-change="onChange"
            :file-list="fileList"
            :limit="1"
            :on-exceed="onExceed"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          -->
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item
          prop="specsid"
          label="商品规格"
          :label-width="formLabelWidth"
        >
          <el-select v-model="form.specsid" @change="changeSpecs(false)">
            <el-option value label="请选择" disabled></el-option>
            <el-option
              v-for="item in specsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          prop="specsattr"
          label="规格属性"
          :label-width="formLabelWidth"
        >
          <el-select v-model="form.specsattr" multiple>
            <el-option value label="请选择" disabled></el-option>
            <el-option
              v-for="item in attrArr"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品" :label-width="formLabelWidth">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" :label-width="formLabelWidth">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
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

        <el-form-item label="商品描述" :label-width="formLabelWidth">
          <div id="editor"></div>
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
//引入富文本编辑器
import E from "wangeditor";
import { mapActions, mapGetters } from "vuex";
import { getGoodsAdd, getGoodsInfo, getGoodsEdit } from "../../util/axios";
export default {
  data() {
    return {
      formLabelWidth: "120px",
      form: {
        first_cateid: "", //一级分类编号
        second_cateid: "", //二级分类编号
        goodsname: "", //商品名称
        price: "", //商品价格
        market_price: "", //市场价格
        img: "", //商品图片（文件）
        description: "", //商品描述
        specsid: "", //商品规格编号
        specsattr: "", //商品规格属性
        isnew: 1, //是否新品
        ishot: 1, //是否热卖推荐
        status: 1, //状态1正常2禁
      },
      rules: {
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 2 到 10 个字符", trigger: "blur" },
        ],
        first_cateid: [
          { required: true, message: "请选择一级分类", trigger: "blur" },
        ],
        second_cateid: [
          { required: true, message: "请选择二级分类", trigger: "blur" },
        ],
        price: [
          { required: true, message: "请输入价格", trigger: "blur" },
          { type: "number", message: "价格必须为数字" },
        ],
        market_price: [
          { required: true, message: "请输入市场价格", trigger: "blur" },
          { type: "number", message: "市场价格必须为数字" },
        ],
        specsid: [
          { required: true, message: "请选择商品规格", trigger: "blur" },
        ],
        specsattr: [
          { required: true, message: "请选择规格属性", trigger: "blur" },
        ],
      },
      secondArr: [],
      attrArr: [],
      dialogImageUrl: "", //预览的图片地址
      dialogVisible: false, //是否打开弹框
      imgUrl: "", //用来接收图片信息
      fileList: [], //文件上传列表
      editor: null,
    };
  },
  props: ["addInfo"],
  computed: {
    ...mapGetters({
      cateList: "cate/getCateList",
      specsList: "specs/getSpecsList",
    }),
  },
  mounted() {
    this.getCateList();
    this.getSpecsList();
  },
  methods: {
    ...mapActions({
      getCateList: "cate/getCateListAction",
      getSpecsList: "specs/getSpecsListAction",
      getGoodsList: "goods/getGoodsListAction",
      getGoodsCount: "goods/getGoodsCountAction",
    }),
    createEditor() {
      // console.log('富文本编辑器被创建');
      this.editor = new E("#editor");
      this.editor.create();
      this.editor.txt.html(this.form.description);
    },
    reset() {
      this.form = {
        first_cateid: "", //一级分类编号
        second_cateid: "", //二级分类编号
        goodsname: "", //商品名称
        price: "", //商品价格
        market_price: "", //市场价格
        img: "", //商品图片（文件）
        description: "", //商品描述
        specsid: "", //商品规格编号
        specsattr: "", //商品规格属性
        isnew: 1, //是否新品
        ishot: 1, //是否热卖推荐
        status: 1, //状态1正常2禁
      };
      //图片列表清空
      this.fileList = [];
      //二级分类
      this.secondArr = [];
      //属性数组
      this.attrArr = [];
      //清空验证规则
      this.$refs["rules"].resetFields();
    },
    cancle() {
      this.addInfo.isShow = false;
      this.reset();
    },
    changeCate(n) {
      // console.log(n);
      let index = this.cateList.findIndex((item, i) => {
        return this.form.first_cateid == item.id;
        // console.log(item.id);
      });
      this.secondArr = this.cateList[index].children;
      if (!n) {
        this.form.second_cateid = "";
      }
    },
    changeSpecs(n) {
      console.log(this.specsList);
      let index = this.specsList.findIndex((item) => {
        return this.form.specsid == item.id;
      });
      this.attrArr = this.specsList[index].attrs;
      if (!n) {
        this.form.specsattr = [];
      }
    },
    add() {
      this.form.specsattr = this.form.specsattr
        ? this.form.specsattr.join(",")
        : "";
      this.form.img = this.imgUrl;
      //把编辑器中的内容，设置给描述参数
      this.form.description = this.editor.txt.html();
      //form表单提交时，有文件上传，要用FormData
      //把普通的表单改成FormData形式
      let data = this.form;
      let file = new FormData();
      //必须通过append添加属性
      for (let i in data) {
        file.append(i, data[i]);
      }
      //添加img参数
      file.append("img", this.imgUrl);
      // console.log(file.get("catename"));
      getGoodsAdd(file).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getGoodsList();
          this.getGoodsCount();
          this.cancle();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //图片上传触发的函数
    onChange(file) {
      // console.log(file);
      this.imgUrl = file.raw;
    },
    look(id) {
      getGoodsInfo({ id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          //当前表单中没有id，创建一个id，给编辑按钮用
          this.form.id = id;
          //图片格式转换
          this.fileList = this.form.img
            ? [{ url: `${this.$imgUrl}${this.form.img} ` }]
            : [];
          this.form.specsattr = this.form.specsattr
            ? this.form.specsattr.split(",")
            : [];
          //重新调取change事件
          this.changeCate(true);
          this.changeSpecs(true);
        }
      });
    },
    update() {
      // console.log(this.form);
      this.form.specsattr = this.form.specsattr
        ? this.form.specsattr.join(",")
        : "";
      this.form.img = this.imgUrl;
      this.form.description = this.editor.txt.html();
      //form表单提交时，有文件上传，要用FormData
      //把普通的表单改成FormData形式
      let data = this.form;
      let file = new FormData();
      //必须通过append添加属性
      for (let i in data) {
        file.append(i, data[i]);
      }
      //如果新传了图片，this.imgUrl就有值，就赋值给this.imgUrl，如果没有新添加的图片，就用上一次的图片
      this.imgUrl = this.imgUrl ? this.imgUrl : this.form.img;
      file.append("img", this.imgUrl);
      getGoodsEdit(file).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getGoodsList();
          this.getGoodsCount();
          this.cancle();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },

    onPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    onRemove(file, fileList) {},
    onExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
  },
};
</script>

<style lang="" scoped>
</style>
