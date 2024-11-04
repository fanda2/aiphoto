// app.js
App({
  onLaunch() {
    const welecome = wx.getStorageSync('welcome');
    if (welecome) {
      this.welecome=true;
    } else {
      this.welecome=false;
    }
    this.globalData.token = wx.getStorageSync('token')
    this.globalData.userInfo = wx.getStorageSync('userInfo')
    if (this.globalData.token.length) {
      this.globalData.isHide = 1
    }
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        }
      }
    })
  },
  globalData: {
    userInfo: {},
    currentMarkerId: 0,
    token: '',
    isHide: 0, //登录状态
    location: {},
    baseUrl: "https://serve.fjtbkyc.top",
    city: '',
    street: '',
    address: '', //地址
    welecome: true,
    imgcount:0,
    imageUrl:"", //背景图片临时背景
  }
})