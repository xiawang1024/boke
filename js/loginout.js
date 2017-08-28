$(function(){
    //退出登录
    $('.g-login-out .btn').click(function(){
        layer.open({
            title: [
                '退出登录',
                'background-color:#0081dc; color:#fff;'
            ]
            , anim: 'up'
            , content: '确认退出登录吗'
            , btn: ['确认', '取消']
            ,yes:function(){
                //退出登录异步请求
                layer.closeAll()
                //模拟异步请求
                setTimeout(function(){
                    layer.open({
                        content:'帐号已退出',
                        skin:'msg',
                        time:2
                    })
                },3000)
            }
        });
    })
})