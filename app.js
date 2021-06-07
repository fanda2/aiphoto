// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs')
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs) 
      // 获取用户信息
    this.globalData.token=wx.getStorageSync('token')
    this.globalData.userInfo=wx.getStorageSync('userInfo')
    if(this.globalData.token.length)
    {
      this.globalData.isHide=1
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
    currentMarkerId:0,
    token:'',
    isHide:0,//登录状态
    location:{},
    baseUrl:"https://aiphoto.fjtbkyc.net/server"
  }
})
