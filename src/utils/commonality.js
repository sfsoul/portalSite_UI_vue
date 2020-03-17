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
export function dateFormat(dateTime,dateStyle){
    const date = new Date(dateTime)
    const len = dateStyle.length
    let {year,month,day} = {year:date.getFullYear(),month:date.getMonth()+1,day:date.getDate()}
    if(len === 3){
        return `${year}${dateStyle[0]}${month}${dateStyle[1]}${day}${dateStyle[2]}`
    }
    if(len === 2){
        return `${year}${dateStyle[0]}${month}${dateStyle[1]}${day}`
    }
    
}

//文件下载
export function download (data,fileName) {
    if (!data) {
       return
   }
   let url = window.URL.createObjectURL(new Blob([data]))
   let link = document.createElement('a')
   link.style.display = 'none'
   link.href = url
   link.setAttribute('download', fileName)

   document.body.appendChild(link)
   link.click()
}
