// 用法 new Compile（el, vm）

class Compile{
    constructor(el, vm){
        // 要遍历的宿主节点
        this.$el = document.querySelector(el)
        this.$vm = vm;
        console.log('$el',el);
        // 编译
        if (this.$el) {
            this.$fragment = this.node2Fragement(this.$el);
            // 执行编译
            this.complie(this.$fragment);
            this.$el.appendChild(this.$fragment)
        }
    }
    // 将宿主元素中代码片段拿出来遍历，这样做比较高效
    node2Fragement(el){
        const frag = document.createDocumentFragment()
        let child;

        while( child = el.firstChild ){
            frag.appendChild(child)
        }
        return frag
    }
    // 编译过程
    complie(el){
        const childNodes = el.childNodes
        Array.from(childNodes).forEach(node =>{
            // 类型判断
            if ( this.isElement(node) ) {
                // 元素
                console.log('编译元素'+node.nodeName);
                
            } else if( this.isInterpolation(node) ) {
                // 文本
                console.log('编译文本'+node.textContent);
                this.complieText(node)
            }
            // 递归子节点
            if (node.childNodes && node.childNodes.length > 0) {
                this.complie(node)
            }
        })
    }

    complieText(node){
        console.log(RegExp.$1);
        node.textContent = this.$vm.$data[RegExp.$1]
        this.update(node, this.$vm, RegExp.$1, 'text' )
    }

    update(node, vm, exp, dir){
        const updaterFun = this[dir+'Updater']
        //  初始化
        updaterFun && updaterFun(node, vm.$data[exp])
        // 依赖收集
        new Watcher(vm, exp, function(val){

            updaterFun && updaterFun(node, val)
        } )
        // 
    }
    textUpdater (node, value){
        node.textContent=value
    }
    isElement(node){
        return node.nodeType  ===1
    }

    // 插值文本
    isInterpolation(node){
        return node.nodeType === 3  && /\{\{(.*)\}\}/.test(node.textContent);
    }
}