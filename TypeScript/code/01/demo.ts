// // 基础静态类型 null undefined symbol boolean void any
// const count: number = 123;
// const tsName: string = "yd";
// // 对象类型
// class Person {}

// const teacher: {
//   name: string;
//   age: number;
// } = {
//   name: "yd",
//   age: 12,
// };

// const numbers: number[] = [1, 2, 3];

// const yd: Person = new Person();

// const getTotal: () => number = () => {
//   return 123;
// };

// // 函数相关
// const func = (str: string): number => {
//   return parseInt(str);
// };
// const func1: (str: string) => number = (str) => {
//   return parseInt(str);
// };

// // 无法通过类型推断出来的 我们可以使用 interface 定义一个
// interface Person {
//   name: string;
// }
// const rawData = '{"name": "yd"}';
// const newData: Person = JSON.parse(rawData);

// interface Teacher {
//   name: string;
// }
// const ydd: Teacher = {
//   name: "yd",
// };

// const yddd: {
//   name: string;
// } = {
//   name: "yd",
// };
// const fn = (str: string): number => {
//   return parseInt(str);
// };
// const fn1: (str: string) => number = (str) => {
//   return parseInt(str);
// };
// const fn2: ({ str, num }: { str: string; num: number }) => void = ({
//   str,
//   num,
// }) => {
//   console.log(str + num);
// };
// /**
//  * 数组与元组相关
//  */
// const numberArr = [1, 2, 3];
// const stringArr: string[] = ["1", "2"];
// const arr: (string | number)[] = [1, "2"];

// const objectArr: { name: string }[] = [];
// // 类型别名 type alias
// type User = { name: string; age: number };
// const objectArr1: User[] = [
//   {
//     name: "yd",
//     age: 12,
//   },
// ];
// const teacherInfo: [string, string, number] = ["1", "2", 3];
// const teacherList: [string, string, number][] = [
//   ["1", "2", 3],
//   ["1", "2", 3],
// ];
