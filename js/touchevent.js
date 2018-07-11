
function touchevents(dom){
    var obj = {
        tap:function(callback){
            var touchTime ;
            var touchX,touchY;
            //开始点击
            dom.addEventListener("touchstart",function(e){
                if(e.touches.length>1){
                    return;
                }
                touchTime=Date.now();
                touchX=e.touches[0].clientX;
                touchY=e.touches[0].clientY;

            })
            //点击结束
            dom.addEventListener("touchend",function(e){
                if(e.touches.length>1){
                    return;
                }
                if(Date.now()-touchTime>200){
                    return;
                }
                var endX=e.changedTouches[0].clientX;
                var endY=e.changedTouches[0].clientY;
                if(Math.abs(endX-touchX)>5||Math.abs(endY-touchY)>5){
                    return;
                }
                callback&&callback();
                
            })
        },
        swipe:function(callback){
            var touchTime ;
            var touchX,touchY;
            //开始点击
            dom.addEventListener("touchstart",function(e){
                if(e.touches.length>1){
                    return;
                }
                touchTime=Date.now();
                touchX=e.touches[0].clientX;
                touchY=e.touches[0].clientY;

            })
            //离开事件
            dom.addEventListener("touchend",function(e){
                if(e.touches.length>1){
                    return;
                }
                if(Date.now()-touchTime>800){
                    return;
                }
                var direction;
                var endX=e.changedTouches[0].clientX;
                var endY=e.changedTouches[0].clientY;

                if(Math.abs(endX-touchX)>5){
                    direction=endX>touchX? "right":"left";

                }else if(Math.abs(endY-touchY)>5){
                    direction = endY > touchY ? "down" : "up";
                }else {
                    return;
                }

                callback&&callback(direction);

            })

        }
    }
    return obj;
}