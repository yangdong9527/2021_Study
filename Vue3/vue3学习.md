## Vue 动画

### 单元素组件过渡动画

首先理解`动画`和`过渡`, 其中过渡主要是通过`transition`属性实现属性之间的过渡, 而动画则是通过`@keyframes`定义动画然后通过`animation`实现动画效果

#### 单元素组件的过渡和动画效果

**过渡实现**

```vue
// 使用过渡属性实现
<style>
.v-enter-form {
    opacity: 0
}
.v-enter-active,
.v-leave-active {
    transition: opacity 3s ease-out;
}
v-enter-to {
    opacity: 1
}
.v-leave-form {
    opacity: 1
}
.v-leave-to {
    opacity: 0
}
<style>
<template>
	<transition>
    	<div v-show="show">yd</div>
    </transition>    
</template>
```

**动画实现**

```vue
// 使用过渡属性实现
<style>
@keyframes animation01 {
    0% {
        opacity: 0
    }
    100% {
        opacity: 1
    }
}
.v-enter-active {
    animation: animation01 0.3s
}
.v-leave-active {
    animation: animation01 0.3s
}
<style>
<template>
	<transition>
    	<div v-show="show">yd</div>
    </transition>    
</template>
```



#### 自定义动画名称

**给transition组件添加name属性**

```vue
// 使用过渡属性实现
<style>
.hello-enter-form {
    opacity: 0
}
.hello-enter-active,
.hello-leave-active {
    transition: opacity 3s ease-out;
}
hello-enter-to {
    opacity: 1
}
.hello-leave-form {
    opacity: 1
}
.hello-leave-to {
    opacity: 0
}
<style>
<template>
	<transition name="hello">
    	<div v-show="show">yd</div>
    </transition>    
</template>
```

**直接在transition组件上指定各个状态class名称**

使用这种方法的好处是可以使用`外部的动画库`

// 使用过渡属性实现

// 引入外部的 css 库
```vue
<template>
	<transition enter-active-class="animate_animated animate__bounce">
    	<div v-show="show">yd</div>
    </transition>    
</template>
```

> transition 组件上的属性, `type`和`duration` 可以控制当即使用 动画 又使用了 过渡时的 执行时间的一致性

#### 使用JS实现动画



### 多个单元素切换效果

transition 上的两个属性 `mode`和`appear` 经常配合使用

```vue
<template>
	<transition mode="out-in">
    	<div v-if="show">1</div>
    	<div v-else>2</div>
    </transition>
</template>
<style>
    .v-enter-form {
        opacity: 0
    }
    .v-enter-action {
        transition: opacity 3s
    }
    .v-enter-to {
        opacity: 1
    }
</style>
```

### 列表动画的实现

使用`transition-group`组件, 相比加下多了一个`v-move`的一个样式

```vue
<template>
	<transition-group>
        <div v-for="(item) in 5" :key="item">{{item}}</div>
    </transition-group>
</template>
<style>
    .v-move {
        transition: all .3s; // 该属性控制其他元素变化的样式
    }
    ...
</style>
```

### 状态动画

扩展的化 就是 结合 svg 实现动画

## Vue 中的高级语法

### Mixin 混入

需要注意的有 :

+ 组件 data, methods 的优先级 高于 mixin  
+ 生命周期函数, 先执行 mixin 里面的, 再执行 组件里面的

> Vue3 中 不建议再使用 mixin 了, 因为 mixin 的的使用不好维护, vue3 中已经有替换的方式了



### 自定义指令

当你想通过 数据的变化 来进行一些操作的时候, 可以使用 自定义指令 是不是可以用来 写一个 监听滚动固定到某个位置

详见官网文档

### Teleport 传送门功能

`teleport`可以把一个组件的某个元素 直接挂载到其他元素内, 比如 : 要实现一个蒙版的功能的时候, 可以将元素直接挂在到 body 元素下 进行定位



### render 函数

在vue中平时使用的都是`template`组件书写模板语法, 其实vue还提供了一个 `render()`函数的方法, 使用案例: 通过外部属性生成 不同等级的 标题标签

