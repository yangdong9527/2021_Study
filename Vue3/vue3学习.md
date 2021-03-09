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



