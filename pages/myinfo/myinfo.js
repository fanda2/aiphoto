var Util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid: 0,
    birthday: "",
    titleInfo: "添加用户信息",
    userhead: "",
    username: "", //用户默认名称
    // 省市区三级联动初始化
    region: [], //存储返回来的值
    region1: "", //表示市,
    region2: " ", //表示省
    introduce: "",
    bgimg: "",
    imagesrc: "",
    imgcount: 0,
    show_hidden: "display:none;",
    compression: "", //压缩路径
    imageUrl: "",//文件剪裁路径
  },

  //选择图片
  chooseMyImage: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        app.globalData.imgcount = 1,
          that.setData({
            imagesrc: res.tempFilePaths[0],
            show_hidden: "display:block"
          })
        console.log("上传成功", that.data.imagesrc)
        //进入编辑页面
        wx.navigateTo({
          url: '/pages/imagecropper/image?imagePath=' + that.data.imagesrc,
        })
        //确定在什么地方上传！！！！！此处为压缩图片
        //点击确定后带回临时链接，进行图片压缩与上传
      },
      fail: function () {
        wx.showToast({
          title: "请选择图片",
          icon: "none",
        })
      }
    })
  },

  //压缩图片
  MyImageCompression: function () {
    var that = this;
    if (app.globalData.imgcount == 1) {
      wx.showToast({
        title: "正在压缩图片",
        icon: "loading",
      })
      wx.compressImage({
        src: app.globalData.imageUrl,
        quality: 0,
        success: function (res) {
          wx.showToast({
            title: "压缩成功",
          });
          console.log("压缩" + res.tempFilePath)
          app.globalData.imgcount = 0;
          that.setData({
            compression: res.tempFilePath
          })
          wx.showLoading({
            title: '正在上传'
          })
          wx.uploadFile({
            url: app.globalData.baseUrl + '/Tsf/upload',
            method: 'POST',
            header: {
              // Authorization: token,
              'content-type': 'application/x-www-form-urlencoded'
            },
            name: 'file',
            filePath: that.data.compression,
            success(res) {
              new Promise((resolve => {
                res = JSON.parse(res.data)
                app.globalData.imageUrl = ""
                resolve(res.data.filepath)
              })).then((res) => {
                that.setData({
                  bgimg: res
                })
                that.userimgupload();
              })
            },
            fail(res) {
              wx.showToast({
                title: "更新成功",
              });
            }
          })
        },
        fail: function () {
          wx.showToast({
            title: "压缩失败",
            icon: "none",
          })
        }
      })
    }
  },

  //用户头像更新接口
  userimgupload: function (e) {
    var that = this;
    wx.request({
      url: app.globalData.baseUrl + '/Use/bgimg_updata',
      method: "GET",
      header: {
        // Authorization: token,
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        id: app.globalData.userInfo.userid,
        filepath: that.data.bgimg
      },
      success(res) {
        if (res.data.status == 200) {
          // that.setUserinfo()
        } else {
          wx.showToast({
            title: '信息更新失败！',
            icon: 'error',
            duration: 2000
          })
        }
      },
      fail() { }
    })
  },

  //设置用户详情页的图片信息
  setbackground: function () {
    var that = this;
    that.chooseMyImage()
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
    if (!app.globalData.token) {
      this.gologin()
    } else {
      this.setData({
        userid: app.globalData.userInfo.userid,
        userhead: app.globalData.userInfo.avatar,
        username: app.globalData.userInfo.nickname,
        birthday: app.globalData.userInfo.birthday,
        head: app.globalData.userInfo.bgimg,
        introduce: app.globalData.userInfo.motto,
        bgimg: app.globalData.userInfo.bgimg
      })
      var local = app.globalData.userInfo.usaddress; //获得地址
      var address = [];
      var address = local.split(' ');
      this.setData({
        region: address,
        region1: address[0],
        region2: address[1]
      })
    }
  },
  // 选择省市区函数
  changeRegin(e) {
    this.setData({
      region: e.detail.value
    });
    this.setData({
      region1: this.data.region[0],
      region2: this.data.region[1]
    })
  },
  inputedit: function (e) {
    this.setData({
      introduce: e.detail.value,
    })
  },
  imgShow: function (event) {
    console.log(event.currentTarget.dataset.url)
    var currentUrl = event.currentTarget.dataset.url
    this.setData({
      imgList: currentUrl
    })
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: [currentUrl] // 需要预览的图片http链接列表
    })
  },
  changeDate(e) {
    this.setData({
      birthday: e.detail.value
    });
  },
  gologin: function (e) {
    wx.redirectTo({
      url: '/pages/login/login',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示a
   */
  onShow: function () {
    if (app.globalData.imageUrl != "") {
      this.MyImageCompression()
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

  },

  addUser: function () {
    var that = this;
    var oldbirthday = app.globalData.userInfo.birthday;
    var oldmotto = app.globalData.userInfo.motto;
    var oldlocal = app.globalData.userInfo.usaddress; //获得地址
    var address = [];
    var address = oldlocal.split(' ');
    var newbirthday = that.data.birthday;
    var newreg1 = that.data.region1;
    var newreg2 = that.data.region2;
    var newmotto = that.data.introduce;
    var newaddress = newreg1 + " " + newreg2;
    if (oldbirthday != newbirthday || address[0] != newreg1 || address[1] != newreg2 || oldmotto != newmotto) {
      wx.showLoading({
        title: '玩命加载中'
      })
      wx.request({
        url: app.globalData.baseUrl + '/Use/user_update',
        method: 'GET',
        data: {
          id: that.data.userid,
          birthday: newbirthday,
          address: newaddress,
          motto: newmotto,
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: res => {
          //信息修改成功后返回用户信息，使用需要的进行渲染
          if (res.data.status == 200) {
            console.log(res.data.data)
          } else {
            wx.showToast({
              title: '信息更新失败！',
              icon: 'error',
              duration: 2000
            })
          }
        },
        fail(res) {
          console.log('failes to upload', res.data)
          wx.showToast({
            title: '请检查网络！',
            icon: 'error',
            duration: 2000
          })
        }
      })
    } else {
      wx.showToast({
        title: '信息未进行修改！',
        icon: 'error',
        duration: 2000
      })

    }
  },
})