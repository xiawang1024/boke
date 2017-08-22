$(function(){
  //body tab切换
  var tabBtns = $('.g-tab-wrap .tab-wrap .tab');
  var bdcs = $('.g-bd .g-bdc');

  tabBtns.click(function(){
    var tabIndex = $(this).index()
    $(this).addClass('z-crt').siblings().removeClass('z-crt')
    switchTab(bdcs, tabIndex)
  })
  //tab切换
  function switchTab(tabs, index){
    tabs.eq(index).css('display','block').siblings().css('display','none')
  }

  //分类 切换
  var typeTabBtns = $('.m-type .tab-wrap .tab');
  var listWraps = $('.m-type .tab-content .list-wrap');

  typeTabBtns.click(function(){
    var tabIndex = $(this).index()
    $(this).addClass('z-crt').siblings().removeClass('z-crt');
    switchTab(listWraps, tabIndex)
  })
})
