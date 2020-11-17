import { getUserList,getUserCount } from '../../util/axios'

const state = {
    userList: [],
    size: 2,//每个组件渲染的条数
    page: 1,//页码
    total: 0//总条数
}

const getters = {
    getUserList() {
        return state.userList
    },
    getUserCount(){
        return state.total
    },
    getUserSize(){
        return state.size
    }
}

const mutations = {
    REQ_USERLIST(state, payLod) {
        state.userList = payLod
    },
    REQ_USERCOUNT(state,payLoad){
        state.total = payLoad
    },
    REQ_PAGESIZE(state,payLoad){
        state.page = payLoad
    }

}

const actions = {
    getUserListAction(context) {
        getUserList({
            size: context.state.size,
            page: context.state.page
        })
            .then(res => {
                if (res.data.code === 200) {
                    let data = res.data.list?res.data.list:[]
                    context.commit('REQ_USERLIST', data)
                    //如果当前页不是第一页，且当前页的列表为空
                    if(context.state.page!=1&&data.length==0){
                        context.dispatch('getPageSizeAction',context.state.page-1)
                        context.dispatch('getUserListAction')
                        return
                    }
                }
            })
    },
    getUserCountAction({commit}){
        getUserCount()
        .then(res=>{
            if(res.data.code==200){
                commit('REQ_USERCOUNT',res.data.list[0].total)
            }
        })
    },
    getPageSizeAction(context,payLoad){
        context.commit('REQ_PAGESIZE',payLoad)
        console.log(payLoad);
        context.dispatch('getUserListAction')
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}