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

  //点赞，分享，收藏，下载
  var btns = $('.interact-wrap .item')
  btns.click(function(index){
    var index = $(this).index()
    
    switch(index){
      case 0:{        
        if($(this).hasClass('z-crt')){
          //取消点赞
          $(this).removeClass('z-crt')
          toastOpen('取消点赞', "msg")
        }else{
          //点赞
          $(this).addClass('z-crt')
          toastOpen('点赞', "msg")
        }
        break;
      }
      case 3:{
        if ($(this).hasClass('z-crt')) {
          //取消收藏
          $(this).removeClass('z-crt')
          toastOpen('取消收藏', "msg")
        } else {
          //收藏
          $(this).addClass('z-crt')
          toastOpen('收藏',"msg")
        }
        break;
      }
      default:{
        toastOpen("下载手机APP，体验更多功能")
      }
    }
  })

  /**
     * layer.open 封装
     * @param {string} content 
     */
  function toastOpen(content,type) {
    if(type && type.length > 0){
      layer.open({
        content: content,
        time: 2,
        skin:'msg'
      })
    }else{
      layer.open({
        content: content,
        time: 2
      })
    }
  }

})
