import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)


import menu from './modules/menu'
import role from './modules/role'
import user from './modules/user'
import cate from './modules/cate'
import specs from './modules/specs'
import member from './modules/member'
import banner from './modules/banner'
import seck from './modules/seck'
import goods from './modules/goods'
export default new Vuex.Store({
    state: {
        userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : null
    },
    getters: {
        getUserInfo(state) {
            return state.userInfo
        }
    },
    mutations: {
        CHANGE_USER(state, payLoad) {
            state.userInfo = payLoad
            if (payLoad) {
                sessionStorage.setItem('userInfo', JSON.stringify(payLoad))
            } else {
                sessionStorage.removeItem('userInfo')
            }
        }
    },
    actions: {
        changUserInfoActions({ commit }, payLoad) {
            commit('CHANGE_USER', payLoad)
        }
    },
    modules: {
        menu,
        role,
        user,
        cate,
        specs,
        member,
        banner,
        seck,
        goods
    }
})