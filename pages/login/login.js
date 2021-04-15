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
  getUserProfile:function(e) {
    console.log("调用函数")
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      console.log("用户信息",res.userInfo)
      }
    })
  },
  getUserInfo:function(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onLoad: function(options) {
    this.setData({
      pagetype: options.pagetype
    })
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          //已授权，可以获取用户信息
          wx.getUserInfo({
            success: function (res) {
              console.log("23232",res.userInfo); //对象
              console.log(res.rawData); //Json
            
              var avatarUrl = res.userInfo.avatarUrl;
              var userName = res.userInfo.nickName;
            
              that.setData({
                avatarUrl: avatarUrl,
                userName: userName
              })
              
            }
          })
        }
      }
    })
  },

  wxlogin: function (e) {
    if (e.detail.userInfo) {
      var that = this
      wx.login({
          success: res => {
            if (res.code) {
              // wx.setStorageSync('token', token);
              console.log(res.code);
              // 获取用户的登录信息
              this.getUserProfile();
             this.goback();
            // res.code => 登录凭证
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      });
  } else {
    //用户按了拒绝按钮
    wx.showModal({
      title: '警告',
      content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
      showCancel: false,
      confirmText: '返回授权',
      success: function (res) {
        // 用户没有授权成功，不需要改变 isHide 的值
        if (res.confirm) {
          console.log('用户点击了“返回授权”');
        }
      }
    });
  }
},

getUserinfo:function(e)
{
  wx.getUserInfo({
    success: (data) => {
      console.log(data.userInfo)
      // 更新data中的userInfo
      this.setData({
        userInfo: data.userInfo
      })
    },
    fail: () => {
      console.log('获取用户数据失败')
    }
  })
},

wxregister: function (e) {
  console.log("用户点击进行注册")

},

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
      url: '/pages/man/man?userInfo?=' + app.globalData.userInfo
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