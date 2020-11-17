<template>
  <div>
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      background-color="#A4A4A4"
      text-color="#ffffff"
      active-text-color="#FE9A2E"
      unique-opened
      router
    >
      <el-menu-item index="/home">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu :index="item.id.toString()" v-for="item in getUserInfo.menus" :key="item.id">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.title}}</span>
        </template>
        <el-menu-item :index="menu.url" v-for="menu in item.children" :key="menu.id">
          <span slot="title">{{menu.title}}</span>
        </el-menu-item>
        
      </el-submenu>

      
    </el-menu>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
export default {
  data() {
    return {
      defaultActive:'/home'
    };
  },
  mounted() {
    this.defaultActive=this.$route.path
    // this.getMenuList()
  },
   computed: {
    // ...mapGetters({
    //   menuList:"menu/getMenuList"
    // })
    ...mapGetters(['getUserInfo'])
  },
  // methods: {
  //   // ...mapActions({
  //   //   getMenuList:'menu/getMenuListAction'
  //   // })
  // },
};
</script>

<style lang="stylus" scoped>
.el-menu {
  height: 85vh;
}
</style>
