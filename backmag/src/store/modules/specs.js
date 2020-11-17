import { getSpecsList,getSpecsCount } from '../../util/axios'

const state = {
    spescList: [],
    size: 2,//每个组件渲染的条数
    page: 1,//页码
    total: 0//总条数
}

const getters = {
    getSpecsList() {
        return state.spescList
    },
    getSpecsCount(){
        return state.total
    },
    getSpecsSize(){
        return state.size
    }
}

const mutations = {
    REQ_SPECSLIST(state, payLod) {
        state.spescList = payLod
    },
    REQ_SPECSCOUNT(state,payLoad){
        state.total = payLoad
    },
    REQ_PAGESIZE(state,payLoad){
        state.page = payLoad
    }

}

const actions = {
    getSpecsListAction(context) {
        getSpecsList({
            size: context.state.size,
            page: context.state.page
        })
            .then(res => {
                if (res.data.code === 200) {
                    context.commit('REQ_SPECSLIST', res.data.list)
                }
            })
    },
    getSpecsCountAction({commit}){
        getSpecsCount()
        .then(res=>{
            if(res.data.code==200){
                commit('REQ_SPECSCOUNT',res.data.list[0].total)
            }
        })
    },
    getPageSizeAction(context,payLoad){
        context.commit('REQ_PAGESIZE',payLoad)
        console.log(payLoad);
        context.dispatch('getSpecsListAction')
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}