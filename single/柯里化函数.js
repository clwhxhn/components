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