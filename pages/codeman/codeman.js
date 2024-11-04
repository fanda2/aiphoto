// pages/codeman/codeman.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    introduction:"Another Dimension",
    tell:"很高心你能看到这里，这个小程序的开发还存在一些不足够，我们也在努力去完善，不断优化体验。如果有什么意见和建议欢迎向我们提出，可以通过联系客服发送，也可以添加开发人员微信（微信号：fandalive）反馈，再次感谢您的使用！",
    Objabout:"这款小程序是为喜欢摄影的朋友们提供一个工具，可以方便个位摄影爱好者陌生的地方快速发现周围合适的拍摄地点。由于个人开发的限制，个人上传图文功能无法实现，有兴趣一起完善拍摄地点的相关西信息，可以联系客服加入运维群。我相信在不断的努力之后可以将这个小程序越来越完善，成为大家拍摄中的有利工具!",
    version:[
      {
        ver: '1.4.3',
        introduce:['这是最新版本，修复部分bug','其他功能更新'],
      },
      {
        ver: '1.1.2',
        introduce:['新增点赞功能，修复部分bug','其他功能更新'],
      },
      {
        ver: '1.1.1',
        introduce:['各项功能基本完善','上线发布'],
      }

    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //加载顶部颜色
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#52e7e0',
      animation: {
        duration: 500,
        timingFunc: 'easeIn'
      }
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