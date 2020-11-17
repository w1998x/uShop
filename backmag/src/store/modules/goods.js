import { getGoodsList,getGoodsCount } from '../../util/axios'

const state = {
    goodsList: [],
    size: 2,//每个组件渲染的条数
    page: 1,//页码
    total: 0//总条数
}

const getters = {
    getGoodsList() {
        return state.goodsList
    },
    getGoodsCount(){
        return state.total
    },
    getGoodsSize(){
        return state.size
    }
}

const mutations = {
    REQ_GOODSLIST(state, payLod) {
        state.goodsList = payLod
    },
    REQ_GOODSCOUNT(state,payLoad){
        state.total = payLoad
    },
    REQ_PAGESIZE(state,payLoad){
        state.page = payLoad
    }

}

const actions = {
    getGoodsListAction(context) {
        getGoodsList({
            size: context.state.size,
            page: context.state.page
        })
            .then(res => {
                if (res.data.code === 200) {
                    context.commit('REQ_GOODSLIST', res.data.list)
                }
            })
    },
    getGoodsCountAction({commit}){
        getGoodsCount()
        .then(res=>{
            if(res.data.code==200){
                commit('REQ_GOODSCOUNT',res.data.list[0].total)
            }
        })
    },
    getPageSizeAction(context,payLoad){
        context.commit('REQ_PAGESIZE',payLoad)
        console.log(payLoad);
        context.dispatch('getGoodsListAction')
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}