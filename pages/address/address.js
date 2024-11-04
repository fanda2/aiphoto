//index.js
//获取应用实例
const app = getApp();
const defaultScale = 14;
var consoleUtil = require('../../utils/consoleUtil.js');
var constant = require('../../utils/constant.js');
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
//定义全局变量
var bottomHeight =0;
var windowHeight = 0;
var windowWidth = 10;
var mapId = 'newMap';
var qqmapsdk;

Page({
  data: {
    searchContentHeight: '0px',
    resultList: [], //搜索返回的结果数组
    //输入绑定同时显示隐藏删除按钮
    inputAddress: '',
    gpsAddress: '',
    city: '',
    street: '',
    userInfo: {},
    hasUserInfo: false,
    longitude: '',
    latitude: '',
    //地图缩放级别
    scale: defaultScale,
    markers: [],
    vaHe: 0, //导航菜单高度
    inputHe: 0, //输入框高度
    Sheight: 0,
    Swidth: 0,
    ssw: 0,
    showTopTip: true,
    warningText: '搜索发现更多地方的故事',
    showUpload: true,
    showConfirm: false,
    showComment: false,
    //地图高度
    mapHeight: 0,
    infoAddress: '',
    commentCount: 0,
    praiseCount: 0,
    commentList: [],
    selectAddress: '',
    centerLongitude: '',
    centerLatitude: '',
    uploadImagePath: '',
    currentMarkerId: 0,
    praiseSrc: '../../img/bottom-unpraise.png',
    warningIconUrl: '',
    infoMessage: '',
    isUp: false,
    //中心指针，不随着地图拖动而移动
    controls: [],
    //搜索到的中心区域地址信息,用于携带到选择地址页面
    centerAddressBean: null,
    //选择地址后回调的实体类
    callbackAddressInfo: null,
    //将回调地址保存
    callbackLocation: null,
    //当前省份
    currentProvince: '',
    //当前城市
    currentCity: '',
    //当前区县
    currentDistrict: '',
    showHomeActionIcon: true,
    homeActionLeftDistance: '0rpx',
    //分享携带经度
    shareLongitude: '',
    //分享携带纬度
    shareLatitude: '',
    //是否是分享点击进入小程序
    showShare: false,
    //上传者用户信息
    uploadTime: '一分钟前',
    city: '',
    authourid: 0, //文章id    
    lat:0,
    lng:0,
    show_all: true, //是否展示相关信息
    show_mine:false, //展示个人
    mycount:0,
    checkAuthoried:false,
  },

  onLoad: function (options) {
    wx.showLoading({
      title: '玩命加载中'
    })
    this.selfLocationClick();  //得到自己的位置
    var data = wx.getMenuButtonBoundingClientRect()
    var WH = wx.getSystemInfoSync()
    this.setData({
      // 获取导航栏高度
      vaHe: data.bottom + 10,
      inputHe: data.bottom - data.top,
      Sheight: (WH.windowHeight),
      Swidth: (WH.windowWidth)
    })
    this.setData({
      ssw: (this.data.Swidth / 2) - 68
    })
    var that = this;
    //检测更新
    that.checkUpdate();
    if (app.globalData.userInfo) {
      consoleUtil.log(1);
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      consoleUtil.log('sd');
      app.userInfoReadyCallback = res => {
        consoleUtil.log(3);
        app.globalData.userInfo = res.userInfo;
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    }
    this.getSearchContentHeight();
    this.loadSdk();
    this.queryMarkerInfo();   //第一次加载查询所有mark信息
  },


  onShow: function () {
    var that = this;
    that.changeMapHeight();  //地图高度变化
    that.setHomeActionLeftDistance();
    that.scopeSetting();  //进行授权查询
  },

  /**
   * 页面不可见时
   */
  onHide: function () {

  },
  /**
   * 监听页面初次渲染完成
   */
  onReady:function(){
    //设置标志，当以后渲染时使用检查
    this.setData({
      checkAuthoried:true
    })
    console.log("初次渲染完成！！！！")
       //默认按照当前street(街道)搜索
       this.suggestionSearch(this.data.street);
  },
  //展示所有
  range_all:function()
  {
    this.setData({
      show_all:true,
      show_mine:false,
    })
    this.queryMarkerInfo()
  },

  //展示个人
  range_mine:function(){
    this.setData({
      show_all:false,
      show_mine:true,
    })
    this.queryMarkermyInfo()
  },
  /**
   * 设置上传按钮的左边距
   */
  setHomeActionLeftDistance: function () {
    var that = this;
    if (!that.data.showUpload) {
      return;
    }
    wx.getSystemInfo({
      success: function (res) {
        windowHeight = res.windowHeight;
        windowWidth = res.windowWidth;
        //创建节点选择器
        var query = wx.createSelectorQuery();
        //选择id
        query.select('#home-action-wrapper').boundingClientRect()
        query.exec(function (res) {
          //res就是 所有标签为mjltest的元素的信息 的数组
          consoleUtil.log(res);
          that.setData({
            homeActionLeftDistance: ((windowWidth - res.windowWidth) / 2) + 'px'
          })
        })
      }
    })
  },

  // // 获取用户位置信息权限
  scopeSetting: function () {
    var that = this;
    if(that.data.checkAuthoried){
      wx.getSetting({
        success(res) {
          //地理位置
          if (!res.authSetting['scope.userLocation']) {
            
            wx.authorize({
              scope: 'scope.userLocation',
              success(res) {
                that.initMap();
              },
              fail() {
                wx.showModal({
                  title: '提示信息',
                  content: '定位失败，你未开启定位权限，点击开启定位权限',
                  success: function (res) {
                    if (res.confirm) {
                      wx.openSetting({
                        success: function (res) {
                          if (res.authSetting['scope.userLocation']) {
                            that.initMap();
                          } else {
                            consoleUtil.log('用户未同意地理位置权限')
                          }
                        }
                      })
                    }
                  }
                })
              }
            })
          }
           else {
            that.initMap();
          }
        }
      })
    }
  },

  /** 
   * 初始化地图
   */
  initMap: function () {
    var that = this;
    qqmapsdk = new QQMapWX({
      key: constant.tencentAk
    });
    that.getCenterLocation();
  },
  //改变地图高度时调用
  changeMapHeight: function () {
    var that = this;
    var count = 0;
    wx.getSystemInfo({
      success: function (res) {
        consoleUtil.log(res);
        windowHeight = res.windowHeight;
        windowWidth = res.windowWidth;
        //创建节点选择器
        var query = wx.createSelectorQuery();
        var query = wx.createSelectorQuery();
        query.select('#bottom-layout').boundingClientRect()
        query.exec(function (res) {
          // bottomHeight = res[0].height;
          that.setMapHeight();
        })
      },
    })
  },

  //根据获取的屏幕信息设置地图的高度
  setMapHeight: function (params) {
    var that = this;
    that.setData({
      mapHeight: (windowHeight - bottomHeight) + 'px'
    })
    var controlsWidth = 40;
    var controlsHeight = 48;
    //设置中间部分指针
    that.setData({
      controls: [{
        id: 1,
        iconPath: '/img/center-location.png',
        position: {
          left: (windowWidth - controlsWidth) / 2,
          top: (windowHeight - bottomHeight) / 2 - controlsHeight * 3 / 4,
          width: controlsWidth,
          height: controlsHeight
        },
        clickable: true
      }]
    })
  },

  //请求地理位置
  requestLocation: function () {
    var that = this;
    // var res={
    //   accuracy: 65,
    //   errMsg: "getLocation:ok",
    //   horizontalAccuracy: 65,
    //    latitude: 28.7513,
    //    longitude: 104.6417,
    //     speed: -1,
    //   verticalAccuracy: 65
    // }
    // var location = {}
    // location.lat = res.latitude
    // location.lng = res.longitude
    // app.globalData.location = location
    // that.setData({
    //   latitude: res.latitude,
    //   longitude: res.longitude,
    // })
    wx.getFuzzyLocation({
      type: 'wgs84',
      success(res) {
        console.log("--------失败",res)
        var location = {}
        location.lat = res.latitude
        location.lng = res.longitude
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        })
        that.moveTolocation();
      },
      fail(res){
        console.log("--------失败",res)
      }
      
    })
  },

  /**
   * 点击marker
   */
  bindMakertap: function (e) {
    var that = this;
    var idx = e.detail.markerId;
    app.globalData.currentMarkerId = idx;
    //重新设置点击marker为中心点
    for (var key in that.data.markers) {
      var marker = that.data.markers[key];
      if (e.markerId == marker.id) {
        that.setData({
          longitude: marker.longitude,
          latitude: marker.latitude,
        })
      }
    }
    that.goDetail();
  },

  goDetail: function (e) {
    var that = this
    var postid = app.globalData.currentMarkerId
    var userid = 0;
    wx.request({
      url: app.globalData.baseUrl + '/Pst/poster_authorid',
      method: "GET",
      data: {
        posterid: postid,
      },
      success(res) {
        if (res.data.status == 200) {
          var authorid = res.data.data.jrow.authorid;
          var posterid = postid;
          wx.navigateTo({
            url: '/pages/detail/detail?pageid=' + 5 + "&posterid=" + posterid + "&authorid=" + authorid + "&share=" + 0,
          })
        }
      }
    })
  },

  /**
   * 回到定位点
   */
  selfLocationClick: function () {
    var that = this;
    //还原默认缩放级别
    that.setData({
      scale: defaultScale
    })
    //必须请求定位，改变中心点坐标
    that.requestLocation();
  },

  /**
   * 移动到中心点
   */
  moveTolocation: function () {
    var mapCtx = wx.createMapContext(mapId);
    mapCtx.moveToLocation()
  },


  cancelClick: function () {
    var that = this;
    that.resetPhoto();
    // that.adjustViewStatus(true, false, false);
  },
  controlTap: function () {

  },

  onShareAppMessage: function (res) {

  },

  /**
   * 拖动地图回调
   */
  regionChange: function (res) {
    var that = this;
    // 改变中心点位置  
    if (res.type == "end") {
      that.getCenterLocation();
      that.setData({
        mycount:100,
      })
    }
  },

  getCenterLocation: function () {
    var that = this;
    var mapCtx = wx.createMapContext(mapId);
    mapCtx.getCenterLocation({
      success: function (res) {
        that.updateCenterLocation(res.latitude, res.longitude);
        var location = {}
        app.globalData.lat = res.latitude
        app.globalData.lng= res.longitude
        that.regeocodingAddress();
        that.setData({
          lat:res.latitude,
          lng:res.longitude,
        })    
      }
    })
     if(this.data.mycount==0)
        {
          console.log("count_______",this.data.mycount)
        }
    // that.savalocal()
  },

  //存储坐标点信息
  savalocal:function()
  {
    wx.request({
      url: app.globalData.baseUrl + '/Use/user_address',
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        id:app.globalData.userInfo.userid,
        latitude: app.globalData.location.lat,
        longitude: app.globalData.location.lng,
      },
      success(res) {
        if (res.data.status == 200) {
          console.log("存储成功_______",res)
          }
      }
    })
  },

  /**
   * 逆地址解析
   */
  regeocodingAddress: function () {
    var that = this;
    //不在发布页面，不进行逆地址解析，节省调用次数，腾讯未申请额度前一天只有10000次    
    //通过经纬度解析地址
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: that.data.centerLatitude,
        longitude: that.data.centerLongitude
      },
      success: function (res, data) {
        that.setData({
          centerAddressBean: res.result,
          selectAddress: res.result.formatted_addresses.recommend,
          currentProvince: res.result.address_component.province,
          currentCity: res.result.address_component.city,
          currentDistrict: res.result.address_component.district,
          longitude: that.data.centerLongitude,
          latitude:that.data.centerLatitude,
        })
      },
      fail: function (res) {
        console.log("逆地址解析__________", res);
      }
    });
  },

  /**
   * 查询所有 marker 信息
   */
  queryMarkerInfo: function () {
    var that = this;
    //调用请求 marker 点的接口就好了
    wx.request({
      url: app.globalData.baseUrl + '/Pst/poster_map',
      data: {
        // 或许可以改为根据地理位置信息提供服务
        page: 1,
        limit: 50,
        lat:that.data.lat,
        lng:that.data.lng,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        wx.hideLoading();
        var ls = res.data.data.row;
        const v = new Promise((resolve, reject) => {
          resolve(ls)
        })
        v.then((res) => {
          that.createMarker(res)
        })
      }
    })
  },

