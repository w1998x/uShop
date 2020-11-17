import axios from 'axios'
//引入路由对象
import router from '../../router'

const http  = axios.create({
    baseURL:'/api'
})


//拦截器的高阶概念
//请求拦截
// console.log(http,'实例')
http.interceptors.request.use(req=>{
    // console.log(req,'请求拦截');
    let userInfo = sessionStorage.getItem('userInfo')?JSON.parse(sessionStorage.getItem('userInfo')):{};
    req.headers.authorization=userInfo.token
    // req.headers.authorization=111
    return req
})

//相应拦截
http.interceptors.response.use(res=>{
    if(res.data.msg==403){
        alert(res.data.msg);
        router.push('/login');
        return res
    }else if(res.data.code==500){
        alert(res.data.msg);
        router.push('/login')
        return res
    }else{
        return res
    }
})

export default http