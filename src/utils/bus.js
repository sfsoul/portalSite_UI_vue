import Bus from 'vue';
let install = function (Vue) {
    // 设置eventBus
    Vue.prototype.bus = new Bus();

}

export default {install};