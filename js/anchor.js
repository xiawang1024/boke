$(function(){
  var tabBtns = $('.g-tab-wrap .tab');
  var listWraps = $('.g-tab-content .list-wrap');

  tabBtns.click(function(){
    var tabIndex = $(this).index()
    $(this).addClass('z-crt').siblings().removeClass('z-crt')
    switchTab(listWraps, tabIndex)
  })

  //tab切换
  function switchTab(tabs, index){
    tabs.eq(index).css('display','block').siblings().css('display','none')
  }


  //关注
  var btn = $('.avatar-follow .follow')
  btn.click(function(){
    if($(this).html()=="加关注"){
      $(this).html("已关注")
      toastOpen('已关注','msg')
    }else{
      $(this).html("加关注")
      toastOpen('取消关注', 'msg')
    }
  })

  /**
     * layer.open 封装
     * @param {string} content 
     */
  function toastOpen(content, type) {
    if (type && type.length > 0) {
      layer.open({
        content: content,
        time: 2,
        skin: 'msg'
      })
    } else {
      layer.open({
        content: content,
        time: 2
      })
    }
  }
})
