enum Status {
  OFFLINE,
  ONLINE = 4,
  DELETED
}

// 对应值为  0  4  5

/**
 * 默认从 0 还是 
 * 两者间相互映射  可正向使用 也可反向使用
 */

console.log(Status.OFFLINE)  //  0
console.log(Status[0]) //  OFFLINE