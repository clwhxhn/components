/*
 * @Author: wangxiaohui clwhxhn@163.com
 * @Date: 2024-07-16 10:02:54
 * @LastEditors: wangxiaohui clwhxhn@163.com
 * @LastEditTime: 2025-07-22 16:32:18
 * @FilePath: \components\single\柯里化函数.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
function add(x,y,z){
    return x+y+z
    
}

// 封装
function hyCurrying(fn) {
    function curried(...args) {
        if(args.length >= fn.length){
            return fn.apply(this, args)
        } else{
            return function(...args2) {
                return curried.apply(this, [...args, ...args2])
            }
        }
    }
    return curried
}

var curryAdd = hyCurrying(add)

console.log('curryAdd(10,20,30): ', curryAdd(10,20,30));
console.log('curryAdd(10,20)(30): ', curryAdd(10,20)(30));
console.log('curryAdd(10)(20)(30): ', curryAdd(10)(20)(30));