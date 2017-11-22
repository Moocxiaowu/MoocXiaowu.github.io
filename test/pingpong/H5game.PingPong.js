//插入$(function(){之中的代码将在DOM加载完成之后运行})
$(function () {
    $("#paddleB").css("top","20px");
    $("#paddleA").css("top","60px");

    var key = {
        up:38,
        down:40,
        w:87,
        s:83
    };

    var pingpong = {
        scoreA:0,
        scoreB:0
    };
    pingpong.pressedkeys =[];

    $(function () {
        //设置interval用于每30ms调用一次gameloop
        pingpong.timer = setInterval(gameloop,20);
        //标记下pressedkays数组里某键的状态是按下还是放开
        $(document).keydown(function (e) {
            pingpong.pressedkeys[e.which] = true;
        });
        $(document).keyup(function (e) {
            pingpong.pressedkeys[e.which] = false;
        });
    });
    function gameloop() {
        moveball();
        movepaddles();
    }
    function movepaddles() {
        if(pingpong.pressedkeys[key.up]){
            var gao = parseInt($("#paddleB").css("top"));
            if(gao < 0){
                pingpong.pressedkeys[key,up] = false;
            }
            $("#paddleB").css("top",gao-5);
        }
        if(pingpong.pressedkeys[key.down]){
            var gao = parseInt($("#paddleB").css("top"));
            if(gao+70 > parseInt($("#playground").height())){
                pingpong.pressedkeys[key,down] = false;
            }
            $("#paddleB").css("top",gao+5);
        }
        if(pingpong.pressedkeys[key.w]){
            var gao = parseInt($("#paddleA").css("top"));
            if(gao < 0){
                pingpong.pressedkeys[key,w] = false;
            }
            $("#paddleA").css("top",gao-5);
        }
        if(pingpong.pressedkeys[key.s]){
            var gao = parseInt($("#paddleA").css("top"));
            if(gao+70 > parseInt($("#playground").height())){
                pingpong.pressedkeys[key,s] = false;
            }
            $("#paddleA").css("top",gao+5);
        }
    }
    pingpong.ball={
        speed:4,
        x:150,
        y:100,
        directionX:1,
        directionY:1
    };

    function moveball() {
        //引用需要的变量
        var playgroundHeight = parseInt($("#playground").height());
        var playgroundWidth = parseInt($("#playground").width());
        var ball = pingpong.ball;
        // 检测球台边缘碰撞反向
        //检测底边
        if(ball.y+20>playgroundHeight){
            ball.directionY = -1;
        }
        //检测顶边
        if(ball.y<0){
            ball.directionY = 1;
        }
        //检测右边
        if(ball.x+20>playgroundWidth){
            //玩家B丢分
            pingpong.scoreA++;
            $("#scoreA").html(pingpong.scoreA);
            if(pingpong.scoreA >= 5){
                if(confirm("格驰获得了胜利!是否继续？")){
                    pingpong.scoreB = 0;
                    pingpong.scoreA = 0;
                    $("#scoreB").html(pingpong.scoreB);
                    $("#scoreA").html(pingpong.scoreA);
                }
                else
                {window.close()}
            }
            //重置乒乓球
                ball.x = 250;
                ball.y = 100;
                $("#ball").css({
                    "left": ball.x,
                    "top": ball.y
                });
                ball.directionX = -1;
        }
        //检测左边
        if(ball.x<0) {
            //玩家A丢分
            pingpong.scoreB++;
            $("#scoreB").html(pingpong.scoreB);
            if(pingpong.scoreB >= 5){
                if(confirm("鸣鸣获得了胜利!是否继续？")){
                    pingpong.scoreB = 0;
                    pingpong.scoreA = 0;
                    $("#scoreB").html(pingpong.scoreB);
                    $("#scoreA").html(pingpong.scoreA);
                }
                else
                {window.close()}
            }
            //重置乒乓球
                ball.x = 150;
                ball.y = 100;
                $("#ball").css({
                    "left": ball.x,
                    "top": ball.y
                });
                ball.directionX = 1;
        }

        //小球运动原理
        ball.x += ball.speed * ball.directionX;
        ball.y += ball.speed * ball.directionY;

        //检测左边球拍
        var paddleAXleft = parseInt($("#paddleA").css("left"));
        var paddleAXright = parseInt($("#paddleA").css("left"))+ parseInt($("#paddleA").css("width"));
        var paddleAYbottom = parseInt($("#paddleA").css("top"))+ parseInt($("#paddleA").css("height"));
        var paddleAYtop = parseInt($("#paddleA").css("top"));
        if( ball.x>= paddleAXleft && ball.x <= paddleAXright){
            if(ball.y <= paddleAYbottom && ball.y >= paddleAYtop){
                ball.directionX = 1;
            }
        }
        //检测右边球拍
        var paddleBXleft = parseInt($("#paddleB").css("left"));
        var paddleBXright =  parseInt($("#paddleB").css("left"))+parseInt($("#paddleB").css("width"));
        var paddleBYbottom = parseInt($("#paddleB").css("top"))+ parseInt($("#paddleB").css("height"));
        var paddleBYtop = parseInt($("#paddleB").css("top"));
        if(ball.x+20 >= paddleBXleft && ball.x <= paddleBXright){
            if(ball.y <= paddleBYbottom&&ball.y >= paddleBYtop){
                ball.directionX = -1;
            }
        }

        //小球实际移动
        $("#ball").css({
            "left": ball.x,
            "top": ball.y
        });

    }
    /*$(document).keydown(function(event){
        switch(event.keyCode){
        case key.up:
            var gao = parseInt($("#paddleB").css("top"));
            $("#paddleB").css("top",gao-5);
            break;
        case key.down:
            var gao = parseInt($("#paddleB").css("top"));
            $("#paddleB").css("top",gao+5);
            break;
        case key.w:
            var gao = parseInt($("#paddleA").css("top"));
            $("#paddleA").css("top",gao-5);
            break;
        case key.s:
            var gao = parseInt($("#paddleA").css("top"));
            $("#paddleA").css("top",gao+5);
            break;
        }
        console.log(event.keyCode);
    });*/
});