```javascript
app.component('my-title', {
	props: ['level'],
	render() {
		const {h} = Vue;
		return h('h' + this.level, {}, this.$slots.default()); // 第一个参数为生成的标签名称, 第二个参数为标签上的属性, 第三个参数为标签内的内容,  第三个参数 可以是一个数组, 数组中 可以继续写 h 函数 如下
	}
})
// return h('h1', {name: 'yd'}, [
 this.$slots.default(),
 h('h4', {}, 'dell')
])
// 这里的 h 函数就是用来返回一个 虚拟DOM(对象)
```

vue中 把 `template`变成`render`函数, `render`函数返回一个虚拟的DOM(虚拟DOM映射真实的DOM),  这样做的优势就是, 第一点 它可以让 vue 的性能更快, 第二点 让他具备了跨平台的能力, 不经可以写网页上的东西, 还可以 通过 weex 来写移动端的东西

`虚拟DOM就是一个JS对象, 他是对真实DOM的映射`

流程就是

template => render => 虚拟DOM => 真实DOM => 展示到页面上

### 插件的定义和使用

vuex 和 vue-router 就是这样子封装, 然后扩展全局的属性

`个人感觉 相比较于使用 mixin 进行混入操作, 更好的方法是使用 插件的方式来做`  **一定要学会用这个来代替mixin操作**

```javascript
const myPlugin = {
    install(app, options) {
        app.provide('name', 'Dell lee') //全局的参数
        app.directive('focus', {
            mouted(el) {
                el.focus()
            }
        })
        // 对 vue 全局属性的扩展
        app.config.globalProperties.$sayHello = "hello word"
    }
}

//vue 中使用
vue.use(myPlugin, {name: 2})
```

### 对数据校验的插件开发案例

```html
<script>
	const app = Vue.craetApp({
        data() {
            return {name: 'dell', age: 28}
        },
        rules: {
            age: {
                validate: (age) => {return age > 25},
                message: 'too young to simple'
            }
        }
    })
    
    let validatePlugin = (app, options) => {
        app.mixin({
        created() {
                for(let key in this.$options.rules) {
                    const item = this.$options.rules[key]
                    this.$watch(key, () => {
                        const result = item.validate(key);
                        if(!result) console.log(item.message)
                    })
                }
            }
        })
    }
    
    app.use(validatePlugin);
    
    const vm = app.mout('#root')
</script>
```

## 章小结

#### 1. 通过动画和过度实现Vue动画效果(单元素)

首先分清`动画`和`过渡`, 动画指定的通过自定义动画然后再`v-enter-active`中使用实现, 过渡则是在`v-enter-active`中使用transition属性实现

#### 2. 自定义动画名以及使用外部的动画

**自定义动画名**需要在`transition`组件上添加`name`属性, 比如设置name属性为hello,那么之前的改为`hello-enter-from`

**直接设置Class**, Vue 在`transition`上提供了`enter-from-class enter-active-calss ...`等等, 可以直接设置自定义的class, **扩展** 就可以引入第三方的动画样式

#### 3. 多个单元素切换效果

就是在`transition`组件中有多个元素或者是多组件切换的切换效果, 一般配合者过渡模式mode一起使用

#### 4. 列表过渡

列表过渡使用的是`transition-group`组件, 新增了一个`v-move`样式控制元素改动后其他元素的变化

其实`transition-group`内部使用一个 FLIP简单动画队列,使我们列表的一切变化都会有动画, 有一个前提条件`内部元素不能是 display: inline`

#### 5. 还有两个不常用但是能处理特殊的动画

**JS实现动画**

**状态动画** SVG 应用

####  6. transition 上的属性

+ `name`: 自定义CSS 过渡类名
+ `appear`: 是否在初始渲染的时候使用过渡动画
+ `mode`: 控制进入/离开的时间序列, 有 'out-in' 和 'in-out'
+ `duration`: 过渡持续时长
+ `type`: 决定过渡持续时间类型
+ `enter-class`: ...
+ ...

#### 7. Teleport 传送门功能

可以将组件内的某个元素,直接挂载到自定元素内

#### 8. render 函数

