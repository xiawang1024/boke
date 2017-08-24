$(function() {
    var sendCodeBtn = $('.send-code');
    var regitsterBtn = $('.register-btn');
    var isSendClick = false,
        isRegisterClick = false;
    var phoneVal = null,
        codeVal = null,
        passwordVal = null;
    sendCodeBtn.click(function() {
        
        phoneVal = $('#account').val()
        if (!phoneVal) {
            toastOpen('请输入手机号码')
            return
        }
        if(!testPhone(phoneVal)) {
            toastOpen('请输入有效的手机号码')
            return
        }
        if (!isSendClick) {
            //倒计时
            countDown();
            toastOpen('验证码已发送，请注意查收')
            //发送手机号，获取验证码
            
        } else {
            //已点击
            return
        }
        isSendClick = true

    })

    regitsterBtn.click(function() {
        phoneVal = $('#account').val()
        codeVal = $('#code').val()
        passwordVal = $('#password').val()
        if(!phoneVal){
            toastOpen('请输入手机号码')
            return
        }
        if (!testPhone(phoneVal)) {
            toastOpen('请输入有效的手机号码')
            return
        }
        console.log(codeVal)
        if(!codeVal){
            toastOpen('请输入手机验证码')
            return
        }
        if(!passwordVal) {
            toastOpen('请输入登录密码')
            return
        }
        if(!isRegisterClick){
            //异步提交数据...
            layer.open({
                type:2,
                content:'玩命注册中...'
            })
            //模拟异步登录3s
            setTimeout(function() {
                layer.closeAll()
            },3000)
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
    /**
     * 校验手机号
     * @param {string} phoneVal 
     */
    function testPhone(phoneVal) {
        var patt = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        return patt.test(phoneVal)
    }
    /**
     * layer.open 封装
     * @param {string} content 
     */
    function toastOpen(content) {
        layer.open({
            content:content,
            time:2
        })
    }
})