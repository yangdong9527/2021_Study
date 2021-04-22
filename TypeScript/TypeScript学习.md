# TypeScript学习

### 基础类型

+ 布尔型 boolean
+ 数字 number
+ 字符串 string
+ 数组
+ 元组
+ 枚举 enum
+ Any
+ void
+ Null 和 Undefined

#### 布尔值

```ts
let isDone: boolean = false;
```

#### 数字

```ts
let num: number = 6;
```

#### 字符串

```ts
let name: string = 'yd'
```

#### 数组

```typescript
// 两种方法用来定义
let list: number[] = [1,2,3]
let list: Array<number> = [1,2,3]
```

#### 元组

元组类型允许你表示一个已知元素数量和类型的数组,在`已知的范围内你必须严格按照规定设置`,`越界的元素则只要求类型为这个范围内就行`

```ts
let x: [string, number]
x[0] = '1' //必须为string
x[1] = 2 //必须为number
x[3] = 3 // 必须在这两个范围内
```

#### 枚举

```ts
enum Color {Red = 1, Green = 2, Blue = 4}
// 通过名字获取值
let c: Color = Color.Green
// 通过值获取名字
let cName: string = Color[2]
```

#### any

当我们不知道这个数据的类型的时候就可以是使用Any

```ts
let x: any = 3
x = 'string'
x = false
let list: any[] = ['1',2,false]
```

#### void

void类型表示没有任何类型, 一个函数没有返回值时可以用void, 一个变量为void 那它就只能时 null 和 undefined

```ts
funct fn():void {}
let unusable: void = undefined;
```

#### null 和 undefined

`默认情况下 null 和 undefined 是所有类型的子类型, 你可以把它们赋值给比如说 object 类型变量`

#### object

```js
function create(o: object | null) :void;
create({prop: 0}); //ok
create('string'); //error
```

#### 类型断言

运行时没有影响, 在编译阶段, 告诉TypeScript, 这个类型我已经检查过了你不用再检查了

```ts
//两种方法
let someValue: any = 'this is a string'
let stringLength: number = (<string>someValue).length
let stringlength: number = (someValue as string).length
```

> 之前凯哥群里说的 as any , 就是用了这个方法, 用来解决报错

`注意啊!当你在Typescript里使用JSX的时候, 只有 as 语法断言是被允许的`



### 变量声明

#### let声明

当用let声明一个变量,它使用的是词法作用域或块作用域, `块作用域变量在包含他们的块或for循环之外是不能访问的`,在catch语句中声明的变量也具有同样的作用域规则

块级作用域变量, 不可以在声明前被调用,会形成暂时性死区

```ts
function foo() {
    return a;
}
foo()
let a;
```

#### cost声明

不能够修改

#### 解构

##### 解构数组

```js
let [first, second] = [1,2]
```

##### 对象解构

```js
// 普通解构
({a, b} = {a: '1', b: '2'})
let {a, ...abc} = {a: '1', b: '2', c: '3'}
// 属性重命名
let {a: newName, b: newName1} = {a:'1', b: '2'}
// 默认值
let {a, b = 1} = {a: 1, b: ''}
```

### 接口

只因人在风中,聚散不由你我



