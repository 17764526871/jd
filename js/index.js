onload = function () {
    //获取元素
    var index_lis = document.querySelectorAll(".indexer>li");
    var slides_ul = document.querySelector(".slides_ul");
    var header = document.querySelector(".header");
    var spans = document.querySelectorAll(".hk_time>span");
    //头部透明
    headeropa()

    function headeropa() {
        var slidesHeight = document.querySelector(".jd_slides img").offsetHeight;
        onscroll = function () {
            //获取滚动条距离
            var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            //透明度
            var tmpOpa = scrollTop / slidesHeight;
            if (tmpOpa > 0.9) {
                tmpOpa = 0.9;
            };
            header.style.backgroundColor = "rgba(201, 21, 35," + tmpOpa + ")";

        }
    }



    //定时器
    timego();

    function timego() {
        var time = 5 * 60 * 60;
        //开启倒计时
        setTime()
        //定时器
        var time1 = setInterval(function () {
            time--
            setTime();
        }, 1000)
        if (time == 0) {
            clearInterval(time1);
            console.log("秒杀结束惹");
        }


        function setTime() {
            var hour = parseInt(time / 60 / 60);
            var minutes = parseInt(time / 60 - hour * 60);
            var seconds = time - hour * 60 * 60 - minutes * 60;

            var hour0 = parseInt(hour / 10);
            var hour1 = hour % 10;
            var minute0 = parseInt(minutes / 10);
            var minute1 = minutes % 10;
            var second0 = parseInt(seconds / 10);
            var second1 = seconds % 10;

            spans[0].innerHTML = hour0;
            spans[1].innerHTML = hour1;
            spans[3].innerHTML = minute0;
            spans[4].innerHTML = minute1;
            spans[6].innerHTML = second0;
            spans[7].innerHTML = second1;

        }









    }

    //轮播图
    auto_slides()

    function auto_slides() {
        //自动轮播
        var index = 1;
        slides_ul.style.transform = "translateX(-" + index + "0%)";

        timeId = interval();

        slides_ul.addEventListener("transitionend", function () {
            if (index >= 9) {
                index = 1;
                slides_ul.style.transition = "none";
                slides_ul.style.transform = "translateX(-" + index + "0%)";
            } else if (index == 0) {
                index = 8;
                slides_ul.style.transition = "none";
                slides_ul.style.transform = "translateX(-" + index + "0%)";
            }
            var indexli = index - 1;
            activeli(indexli);
        })


        //手动滑动
        touchevents(slides_ul).swipe(function (d) {
            clearInterval(timeId);

            //判断方向
            switch (d) {
                case "left":
                    index++;
                    break;
                case "right":
                    index--;
                    break;
                default:
                    break;
            }

            //移动
            slides_ul.style.transition = "transform .3s";
            slides_ul.style.transform = "translateX(-" + index + "0%)";

            timeId = interval();

        })

        function interval() {
            return setInterval(function () {
                index++;
                //  过渡的时间一定要小于 定时器的时间!!!! 
                slides_ul.style.transition = "transform .3s";
                slides_ul.style.transform = "translateX(-" + index + "0%)";

                // 错误的演示!! 
                //  9 => 1 
                // if(index==9){
                //   index=1;
                //   slides_ul.style.transition="none";
                //   slides_ul.style.transform="translateX(-"+index+"0%)";
                // }
            }, 1000);;

        }

    }

    //索引器


    function activeli(indexli) {
        for (var i = 0; i < index_lis.length; i++) {
            var li = index_lis[i];
            li.classList.remove("active");
        }
        index_lis[indexli].classList.add("active")


    }


}