/* 创建一个事件对象，名字为newEvent，类型为onResume */
const newEvent = new Event('onResume', { bubbles:true,cancelable:true,composed:true });

window['changeAppLifecycleState'] = function(type){
               
        /* @param state 0是前台 1切换中 2后台 */
         newEvent["state"] = type;
        document.dispatchEvent(newEvent);  
}