首先来了解下Vue的渲染流程, Vue先将template模板语法转换成render函数,render函数生成返回虚拟DOM,虚拟DOM映射着真实的DOM,然后将真实DOM展示到页面上

> 虚拟DOM就是一个JS对象,他是对真实DOM的映射
>
> 之所以要转为虚拟DOM的原因: 第一, 这样可以让Vue的性能更快,第二,让他具备了跨平台的能力,不仅可以写网页的东西,开可以借助weex写移动端的东西

#### 9. 插件的使用

主要是插件的使用场景

+ 添加全局的方法或者property
+ 添加全局的资源 :  指令/过滤器
+ 通过全局混入添加一些组件选项
+ ...

## Vue3 新增Composition API

Composition API 产生的原因,是为了更好的开发和维护代码

### 1. Setup 函数的使用

```javascript
const app = Vue.createApp({
    template: `
		<div @click="handleClick">{{name}}</div>
	`,
    setup(props, context) { // setup函数是在 created 实例被完全初始化之前
        return {
            name: 'ydd',
            handleClick: () => {
                alert(123)
            }
        }
    }
})
```

setup函数返回一个对象, 这个对象中的内容可以在外部调用, setup函数中不允许使用this

### 2. ref 和 reactive 响应式的引用

首先通过`setup()`定义的数据并不是响应式的数据,为此Vue3, 提供了 `ref` 和 `reactive` 来转化,通过`proxy`来转换成一个响应式的引用,其中两者之间的使用场景是有区别的

> 插播一条, ref 和 reactive 是将某些值转换然后得到一个响应式的引用, 所以我们return的时候是return这些转换后得到的引用而不是将这些值转换出去

**ref 用来处理基础类型的数据**

```html
<script>
	const app = Vue.createApp({
        template: `
			<div>{{name}}</div>
		`,
        setup(props, context) {
            const { ref } = Vue;
            let name = ref('dell');
     		setTimeout(() => {
                name.value = 'ydd'; // 需要注意的是 proxy 接受的是一个对象, 所以vue自动帮你转为了proxy({value: dell}) 的响应式引用
            },200)
            return {name}
        }
    })
</script>
```

基础类型的数据转化为响应式类型的数据使用`ref`转换, 但是由于 `proxy`接收的是 对象, 于是基础类型的数据被封装了一层`{value: 基础类型值}`, 然后在模板中Vue又十分人性化的可以直接使用

**reactive用来处理非基础类型的数据**

```html
<script>
	const app = Vue.createApp({
        template: `
			<div>{{nameObj.name}}</div>
		`,
        setup(props, context) {
            const { reactive } = Vue;
            let nameObj = reactive({name: 'yd'});
     		setTimeout(() => {
                nameObj.name = 'ydd';
            },200)
            return {nameObj}
        }
    })
</script>
```

`reactive`是用来转换非基础类型的数据,从而获取到响应式的引用

**readonly只读的引用**

除了上面两个Vue3还提供了一个只读属性,无法进行修改

**toRefs用来解构reactive对象**

`原理`: `toRefs()` 会将 reactive转化后的对象引用 `proxy({name: 'ydd'})` 转换成 `{name: proxy({value: ydd})}`, 就是将 reactive转换后的引用中的每一项都转换成了`ref`类型

```html
<script>
	const app = Vue.createApp({
        template: `
			<div>{{name}}</div>
		`,
        setup(props, context) {
            const { reactive } = Vue;
            let nameObj = reactive({name: 'yd'});
     		let {name} = toRefs(nameObj);
            return {name}
        }
    })
</script>
```

### 3. toRef 以及 context 参数

##### 3.1 toRef基础

`toRefs`在解构获取`reactive`对象中某个值的时候,如果一开始这个值不存在,会直接给一个undefined,而不会返会一个默认的响应式的引用, 而 通过`toRef`去获取`reactive`的引用中某个不存在的值的时候,还是会返回一个默认的响应式引用

```html
<script>
	const app = Vue.createApp({
        template: `
			<div>{{age}}</div>
		`,
        setup(props, context) {
            const { reactive } = Vue;
            let nameObj = reactive({name: 'yd'});
     		let age = toRef(nameObj, 'age');
            return {age}
        }
    })
</script>
```

