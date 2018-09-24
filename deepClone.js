const deepClone = function (obj, hash = new WeakMap()) {
    if(obj === null) return null; //空指针就返回
    if(obj.constructor===Date) return new Date(obj);   //日期对象就返回一个新的日期对象
    if(obj.constructor === RegExp) return new RegExp(obj);  //正则对象就返回一个新的正则对象
    if(obj.constructor === Error){return new Error(obj.message)}  //正则对象就返回一个新的正则对象
    if (hash.has(obj)) return hash.get(obj)

    let allDesc = Object.getOwnPropertyDescriptors(obj) ;     //遍历传入参数所有键的特性
    let cloneObj = Object.create(Object.getPrototypeOf(obj),allDesc); //继承原型链

    hash.set(obj, cloneObj)

    for(let key of   Reflect.ownKeys(obj)){   //Reflect.ownKeys(obj) = [...Object.getOwnPropertyNames(obj),...Object.getOwnPropertySymbols(obj)]
        cloneObj[key] = typeof obj[key] === 'object' ? deepClone(obj[key],hash) : obj[key]; // 如果值是引用类型则递归调用deepClone
    }
    return cloneObj;
};


let obj = {
    nan :NaN,
    num: 0,
    str: '',
    boolean: true,
    unf: undefined,
    nul: null,
    obj: {
        name: '我是一个对象',
        id: 1
    },
    arr: [0, 1, 2],
    func: function() {
        console.log('我是一个函数')
    },
    date: new Date(0),
    reg: new RegExp('/我是一个正则/ig'),
    err: new Error('我是一个错误'),
    [Symbol('1')]:1,
};

Object.defineProperty(obj,'innumerable',{
    enumerable:false,
    value:'123'
});

obj = Object.create(obj,Object.getOwnPropertyDescriptors(obj))

obj.loop = obj

let cloneObj = deepClone(obj);

console.log('obj',obj);
console.log('cloneObj',cloneObj);


for (let key of Object.keys(cloneObj)) {
    if(typeof cloneObj[key] ==='object' || typeof cloneObj[key] ==='function'){
        console.log(`${key}相同吗？ `, cloneObj[key] === obj[key])
    }
}