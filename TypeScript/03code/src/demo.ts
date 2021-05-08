interface Bird {
  fly: boolean;
  sing: () => {}
}

interface Dog {
  fly: boolean;
  brak: () => {}
}

// 类型断言
function trainAnial(animal: Bird | Dog) {
  if(animal.fly) {
    (animal as Bird).sing()
  } else {
    (animal as Dog).brak()
  }
}

// 使用 in 语法
function trainAnialSecond(animal: Bird | Dog) {
  if ('sing' in animal) {
    animal.sing()
  } else {
    animal.brak()
  }
}

// 使用 typeof
function add(first: string | number, second: string | number) {
  if(typeof first === 'string' || typeof second === 'string') {
    return `${first}${second}`
  } else {
    return first + second
  }
}

// 使用 instanceOf
class NumberObj {
  count: number
}
function addSecond(first: object | NumberObj, second: object | NumberObj) {
  if(first instanceof NumberObj && second instanceof NumberObj) {
    return first.count + second.count
  }
  return 0
} 