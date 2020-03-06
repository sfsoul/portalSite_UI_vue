const getters = {
    permission_routes:state =>state.permission.routes,
    breadcrumd_routes:state =>state.breadcrumd.route,
    user_name:state => state.user.name,
    user_avatar:state =>state.user.avatar,
    token:state => state.user.token,
    login_status:state => state.user.loginStatus,
    scroll_top:state => state.animated.scrollTop,
}
export default getters