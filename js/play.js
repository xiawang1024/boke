$(function(){
  //audio
  var audio = $('#audio').get(0);
  var playBtn = $('.playOrPause');
  var audioInfo = {
    currentTime:0,
    duration:0,
    percent:0
  }
  //触摸信息
  var touch = {
  }
  //播放列表
  var songList = [
    'test.mp3',
    'test1.mp3',
    'test2.mp3',
    'test3.mp3'
  ];
  var songLen = songList.length;
  //当前播放索引
  var currentSongIndex = 0;

  var progressBtnWidth = 25;
  //progress
  var progressBar = $('.progress-bar');
  var progress = $('.progress');
  var progressBtn = $('.progress-btn-wrapper');

  //playTime
  var currentTime = $('.play-time-wrap .current-time');
  var duration = $('.play-time-wrap .duration');

  function currentTimeHtml(time) {
    currentTime.html(time)
  }
  function durationHtml(time){
    duration.html(time)
  }

  //首次进入duration
  setDuration()
  function setDuration () {
    audio.addEventListener('loadedmetadata',function(){
      audioInfo.duration = audio.duration;
      durationHtml(format(audioInfo.duration))
    })
  }

  //播放按钮
  playBtn.click(function(){
    if(audio.paused){
      play()
      smallPlay()
    }else{
      pause()
      smallPause()
    }
  })

  //audio监听
  audio.addEventListener('timeupdate',function(){
    audioInfo.currentTime = audio.currentTime;
    audioInfo.duration = audio.duration;
    audioInfo.percent = audio.currentTime / audio.duration;
    progressFn(audioInfo.percent)
    currentTimeHtml(format(audioInfo.currentTime))
    //如果播放结束，按钮暂停
    if(audioInfo.percent == 1){
      pause()
    }
  })
  //播放器控制
  var prevBtn = $('.play-prev'),
      nextBtn = $('.play-next'),
      prevFifBtn = $('.play-back-fifteen'),
      nextFifBtn = $('.play-go-fifteen');
  var timeInterval = 15,
      prefix = './mp3/';
  prevFifBtn.click(function(){
    playPrevFif()
  })
  nextFifBtn.click(function(){
    playNextFif()
  })
  prevBtn.click(function(){
    playPrev()
  })
  nextBtn.click(function(){
    playNext()
  })
  function play(){
    audio.play();
    playBtn.addClass('paused')
  }
  function pause(){
    audio.pause()
    playBtn.removeClass('paused')
  }
  function playPrev(){
    if(currentSongIndex == 0){
      return
    }
    currentSongIndex --;
    audio.src = prefix + songList[currentSongIndex]
    play()
  }
  function playNext(){
    if(currentSongIndex == songLen){
      return
    }
    currentSongIndex ++;
    audio.src = prefix + songList[currentSongIndex]
    play()
  }
  function playPrevFif(){
    audio.currentTime =Math.max(audioInfo.currentTime - timeInterval, 0)
  }
  function playNextFif(){
    audio.currentTime =Math.min(audioInfo.currentTime + timeInterval, audioInfo.duration)
  }
  //迷你控制器
  var smallPlayBtn = $('.g-small-play .play-btn'),
      smallPlayState = $('.g-small-play .play-state');
  smallPlayBtn.click(function(){
    if(audio.paused){
      smallPlay()
      play()
    }else{
      smallPause()
      pause()
    }
  })
  function smallPlay(){
    smallPlayBtn.addClass('paused');
    smallPlayState.html('已播放')
  }
  function smallPause(){
    smallPlayBtn.removeClass('paused');
    smallPlayState.html('已暂停')
  }
  //迷你控制器显示隐藏
  var playWrap = $('.g-play'),
      smallPlayWrap = $('.g-small-play');
  var offsetTop = playWrap.offset().top,
      offsetHeight = playWrap.height(),
      isShow = false;
  $(window).scroll(function(e){
    var scrollTop = $(window).scrollTop();
    if(scrollTop >= offsetTop + offsetHeight){
      isShow = true
    }else{
      isShow = false
    }
    playWrapShow(isShow)
  })
  function playWrapShow(isShow){
    if(isShow){
      smallPlayWrap.fadeIn('fast');
    }else{
      smallPlayWrap.css('display','none');
    }
  }

  //进度条
  function progressFn(percent){
    var barWidth = progressBarDom.clientWidth;
    var offsetWidth = percent * barWidth;
    offset(offsetWidth)
  }
  function offset(offsetWidth){
    progress.css('width',offsetWidth + 'px');
    progressBtn.css('transform','translate3d('+ offsetWidth +'px,0,0)')
  }
  //进度条拖拽
  var progressBtnDom = progressBtn.get(0),
      progressBarDom = progressBar.get(0),
      progressDom = progress.get(0);
  progressBtnDom.addEventListener('touchstart',function(e){
    pause()
    touch.initiated = true;
    touch.startX = e.touches[0].pageX;
    touch.left = progressDom.clientWidth;
  })
  progressBtnDom.addEventListener('touchmove',function(e){
    if(!touch.initiated){
      return
    }
    var deltaX = e.touches[0].pageX - touch.startX
    var offsetWidth = Math.min(progressBarDom.clientWidth  ,Math.max(0,touch.left + deltaX))
    offset(offsetWidth)
  })
  progressBtnDom.addEventListener('touchend',function(e){
    touch.initiated = false;
    triggerPercent()
  })
  function triggerPercent() {
    var barWidth = progressBarDom.clientWidth ;
    var percent = parseInt(progress.css('width')) / barWidth;
    setAudioPercent(percent)
  }
  function setAudioPercent(percent) {
    var currentTime = audioInfo.duration * percent;
    audio.currentTime = currentTime
    play()
  }

  //工具函数
  function format(interval) {
    interval = interval | 0;
    var minute = pad(interval / 60 | 0);
    var second = pad(interval % 60) ;
    return minute + ':' + second
  }
  function pad(num){
    var n = 2;
    var len = num.toString().length;
    while (len < n) {
      num = '0' + num;
      len ++;
    }
    return num
  }


  //推荐，评论tab切换
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
    if(index == 1){
      $('.g-recommend').css('display','flex')
    }else{
      $('.g-recommend').css('display','none')
    }
  }

  //收藏
  $('.collect-wrap').click(function(){
    if($(this).hasClass('z-crt')){
      $(this).removeClass('z-crt')
      toastOpen('取消收藏',"msg")
    }else{
      $(this).addClass('z-crt')
      toastOpen('收藏', "msg")
    }
  })

  //头部控制
  var ctrlBtns = $('.g-hd .ctrl span');
  ctrlBtns.click(function(){
    var index = $(this).index();
    if(index >= 1){
      switch(index){
        case 3:{
          if($(this).hasClass('z-crt')){
            //取消点赞
            $(this).removeClass('z-crt')
            toastOpen('取消点赞','msg')
          }else{
            //点赞
            $(this).addClass('z-crt')
            toastOpen('点赞', 'msg')
          }
          break;
        }
        default:{
          toastOpen('更多功能体验，请下载河南广播APP')
        }
      }
    }else{
      return
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
