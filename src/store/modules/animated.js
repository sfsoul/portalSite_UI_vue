const state = {
    scrollTop:0
}

const mutations = {
    SET_SCROLL_TOP:(state,scrolltop)=>{
        state.scrollTop = scrolltop
    }
}

const actions = {
    getScrollTop:({commit},scrolltop)=>{
        commit('SET_SCROLL_TOP',scrolltop)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}