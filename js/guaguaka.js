/*
* JS 刮刮卡
*/
class Guaguaka {
    constructor (options) {
        this.init(options);
    }
    init(options) {
        const canvas = document.getElementById(options.id);
        const img = new Image();
        let mousedown = false;
        let num = 0;
        let ctx = null;

        // 等待画布内图片加载完成执行
        img.onload = function() {
            const [w, h] = [ img.width, img.height ];
            const [offsetX, offsetY] = [ canvas.offsetLeft, canvas.offsetTop];
                    
            canvas.width = w;
            canvas.height = h;
            canvas.style.position = 'absolute';
            canvas.style.backgroundImage = 'url('+img.src+')';
            canvas.style.backgroundSize = 'cover';
            ctx = canvas.getContext('2d');
            ctx.fillStyle = '#999';
            ctx.fillRect(0, 0, w, h);

            // 在源图像外显示目标图像。只有源图像外的目标图像部分会被显示，源图像是透明的。
            ctx.globalCompositeOperation = 'destination-out';

            function eventDown(e) {
                e = e || window.event;
                e.preventDefault();
                mousedown = true;
            }

            function eventUp(e) {
                e = e || window.event;
                e.preventDefault();
                mousedown = false;
                
                // 计算刮痕面积(ps: 先获取画布中的所有像素点,然后进行像素点属性（透明度的比较），对于擦除部分，透明度均为0。)
                // 我们可以进行每个像素点的检测，从而通过符合擦除条件的像素点数量与像素点总数量相对比，得出被擦除部分的面积。       
                let datas = ctx.getImageData(0, 0, w, h);
                let n = 0;
                for (let i = 0; i < datas.data.length; i++) {
                    if (datas.data[i] == 0) {
                        n++;
                    }
                }
                
                // 如果擦除面积达到了整个画布的50%，我们就直接清除掉整个画布上的灰色层。
                if (n >= datas.data.length * (options.coverage || 0.5)) {
                    ctx.fillRect(0, 0, w, h);
                    options.callback && options.callback(num);
                }
            }

            function eventMove(e) {
                e = e || window.event;
                e.preventDefault();

                if(mousedown) {
                     if(e.changedTouches){
                         e = e.changedTouches[e.changedTouches.length-1];
                     }
                     let x = (e.clientX + document.body.scrollLeft || e.pageX) - offsetX || 0;
                     let y = (e.clientY + document.body.scrollTop || e.pageY) - offsetY || 0;
                     ctx.beginPath();
                     ctx.arc(x, y, options.circleWidth || 25, 0, Math.PI * 2); //绘制圆点，默认圆点大小25
                     ctx.fill();
                     ctx.closePath();
                }
            }
            
            // 监听touch和mouse事件
            canvas.addEventListener('touchstart', eventDown, false);
            canvas.addEventListener('touchend', eventUp, false);
            canvas.addEventListener('touchmove', eventMove, false);
            canvas.addEventListener('mousedown', eventDown, false);
            canvas.addEventListener('mouseup', eventUp, false);
            canvas.addEventListener('mousemove', eventMove, false);
        }

        num = Math.floor(Math.random() * options.imgArr.length); //随机取值
        img.src = options.imgArr[num];
    }
}
