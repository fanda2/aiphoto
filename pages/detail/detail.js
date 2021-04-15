// pages/detail/detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vaHe:0,  //导航菜单高度
    inputHe:0,  //输入框高度
    myname:'Another Drmension',
    current: 0,  //当前所在页面的 index
    // indicatorDots: true, //是否显示面板指示点
    // autoplay: false, //是否自动切换
    // interval: 3000, //自动切换时间间隔
    // duration: 800, //滑动动画时长
    // circular: true, //是否采用衔接滑动
    essayall:
      {
        imgUrls: [
          'http://qwq.fjtbkyc.net/public/personalBlog/images/zuopin/portfolio6.jpg',
          'http://qwq.fjtbkyc.net/public/personalBlog/images/zuopin/portfolio3.jpg',
          'http://qwq.fjtbkyc.net/public/personalBlog/images/zuopin/portfolio5.jpg',
          'http://www.fjtbkyc.net/mywx/sunny5.jpg'
        ],
        essay_title:"这就是标题啦",
        essay_text:"花香四溢的春天来了，我的家乡到处是一片欣欣向荣的景象。石川河的柳树开始发芽了，鸡子山的草儿也偷偷地钻了出来，各种各样的花儿也悄悄地开放 了。你看那河的沿岸和山脚下：粉红的桃花、雪白的梨花、娇艳的海棠花......都开得笑盈盈的。"+
        "一场春雨过后，柳枝绿了，桃花笑了。山溪水满，水面上时而飘过一二片桃花瓣。天色像玻璃一样嫩碧中透亮。太阳喜眉笑眼地从东半天升腾起来，红得像少女的脸膛，盈盈动人。如诗如画的春色和壮丽多姿的山川，使人感到舒畅，生气勃勃。"+
        "小园已经有点春意了，首先是荡漾在杨柳枝头的绿雾，其次是清晨飞来的莺声；下过几阵细雨，荒坪又给涂上一层浅浅的颜色，青油油的地，如沙漠上的绿洲，难道这不就是黯淡欲绝的人生里一线生机吗？",
        tabel:['西华','湖面','秋天','秋风落叶','自然','宁静','成都']
      },
    links: [
      '/pages/preview/preview',
    ],
   
  },
  // 点击图片进行预览函数
   //预览图片，放大预览
   imgClick:function(e){
    var src = e.currentTarget.dataset.num  // 图片路径
    var imgList = this.data.essayall.imgUrls // 图片数组
    wx.previewImage({
      current: imgList[src],
      urls: imgList
    }) 
  },
  onSlideChange: function (event) { 
    var postId = event.detail.current; 
    // console.log(postId);
    this.setData({
      current: event.detail.current
    })


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log("current markid is ",app.globalData.currentMarkerId)
    var data = wx.getMenuButtonBoundingClientRect()
    var WH=wx.getSystemInfoSync()
    this.setData({
      // 获取导航栏高度
      vaHe:data.bottom+10,
      inputHe:data.bottom-data.top,
      // Sheight: (WH.windowHeight),
      // Swidth: (WH.windowWidth)
    })
    console.log(this.data.vaHe);
  },
  swiperChange: function(e) {

    this.setData({

      swiperCurrent: e.detail.current

    })

  },

  //点击指示点切换

  chuangEvent: function(e) {

    this.setData({

      swiperCurrent: e.currentTarget.id

    })

  },

  //点击图片触发事件

  swipclick: function(e) {

    console.log(this.data.swiperCurrent);

    wx.switchTab({

      url: this.data.links[this.data.swiperCurrent]

    })

  },
  deback:function(e){

   wx.switchTab({
      url: '/pages/index/index'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})