$(function() {
    var submitBtn = $('.submit-btn');
    var isSubmitClick = false;
    var account = null,
        password = null;
    submitBtn.click(function() {
        account = $('#account').val()
        password = $('#password').val()

        if(!isSubmitClick) {
            if (account && password) {
                //发送异步请求...
                sendData(account, password)
            }else{
                //有一个空字段
                console.log('------------------------------------');
                console.log('帐号密码不能为空');
                console.log('------------------------------------');
            }
        }else{
            return
        }
    })

    function sendData(account, password) {
        //异步请求
        console.log('------------------------------------');
        console.log(account + ',' + password);
        console.log('------------------------------------');
    }
})