// pages/like/like.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mylike: [
      // {
      //   id: 1,
      //   handimg: "http://qwq.fjtbkyc.net/public/personalBlog/images/blog/blog11.jpg",
      //   username: "我超能睡反正你不行",
      //   title: "花香四溢的春天来,花香四溢的春天来,花香四溢的春天来花香四溢的春天来",
      //   imgurl: "http://www.fjtbkyc.net/mywx/sunny2.jpg",
      //   date: "2000-01-26",
      // },
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
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#1ba1f0',
      animation: {
        duration: 300,
        timingFunc: 'easeIn'
      }
    })
    var that = this
    var token = app.globalData.token;

    wx.request({
      url: 'https://storymap.sherlockouo.com/like/list',
      method: "GET",
      header: {
        'Authorization': token,
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        // posterid: that.data.essayall.id,
        // tolike: that.data.essayall.userid
      },
      success(res) {
        wx.hideLoading();
        wx.stopPullDownRefresh() //刷新完成后停止下拉刷新动效
        console.log("collect list ", res)
        var ls = res.data.data
        for (var key in ls) {
          var marker = ls[key];
          marker.id = marker.poster.id
          var imgurls = marker.poster.files.split("#");

          for (var i = 0; i < imgurls.length; i++) {
            if (imgurls[i] == "") imgurls.splice(i, 1);
          }
          imgurls = Array.from(new Set(imgurls))
          //cover
          marker.handimg = marker.userEntity.avatar;
          marker.username = marker.userEntity.nickname
          marker.like = marker.poster.likes;
          marker.imgurl = imgurls[0];
          marker.title = marker.poster.title
          marker.local = marker.poster.address
          marker.concern = Math.floor(Math.random() * (1000 - 10)) + 10;
          // console.log('marker',marker)
        }
        that.setData({
          mylike:res.data.data
        })
      },
      fail(res) {}
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