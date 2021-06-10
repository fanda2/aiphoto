const {
  log
} = require("../../utils/consoleUtil")

// pages/detail/detail.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pageid: '', //跳转到此界面之前页面的id
    vaHe: 0, //导航菜单高度
    inputHe: 0, //输入框高度
    username: "",
    current: 0, //当前所在页面的 index
    concernAc: 0, //用户是否关注
    isconcern: '+关注', //按钮的文字内容
    headimg: "http://wew.fjtbkyc.net/images/bg1.jpg", //默认头像信息
    circular: true, //是否采用衔接滑动
    essayall: [],
    links: [
      '/pages/preview/preview',
    ],
    likeimg: '/img/like.png',
    hoardimg: '/img/hoard.png',
    shareimg: '/img/shareico_h.png',
    isyouself: 0, //判断是不是本人
    isshow: 0, //是否展示相关信息
    islike: 0, //是否点赞
    ishoard: 0, //是否收藏
    oldlike: 0,
    oldhoard: 0,
    authorid: 0,
    posterid: 0, //文章的id
    sharepage: 0,
    countnum: 0, //表示用户点击按钮后的结果
    cont: 0, //表示点击按钮的次数
  },

  // 点击图片进行预览函数
  //预览图片，放大预览
  imgClick: function (e) {
    var src = e.currentTarget.dataset.num // 图片路径
    var imgList = this.data.essayall.imgUrls // 图片数组
    wx.previewImage({
      current: imgList[src],
      urls: imgList
    })
  },
  onSlideChange: function (event) {
    var postId = event.detail.current;
    this.setData({
      current: event.detail.current
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '玩命加载中'
    })
    wx.showShareMenu({
      withShareTicket: true
    })
    var data = wx.getMenuButtonBoundingClientRect()
    var WH = wx.getSystemInfoSync()
    this.setData({
      // 获取导航栏高度
      vaHe: data.bottom + 10,
      inputHe: data.bottom - data.top,
      pageid: options.pageid,
      posterid: options.posterid,
      authorid: options.authorid,
      sharepage: options.share,
    })
    console.log("加载时获取的信息", this.data.posterid + " ", this.data.authorid + " ", this.data.sharepage)
    if (options.authorid == app.globalData.userInfo.userid) {
      this.setData({
        isyouself: 1,
      })
    }
  },

  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  //界面跳转
  goMessage: function (e) {
    if (!app.globalData.token.length) {
      this.gologin(); //判断用户是否登录进入登录界面
    } else {

      var userid = this.data.authorid
      var youself = this.data.isyouself
      wx.navigateTo({
        url: '/pages/message/message?userid=' + userid + "&ismystyle=" + youself,
      })
    }
  },
  //展示编辑操作
  showedit: function (e) {
    if (this.data.isshow == 1) {
      this.setData({
        isshow: 0
      })
    } else {
      this.setData({
        isshow: 1
      })
    }
  },
  hide: function (e) {
    this.setData({
      isshow: 0
    })
  },

  //点击指示点切换
  chuangEvent: function (e) {
    this.setData({
      swiperCurrent: e.currentTarget.id
    })

  },

  //点击图片触发事件

  swipclick: function (e) {
    wx.switchTab({
      url: this.data.links[this.data.swiperCurrent]
    })

  },
  deback: function (e) {
    if (this.data.pageid == 1) {
      wx.switchTab({
        url: '/pages/index/index'
      })
    } else if (this.data.pageid == 2) {
      wx.navigateBack({
        url: '/pages/address/address',
      })
    } else if (this.data.pageid == 3) {
      wx.navigateBack({
        url: '/pages/hoard/hoard'
      })
    } else if (this.data.pageid = 4) {
      wx.navigateBack({
        url: '/pages/hoard/hoard'
      })
    } else if (this.data.pageid = 5) {
      wx.navigateBack({
        url: '/pages/address/address'
      })

    } else if (this.data.pageid = 6) {
      wx.navigateBack({
        url: '/pages/message/message'
      })
    } else {
      wx.switchTab({
        url: '/pages/index/index'
      })
    }
  },
  gohome: function (e) {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },

  //点击关注按钮调用
  concern: function () {
    var that = this
    if (!app.globalData.token) {
      that.gologin()
    } else {
      this.setData({
        concernAc: !this.data.concernAc
      })
    }

  },
  //点击关注接口调用
  postconcern: function (e) {
    var that = this
    wx.request({
      url: app.globalData.baseUrl + '/Flw/follow_updata',
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        userid: app.globalData.userInfo.userid,
        befwuserid: this.data.authorid
      },
      success(res) {
        if (res.data.status == 200) {
          console.log("关注调用成功")
        } else {
          console.log("请求发送失败！")
        }
      }
    })
  },

  gologin: function (e) {
    if (app.globalData.token.length == 0) {
      wx.navigateTo({
        url: '/pages/login/login?pagetype=' + 2+'posterid=' + this.data.posterid + "&authorid=" + this.data.authorid,
      })
    }
  },

  //查询文章的点赞数目
  postselectlike: function (e) {
    if (app.globalData.token) {
      var that = this
      wx.request({
        url: app.globalData.baseUrl + '/Like/like_benum',
        method: "GET",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          posterid: that.data.posterid,
        },
        success(res) {
          if (res.data.status == 200) {
            that.setData({
              likes: res.data.data.num,
            })
            console.log("res:", res)
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
   * 生命周期函数--监听页面显示
   */
  getstatus: function (e) {
    var that = this
    var token = app.globalData.token;
    if (token.length == 0) {
      console.log("未登录！");
    } else {
      wx.request({
        url: app.globalData.baseUrl + '/Like/like_check',
        method: "GET",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          userid: app.globalData.userInfo.userid,
          posterid: this.data.posterid
        },
        success(res) {
          if (res.data.status == 200) {
            if (res.data.data.type) {
              that.setData({
                islike: 1,
                oldlike: 1,
              })
            }
          }
        }

      })
      wx.request({
        url: app.globalData.baseUrl + '/Flw/follow_check',
        method: "GET",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          userid: app.globalData.userInfo.userid,
          befwuserid: this.data.authorid
        },
        success(res) {
          if (res.data.status == 200) {
            if (res.data.data.type) {
              that.setData({
                concernAc: 1,
                oldfollow: 1
              })
            }
          }
        }
      })
      wx.request({
        url: app.globalData.baseUrl + '/Hor/hoard_check',
        method: "GET",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          userid: app.globalData.userInfo.userid,
          posterid: this.data.posterid
        },
        success(res) {
          if (res.data.status == 200) {
            if (res.data.data.type) {
              that.setData({
                ishoard: 1,
                oldhoard: 1
              })
            }
          }
        }
      })
    }
  },
  onShow: function () {
    var that = this
    that.getstatus();
    that.postselectlike();
    // var postid = app.globalData.currentMarkerId
    var essayall = {};
    wx.request({
      url: app.globalData.baseUrl + '/Pst/poster_one',
      method: "GET",
      data: {
        id: that.data.posterid,
        authorid: that.data.authorid,
      },
      success(res) {
        wx.hideLoading();
        that.setData({
          essayid: res.data.posterid
        })
        if (res.data.status == 200) {
          new Promise((resolve, reject) => {
            var marker = res.data.data.jrow;
            essayall.id = marker.posterid;
            essayall.authorid = marker.authorid;
            essayall.local = marker.address;
            essayall.essay_title = marker.title;
            essayall.essay_text = marker.message
            var imgurls = marker.files.split("#");
            for (var i = 0; i < imgurls.length; i++) {
              if (imgurls[i] == "") imgurls.splice(i, 1);
            }
            // 去重方式一 会把imgurls 变为 空
            imgurls = Array.from(new Set(imgurls))
            essayall.imgUrls = imgurls;
            var tags = marker.tags.split("#");
            for (var i = 0; i < tags.length; i++) {
              if (tags[i] == "") tags.splice(i, 1);
            }
            essayall.tabel = tags;
            essayall.like = marker.likes;
            essayall.sharetime = marker.creat_time;
            that.setData({
              username: marker.nickname,
              headimg: marker.avatar,
            })
            resolve(essayall);
          }).then(() => {
            that.setData({
              essayall: essayall,
            })
          })
        }
      }
    })
  },

  //分享给朋友
  onShareAppMessage() {
    const promise = new Promise(resolve => {
      setTimeout(() => {
        resolve({
          title: 'ai摄'
        })
      }, 1000)
    })
    return {
      title: this.data.essayall.essay_title,
      path: '/pages/detail/detail?posterid=' + this.data.posterid + "&authorid=" + this.data.authorid + "&share=" + 1,
      imageUrl: this.data.essayall.imageUrl,
      // promise :36
    }
  },
  dolike: function (e) {
    if (!app.globalData.token) {
      this.gologin();
    } else {
      if (this.data.oldlike) {
        if (this.data.cont % 2)
          this.setData({
            countnum: 0,
          })
        else {
          this.setData({
            countnum: -1,
          })
        }
      }
      if (this.data.oldlike == 0) {
        if (this.data.cont % 2)
          this.setData({
            countnum: 0,
          })
        else {
          this.setData({
            countnum: 1,
          })
        }
      }
      this.setData({
        cont: this.data.cont + 1,
        islike: !this.data.islike
      })
    }
  },
  postlike: function () {
    var that = this
    var token = app.globalData.token;
    if (token.length) {
      wx.request({
        url: app.globalData.baseUrl + '/Like/like_updata',
        method: "GET",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          userid: app.globalData.userInfo.userid,
          authorid: this.data.authorid,
          posterid: this.data.posterid
        },
        success(res) {
          if (res.data.status == 200) {
            console.log("点赞操作成功")
          } else {
            console.log("点赞失败")
          }
        },
        fail(res) {}
      })
    }
  },

  //在页面进行执行
  docollect: function () {
    if (!app.globalData.token) {
      this.gologin();
    } else {
      this.setData({
        ishoard: !this.data.ishoard
      })
    }
  },
  //调用接口执行
  postcollect: function () {
    var that = this
    var token = app.globalData.token;
    if (token.length ) {
      wx.request({
        url: app.globalData.baseUrl + '/Hor/hoard_updata',
        method: "GET",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          userid: app.globalData.userInfo.userid,
          authorid: this.data.authorid,
          posterid: this.data.posterid
        },
        success(res) {
          if (res.data.status == 200) {
            console.log("收藏操作成功", res)
          } else {
            console.log("收藏失败", res)
          }
        },
        fail(res) {}
      })
    }
  },

  delete: function () {
    console.log("点击删除按钮")
  },
  edit: function (e) {
    console.log("点击编辑文章按钮")
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    if (this.data.oldlike != this.data.islike) {
      this.postlike();
    }

    if (this.data.oldhoard != this.data.ishoard)
      this.postcollect();
    if (this.data.oldfollow != this.data.concernAc) {
      this.postconcern();
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    if (this.data.oldlike != this.data.islike) {
      this.postlike();
    }
    if (this.data.oldhoard != this.data.ishoard)
      this.postcollect();
    if (this.data.oldfollow != this.data.concernAc) {
      this.postconcern();
    }
    this.postselectlike();

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
})