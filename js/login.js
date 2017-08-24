$(function() {
    var submitBtn = $('.submit-btn');
    var isSubmitClick = false;
    var account = null,
        password = null;
    submitBtn.click(function() {
        account = $('#account').val()
        password = $('#password').val()
        if(!account) {
            toastOpen('请输入用户名')
            return 
        }
        if(!password) {
            toastOpen('请输入密码')
            return
        }
        if(!isSubmitClick) {
            //异步提交数据
            layer.open({
                type: 2,
                content: '玩命登录中...'
            })
            sendData(account, password)
            //模拟异步
            setTimeout(function() {
                layer.closeAll()
            },3000)
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
    /**
     * layer.open 封装
     * @param {string} content 
     */
    function toastOpen(content) {
        layer.open({
            content: content,
            time: 2
        })
    }
})