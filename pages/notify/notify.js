// pages/notify/notify.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notify:[],
    basepage: 1,
    baselimit: 20,
    showDialog: false,
    showtitle:"",
    showmessage:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '玩命加载中'
      })
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
    var that=this;
    that.notifyget()
  },
  notifyget:function(e){
    var that=this;
    wx.request({
      url: app.globalData.baseUrl+'/Not/notify_all',
      method:"GET",
    header: {
      // Authorization: token,
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: {
      page: this.data.basepage,
      limit: this.data.baselimit,
    },
    success(res) {
      wx.hideLoading({
        success: (res) => {
          
        },
      })
      if (res.data.status == 200) {
        var array=res.data.data.row;
        that.setData({
          notify:array
        })
      } else {
        wx.showToast({
          title: '信息更新失败！',
          icon: 'error',
          duration: 2000
        })
      }
    },
    fail() {}
  })

  },

  //查看详细信息
  detail:function(e)
  {
    var title=e.currentTarget.dataset.title
    var message=e.currentTarget.dataset.msg
    this.setData({
      showDialog: !this.data.showDialog,
      showtitle:title,
      showmessage:message
    });

  },
  cancel:function(e)
  {
    this.setData({
      showDialog: !this.data.showDialog
    });
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