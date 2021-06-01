// pages/mine/mine.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sharenavbar: [{
      id: 6,
      imgurl: "http://www.fjtbkyc.net/mywx/sunny2.jpg",
      title: "这是title6",
      headimg: "http://qwq.fjtbkyc.net/public/personalBlog/images/blog/blog11.jpg",
      username: "Brank",
      local: '四川省成都市金牛区西华大道16号',
      like: 112,
      concern: 10
    }],
    lostnavbar: [{
      id: 1,
      imgurl: "http://www.fjtbkyc.net/mywx/umber.jpg",
      title: "丢失一把雨伞",
      headimg: "http://www.fjtbkyc.net/mywx/services1.png",
      username: "bigSur",
      local: '四川省成都市青羊区光华大道与光耀三路路口',
      like: 1034,
      concern: 10
    }, ],
    userinfo: {},
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false,
    navbar: ['我的分享', '草稿箱'],
    currentTab: 0,
    tal: 0,
    shareCount: 1, //分享的数量
    // 图片样式
    islogin:false, //判断用户是否登录
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  //事件处理函数
  bindViewTap: function () {

  },

  // 退出登录
  unlogin:function(e)
  {
    wx.showModal({
      title: '提示',
      content: '是否退出登录',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    this.setData({
      userinfo:app.globalData.userInfo
    })
  },
  goDetail: function (e) {
    //直接进入详情查看界面
      wx.navigateTo({
        url: '/pages/detail/detail?pageid=' + 3 + "&userid=" + userid,
      })
  },
  
  //去登录的状态
  gologin: function (e) {
    wx.redirectTo({
      url: '/pages/login/login?pagetype=' + 3,
    })
  },

  goMessage: function (e) {
    var userid = app.globalData.userInfo.id
    // console.log(app.globalData.userInfo.id);
    wx.navigateTo({
      url: '/pages/message/message?mystyle=' + 1 + '&userid=' + userid,
    })
  },
  /**
   * 自定义函数
   */
  myinfopage: function () {
    wx.navigateTo({
      url: '/pages/myinfo/myinfo',
    })
  },
  toH: function (e) {
    wx.navigateTo({
      url: '/pages/hoard/hoard'
    })

  },
  toC: function (e) {
    wx.navigateTo({
      url: '/pages/concern/concern'
    })
  },
  toL: function (e) {
    wx.navigateTo({
      url: '/pages/like/like'
    })
  },
  gomessgeinfo: function (e) {
    wx.navigateTo({
      url: '/pages/myinfo/myinfo?userinfoimg=' + e.currentTarget.dataset.headimg + '&username=' + e.currentTarget.dataset.username
    })
  },
  // 获取图片宽高
  imageLoad: function (e) {
    var k = e.currentTarget.dataset.index;
    var newmodewidth = []
    var newmodeheight = []
    //初始化函数数组
    var s = 0;
    for (let td of this.data.Smodewith) {
      newmodewidth.splice(s++, 0, td)
    }

    for (let td of this.data.Smodeheight) {
      newmodeheight.splice(s++, 0, td)
    }

    var $width = e.detail.width, //获取图片真实宽度
      $height = e.detail.height,
      ratio = $width / $height; //图片的真实宽高比例
    var thismode = '' //定义每次获取的图片模式

    // rario大于1表示横版图片
    if (ratio >= 1.6) {
      newmodewidth[k] = 200 * ratio;
      newmodeheight[k] = 200
    }
    //竖版图片
    else {
      newmodewidth[k] = 320;
      newmodeheight[k] = 320 / ratio
    }
    this.setData({
      Smodewith: newmodewidth,
      Smodeheight: newmodeheight
    })
  },


  // 获取失物招领图片宽高
  LimageLoad: function (e) {
    var k = e.currentTarget.dataset.index;
    var newmodewidth = []
    var newmodeheight = []
    //初始化函数数组
    var s = 0;
    for (let td of this.data.Lmodewith) {
      newmodewidth.splice(s++, 0, td)
    }

    for (let td of this.data.Lmodeheight) {
      newmodeheight.splice(s++, 0, td)
    }

    var $width = e.detail.width, //获取图片真实宽度
      $height = e.detail.height,
      ratio = $width / $height; //图片的真实宽高比例
    var thismode = '' //定义每次获取的图片模式

    // rario大于1表示横版图片
    if (ratio >= 1.6) {
      newmodewidth[k] = 200 * ratio;
      newmodeheight[k] = 200
    }
    //竖版图片
    else {
      newmodewidth[k] = 320;
      newmodeheight[k] = 320 / ratio
    }
    this.setData({
      Lmodewith: newmodewidth,
      Lmodeheight: newmodeheight
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
    this.setData({
      islogin: true,
    })
    this.setData({
      userinfo: app.globalData.userInfo
    })

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
  onShareAppMessage: function () {}
})