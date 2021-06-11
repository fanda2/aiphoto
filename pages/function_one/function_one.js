// pages/function_one/function_one.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [{
        quality: 100,
        name: '图片质量 100%'
      },
      {
        quality: 90,
        name: '图片质量 90%'
      },
      {
        quality: 80,
        name: '图片质量 80%'
      },
      {
        quality: 70,
        name: '图片质量 70%'
      },
      {
        quality: 60,
        name: '图片质量 60%'
      },
      {
        quality: 50,
        name: '图片质量 50%'
      },
      {
        quality: 40,
        name: '图片质量 40%'
      },
      {
        quality: 30,
        name: '图片质量 30%'
      },
      {
        quality: 20,
        name: '图片质量 20%'
      },
      {
        quality: 10,
        name: '图片质量 10%'
      },
    ],
    imgquality: 80,
    imagesrc: "/img/bacimg.jpg",//图片展示
    imgcount: 0,
    numindex:2,
    show_hidden: "display:none;",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  bindPickerChange: function (e) {
    var idx = e.detail.value
    var value = this.data.array[idx].quality;
    this.setData({ //给变量赋值
      imgquality: value, //每次选择了下拉列表的内容同时修改下标然后修改显示的内容，显示的内容和选择的内容一致
    })
  },

  //选择图片
  chooseMyImage: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        that.setData({
            imagesrc: res.tempFilePaths[0],
            imgcount: 1,
            show_hidden: "display:block"
          }),
          wx.showToast({
            title: "已选择图片",
          })
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
    if (that.data.imgcount == 1) {
      wx.showToast({
        title: "正在压缩图片",
        icon: "loading",
      })

      wx.compressImage({
        src: that.data.imagesrc,
        quality: this.data.imgquality,
        success: function (res) {
          wx.showToast({
            title: "压缩成功",
          });

          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: function (res) {
              wx.showToast({
                title: "已保存至相册",
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