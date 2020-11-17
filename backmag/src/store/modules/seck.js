import { getSeckList} from '../../util/axios'

const state = {
    seckList: [],
}

const getters = {
    getSeckList() {
        return state.seckList
    }
}

const mutations = {
    REQ_SECKLIST(state, payLod) {
        state.seckList = payLod
    }

}

const actions = {
    getSeckListAction(context) {
        getSeckList()
            .then(res => {
                if (res.data.code === 200) {
                    context.commit('REQ_SECKLIST', res.data.list)
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