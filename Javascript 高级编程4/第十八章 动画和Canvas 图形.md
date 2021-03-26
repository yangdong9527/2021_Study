## 动画和Canvas 图形

### requestAnimationFrame 使用

#### 基础

浏览器知道CSS过渡和动画应该什么时候开始, 并计算出正确的时间, 到时间就去刷新界面, 但是对于JS动画浏览器不知道什么时候开始, 于是产生了 requestAnimationFrame() 告诉浏览器,要执行动画了

`requestAnimationFrame()`接受一个参数, 这个参数是在重绘屏幕前调用的函数,用来修改DOM 的,为实现动画循环,可以把多个`requestAnimationFrame()`串联起来

```js
function updateProgress() {
    let div = document.getElementById('status')
    div.style.width = (parseInt(div.style.width, 10) + 5) + '%'
    if(div.style.left != '100%') {
        requestAnimationFrame(updateProgress)
    }
}
requestAnimationFrame(updateProgress)
```

#### cancelAnimationFrame

取消重绘任务

```js
let requestId = window.requestAnimationFrame(() => {})
window.cancelAnimationFrame(requestId)
```

#### 通过 requestAnimationFrame 节流

原理是 调用`requestAnimationFrame`是的回调函数会被递归的添加到队列中, 但是他能保证, 每次重绘只调用一次回调

```js
let enabled = true

function expensiveOperation() {
    console.log(Date.now())
}
window.addEventListener('scroll', () => {
    if(enabled) {
        enabled = false
        window.requestAnimationFrame(expensiveOperation)
        window.setTimeout(() => enabled = true, 50)
    }
})
```

以上就是 通过 `requestAnimationFrame()`控制在浏览器那个渲染周期中执行, 通过计时器限制实际的此操作间隔

### 基本画布功能

创建Canvas标签时,至少要设置width和height属性,canvas标签内的文字表示不支持canvas时显示内容

```html
<canvas width="200" height="200">不支持canvas</canvas>
```

要想在画布上操作,首先需要取得绘图上下文,使用getContext()方法可以获取上下文

```js
let drawing = document.getElementById('drawing')
// 确保浏览器支持 canvas
if(drawing.getContent) {
    let context = drawing.getContent('2d')
}
```

可以使用toDataURL()方法到处canvas元素上的图像,这个方法接受一个参数, 要生成图像的MIME类型

```js
let drawing = document.getElementById("drawing")
if(drawing.getContext) {
    let imgURL = drawing.toDataURL("image/png")
    let image = docuemnt.createElement('img')
    img.src = imgURL
    document.body.appendChild(image)
}
```



### 2D绘图上下文

2D绘图上下文提供了绘制2D图形的方法, 2D上下文的坐标原点是canvas元素的左上角

#### 填充和描边

2D上下文提供了两个属性 :  fillStyle 和 strokeStyle 来为形状自动填充和描边

```js
let drawing = document.getElementById('drawing')
if(drawing.getContext) {
    let context = drawing.getContext('2d')
    context.fillStyle = 'red'
    context.strokeStyle = '#0000ff'
}
```

这里就是设置了填充颜色和描边颜色, 后面的所有填充和描边操作都会使用这两个属性

#### 绘制矩形

矩形是唯一一个可以直接在2D绘图上下文中绘制的形状,与绘制矩形相关的方法有三个: fillRect() strokeRect() clearRect() , 这些方法 都接收4个参数, 矩形x坐标 矩形 y 坐标, 宽度 高度, 单位像素

+ fillRect()  方法用指定颜色在画布上绘制并填充矩形, 颜色就是上面的 fillStyle
+ strokeRect() 方法 使用 指定颜色 绘制矩形轮廓
+ clearRect() 方法是可以擦掉画布总某个区域, 将某个区域变透明

#### 绘制路径

要在画布上绘制路径, 需要先调用 beginPath() 方法以表示要开始绘制新路径, 然后再用一下方法来绘制路径

+ arc(x, y, radius, startAngle, endAngle, counterclockwise) : 以 (x,y) 为原点, radius 为半径, startAngle 为起使角度, endAngle 为结束角度,  最后一个参数 counterclockwise 表示是否逆时针计算起使角度和结束角度
+ arcTo(x1, y1, x2, y2, radius) 以 给定半径, 经由(x1,x2) 绘制一条到 (x2,y2) 的弧线
+ bezierCurVeTo(c1x, c1y, c2x, c2y, x, y):  以 (c1x, c1y) 和 (c2x, c2y) 为控制点, 绘制一条从上一点到 (x,y) 的弧线
+ lineTo(x,y): 绘制一条从 上一点到 (x,y) 的直线
+ moveTo(x,y): 不绘制线条, 只是把绘制光标移到(x,y)
+ quadraticCurveTo(cx, cy, x, y): 以 (cx, cy)为控制点, 绘制一条从上一点到 (x,y)的弧线(二次贝塞尔曲线)
+ rect(x, y, width, height):  以给定宽度和高度在坐标点 (x,y) 绘制一个矩形, 这个方法和绘制矩形不一样, 它创建的是一个路径, 而不是独立图形

