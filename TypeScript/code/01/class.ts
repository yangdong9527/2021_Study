// class Animal {
//   name = "hdd";
//   getName() {
//     return this.name;
//   }
// }

// class Cat extends Animal {
//   getName() {
//     return super.getName() + "cc";
//   }
// }

// const cat = new Cat();
// console.log(cat.getName());

// class Dog {
//   // 简化写法
//   constructor(public nmae: string) {}
// }

// // 访问类型 public private

// // geter 和 setter
// class Person {
//   constructor(private _name : string) {}
//   get name() {
//     // 拿到的数据被处理过
//     return this._name + ' goods'
//   }
//   set name(name: string) {
//     const realName = name.split(' ')[0]
//     this._name = realName
//   }
// }

// let person = new Person('yd')
// console.log(person.name)
// person.name = 'ydd goods'
// console.log(person.name)

// // 实现一个单例类
// class Demo {
//   private static instance: Demo;
//   private constructor(public name: string) {}

//   static getInstance() {
//     if(!this.instance) {
//       this.instance = new Demo('yd')
//     }
//     return this.instance
//   }
// }
// const demo1 = Demo.getInstance()
// const demo2 = Demo.getInstance()
// console.log(demo1.name)
// console.log(demo2.name)

abstract class Person {
  name: string;
  abstract sayHi() : string;
}

class Teacher extends Person {
  name = 'yd';
  age = 23;
  sayHi() {
    return 'yd'
  } 
}
