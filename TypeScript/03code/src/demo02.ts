// 泛型 generic 泛指的类型

function join<T, P>(first: T, second: P) {
  return `${first}${second}`
}

join<string, number>('1', 1)

function map<T>(params: Array<T>) {
  return params
}
map<string>(['1','2'])