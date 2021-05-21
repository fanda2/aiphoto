// pages/login/login.js
const app = getApp()
Page({
  data: {
    userInfo: {},
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    pagetype: 1, //页面跳转前的页面
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
         wx.setStorage({
           data:  res.userInfo,
           key: 'userInfo',
           success: (res) => {
            console.log("保存成功！")
           },
           fail: (res) => {
            console.log("保存失败！")
           },
           complete: (res) => {},
         })
        this.goback()
      }
    })
  },

  // onLoad: function(options) {
  //   this.setData({
  //     pagetype: options.pagetype
  //   })
  //   var that = this;
  //   // 查看是否授权
  //   wx.getSetting({
  //     success: function (res) {
  //       if (res.authSetting['scope.userInfo']) {
  //         //已授权，可以获取用户信息
  //         wx.getUserInfo({
  //           success: function (res) {
  //             console.log("23232",res.userInfo); //对象
  //             console.log(res.rawData); //Json
            
  //             var avatarUrl = res.userInfo.avatarUrl;
  //             var userName = res.userInfo.nickName;
            
  //             that.setData({
  //               avatarUrl: avatarUrl,
  //               userName: userName
  //             })
              
  //           }
  //         })
  //       }
  //     }
  //   })
  // },

 

// 登录成功之后的跳转
// 从分享界面1，从详情页2，从主信息界面3
goback: function (e) {
  console.log('pagetype ', this.data.pagetype);
  if (this.data.pagetype == 1) {
    wx.switchTab({
      url: '/pages/index/index'
    })
  } else if (this.data.pagetype == 2) {
    wx.switchTab({
      url: '/pages/trends/trends'
    })
  } else if (this.data.pagetype == 3) {
    wx.switchTab({
      url: '/pages/man/man'
    })
  }

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