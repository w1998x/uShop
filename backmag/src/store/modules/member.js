import { getMemberList} from '../../util/axios'

const state = {
    memberList: [],
}

const getters = {
    getMemberList() {
        return state.memberList
    }
}

const mutations = {
    REQ_MEMBERLIST(state, payLod) {
        state.memberList = payLod
    }

}

const actions = {
    getMemberListAction(context) {
        getMemberList()
            .then(res => {
                if (res.data.code === 200) {
                    context.commit('REQ_MEMBERLIST', res.data.list)
                }
            })
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}