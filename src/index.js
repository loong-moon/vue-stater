/* 
埋点统计插件 
*/

// 统计类
class Stat {
    _reportReq; // 请求函数
    _debug; // 是否打印调试数据

    constructor ({
        report,
        debug
    }) {
        this._repoetReq = report
        this._debug = debug
    }

    // 自定义上传
    customReport (data) {
        this._reportReq(data)
    }
    
}

export default {
    install (Vue, {
        report = data => data,
        debug = false
    }) {
        const stater = new Stat({
            report,
            debug
        })

        Vue.prototype.$stater = stater

        // 注册一个全局自定义指令 `v-report`, 主要用于对某个dom元素浏览或者点击时上报数据
        Vue.directive('report', {
            bind: (el, binding) => handleDirective(el, binding, 'bind', report, debug),
            unbind: (el, binding) => handleDirective(el, binding, 'unbind', report, debug)
        })
    }
}

// 处理指令钩子
function handleDirective (
     el, 
     binding, 
     hook, 
     report,
     debug
     ) {
    let { arg: event = 'click', value: data } = binding
    let bindCb = () => { report(data) }
    let isView = event === 'view'
    
    if (debug) {
        console.log(event, data)
    }

    if (hook === 'bind') {
        // 当参数为view时直接上报数据，当为其他事件时绑定事件
        if (isView) {
            bindCb()
        } else {
            bindEvent(el, event, bindCb)
        }
    }

    if (hook === 'unbind' && !isView) {
        removeEvent(el, event, bindCb)
    }
    
}


// 事件绑定方法
function bindEvent (element, type, handler) {
    if (element.addEventListener) {
        element.addEventListener(type, handler, false)
    } else if (element.attachEvent) {
        element.attachEvent('on' + type, handler)
    } else {
        element['on' + type] = handler
    }
}

// 移除事件绑定
function removeEvent (element, type, handler) {
    if (element.removeEventListener) {
        element.removeEventListener(type, handler, false)
    } else if (element.detachEvent) {
        element.detachEvent('on' + type, handler)
    } else {
        element['on' + type] = null
    }
}
