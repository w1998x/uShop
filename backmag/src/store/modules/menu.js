import {getMenuList} from '../../util/axios'

const state = {
    menuList:[]
}

const getters = {
    getMenuList(state){
        return state.menuList
    }
}

const mutations = {
    REQ_MENULIST(state,payLoad){
        state.menuList = payLoad
    }
}

const actions = {
    getMenuListAction({commit}){
       getMenuList({istree:true})
       .then(res=>{
           if(res.data.code===200){
            commit('REQ_MENULIST',res.data.list)
           }
           
       })
       .catch(err=>{
           console.log(err,'错误');
       })
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced:true
}