/**
   * 更新上传坐标点
   */
  updateCenterLocation: function (latitude, longitude) {
    var that = this;
    that.setData({
      centerLatitude: latitude,
      centerLongitude: longitude
    })
  },

  /**
   * 创建marker
   */
  createMarker: function (markers) {
    var that = this;
    var currentMarker = [];
    for (var key in markers) {
      var marker = markers[key];
      marker.id = marker.posterid;
      marker.authorid = marker.authorid;
      marker.longitude = marker.longtitude;
      marker.width = 40;
      marker.height = 40;
      marker.iconPath = '/img/markshare.png';
    }
    currentMarker = currentMarker.concat(markers);
    that.setData({
      markers: currentMarker
    })
  },

  /**
   * 选择地址
   */
  chooseAddress: function () {
    // var that = this;
    // app.globalData.city = that.data.centerAddressBean.address_component.city
    // app.globalData.street = that.data.centerAddressBean.address_component.street
    app.globalData.address=this.data.centerAddressBean.address
  },

  /**
   * 版本更新
   */
  checkUpdate: function () {
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager();
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        consoleUtil.log(res.hasUpdate);
      })

      updateManager.onUpdateReady(function () {
        wx.showModal({
          title: '更新提示',
          content: '新版本已经准备好，即刻体验？',
          success: function (res) {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate();
            }
          }
        })
      })
      updateManager.onUpdateFailed(function () {
        // 新的版本下载失败
      })
    }
  },



  /**
   * 初始化sdk
   */
  loadSdk: function () {
    qqmapsdk = new QQMapWX({
      key: constant.tencentAk
    });
  },

  /**
   * 获取内容视图高度
   */
  getSearchContentHeight: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        windowHeight = res.windowHeight;
        //创建节点选择器
        var query = wx.createSelectorQuery();
        //选择id
        query.select('#input-address-layout').boundingClientRect();
        query.exec(function (res) {
          //res就是 所有标签为mjltest的元素的信息 的数组
          that.setData({
            searchContentHeight: (windowHeight - res[0].height) + 'px'
          })
        })
      },
    })
  },

  /**
   * 绑定输入框
   */
  bindAddressInput: function (e) {
    var that = this;
    that.setData({
      inputAddress: e.detail.value,
    })
    if (e.detail.value) {
      that.suggestionSearch(e.detail.value);
    } else {
      that.suggestionSearch(that.data.street);
      that.setData({
        resultList: '',
      })
    }
  },

  /**
   * 热词检索
   */
  suggestionSearch: function (searchValue) {
    var that = this;
    qqmapsdk.getSuggestion({
      keyword: searchValue,
      region: that.data.city,
      // region: "四川省成都市郫都区",
      // region_fix: 1,
      // policy: 1,
      success: function (res) {
        that.setData({
          resultList: res.data
        })
      },
      fail: function (res) {
        console.log(res);
      }
    });
  },

 //选择地点
 chance: function (e) {
  var that=this;
  var index = e.currentTarget.dataset.idx;
  var location = this.data.resultList[index].location;
  app.globalData.location = location;
  this.setData({
    latitude: location.lat,
    longitude: location.lng
  })
  this.queryMarkerInfo()
  this.setData({
    resultList:"",
    inputAddress:''
  })
},

  /**
   * 删除输入内容
   */
  deleteInput: function () {
    this.setData({
      inputAddress: '',
      resultList: ''
    })
  },

  /**
   * item点击事件,将地址回调到地图页面
   */
  itemAddressClick: function (e) {
    var that = this;
    var item = that.data.resultList[Number(e.currentTarget.id)];
    //将数据设置到地图页面
    var pages = getCurrentPages();
    var prePage = pages[pages.length - 2];
    prePage.setData({
      callbackAddressInfo: item
    })
    wx.navigateBack({

    })
  },
//监听页面隐藏
  onHide: function () {
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  },

})