创建完成路径后, 可以使用closePath()方法绘制一条返回起点的线, 如果路径完成, 可以用 fill() 方法来填充路径, 也可以使用 stroke() 方法描边路径, 还可以使用 clip() 方法基于路径创建一个 新剪切区域

案例: 绘制一个表盘

```js
let drawing = document.getElementById("drawing")

if(drawing.getContext) {
    let context = drawing.getContext("2d")
    // 开始绘画
    context.beginPath()
    // 绘制外圆
    context.arc(100, 100, 99, 0, 2*Math.PI, false)
    // 绘制内圆
    context.moveTo(194, 100)
    context.arc(100, 100, 94, 0, 2*Math.PI, false)
    // 绘制分针
    context.moveTo(100,100)
    context.lineTo(100, 15)
    // 绘制时针
    context.moveTo(100, 100)
    context.lineTo(35, 100)
    // 描画路径
    context.stroke();
}
```

路径还是很重要的, 提供了一个方法 isPointInPath(x,y) 用来确定指定的点是否在路径上, 可以在关闭路径前随时调用

#### 绘制文本

2D绘制上下文提供了绘制文本的方法, fillText() 和 strokeText() 这两个方法都接受4个参数, 要绘制的字符串, x 坐标, y坐标, 和可选的最大像素宽度, 这两个方法的最终绘制结果都取决与一下3个属性

+ font: 指定 字体, 大小,  比如,  '10px Arial'
+ textAlign: 指定文本的对齐方式, 包含  start  end  left right center
+ textBaseLine: 指定文本的基线, 包括的值  top  hanging middle alphabetic  ideographic bottom

由于绘制文本很复杂, 当我们想把一个文本会知道指定区域的时候,不知道设置多少字体的时候, 可以通过measureText()方法, 获取当前字体大小绘制指定文字的宽度

```js
let fontSize = 100;
context.font = fontSize + "px Arial"
while(context.measureText("Hello wrod").width > 140) {
    fontSize--;
    context.font = fontSize + "px Arial"
}
context.fillText("Hello wrod", 10, 10)
```

#### 变换

以下方法 可以改变绘制上下文的变换矩阵

+ rotate(angle): 围绕原点选择angle 弧度
+ scale(scaleX, scaleY): 缩放
+ translate(x,y): 把原点移动到 (x,y), 执行这个操作后, 坐标 (0,0) 就会变成 (x,y), 那么所有的操作就是相对于这个点
+ transform(m1_1, m1_2, m2_1, m2_2, dx, dy): 像下面这样 通过矩阵乘法直接修改矩阵
+ setTransform()

如果你想保存当前的属性和变换状态, 可以使用 save() 方法, 会保存这一时刻设置的东西存在一个暂存栈中, 保存后可以继续修改上下文, 而在需要恢复之前上下文的时候, 可以调用 restore()

```js
context.fillStyle = '#ff0000'
context.save()
context.fillStyle = '#00ff00'
context.save()
context.fillStyle = '#0000ff'
context.fillRect(0, 0, 100, 200)
context.restore();
context.fillRect(10, 10, 100, 200); // 在(100, 100)绘制绿色矩形
context.restore();
context.fillRect(0, 0, 100, 200);
```

一开始设置fillStyle, 为红色, 然后保存, 然后设为绿色, 保存, 在设为蓝色, 然后绘制颜色, 然后使用 restore() 返回上一次, 在 绘制 , 在返回 在绘制

#### 绘制图像

如果想把现有图像绘制到画布上, 可以使用 drawImage() 方法, 这个方法接受三组参数, 产生不同的效果, 最简单是传入一个HTML的img元素, 以及表示绘制目标的x和y坐标, 表示将图像绘制到指定位置

```js
let image = document.images[0]
context.drawImage(image, 10, 10)
```

如果想改变绘制图像大小, 再传入两个参数, 目标宽度, 目标高度

```js
context.drawImage(image, 50, 10, 20,30)
```

还可以只把图像绘制到上下文中的一个区域, 需要传9个参数, 要绘制的图像, 源图像x坐标, 源图像y坐标,源图像宽度, 源图像高度, 目标区域x坐标, 目标区域y坐标, 目标区域宽度和高度

```js
context.drawImage(image, 0, 10, 50, 50, 0, 100, 40, 60); 
```

解释, 原始图像中只有一部分会绘制到画布上, 这一部分从(0,10)开始, 50像素宽, 50像素高, 而绘制到画布上时, 会从(0.100)开始, 变成40像素宽, 60像素高

结合一些其他方法, drawImage()方法可以方便的实现常见图像操作, 操作结果可以使用toDataURL()方法获取, 注意有一种情况例外, 当绘制的图像来自其他域而非当前页面, 则不能获取数据, 此时调用 toDataURL() 方法, 会报错

#### 阴影

2D可以设置形状和路径生成阴影

