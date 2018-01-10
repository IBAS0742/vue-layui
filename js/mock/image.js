/* global document  */
/*
    ## Image
*/
Mock = {
    image : function () {
        var cas = document.createElement("canvas");
        cas.style.display = "none";
        document.body.appendChild(cas);
        var cw = 116;   //画布的总宽度
        var ch = 38;    //画布的总高度
        cas.width = cw;
        cas.height = ch;
        var ctx = cas.getContext('2d');

        /**1.绘制背景颜色——填充矩形**/
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, cw, ch);

        /**2.循环绘制4个随机字符**/
        ctx.textBaseline = 'top';
        var pool = 'ABCDEFGHJKLMNPQRSTUVWXY3456789';
        var cstr = '';
        for (var i = 0; i < 4; i++) {
            var c = pool[rn(0, pool.length)];//一个随机字符
            cstr += c;
            var fs = rn(10, 40); //字体大小
            ctx.font = fs + 'px  SimHei';
            var fc = rc(50, 150); //字体颜色
            ctx.strokeStyle = fc;
            var deg = rn(-45, 45);//旋转角度
            var x = -fs / 2;      //每个字符左上角的坐标
            var y = -fs / 2;
            //绘制一个字符: 保存状态->平移->旋转->绘制->恢复状态
            ctx.save();
            ctx.translate(30*i+15, 15);
            ctx.rotate(deg*Math.PI/180);
            ctx.strokeText(c, x, y);
            ctx.restore();
        }
        /**3.绘制5条干扰线——直线路径**/
        for(var i=0; i<5; i++){
            ctx.beginPath();
            ctx.moveTo(rn(0,cw), rn(0, ch));
            ctx.lineTo(rn(0,cw), rn(0, ch));
            ctx.strokeStyle = rc(0, 255);
            ctx.stroke();
        }
        /**4.绘制50个杂色点——半径为0.5圆形路径**/
        for(var i=0; i<50; i++){
            ctx.beginPath();
            ctx.arc(rn(0,cw), rn(0, ch),0.5, 0, 2*Math.PI);
            ctx.fillStyle = rc(0, 255);
            ctx.fill();
        }

        //random number，返回指定范围内的随机整数
        function rn(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        }
        //random color，返回指定范围内的随机颜色
        function rc(min, max) {
            var r = rn(min, max);
            var g = rn(min, max);
            var b = rn(min, max);
            return 'rgb(${r}, ${g}, ${b})';
        }

        return {
            str : cstr,
            src : cas
        }
    }
};