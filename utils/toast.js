const Toast = {};

/**
 * toastTimer:存储toast定时器id;
 * toastVM:存储toast vm; 
 * showLoad:存储loading显示状态;
 * loadNode:存储loading节点元素;
 */
let [toastTimer, toastVM, showLoad, loadNode] = [false, null, false, null];

// 默认配置

const defaultOption = {
    type: 'content',
    duration: '2500',
    wordWrap: false,
    width: 'auto'
}

Toast.install = (Vue, options) => {
    // Vue.prototype.$msg = 'Hello World';
    /**
     * toast 方法
     * @param {string} tip 提示文本
     * @param {object|string} config 配置参数
     */

    Vue.prototype.$toast = (tip, config) => {
        let option = {};
        Object.assign(option, defaultOption, options);
        if (typeof config === 'object') {
            Object.assign(option, config);
        } else if (config) {
            option['type'] = config
        }
        console.log(option, tip)
        if (toastTimer) {
            // 防止重复 取消上次定时器
            clearTimeout(toastTimer);
            toastVM.show = false;
        }

        // 没有挂在在vm中
        if (!toastVM) {
            const toastTpl = Vue.extend({
                data() {
                    return {
                        show: false,
                        tip,
                        wordWrap: option.wordWrap,
                        type: option.type,
                        extStyle: {
                            width: option.width
                        }
                    }
                },
                render(h) {
                    if (!this.show) {
                        return false;
                    }
                    return h(
                        'div',
                        {
                            class: ['lx-toast', `lx-toast-${this.type}`, this.wordWrap ? 'lx-word-wrap' : ''],
                            style: this.extStyle,
                            show: this.show,
                            domProps: {
                                innerHTML: this.tip
                            }
                        }
                    )
                }
            });
            toastVM = new toastTpl;
            const tpl = toastVM.$mount().$el;
            document.body.appendChild(tpl)
            // 客户端处理
            // if (process.client) {
            // require('模块')
            // }
        }
        toastVM.show = true;
        toastVM.tip = tip;
        toastVM.wordWrap = option.wordWrap;
        toastVM.type = option.type;
        toastVM.extStyle.width = option.width;
        toastVM.tip = tip;

        // toastTimer = setTimeout(() => {
        //     toastVM.show = toastTimer = false;
        // }, option.duration);
    };
    ['bottom', 'center', 'top'].forEach(type => {
        Vue.prototype.$toast[type] = (tip, config = { type }) => {
            return Vue.prototype.$toast(tip, config);
        }
    });

}
export default Toast