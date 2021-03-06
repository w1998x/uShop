import {getCateList} from '../../util/axios'

const state = {
    cateList:[]
}

const getters = {
    getCateList(state){
        return state.cateList
    }
}

const mutations = {
    REQ_CATELIST(state,payLoad){
        state.cateList = payLoad
    }
}

const actions = {
    getCateListAction({commit}){
       getCateList({istree:true})
       .then(res=>{
           if(res.data.code===200){
            commit('REQ_CATELIST',res.data.list)
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