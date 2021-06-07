// pages/mine/mine.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sharenavbar: [],
    lostnavbar: [],
    userinfo: {},
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: 0,
    navbar: ['我的分享', '草稿箱'],
    currentTab: 0,
    tal: 0,
    shareCount: 1, //分享的数量
    // 图片样式
    islogin: false, //判断用户是否登录
  },


  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  //事件处理函数
  bindViewTap: function () {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    this.setData({
      userinfo: app.globalData.userInfo
    })
    if (app.globalData.token.length) {
      this.setData({
        isHide: 1
      })
    }
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
  goserve: function (e) {
    wx.navigateTo({
      url: '/pages/server/server'
    })
  },
  gomorething: function (e) {
    wx.navigateTo({
      url: '/pages/morething/morething'
    })
  },
  goMessage: function (e) {
    var userid = app.globalData.userInfo.id
    // console.log(app.globalData.userInfo.id);
    wx.navigateTo({
      url: '/pages/message/message?mystyle=' + 1 + '&userid=' + app.globalData.userInfo.userid,
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
  goshare:function(e)
  {
    var that = this;
    if (!app.globalData.token) {
      wx.navigateTo({
        url: '/pages/login/login?pagetype=' + 1,
      })
    } else {
      wx.navigateTo({
        url: '/pages/share/share',
      });
    }
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

  // 退出登录
  unlogin: function (e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否退出登录',
      success(res) {
        if (res.confirm) {
          app.globalData.isHide = 0,
            //清空本地缓存
            wx.removeStorageSync('token'),
            wx.removeStorageSync('userInfo'),
            that.setData({
              userinfo:"",
              isHide:0
            })
            app.globalData=''
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.onShow()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      userinfo: app.globalData.userInfo,
    })
    if (app.globalData.token.length) {
      this.setData({
        isHide: 1
      })
    }

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