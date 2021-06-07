// pages/concern/concern.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    refreshPage: 1,
    concern:[
      {
        id:1,
        handimg:"http://qwq.fjtbkyc.net/public/personalBlog/images/blog/blog11.jpg",
        name:"喜羊羊",
        introduce:"择一城终老，爱一人白首！"
      },
    ]
  },
  concelConcern:function(e)
  {
    var that = this
    var token = app.globalData.token;
    // console.log("点击 ",e.currentTarget)
    wx.showModal({
      title: '提示',
      content: '是否取消关注: '+e.currentTarget.dataset.name,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    wx.showLoading({
      title: '玩命加载中'
    })
    var that = this
    var token = app.globalData.token;
    wx.request({
      url: app.globalData.baseUrl + '/Flw/follow_all', //仅为示例，并非真实的接口地址
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        userid: app.globalData.userInfo.userid,
        limit: 20,
        page: 1
      },
      success(res) {
        console.log("请求结果",res);
        wx.stopPullDownRefresh() //刷新完成后停止下拉刷新动效
        var array;
        array = res.data.data.row;
        that.setData({
          concern: array
        })
        wx.hideLoading();
      },
      fail(res) {}
    })
  },
  //界面跳转
  goMessage:function(e)
  {
     var index=e.currentTarget.dataset.idx;
     var userid=this.data.concern[index].userid
     wx.navigateTo({
      url: '/pages/message/message?userid='+ userid,
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
    this.onShow(); //重新加载onLoad()
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