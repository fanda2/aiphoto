// pages/imagecropper/image.js
const app = getApp()
var cropper
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 根据标签id，获取到image-cropper对象，存储在全局变量cropper中
    cropper = this.selectComponent("#my-cropper");

    // 设置标签属性
    this.setData({
      // 从图片选择界面传原图临时文件地址给src
      src: options.imagePath,
      // 设置裁剪框宽高比值为 1（宽:高=1:1=1）
      aspectRatio: 1.8,
      // 设置是否等比缩放
      isProportion: true,
      // 设置裁剪后的图片质量
      quality:5
    })
  },
  //取消返回上个界面
  btn5(){
    wx.navigateBack({
      delta: 0,
    })
  },
  btn6(){
    // 返回刚才的界面，带回图片链接
    cropper.getImagePath(res =>{
      app.globalData.imageUrl=res.path;
      wx.navigateBack({
        delta: 0,
      })
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