`但是`不建议这样做, 你可以直接在`reactive`对象中加上这个参数 默认给个空就好了

##### 3.2 context 参数中的值

首先在`setup`函数中接受的`context`对象中有三个参数

+ `attrs`接收所有的None-props属性,就是组件外部属性没有被props接受的参数
+ `emit`就是以前的触发自定义事件的参数
+ `slots`对象返回的是一个各个插槽的内容

```html
<script>
const app = Vue.createApp({
    template: `<child>params</child>`
})
app.component('child', {
    setup(props, context) {
        const h = Vue;
        const {attrs, slots, emit} = context
        //return () => h('div', {}, slots.default());
        function handleClick() {emit('change')}
        return {
            handleClick
        }
    }
})
</script>
```

### 4. 使用Composition API 来实现TodoList的案例

`老实完成实例练习`

### 5. computed方法生成计算属性

 Vue3 提供了一个 `computed`的方法, 使用上其实和以前类型, 复杂写法可以设置`get() 和 set()`

```html
<script>
	const app = Vue.createApp({
        template: `
			<div>{{countAddFive}}</div>
		`,
        setup(props, context) {
            const { ref, computed } = Vue;
            const count = ref(0)
            const countAddFive = computed(() => {
                return count.value + 5
            })
            return {count, countAddFive}
        }
    })
</script>
```



### 6. watch 和 watchEffect 的使用

#### 6.1 watch 在setup函数中的使用

```html
<script>
	const app = Vue.createApp({
        setup(props, context) {
            const { ref, reactive, watch } = Vue;
            // 监听一个基础类型的数据时
            //let name = ref('yd')
            //watch(name, (currName, prveName) => {
            //    console.log(currName, prveName)
            //})
            //return {name}
            
            //监听非基础类型的数据时
            //let nameObj = reactive({name: 'yd'})
     		//watch(() => nameObj.name, (currName, prveName) => {
            //    console.log(currName, prveName)
            //})
            //let {name} = toRefs(nameObj)
            //return {name}
     		
            //监听多个属性变化
            let tempObj = reactive({name: 'yd', age: '1'})
            watch([() => tempObj.name, () => tempObj.age], ([currName, currAge], [prveName,prveAge]) => {
                console.log(currName)
            })
            return {tempObj}
        }
    })
</script>
```

主要常用的方式有,监听基础类型数据,监听非基础类型的数据,以及监听多个属性的变化, `注意watch监听是惰性的, 一开始并不会执行`

#### 6.2 watchEffect 的使用

```html
<script>
	const app = Vue.createApp({
        setup(props, context) {
            const { ref, watchEffect } = Vue;
            let name = ref('yd')
            const stop = watchEffect(() => {
                console.log(name.value)
            })
            return {name}
        }
    })
</script>
```

#### 两者的区别

+ watch 是惰性的, 不会立即执行代码, 而watchEffect则是会立即执行一次代码
+ watch需要指定监听对象, 当监听对象发生改变的时候,会执行代码, 而watchEffect不需要指定监听对象,而是代码内部依赖参数发生改变时,就会自动执行代码,不需要特意指定监听
+ watch可以拿到之前的数据, 而 watchEffect 不能拿到之前的那个值

### 7. 生命周期函数的写法

在setup中调用生命周期函数, 需要注意的是 setup 函数的调用是位于 `beforeCrate 和 created 之间的`

```javascript
// beforeMount => onBeforeMount
// mounted => onMounted
// beforeUpdate => onBeforeUpdate
// beforeUnmount => onBeforeUnmount
// unmouted => onUnmouted
// onRederTraked // 每次渲染后重新收集响应式依赖
// onRenderTriggered // 每次触发页面重新渲染时自动执行
```

### 8. provide, inject 模板, Ref 的用法

```html
<script>
	const app = Vue.createApp({
        setup(props, context) {
            const {provide, ref, readonly} = Vue;
            let name = ref('yd')
            provide('name', readonly(name))
            return {name}
        }
    })
    app.component('child', {
        setup() {
            const {inject} = Vue
            let name = inject('name', 'defaultVal')
            return {name}
        }
    })
    
</script>
```

