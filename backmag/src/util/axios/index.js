//引入重新封装的axios实例
import http from './axios'

//导出接口
//封装菜单添加接口
export function getMenuAdd(data) {
    return http.post('/api/menuadd',data)
}

//封装菜单列表接口
export function getMenuList(params) {
    return http.get('/api/menulist',{
        params
    })
}

//封装菜单获取接口
export function getMenuInfo(params) {
    return http.get('/api/menuinfo',{
        params
    })
}

//封装菜单修改接口
export function getMenuEdit(data) {
    return http.post('/api/menuedit',data)
}

//封装菜单修改接口
export function getMenuDelete(data) {
    return http.post('/api/menudelete',data)
}

//角色管理接口
//角色添加接口
export function getRoleAdd(data){
    return http.post('/api/roleadd',data)
}

//角色列表接口
export function getRoleList(){
    return http.get('/api/rolelist')
}

//角色获取接口
export function getRoleInfo(params){
    return http.get('/api/roleinfo',{
        params
    })
}

//角色编辑接口
export function getRoleEdit(data){
    return http.post('/api/roleedit',data)
}

//角色删除接口
export function getRoleDelete(data){
    return http.post('/api/roledelete',data)
}

//管理员管理接口
//管理员添加接口
export function getUserAdd(data){
    return http.post('/api/useradd',data)
}

//管理员列表接口
export function getUserList(params){
    return http.get('/api/userlist',{
        params
    })
}

//管理员获取接口
export function getUserInfo(params){
    return http.get('/api/userinfo',{
        params
    })
}

//管理员编辑接口
export function getUserEdit(data){
    return http.post('/api/useredit',data)
}

//管理员删除接口
export function getUserDelete(data){
    return http.post('/api/userdelete',data)
}

//管理员总数接口
export function getUserCount(){
    return http.get('/api/usercount')
}

//管理员登录接口
export function getUserLogin(data){
    return http.post('/api/userlogin',data)
}

//封装商品分类接口
//封装商品分类添加接口
export function getCateAdd(data) {
    return http.post('/api/cateadd',data)
}

//封装商品分类列表接口
export function getCateList(params) {
    return http.get('/api/catelist',{
        params
    })
}

//封装商品分类获取接口
export function getCateInfo(params) {
    return http.get('/api/cateinfo',{
        params
    })
}

//封装商品分类修改接口
export function getCateEdit(data) {
    return http.post('/api/cateedit',data)
}

//封装商品分类删除接口
export function getCateDelete(data) {
    return http.post('/api/catedelete',data)
}



//商品规格管理接口
//商品规格添加接口
export function getSpecsAdd(data){
    return http.post('/api/specsadd',data)
}

//商品规格列表接口
export function getSpecsList(params){
    return http.get('/api/specslist',{params})
}

//商品规格获取接口
export function getSpecsInfo(params){
    return http.get('/api/specsinfo',{
        params
    })
}

//商品规格编辑接口
export function getSpecsEdit(data){
    return http.post('/api/specsedit',data)
}

//商品规格删除接口
export function getSpecsDelete(data){
    return http.post('/api/specsdelete',data)
}

//商品规格总数接口
export function getSpecsCount(){
    return http.get('/api/specscount')
}


//商品管理接口
//商品添加接口
export function getGoodsAdd(data){
    return http.post('/api/goodsadd',data)
}

//商品列表接口
export function getGoodsList(params){
    return http.get('/api/goodslist',{
        params
    })
}

//商品获取接口
export function getGoodsInfo(params){
    return http.get('/api/goodsinfo',{
        params
    })
}

//商品编辑接口
export function getGoodsEdit(data){
    return http.post('/api/goodsedit',data)
}

//商品删除接口
export function getGoodsDelete(data){
    return http.post('/api/goodsdelete',data)
}

//商品总数接口
export function getGoodsCount(){
    return http.get('/api/goodscount')
}



//会员列表接口
export function getMemberList(params){
    return http.get('/api/memberlist',{
        params
    })
}

//会员获取接口
export function getMemberInfo(params){
    return http.get('/api/memberinfo',{
        params
    })
}

//会员编辑接口
export function getMemberEdit(data){
    return http.post('/api/memberedit',data)
}



//封装轮播图管理接口
//封装轮播图管理添加接口
export function getBannerAdd(data) {
    return http.post('/api/banneradd',data)
}

//封装轮播图管理列表接口
export function getBannerList(params) {
    return http.get('/api/bannerlist',{
        params
    })
}

//封装轮播图管理获取接口
export function getBannerInfo(params) {
    return http.get('/api/bannerinfo',{
        params
    })
}

//封装轮播图管理修改接口
export function getBannerEdit(data) {
    return http.post('/api/banneredit',data)
}

//封装轮播图管理删除接口
export function getBannerDelete(data) {
    return http.post('/api/bannerdelete',data)
}


//秒杀管理接口
//秒杀添加接口
export function getSeckAdd(data){
    return http.post('/api/seckadd',data)
}

//秒杀列表接口
export function getSeckList(params){
    return http.get('/api/secklist',{
        params
    })
}

//秒杀获取接口
export function getSeckInfo(params){
    return http.get('/api/seckinfo',{
        params
    })
}

//秒杀编辑接口
export function getSeckEdit(data){
    return http.post('/api/seckedit',data)
}

//秒杀删除接口
export function getSeckDelete(data){
    return http.post('/api/seckdelete',data)
}