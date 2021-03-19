## 动画和Canvas 图形

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



