$(function(){
    var btns = $('.g-bd .list .follow-btn')
    btns.click(function(){
        if($(this).hasClass('z-crt')){
            //取消互粉
            $(this).removeClass('z-crt')
        }else{
            //互粉
            $(this).addClass('z-crt')
        }
    })
})