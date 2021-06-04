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
    sharenavbar: [
      {
        id:1,
        imgurl:"http://qwq.fjtbkyc.net/public/personalBlog/images/zuopin/portfolio6.jpg",
        title:"艺术大楼，秋意浓浓，艺术大楼，秋意浓浓",
        handimg:"http://qwq.fjtbkyc.net/public/personalBlog/images/blog/blog9.jpg",
        username:"Frightly",
        local:'四川省成都市高新区西源大道2006号',
        like:1034,
        concern:10
      },
      {
        id:2,
        imgurl:"http://www.fjtbkyc.net/mywx/sunny5.jpg",
        title:"湖边生活悠闲自得",
        handimg:"http://qwq.fjtbkyc.net/public/personalBlog/images/blog/blog11.jpg",
        username:"Brank",
        local:'成都市郫都区太双路与蜀新大道交叉路口',
        like:112,
        concern:10
      },
      {
        id:3,
        imgurl:"http://www.fjtbkyc.net/mywx/sunny4.jpg",
        title:"西华四舍",
        handimg:"http://qwq.fjtbkyc.net/public/personalBlog/images/blog/blog11.jpg",
        username:"Brank",
        local:'四川省成都市高新区西源大道2006号',
        like:112,
        concern:10
      },
      {
        id:4,
        imgurl:"http://qwq.fjtbkyc.net/public/personalBlog/images/zuopin/portfolio3.jpg",
        title:"这是title4",
        handimg:"http://qwq.fjtbkyc.net/public/personalBlog/images/blog/blog11.jpg",
        username:"Brank",
        local:'贵阳市观山湖区金阳新区观山大桥',
        like:112,
        concern:10
      },
    ],
    lostnavbar: [],
    navbar: ['ta的收藏'],
    Smodewith: [],
    Smodeheight: [],
    Lmodewith: [],
    Lmodeheight: [],
    currentTab: 0,
    userid: 0,
    like:122,
    concern:100,
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
    if(token)
    {
      wx.request({
        url: app.globalData.baseUrl+'/Use/user_one', //仅为示例，并非真实的接口地址
        method: "GET",
        data: {
          id:this.data.userid,
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
          console.log("请求结果",res)
          wx.hideLoading();
          var array;
          array=res.data.data.jrow;
          // array.reverse();
          that.setData({
            userInfo: array
          })
        }
      })
    }
    else{
      that.gologin();
    }
  },

  //点击关注按钮调用
  concern: function (e) {
    var that = this
    var token = app.globalData.token;
  },
  goDetail: function (e) {
    var that = this
    var postid = e.currentTarget.dataset.id
  },

 //去登录的状态
 gologin: function (e) {
  wx.redirectTo({
    url: '/pages/login/login?pagetype=' + 3,
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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