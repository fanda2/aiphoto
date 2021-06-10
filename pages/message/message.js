// pages/message/message.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    isconcern: '+关注', //按钮的文字内容
    concernAc: 0,
    sharenavbar: [],
    lostnavbar: [],
    navbar: ['ta的收藏'],
    Smodewith: [],
    Smodeheight: [],
    Lmodewith: [],
    Lmodeheight: [],
    currentTab: 0,
    userid: 0,
    like: 122,
    concern: 100,
  },

  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },

  imageLoad: function (e) {
    var k = e.currentTarget.dataset.index;
    var newmodewidth = []
    var newmodeheight = []
    //初始化函数数组
    var s = 0;
    for (let td of this.data.Smodewith) {
      newmodewidth.splice(s++, 0, td)
    }

    for (let td of this.data.Smodeheight) {
      newmodeheight.splice(s++, 0, td)
    }

    var $width = e.detail.width, //获取图片真实宽度
      $height = e.detail.height,
      ratio = $width / $height; //图片的真实宽高比例
    var thismode = '' //定义每次获取的图片模式
    // rario大于1表示横版图片
    if (ratio >= 1.6) {
      newmodewidth[k] = 200 * ratio;
      newmodeheight[k] = 200
    }
    //竖版图片
    else {
      newmodewidth[k] = 320;
      newmodeheight[k] = 320 / ratio
    }
    this.setData({
      Smodewith: newmodewidth,
      Smodeheight: newmodeheight
    })
  },
  // 获取失物招领图片宽高
  LimageLoad: function (e) {
    var k = e.currentTarget.dataset.index;
    var newmodewidth = []
    var newmodeheight = []
    //初始化函数数组
    var s = 0;
    for (let td of this.data.Lmodewith) {
      newmodewidth.splice(s++, 0, td)
    }

    for (let td of this.data.Lmodeheight) {
      newmodeheight.splice(s++, 0, td)
    }

    var $width = e.detail.width, //获取图片真实宽度
      $height = e.detail.height,
      ratio = $width / $height; //图片的真实宽高比例
    var thismode = '' //定义每次获取的图片模式

    // rario大于1表示横版图片
    if (ratio >= 1.6) {
      newmodewidth[k] = 200 * ratio;
      newmodeheight[k] = 200
    }
    //竖版图片
    else {
      newmodewidth[k] = 320;
      newmodeheight[k] = 320 / ratio
    }
    this.setData({
      Lmodewith: newmodewidth,
      Lmodeheight: newmodeheight
    })
  },

  onShow: function () {
    var that = this
    that.postbefollow();
    that.postfollow();
    var token = app.globalData.token;
    if (token) {
      wx.request({
        url: app.globalData.baseUrl + '/Use/user_one', //仅为示例，并非真实的接口地址
        method: "GET",
        data: {
          id: this.data.userid,
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: res => {
          var array;
          array = res.data.data.jrow;
          // array.reverse();
          that.setData({
            userInfo: array
          })
          wx.request({
            url: app.globalData.baseUrl + '/Hor/hoard_me', //仅为示例，并非真实的接口地址
            method: "GET",
            data: {
              userid: that.data.userid,
              page: 1,
              limit: 10,
            },
            header: {
              'content-type': 'application/json' // 默认值
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
                sharenavbar: array
              })
              wx.hideLoading();
            }
          })
        }
      })
    } else {
      that.gologin();
    }
  },

  //点击关注按钮调用
  concern: function (e) {
    var that = this
    var token = app.globalData.token;
  },
 
  //去登录的状态
  gologin: function (e) {
    wx.redirectTo({
      url: '/pages/login/login?pagetype=' + 3,
    })
  },

  goDetail: function (e) {
    var pstid = e.currentTarget.dataset.posterid;
    var authorid = e.currentTarget.dataset.uid;
    wx.navigateTo({
      url: '/pages/detail/detail?posterid=' + pstid+"&authorid="+authorid+"&pageid="+6+"&share="+0,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '玩命加载中'
    })
    this.setData({
      userid: options.userid
    })
    if (options.mystyle == 1) {
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#52e7e0',
        animation: {
          duration: 500,
          timingFunc: 'easeIn'
        }
      })
      this.setData({
        navbar: ["我的收藏"],
      })
    }
  },


  postfollow: function (e) {
    if (app.globalData.token) {
      var that = this
      wx.request({
        url: app.globalData.baseUrl + '/Flw/follow_num',
        method: "GET",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          userid: that.data.userid,
        },
        success(res) {
          if (res.data.status == 200) {
            that.setData({
              concern:res.data.data.num,
            })
            console.log("res:",res)
          } else {
            console.log("请求发送失败！")
          }
        }
      })
    }
  },
  postbefollow: function (e) {
    if (app.globalData.token) {
      var that = this
      wx.request({
        url: app.globalData.baseUrl + '/Flw/follow_benum',
        method: "GET",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          userid: that.data.userid,
        },
        success(res) {
          if (res.data.status == 200) {
            console.log("res:",res)
            that.setData({
              like:res.data.data.num,
            })
          } else {
            console.log("请求发送失败！")
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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