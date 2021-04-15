// pages/message/message.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      // bacurl: 'http://www.fjtbkyc.net/mywx/clients-section-bg1.jpg', // 背景图片连接
      // headimg: 'http://www.fjtbkyc.net/mywx/dog.jpg', //头像链接
      // username: 'Another 小明',
      // local: "宜宾", //用户来自城市
      // concern: 10, //用户关注的人数
      // like: 80, //用户粉丝数
      // introduce: "该用户很懒，还没留下任何东西哦~该用户很懒，还没留下任何东西哦~该用户很懒，还没留下任何东西哦~", //用户介绍，最多50个字
    },
    isconcern: '+关注', //按钮的文字内容
    concernAc: 0,
    sharenavbar: [],
    lostnavbar: [],
    navbar: ['ta的分享', '发布失物'],
    Smodewith: [],
    Smodeheight: [],
    Lmodewith: [],
    Lmodeheight: [],
    currentTab: 0,
    userid: 0,

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
    var token = app.globalData.token;
    // console.log('token ', token.length)
    if (token.length != 0) {
      wx.request({
        url: 'https://storymap.sherlockouo.com/poster/user/' + that.data.userid,
        method: "GET",
        header: {
          Authorization: token,
        },
        data: {
          type: 1,
          pageNum: 1,
          pageSize: 100
        },
        success(res) {
          var ls = res.data.data.list;
          for (var key in ls) {
            var marker = ls[key];
            marker.id = marker.id;
            marker.userid = marker.userid;
            marker.local = marker.address;
            marker.headimg = marker.avator;
            marker.like = marker.likes;
            //cover
            marker.imgurl = marker.files.substr(1, 83);
            // console.log('marker', marker)
          }
          that.setData({
            sharenavbar: res.data.data.list
          })
        }
      })
      wx.request({
        url: 'https://storymap.sherlockouo.com/poster/user/' + that.data.userid,
        method: "GET",
        header: {
          Authorization: token,
        },
        data: {
          type: 2,
          pageNum: 1,
          pageSize: 100

        },
        success(res) {
          // console.log('res is lost  ', res.data.data.list)
          var ls = res.data.data.list;

          for (var key in ls) {
            var marker = ls[key];
            marker.id = marker.id;
            marker.userid = marker.userid;
            marker.local = marker.address;
            marker.headimg = marker.avator;
            marker.like = marker.likes;
            //cover
            marker.imgurl = marker.files.substr(1, 82);
            // console.log('marker', marker)
          }
          that.setData({
            lostnavbar: res.data.data.list
          })
        }
      })
    }

    wx.request({
      url: 'https://storymap.sherlockouo.com/user/getInfo/' + that.data.userid,
      method: "GET",
      header: {
        Authorization: token,
      },
      data: {

      },
      success(res) {
        console.log('res is  ', res)
        var ls = res.data.data;
        var userinfo = res.data.data;
        if (res.data.code == 0) {
          new Promise((resolve) => {
            userinfo.bacurl = userinfo.bgimg
            userinfo.headimg = userinfo.avatar
            userinfo.username = userinfo.nickname
            userinfo.introduce = userinfo.motto
            userinfo.like = Math.floor(Math.random(1000) + 10)
            userinfo.concern = Math.floor(Math.random(200) + 10)
            userinfo.local = userinfo.address
            resolve()
          }).then(() => {
            that.setData({
              userInfo: userinfo
            })
          }).then(() => {
            // console.log("detasdasdasdasdaail ",res)
            wx.request({
              url: 'https://storymap.sherlockouo.com/follow/didFollow',
              method: "GET",
              header: {
                'Authorization': token,
                'content-type': 'application/x-www-form-urlencoded'
              },
              data: {
                // posterId: app.globalData.currentMarkerId,
                userId: that.data.userid
              },
              success(res) {
                if (res.data.code == '0') {
                  console.log("返回接轨",res.data.data);
                  that.setData({
                    concernAc: res.data.data
                  })
                }
                 wx.hideLoading({
                  success: (res) => {},
                }) 
              }
            })
          })
        } 
      }

    })
  },

  //点击关注按钮调用
  concern: function (e) {
    var that = this
    var token = app.globalData.token;
    wx.request({
      url: 'https://storymap.sherlockouo.com/follow/dofollow',
      method: "POST",
      header: {
        'Authorization': token,
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        // posterid: that.data.essayall.id,
        tofollow: that.data.userid
      },
      success(res) {
        // console.log("dolike ",res)
        if (res.data.code == '0') {
          console.log("shit ", res)
          that.setData({
            concernAc: !that.data.concernAc,
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  goDetail: function (e) {
    var that = this
    var postid = e.currentTarget.dataset.id
    var userid = 0;
    wx.request({
      url: 'https://storymap.sherlockouo.com/poster/info',
      method: "GET",
      data: {
        posterId: postid,
      },
      success(res) {
        if (res.data.code == 0) {
          new Promise((resolve, reject) => {
            var marker = res.data.data;
            userid = marker.userid;
            resolve(userid)
          }).then(() => {
            app.globalData.currentMarkerId = e.currentTarget.dataset.id
            wx.navigateTo({
              url: '/pages/detail/detail?pageid=' + 6 + "&userid=" + userid,
            })
          })
        }
      }
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
        backgroundColor: '#1ba1f0',
        animation: {
          duration: 400,
          timingFunc: 'easeIn'
        }
      })
      this.setData({
        navbar: ["我的分享", "失物招领"],
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