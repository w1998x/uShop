<template>
  <div class="login">
    <el-form
      :model="loginFrom"
      :rules="rules"
      ref="loginFrom"
       label-width="100px"
       class="loginFrom"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginFrom.username" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginFrom.password" clearable show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login('loginFrom')"
          >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {getUserLogin} from '../util/axios'
import {mapActions} from 'vuex'
export default {
  data() {
    return {
      loginFrom: {
        username: "",
        password: "",
      },
       rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
           password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
          ]
       }
    };
  },
  methods: {
    ...mapActions(["changUserInfoActions"]),
      login(formName){
        //    this.$message.error('');
        this.$refs[formName].validate((valid) => {
          if (valid) {
              getUserLogin(this.loginFrom)
              .then(res=>{
                if(res.data.code==200){
                  this.$message.success(res.data.msg)
                  //  sessionStorage.setItem('userInfo',JSON.stringify(res.data.list))
                  this.changUserInfoActions(res.data.list)
                  this.$router.push('/home')
                 
                }else{
                  this.$message.error(res.data.msg)
                }
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
  },
};
</script>

<style lang="stylus" scoped>
@import '../stylus/index.styl'
.login
    width 100vw
    height 100vw
    background $firstBgColor
    .loginFrom
        width 400px
        height 260px
        position absolute
        left 35%
        top 30% 
        border 1px solid #666666
        padding 60px 40px 0 0
        background #BDBDBD

</style>