需要说明的一点就是 `provide`的参数不能够在子组件中修改 要满足 单一数据流规则, 可以使用`readonly`解决

## CompositionAPI 章总结

Vue3之前代码写到后期会十分的混乱,数据与逻辑交叉在一起,不方便后期代码的维护,提供了CompositionAPI来更好的封装维护代码

### 1. setup函数

setup函数自调用在beforeCreate和created生命周期函数之间,注意setup直接返回的数据是不具备响应式的, steup接受两个参数 props 和 context,

`特别说明一点: setup中不能使用this`

### 2. ref函数和reactive函数获取响应式的引用

Vue3,提供了两个函数方法`ref`和`reactive`用来转化数据得到数据的响应式应用, 这里需要注意的是,`ref`是用来处理基础类型的数据,而`reactive`是用来处理非基础类型的数据的

**两者处理数据的原理是:**

`ref`:  ref('yd')  =>   proxy({value: 'yd'})  `reactive`: reactive({name: 'yd'})   =>  proxy({name: 'yd'})

需要说明的是因为proxy代理的是对象,所以基础类型的数据都被Vue转换成了{vlaue: ''}的格式

### 3. toRefs 和 toRef 两个函数的区别

两者都是作用在`reactive`转换得到的响应式引用,其中`toRefs`是用来结构响应式引用的, 而`toRef`则是用来获取引用中指定的值

```javascript
const app = Vue.createApp({
    setup() {
        let {reactive, toRefs, toRef} = Vue;
        let nameObj = reactive({name: 'age'})
        let {name} = toRefs(nameObj)
        let name1 = toRef(nameObj, 'name')
        return {name, name1}
    }
})
```

**两者唯一的区别是**: `toRefs`如果结构一个不存在的值, 得不到一个不存在的响应式引用, 而 `toRef`则可以生成一个有默认值的响应式引用

### 4. context 中的参数

setup接受的第二个参数`context`接受一个对象,对象内有三个参数:

+ attrs: 组件外部没有被props记录的属性
+ slots: 插槽
+ emit:触发自定义事件

### 5. computed函数

Vue3提供了一个`computed 函数`, 只是用函数的方式,功能上和以前的其实差不多

### 6. watch 和 watchEffect 的使用

`watch`的基础操作有

+ 监听一个基础类型的数据
+ 监听一个非基础类型的数据
+ 同时监听多个数据

`watchEffect`的使用和watch不用,它不需要特意指定监听参数, 而是关系内部依赖的响应数据

**两者的区别**

+ `watch`是惰性的, 一开始不会执行内部代码,而`watchEffect`则会自动先执行一次代码
+ `watch`需要指定监听参数,而`watchEffect`不需要,自动监听内部依赖的响应式引用
+ `watch`中可以获取上一次参数,而`watchEffect`只能获取当前参数

### 7. setup中使用生命周期函数

相比较之前, 新增了两个生命周期函数

### 8. provide, inject 的使用

需要注意的是`provide,inject`的使用过程需要满足单向数据流规则, 所以我们最好使用`readonly`来传递响应式引用数据



## Vue开发配套工具开发

### 1. VueCLI的使用

#### 基础环境

```javascript
// 安装 nrm , 修改npm 下载地址
npm install nrm -g

nrm ls

nrm use taobao
```

#### 安装VueCLI工具

+ 先卸载老版本的脚手架工具

  `npm uninstall vue-cli -g`

+ 安装最新的

  `npm install -g @vue/cli`

### 2. Vue-Router 使用

`内容略过`

### 3. VueX的使用

`内容略过`

### 4. CompositionAPI中使用Vuex

```vue
<script>
    import {toRefs} from 'vue'
	import {useStore} from 'vuex'
    export default {
        name: 'Home',
        setup() {
            const store = useStore()
            const {name} = toRefs(store.state)
            return {name}
        }
    }
</script>
```



## 项目实战开始



### 首页开发

#### 1. 初始化样式

```js
// 安装
npm install normalize.css --save
// 引入
import 'normalize.css'
```

#### 2. 布局过程

**网络图片加载慢导致布局抖动**







