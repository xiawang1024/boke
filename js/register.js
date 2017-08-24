$(function() {
    var sendCodeBtn = $('.send-code');
    var regitsterBtn = $('.register-btn');
    var isSendClick = false,
        isRegisterClick = false;
    var phoneVal = null,
        codeVal = null,
        passwordVal = null;
    sendCodeBtn.click(function() {
        if(!isSendClick){
            //发送手机号，获取验证码

            //倒计时
            countDown();
        }else{
            //已点击
            return
        }  
        isSendClick = true
    })

    regitsterBtn.click(function() {
        phoneVal = $('#account').val()
        codeVal = $('#code')
        passwordVal = $('#password')
        if(!isRegisterClick){
            if(phoneVal && codeVal && passwordVal){
                //提交数据...

            }else{
                //有为空的，tips提示
                
            }
        }else{
            return
        }
    })
    /**
     * 
     * @param {number} count 倒计时时间
     */
    function countDown(count) {
        var timeId = null;
        var default_count = 60;//默认60s
        if(count) {
            default_count = count
        }
        clearInterval(timeId)
        timeId = setInterval(function() {
            if (default_count == 0) {
                sendCodeBtn.html("发送验证短信")
                clearInterval(timeId)
                isSendClick = false;
            }else{
                var html = default_count + 's后重发';
                sendCodeBtn.html(html)
            }
            default_count--
        },1000)
    }
})