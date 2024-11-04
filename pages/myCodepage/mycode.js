import QRCode from '../../libs/weapp-qrcode'
const secretKey = require('../../utils/secretKey.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo:wx.getStorageSync('userInfo')
    }),
     //设置顶部颜色
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
    this.setQrcode();
    wx.hideLoading()
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

  //  用户自定义方法从这里开始=----------------------------------------------用户自定义方法从这开始 
   //生成二维码的方法
  async setQrcode(){
    var that=this;
    var msg=that.data.userInfo.userid;
    var Key=secretKey.toCode('*'+msg);
    wx.showLoading({
      title: '加载中',
    })
    await new QRCode('myQrcode',{
      text: "userid#"+Key,//此处内容可以是url可以是string类型
      width: 150,
      height: 150,
      padding: 8, // 生成二维码四周自动留边宽度，不传入默认为0
      correctLevel: QRCode.CorrectLevel.L, // 二维码可辨识度
      callback: (res) => {
        console.log(res.path);
        wx.hideLoading()
        // 接下来就可以直接调用微信小程序的api保存到本地或者将这张二维码直接画在海报上面去，看各自需求
      }
    })
  },
})