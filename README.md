# canvas-guaguaka
canvas刮刮卡，无依赖，适用于移动端和PC端。

在线预览： https://hehaibao.github.io/canvas-guaguaka/

使用方法：

1. 加入dom: 
```html
<canvas id="guaguaka"></canvas>
```
2. 引入JS:
```javascript
<script src="js/guaguaka.js"></script>
```

3. 调用方法：

```javascript
<script>
    var options = {
        id: 'guaguaka', //canvas的ID
        imgArr: ['images/p_0.jpg', 'images/p_1.jpg'], //奖品图片(建议统一大小，canvas是根据该图片大小渲染的)
        circleWidth: 25, //涂抹时，圆点的大小(该参数可不传，默认25)，值越大则圆点越大
        coverage: 0.5, //涂抹时，擦除面积达到了整个画布的 50%，则自动清除掉整个画布上的灰色层（值范围：0-1）
        callback: function(index) { //擦除后的回调
            // index为奖品的索引值
            alert('你擦也过了，该我出场了吧~');
        }
    }
    new Guaguaka(options);
</script>
```


