/* 创建一个事件对象，名字为newEvent，类型为build */
const newEvent = new Event('build', { bubbles:true,cancelable:true,composed:true });

window['changeAppLifecycleState'] = function(type){
               
        /* 给这个事件对象创建一个属性并赋值 */
         newEvent["types"] = type;
        document.dispatchEvent(newEvent);  
}