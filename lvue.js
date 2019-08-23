//new lVue({data:{...}})

class LVue {
    constructor(options) {
        this.$options = options;

        //数据响应化
        this.$data = options.data;
        this.observe(this.$data);
    }

    observe(value) {
        if(!value || typeof value !== 'object') {
            return;
        }

        //遍历对象
        Object.keys(value).forEach(key => {
            //给data里的每个属性都绑定get和set
            this.defineReactive(value, key, value[key])
        })
    }

    //数据响应化
    defineReactive(obj, key, val) {
        //递归，看val是否为对象
        this.observe(val);

        Object.defineProperty(obj, key, {
            get(){
                return val;
            },
            set(newVal){
                if(newVal === val) {
                    return;
                }
                val = newVal;
                console.log(`${key}属性更新了：${val}`);
            }
        })
    }
}