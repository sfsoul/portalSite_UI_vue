// 节流函数
export function throttle(fn,time){
    let canRun = true;
    return function (){
        if(!canRun) return;
        canRun = false;
        setTimeout(() => {
            fn.apply(this,arguments)
            canRun = true
        }, time);
    }
}

//防抖函数
export function debounce(fn,time){
    let timeId = null
    return function(){
        if(timeId) clearTimeout(timeId)
        timeId = setTimeout(() => {
            fn.apply(this,arguments)
        }, time);
    }
}

//日期格式化
export function dateFormat(dateTime){
    let date = new Date(dateTime)
    let {year,month,day} = {year:date.getFullYear(),month:date.getMonth()+1,day:date.getDate()}

    return `${year}年${month}月${day}日`
}