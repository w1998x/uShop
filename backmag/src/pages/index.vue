<template>
  <div>
    <el-container>
      <el-header>
        <h1>XXX大型后台管理项目</h1>
        <div class="logout">
          <h3>欢迎{{getUserInfo.username}}登录</h3>
          <el-button @click="logout" type="danger" size="small">退出</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <!-- 侧边栏 -->
          <v-nav></v-nav>
        </el-aside>
        <el-main>
          <!-- 二级路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import vNav from "../components/nav";
import {mapGetters,mapActions} from 'vuex'
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['getUserInfo'])
  },
  components: {
    vNav,
  },
  methods: {
    ...mapActions(['changUserInfoActions']),
    logout(){
      this.changUserInfoActions(null)
      this.$router.push('/login')
    }
  },
};
</script>

<style lang="stylus" scoped>
@import '../stylus/index.styl';

.el-header {
  background: $secondBgColor;
}
h1{
  width: 40%;
}
.logout {
  position: absolute;
  top:5px;
  right:10px;
  text-align:center;
}
</style>
