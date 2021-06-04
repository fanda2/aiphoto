// pages/login/login.js
const app = getApp()
Page({
  data: {
    userInfo: {},
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    pagetype: 3, //页面跳转前的页面
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    islogin:false
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        pagetype:this.options.pagetype,
        canIUseGetUserProfile: true
      })
    }
  },

  getUserProfile(e) {
    var that = this
    wx.showLoading({
      title: '登录中'
      })
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: function (res) {
        console.log("auth ",res)
        new Promise((resolve)=>{
          that.setData({
            userInfo: res = JSON.parse(res.rawData),
          })
          resolve(resolve)
        }).then((result)=>{
          wx.login({
            success: res => {
              console.log("微信登录成功",res)
              wx.request({
                // 自行补上自己的 APPID 和 SECRET
                url: app.globalData.baseUrl+'/Login/onLogin', //仅为示例，并非真实的接口地址
                method: "GET",
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                data: {
                  code: res.code,
                  nickname: that.data.userInfo.nickName,
                  avatar: that.data.userInfo.avatarUrl,
                  type:1,
                  bgimg:"http://www.fjtbkyc.net/images/bg1.jpg",
                  address:'四川 成都',
                  birthday:"2000-00-00"
                },
                success: res => { 
                  wx.hideLoading() ;  
                  // console.log(" something goes wrong msg ", res.data);
                  // 获取到用户的信息了，打印到控制台上看下
                  app.globalData.isHide = 1
                  try {
                    wx.setStorageSync('userInfo', res.data.data.jrow)
                  } catch (e) {
                    console.log("存储失败11！")
                   }
                  // 获取到用户的 openid
                  if (res.data.status == 200) {
                    app.globalData.token = res.data.data.session;
                    app.globalData.userInfo=res.data.data.jrow
                    try {
                      wx.setStorageSync('token', res.data.data.session)
                    } catch (e) {
                      console.log("存储失败22！")
                     }
                   
                     try {
                      wx.setStorageSync('userInfo', res.data.data.jrow)
                    } catch (e) {
                      console.log("存储失败33！")
                     }

                    //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
                    that.setData({
                      isHide: 0,
                      userInfo: res.data.data.jrow
                    });
                  } else {
                    console.log(" something goes wrong msg ", res.data.data.jrow);
                  }
                  that.goback();
                },
                fail: res => {
                  console.log("shit failed");
                }
              });
            }
          })
          
        })
        
        // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
        // 根据自己的需求有其他操作再补充
        // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
      },
      fail:function(res){
        console.log("shit failed ",res)
      }
    });
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
  } else {
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