+ shadowColor: 颜色
+ shadowOffsetX: 阴影相对于 x 坐标的偏移量
+ shadowOffsetY: 阴影相对与 y 坐标的偏移量
+ shadowBlur: 像素

#### 渐变

渐变通过CanvasGradient 实例, 在上下文中创建和修改都非常简单

创建一个新的线性渐变, 可以调用上下文的 createLinearGradient() 方法, 接受四个参数, 起点 x 坐标, 起点y坐标, 终点x坐标, 和 终点y坐标, 调用该方法, 会创建一个新的CanvasGradient对象并返回实例

有了 gradient 对象后, 接下来使用 addColorStop()方法为渐变指定色标, 这个方法,接受两个参数,  位置  颜色

```js
let gradient = context.createLinearGradient(30,30,70,70)
gradient.addColorStop(0, 'white')
gradient.addColorStop(1, 'black')
```

你也可以把这个对象赋值为 fillStyle 或者 strokeStyle 属性 从而用渐变填充或者描画绘制图像

创建一个径向渐变

#### 图案

图案是用来填充和描画图形的重复图像, 创建一个图案可以调用, createPattern() 方法接受两个参数, 一个 img 元素 一个如何重复图案的字符串, 

```js
let image = document.images[0]
pattern = context.createPattern(image, "repeat")
context.fillStyle = pattern
context.fillRect(10, 10, 150,150)
```

#### 图像数据

2D 上下文中比较强大的可以使用 getImageData() 方法获取原始图像数据, 这个方法接受4个参数,

#### 合成

上下文中绘制的所有内容都会应用两个属性:  globalAlpha 和 globalComponsitionOperation

### Canvas 小结

#### 1. 基础

创建`canvas`元素, 设置宽高, 然后通过 `getContext()`方法 获取 `2D上下文`

可以通过 `toDataURL()`获取`canvas`图片

#### 2. 绘制

2D上下文提供了`fillStyle`和`strokeStyle`两个属性来决定, 填充和描边的颜色

#### 3. 矩形相关

提供三个方法`fillRect()`, `strokeRect()`和`clearRect()`分别用来, 绘制一个填充的矩形, 一个描边的矩形, 和将矩形区域变透明

#### 4. 路径相关

使用`beginPath()`表示开始绘制路径, 可以使用 `moveTo()`将光标移动到某个位置, 使用`closePath()`会绘制一条返回起点的路径, 使用 `fill()` 会填充路径, `stroke()`会描边路径, 还可以使用 `clip()`创建一个新剪切区域其他方法有

+ 弧线
  + `arc()` 根据原点 半径 角度, 画圆弧
  + `arcTo()`从当前光标开始, 终点是 点2, 给定的半径, 相切 两点连线
+ 直线
  + `lineTo()` 绘制从当前光标到某一点的直线
+ 贝塞尔曲线
  + bezierCurVeTo() 三次贝塞尔曲线
  + quadraticCurveTo() 二次贝塞尔曲线
+ 矩形
  + rect() 画一个矩形路径

#### 5. 绘制文字

问题提供了两个方法 `fillText()` 和 `strokeText()`, 文字的样式由三个属性决定,分别是`font, textAlign, textBaseLine`,

特殊场景, 当想把文字放在指定区域但是不知道字体大小的时候, 可以通过 `measureText()`方法 获取当前文字字体的大小

#### 6. 变换

创建变换的方法有

+ `translate(x,y)` 将原点移动到(x,y), 然后以后的所有计算都是相对与这个新原点来算的
+ `rotate()`, 围绕原点旋转
+ `scale()`缩放
+ transform()

> 矩阵 六个参数 a,b,c,d,e,f
>
> 缩放与这个 a , d 相关 分别代表着 x , y 方向上的缩放
>
> transform(2, 0, 0, 2, 0, 0)  放大两倍
>
> 
>
> 位移只和  e , f 相关  控制着  x , y 方向上的位移
>
> transform(1,0,0,1, 10, 10)
>
> 
>
> 旋转角度 需要使用 cos 和 sin ,  牢记方式 CS-SC 初三-上床
>
> transform(cos角度, sin角度, -sin角度, cos角度, e, f)
>
> 
>
> 拉伸 用到了tan , 只和  b, c 两个参数有关
>
> transform(1, ytan角度, xtan角度, 1, 0, 0)

此外上下文中提供了 `save()`方法, 保存当前环境下的配置, 然后可以通过 `restore()`回到上一次配置

#### 7. 绘制图像

绘制图像使用的是同一个方法`drawImage()`,但是参数的不同,绘制出来的效果就不一样, 常见效果

+ 将某个图片绘制到指定位置
+ 将图片绘制到指定位置, 设置展示的宽高
+ 将源图片中 指定区域的图片, 绘制到指定位置, 展示指定大小

#### 8. 阴影和渐变

设置阴影相关的属性

+ shadowColor 
+ shadowOffsetX
+ shadowOffsetY
+ shadowBlur 橡树

设置渐变

+ 线性渐变
+ 径向渐变











