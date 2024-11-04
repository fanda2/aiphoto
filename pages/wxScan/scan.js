const secretKey=require('../../utils/secretKey')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scanCode:'点击扫码',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.scanCode()
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
  // 自定义函数从这里开始--------------------------------------自定义函数从这里开始 
  /**
   * 扫码事件
   */
  scanCode(){
    // 允许从相机和相册扫码
    wx.scanCode({
      scanType:["qrCode"],
      success: (res) => {
        if (res.result){
          var getValue=res.result.split('#')[1]
          var userID=secretKey.fromCode(getValue).split('*')[1]
           console.log("GETTTT",getValue)
          userID=userID*1;  //转换为数字类型
        // 扫码成功后跳转
        console.log(userID,' ',userID>0)
       if(userID>0)
       {
         console.log(userID)
        wx.redirectTo({
          url: '/pages/message/message?userid=' + userID,
        })
       }else{
        wx.showToast({
          title: '无效二维码！',
           icon:"none"
        })
       setTimeout(function(){
        wx.navigateBack({
          delta: 0,
        })
       },1500)
       }
        // if(userID)
        }else{
          wx.showToast({
            title: '请重新扫描！',
        icon:"none"
          })
          return false;
        }
      },fail:(res)=>{
        wx.navigateBack({
          delta: 0,
        })
        wx.showToast({
          title: '取消扫码！',
        icon:"none"
        })
      }
    })
  },  
      //解析链接方法
      getQueryString:function (url, name) {
        var reg = new RegExp('(^|&|/?)' + name + '=([^&|/?]*)(&|/?|$)', 'i');
        var r = url.substr(1).match(reg);
        if (r != null) {
          // console.log("r = " + r)
          // console.log("r[2] = " + r[2])
          return r[2];
        }
        return null;
      },
})