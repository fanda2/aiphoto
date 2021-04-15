// pages/addOrEditUser/addOrEditUser.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "",
    titleInfo: "添加用户信息",
    userhead: "",
    username: "", //用户默认名称
    // 省市区三级联动初始化
    region: [], //存储返回来的值
    region1: "", //表示市,
    region2: " ", //表示省
    introduce: "留下你的足迹吧~"
  },

  //设置用户详情页的图片信息
  setbackground: function () {
    console.log("点击设置图片")
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#1ba1f0',
      animation: {
        duration: 300,
        timingFunc: 'easeIn'
      }
    })
    this.setData({
      userhead: app.globalData.userInfo.avatar,
      username: app.globalData.userInfo.nickname,
      date: app.globalData.userInfo.birthday,
      head: app.globalData.userInfo.bgimg,
      introduce: app.globalData.userInfo.motto
    })
    var local = app.globalData.userInfo.address; //获得地址
    var address = [];
    var n = local.split('·');
    address.push(n);
    // }
    // console.log(address[0][0],);
    this.setData({
      region1: address[0][0],
      region2: address[0][1]
    })

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
  imgShow: function (event) {
    console.log("点击");
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
      date: e.detail.value
    });
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

  },
  addUser: function () {
    var that = this;

  },
})