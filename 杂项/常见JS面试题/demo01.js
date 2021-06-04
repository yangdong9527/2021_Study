// 继承

/**
 * 原型链继承
 * 存在的问题 
 * 问题一: 引用类型数据被共享
 * 问题二: 子类实例化时无法像父类传递参数
 */
function Animal() {
  this.colors = ['black', 'white']
}
Animal.prototype.getColor = function() {
  return this.colors
}

function Dog() {}
Dog.prototype = new Animal()

let dog1 = new Dog()
dog1.colors.push('brown')
let dog2 = new Dog()
console.log(dog2.colors) // ['black', 'white', 'brown']

