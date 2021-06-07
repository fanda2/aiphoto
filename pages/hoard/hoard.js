// pages/hoard/hoard.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: [],
    ac: [], //判断文字是行数
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
    var arr = []
    for (let td of this.data.navbar) {
      if (td.title.length > 12) {
        arr[td.id - 1] = 1
      }
    }
    this.setData({
      ac: arr
    })
  },
  Tapgo: function (e) {
    var that = this
    var authorid = e.currentTarget.dataset.authorid
    var posterid = e.currentTarget.dataset.posterid
    console.log("userid ", authorid, "posterid", posterid)
    wx.redirectTo({
      url: '/pages/detail/detail?posterid=' + posterid + "&authorid=" + authorid + "&pageid=" + 4,
    })
  },

  //获取收藏列表
  getCollect: function () {
    var token = app.globalData.token;
  },
  // 取消收藏
  unCollect: function () {
    var token = app.globalData.token;
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
    console.log("用户id", app.globalData.userInfo.userid)
    wx.request({
      url: app.globalData.baseUrl + '/Hor/hoard_me', //仅为示例，并非真实的接口地址
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
        wx.stopPullDownRefresh() //刷新完成后停止下拉刷新动效
        var ls = res.data.data.row
        for (var key in ls) {
          var marker = ls[key];
          marker.userid = marker.userid
          var imgurls = marker.files.split("#");
          for (var i = 0; i < imgurls.length; i++) {
            if (imgurls[i] == "") imgurls.splice(i, 1);
          }
          imgurls = Array.from(new Set(imgurls))
          //cover
          marker.handimg = marker.avatar;
          marker.username = marker.nickname;
          // marker.userid = marker.userEntity.id
          // marker.like = marker.poster.likes;
          marker.imgurl = imgurls[0];
          marker.title = marker.title
          marker.local = marker.address
          marker.concern = Math.floor(Math.random() * (1000 - 10)) + 10;
          // console.log('marker',marker)
        }
        var array;
        array = res.data.data.row;
        array.reverse();
        that.setData({
          navbar: array
        })
        wx.hideLoading();
      },
      fail(res) {}
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
    this.onShow();
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