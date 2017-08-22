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
})
