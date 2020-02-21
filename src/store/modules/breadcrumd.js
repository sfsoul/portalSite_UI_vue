const state = {
    route:[]
}

const mutations = {
    SET_BREADCRUMD(state,routes){
        state.route = routes
    }
}

const actions = {
    setBreadcrumd({commit},routes){
        commit('SET_BREADCRUMD',routes)
    }
}

export default {
    namespaced:true,
    state,
    mutations,
    actions
}