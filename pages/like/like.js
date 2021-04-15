// pages/like/like.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mylike: [
      {
        id: 1,
        handimg: "http://qwq.fjtbkyc.net/public/personalBlog/images/blog/blog11.jpg",
        username: "我超能睡反正你不行",
        title: "花香四溢的春天来,花香四溢的春天来,花香四溢的春天来花香四溢的春天来",
        imgurl: "http://www.fjtbkyc.net/mywx/sunny2.jpg",
        date: "2000-01-26",
      },
    ],
    imageHeight: 0,
    imageWidth: 0
  },

  goDetail:function(e)
  {
    var pagid=e.currentTarget.dataset.pageid; //用于文章返回 
    var detailid=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/detail/detail?pageid=&&datailid='+pagid+detailid,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (event) {
    wx.showLoading({
      title: '玩命加载中'
      })
      setTimeout(function() {
        wx.hideLoading({
          success: (res) => {},
          fail: (res) => {},
          complete: (res) => {},
        })
     }, 1000);
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
    this.onLoad(); //重新加载onLoad()
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