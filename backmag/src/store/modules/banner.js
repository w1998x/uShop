import {getBannerList} from '../../util/axios'

const state = {
    bannerList:[]
}

const getters = {
    getBannerList(state){
        return state.bannerList
    }
}

const mutations = {
    REQ_BANNERLIST(state,payLoad){
        state.bannerList = payLoad
    }
}

const actions = {
    getBannerListAction({commit}){
       getBannerList({istree:true})
       .then(res=>{
           if(res.data.code===200){
            commit('REQ_BANNERLIST',res.data.list)
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