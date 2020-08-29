class myvue{
    constructor(options){
        this.$options = options
        // 数据观察
        this.$data= options.data
        this.observe(this.$data)
        // // 模拟一下watcher创建
        // new Watcher()
        // // 通过访问test属性触发get函数，添加依赖
        // this.$data.test
        // new Watcher();
        // this.$data.foo.bar
        new Compile(options.el, this)

        // created执行
        if (options.created) {
            
            options.created.call(this )
        }
    }
    // 数据观察
    observe(value){
        //判断数据
        if (value && typeof(value) != "object" ) {
            return 
        } 
        Object.keys(value).map(key =>{
            console.log(`observe中的${key}`);
            this.defineReactive(value,key,value[key])
            // 代理data中的属性到vue实例中
            this.proxyData(key)
        })
    }

    // 数据响应
    defineReactive(obj, key, val){
        this.observe(val)
        console.log(`key:${key}...`);
        const dep = new Dep()

        Object.defineProperty(obj, key, {
            get(){
                Dep.target && dep.addDep(Dep.target)
                return val
            },
            set( newValue ){
                if (newValue === val) {
                    return 
                }
                val = newValue
                console.log(`修改了${key}:值${newValue}`);
                dep.notify()
            }
        })
    }

    // 
    proxyData(key){
        Object.defineProperty(this, key, {
            get(){
                return this.$data[key]
            },
            set(newVal){
                this.$data[key]=newVal
            }
        })
    }
}

// 依赖类
class Dep{
    constructor(options){
        this.deps=[]
    }
    // 添加依赖
    addDep(dep){
        this.deps.push(dep)
    }
    // 通知
    notify(){
        this.deps.forEach(dep=>{
            dep.update()
        })
    }

}

// 观察者
class Watcher {
    constructor(vm, key, cb){
        this.vm = vm 
        this.key = key
        this.cb = cb
        // 当前Watcher实例指定到Dep静态属性target
        Dep.target=this
        this.vm[this.key] //触发相对应的getter，添加依赖
        Dep.target = null
    }   
    update(){
        console.log('视图更新了');
        this.cb.call(this.vm, this.vm[this.key])
        
    }
}