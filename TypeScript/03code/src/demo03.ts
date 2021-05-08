// 类的泛型
// 使用上可以分为  在类上 定义 泛型 ,  在类中 使用 泛型 ,  初始化时在 设置 泛型的类型
// 基础使用

class DataManager<T> {
  constructor(private data: T[]) {}
  getItem(index: number): T {
    return this.data[index]
  }
}

const data = new DataManager<string>(['1'])
data.getItem(0)

// 泛型未某个特性的对象

interface Item {
  name: string
}

class DataManager1<T extends Item> {
  constructor(private data: T[]) {}
  getItem(index: number): string {
    return this.data[index].name
  }
}

const data1 = new DataManager1([{name: 'yd'}])
data1.getItem(0)

// 泛型 只能是某些具体类型

class DataManager2<T extends string | number> {
  constructor(private data: T[]) {}
  getItem(index: number): T {
    return this.data[index]
  }
}

const data2 = new DataManager2<string>(['1'])
