// pages/trends/trends.js
const app = getApp();
Page({
  data: {
    navbar: [],
    label: [{
        name: "推荐",
        id: 1
      },
      {
        name: "附近",
        id: 2
      },
      {
        name: "最新",
        id: 3
      },
      {
        name: "关注",
        id: 4
      },
      {
        name: "风景",
        id: 5
      },
      {
        name: "美食",
        id: 6
      },
      {
        name: "人物",
        id: 7
      },
      {
        name: "生活",
        id: 8
      }
    ],
    currentTab: 0,
    tal: 0,
    ac1: 1,
    ac2: 0,
    cTab: 0,
    shareCount: 1,
    lostCount: 2,
    oldactive: 0, //之前显示的值
    isactive: [1, 0, 0, 0, 0, 0, 0, 0],
    basepage: 1,
    baselimit: 5,
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    // console.log(e.currentTarget.dataset);
  },

  //点击头部实现不同样式与请求
  getMessage: function (e) {
    var idx = e.currentTarget.dataset.idx;
    var id = e.currentTarget.dataset.id;
    var oldactive = this.data.oldactive
    // console.log("点击", id)
    var newdata = this.data.isactive;
    newdata[oldactive] = 0,
      newdata[idx] = 1
    if (idx != oldactive) {
      this.setData({
        oldactive: idx
      })
    }
    this.setData({
      isactive: newdata
    })
    var that = this
    if (id == 1) {
      that.pst_recommend();
    } else if (id == 2) {
      that.pst_nearby();
    } else if (id == 3) {
      that.pst_time();
    } else if (id == 4) {
      that.pst_concern();
    } else {
      wx.request({
        url: app.globalData.baseUrl + '/Pst/poster_type', //仅为示例，并非真实的接口地址
        method: "GET",
        data: {
          type: id,
          page: this.data.basepage,
          limit: this.data.baselimit,
        },
        header: {
          // 'content-type': 'application/json' // 默认值
        },
        success(res) {
          // console.log("请求结果", res)
          wx.hideLoading();
          var ls = res.data.data.row;
          for (var key in ls) {
            var marker = ls[key];
            marker.id = marker.id;
            marker.userid = marker.authorid;
            marker.local = marker.address;
            marker.avatar = marker.avatar;
            marker.nickname = marker.nickname;
            var imgurls = marker.files.split("#");
            for (var i = 0; i < imgurls.length; i++) {
              if (imgurls[i] == "") imgurls.splice(i, 1);
            }
            imgurls = Array.from(new Set(imgurls))
            //cover
            marker.headimg = marker.imgurl;
            marker.like = marker.likes;
            marker.imgurl = imgurls[0];
          }
          var array;
          array = res.data.data.row;
          that.setData({
            navbar: array
          })
        }
      })
    }
  },

  goDetail: function (e) {
    var pstid = e.currentTarget.dataset.posterid;
    var authorid = e.currentTarget.dataset.uid;
    wx.navigateTo({
      url: '/pages/detail/detail?posterid=' + pstid + "&authorid=" + authorid + "&pageid=" + 1 + "&share=" + 0,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '玩命加载中'
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
    var that = this;
    that.pst_recommend();
  },

  //请求推荐的文章
  pst_recommend: function (e) {
    var that = this
    wx.request({
      url: app.globalData.baseUrl + '/Pst/poster_all', //仅为示例，并非真实的接口地址
      method: "GET",
      data: {
        page: this.data.basepage,
        limit: this.data.baselimit,
      },
      header: {
        // 'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        var ls = res.data.data.row;
        for (var key in ls) {
          var marker = ls[key];
          marker.id = marker.id;
          marker.userid = marker.authorid;
          marker.local = marker.address;
          marker.avatar = marker.avatar;
          marker.nickname = marker.nickname;
          var imgurls = marker.files.split("#");
          for (var i = 0; i < imgurls.length; i++) {
            if (imgurls[i] == "") imgurls.splice(i, 1);
          }
          imgurls = Array.from(new Set(imgurls))
          //cover
          marker.headimg = marker.imgurl;
          marker.like = marker.likes;
          marker.imgurl = imgurls[0];
        }
        var array;
        array = res.data.data.row;
        that.setData({
          navbar: array
        })
      }
    })
  },

  //查询附近的文章
  pst_nearby: function (e) {
    var that = this
    wx.request({
      url: app.globalData.baseUrl + '/Pst/poster_nearby', //仅为示例，并非真实的接口地址
      method: "GET",
      data: {
        long: app.globalData.longitude,
        lat: app.globalData.latitude,
        page: this.data.basepage,
        limit: this.data.baselimit,
      },
      header: {
        // 'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log("请求结果", res)
        wx.hideLoading();
        var ls = res.data.data.row;
        for (var key in ls) {
          var marker = ls[key];
          marker.id = marker.id;
          marker.userid = marker.authorid;
          marker.local = marker.address;
          marker.avatar = marker.avatar;
          marker.nickname = marker.nickname;
          var imgurls = marker.files.split("#");
          for (var i = 0; i < imgurls.length; i++) {
            if (imgurls[i] == "") imgurls.splice(i, 1);
          }
          imgurls = Array.from(new Set(imgurls))
          //cover
          marker.headimg = marker.imgurl;
          marker.like = marker.likes;
          marker.imgurl = imgurls[0];
        }
        var array;
        array = res.data.data.row;
        that.setData({
          navbar: array
        })
      }
    })
  },

  //按时间排序的文章
  pst_time: function (e) {
    var that = this
    wx.request({
      url: app.globalData.baseUrl + '/Pst/poster_time', //仅为示例，并非真实的接口地址
      method: "GET",
      data: {
        page: this.data.basepage,
        limit: this.data.baselimit,
      },
      header: {
        // 'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        var ls = res.data.data.row;
        for (var key in ls) {
          var marker = ls[key];
          marker.id = marker.id;
          marker.userid = marker.authorid;
          marker.local = marker.address;
          marker.avatar = marker.avatar;
          marker.nickname = marker.nickname;
          var imgurls = marker.files.split("#");
          for (var i = 0; i < imgurls.length; i++) {
            if (imgurls[i] == "") imgurls.splice(i, 1);
          }
          imgurls = Array.from(new Set(imgurls))
          //cover
          marker.headimg = marker.imgurl;
          marker.like = marker.likes;
          marker.imgurl = imgurls[0];
        }
        var array;
        array = res.data.data.row;
        that.setData({
          navbar: array
        })
      }
    })

  },
  //查询自己关注人的文章，按时间排序
  pst_concern: function (e) {
    var that = this
    if (!app.globalData.token) {
      that.gologin();
    } else {
      wx.request({
        url: app.globalData.baseUrl + '/Pst/poster_follow', //仅为示例，并非真实的接口地址
        method: "GET",
        data: {
          userid: app.globalData.userInfo.userid,
          page: this.data.basepage,
          limit: this.data.baselimit,
        },
        header: {
          // 'content-type': 'application/json' // 默认值
        },
        success(res) {
          // console.log("请求结果", res)
          wx.hideLoading();
          var ls = res.data.data.row;
          for (var key in ls) {
            var marker = ls[key];
            marker.id = marker.id;
            marker.userid = marker.authorid;
            marker.local = marker.address;
            marker.avatar = marker.avatar;
            marker.nickname = marker.nickname;
            var imgurls = marker.files.split("#");
            for (var i = 0; i < imgurls.length; i++) {
              if (imgurls[i] == "") imgurls.splice(i, 1);
            }
            imgurls = Array.from(new Set(imgurls))
            //cover
            marker.headimg = marker.imgurl;
            marker.like = marker.likes;
            marker.imgurl = imgurls[0];
          }
          var array;
          array = res.data.data.row;
          that.setData({
            navbar: array
          })
        }
      })
    }

  },

  gologin: function (e) {
    if (app.globalData.token.length == 0) {
      wx.navigateTo({
        url: '/pages/login/login?pagetype=' + 1,
      })
    }
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