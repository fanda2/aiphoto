// pages/trends/trends.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: [{
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
    {
      id:5,
      imgurl:"http://www.fjtbkyc.net/mywx/sunny.jpg",
      title:"这是title5",
      handimg:"http://qwq.fjtbkyc.net/public/personalBlog/images/blog/blog11.jpg",
      username:"Brank",
      local:'四川省成都市大邑县西岭镇',
      like:112,
      concern:10
    },
    {
      id:6,
      imgurl:"http://www.fjtbkyc.net/mywx/sunny2.jpg",
      title:"这是title6",
      handimg:"http://qwq.fjtbkyc.net/public/personalBlog/images/blog/blog11.jpg",
      username:"Brank",
      local:'四川省成都市金牛区西华大道16号',
      like:112,
      concern:10
    }
    ],
    label:[{name:"推荐",id:1},
         {name:"成都",id:2},
         {name:"最新",id:3},
          {name:"风景",id:4},
          {name:"人物",id:5},
          {name:"美食",id:6},
          {name:"住宿",id:7},
          {name:"景点",id:8}],
    currentTab: 0,
    tal:0,
    ac1:1,
    ac2:0,
    cTab:0,
    shareCount:1,
    lostCount:2,
    oldactive:0, //之前显示的值
    isactive:[1,0,0,0,0,0,0,0],
  },
  navbarTap: function(e){
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    console.log(e.currentTarget.dataset);
  },
  //点击头部实现不同样式与请求
  getMessage:function(e)
  {
    var idx=e.currentTarget.dataset.idx;
    var oldactive=this.data.oldactive
    console.log("点击",oldactive)
    var newdata=this.data.isactive;
    newdata[oldactive]=0,  
    newdata[idx]=1
    if(idx!=oldactive)
    {
      this.setData({
        oldactive:idx
      })
    }
    this.setData({
      isactive:newdata
    })
  },
  goDetail:function(e)
  {
    wx.navigateTo({
      url: '/pages/detail/detail',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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