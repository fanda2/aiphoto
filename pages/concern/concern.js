// pages/concern/concern.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    refreshPage: 1,
    concern:[
      // {
      //   id:1,
      //   handimg:"http://qwq.fjtbkyc.net/public/personalBlog/images/blog/blog11.jpg",
      //   name:"喜羊羊",
      //   introduce:"择一城终老，爱一人白首！"
      // },
    ]
  },
  concelConcern:function(e)
  {
    var that = this
    var token = app.globalData.token;
    // console.log("点击 ",e.currentTarget)
    wx.showModal({
      title: '提示',
      content: '是否取消关注: '+e.currentTarget.dataset.name,
      success (res) {
        if (res.confirm) {
          wx.request({
            url: 'https://storymap.sherlockouo.com/follow/dofollow',
            method: "POST",
            header: {
              'Authorization': token,
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
              tofollow:e.currentTarget.dataset.id
            },
            success(res) {
              // console.log("unfollow",res)
            
              if(res.code=='0'){
                wx.showToast({
                  title: res.data.msg,
                  icon: 'success',
                  duration:1500
                })
              }else{
                wx.showToast({
                  title: "取关成功",
                  icon: 'succes',
                  duration:1500
                })
                that.onLoad(),
                that.onShow()
              }
                        
            },
            fail(res) {}
          })

        } else if (res.cancel) {
          console.log('用户点击取消')
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
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#1ba1f0',
      animation: {
        duration: 300,
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

    var that = this
    var token = app.globalData.token;
    wx.request({
      url: 'https://storymap.sherlockouo.com/follow/list',
      method: "GET",
      header: {
        'Authorization': token,
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        
      },
      success(res) {
        wx.stopPullDownRefresh() //刷新完成后停止下拉刷新动效
        wx.hideLoading();
        console.log("collect list ", res)
        var ls = res.data.data
        for (var key in ls) {
          var marker = ls[key];
          marker.id = marker.userEntity.id
          //cover
          marker.handimg = marker.userEntity.avatar;
          marker.name = marker.userEntity.nickname
          marker.introduce = marker.userEntity.motto
          // console.log('marker',marker)
        }
        that.setData({
          concern:res.data.data
        })
      },
      fail(res) {}
    })
    
  },
  //界面跳转
  goMessage:function(e)
  {
     var index=e.currentTarget.dataset.idx;
     var userid=this.data.concern[index].userid
     wx.navigateTo({
      url: '/pages/message/message?userid='+ userid,
    })
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
    this.onShow(); //重新加载onLoad()
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