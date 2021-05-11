/**
 * interface 相关的知识点
 * 基础概念
 * 1. interface 可以被用来定义对象和一个函数
 * 2. interface 仅仅只是TS提供给我们的一个类型校验的工具,编译成javaScript后会别剔除掉
 * 特殊的用法
 * 1. 定义一个只读属性, 定义一个可存在也可不存在的值 定义一个函数 解决用字面量的方式赋值是报错问题
 * 2. 接口的继承
 * 3. 类应用一个接口, 将接口的属性定义到类里面
 */

// interface Person {
//   name: string;
//   readonly age: number; // 只读
//   sex?: string; // 该属性可有可无
//   [propsName: string]: any; // 解决字面量的方式使用 多余的参数报错
//   say(): string;
// }

// const getPersonName = (person: Person): void => {
//   console.log(person.name);
// };

// //  字面量的方式使用和 赋值的方式使用
// // 如果没有加上面的 [propsName: string] 而使用这种字面量的方式 就会报错
// getPersonName({
//   name: "yd",
//   age: 12,
//   say: () => {
//     return "123";
//   },
//   color: "black",
// });

// // 接口的继承
// interface Teachers extends Person {
//   teach(): string;
// }

// // 类应用接口
// class Abc implements Person {
//   name: "yd";
//   age: 12;
//   say() {
//     return "123";
//   }
// }

let a: number[] = [1,2,3]
let b: number[] = a
b[0] = 1
