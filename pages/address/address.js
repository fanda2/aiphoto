//index.js
//获取应用实例
const app = getApp();
const defaultScale = 14;
var consoleUtil = require('../../utils/consoleUtil.js');
var constant = require('../../utils/constant.js');
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
//定义全局变量
var wxMarkerData = [];
var bottomHeight = 0;
var windowHeight = 0;
var windowWidth = 10;
var mapId = 'myMap';
var qqmapsdk;
var sourceType = [
  ['camera'],
  ['album'],
  ['camera', 'album']
]
var sizeType = [
  ['compressed'],
  ['original'],
  ['compressed', 'original']
]

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
    markers: null,
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
    //单个 marker 情报
    currentTipInfo: '',
    //显示评论输入框
    showCommentInput: false,
    //评论文字
    commentMessage: '',
    //分享携带经度
    shareLongitude: '',
    //分享携带纬度
    shareLatitude: '',
    //是否是分享点击进入小程序
    showShare: false,
    //上传者用户信息
    // userAvatar: 'https://images.unsplash.com/photo-1499355940597-5601b9869168?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0a501f2aa74492264ce48c72546450e8&auto=format&fit=crop&w=1567&q=80',
    userNickname: '芜湖',
    uploadTime: '一分钟前',
    city: '',
    authourid:0,//文章id    
  },
  onLoad: function (options) {
    this.selfLocationClick();
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
      consoleUtil.log(2);
      app.userInfoReadyCallback = res => {
        consoleUtil.log(3);
        app.globalData.userInfo = res.userInfo;
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    }
    that.scopeSetting();
    this.setData({
      city: options.city,
      street: options.street
    })
    consoleUtil.log('city--->' + this.data.city + '---street--->' + this.data.street);
    this.getSearchContentHeight();
    this.loadSdk();
  },


  onShow: function () {
    consoleUtil.log('onShow--------------------->');
    var that = this;
    that.changeMapHeight();
    that.setHomeActionLeftDistance();
    //如果刚从选择地址页面带数据回调回来，则显示选择的地址
    // consoleUtil.log(that.data.callbackAddressInfo)
    // if (that.data.callbackAddressInfo == null) {
    //   that.getCenterLocation();
    //   //正在上传的话，不去请求地理位置信息
    //   that.requestLocation();

    // } else {
    //   that.setData({
    //     selectAddress: that.data.callbackAddressInfo.title,
    //     callbackLocation: that.data.callbackAddressInfo.location
    //   })
    //   //置空回调数据，即只使用一次，下次中心点变化后就不再使用
    //   that.setData({
    //     callbackAddressInfo: null
    //   })
    // }
    this.queryMarkerInfo()





  },

  /**
   * 页面不可见时
   */
  onHide: function () {

  },

  onReady: function () {
    //默认按照当前street(街道)搜索
    this.suggestionSearch(this.data.street);
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
          bottomHeight = res[0].height;
          that.setMapHeight();
        })
      },
    })
  },

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
        iconPath: '../../img/center-location.png',
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

  scopeSetting: function () {
    var that = this;
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
                title: '提示',
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
        } else {
          that.initMap();
        }
      }
    })
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

  //请求地理位置
  requestLocation: function () {
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var location = {}
        location.lat = res.latitude
        location.lng = res.longitude
        app.globalData.location = location
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        })
        that.moveTolocation();
      },
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
    this.goDetail();
  },
  goDetail:function(e)
  {
    var that = this
    var postid = app.globalData.currentMarkerId
    var userid = 0;
    var currentID=0
    wx.request({
      url: 'https://storymap.sherlockouo.com/poster/info',
      method: "GET",
      data: {
        posterId: postid,
      },
      success(res) {
        // console.log("结果是：");
        if (res.data.code == 0) {
          new Promise((resolve, reject) => {
            var marker = res.data.data;
            userid = marker.userid;
            currentID=marker.id;
            resolve(userid)
          }).then(() => {
              wx.navigateTo({
                url: '/pages/detail/detail?pageid=' + 1 + "&userid=" + userid+"&currentID="+currentID,
              })
          })
        }
      }
    })
  },

  /**
   * 上传情报
   */
  uploadInfoClick: function () {
    var that = this;
    that.adjustViewStatus(false, true, false);
    that.updateCenterLocation(that.data.latitude, that.data.longitude);
    that.regeocodingAddress();
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
   * 回到定位点
   */
  selfLocationClick: function () {
    // console.log("调用这个函数成功");
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
    mapCtx.moveToLocation();
  },

  cancelClick: function () {
    var that = this;
    that.resetPhoto();
    that.adjustViewStatus(true, false, false);
  },

  // 跳转到分享界面
  toShare: function (e) {
    var that = this;
    // that.adjustViewStatus(false, true, false);
    that.updateCenterLocation(that.data.latitude, that.data.longitude);
    that.regeocodingAddress();
    // console.log('shit ', that.data.centerAddressBean)
    if (app.globalData.token.length == 0) {
      wx.navigateTo({
        url: '/pages/login/login?pagetype=' + 1,
      })
    } else {
      wx.navigateTo({
        // url:'/pages/share/share?city='
        url: '/pages/share/share?city=' + that.data.centerAddressBean.address_component.city + '&street=' + that.data.centerAddressBean.address_component.street + '&address=' + that.data.centerAddressBean.address + '&lat=' + that.data.latitude + '&lng=' + that.data.longitude,
      });
    }

  },
  /**
   * 点击控件时触发
   */
  controlTap: function () {

  },

  /**
   * 点击地图时触发
   */
  bindMapTap: function () {
    //恢复到原始页
    this.adjustViewStatus(true, false, false);
  },

  adjustViewStatus: function (uploadStatus, confirmStatus, commentStatus) {
    var that = this;
    that.setData({
      //显示上传按钮
      showUpload: uploadStatus,
      //开始上传
      showConfirm: confirmStatus,
      //显示详情
      showComment: commentStatus,
    })
    that.changeMapHeight();
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
    }
  },

  /**
   * 得到中心点坐标
   */
  getCenterLocation: function () {
    var that = this;
    var mapCtx = wx.createMapContext(mapId);
    mapCtx.getCenterLocation({
      success: function (res) {
        console.log('getCenterLocation----------------------->');
        console.log(res);
        that.updateCenterLocation(res.latitude, res.longitude);
        var location = {}
        location.lat = res.latitude
        location.lng = res.longitude
        app.globalData.location = location
        that.regeocodingAddress();
        that.queryMarkerInfo();
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
        })
      },
      fail: function (res) {
        console.log("逆地址解析", res);
      }
    });
  },

  /**
   * 查询 marker 信息
   */
  queryMarkerInfo: function () {
    var that = this;
    consoleUtil.log('查询当前坐标 marker 点信息')
    //调用请求 marker 点的接口就好了
    wx.request({
      url: app.globalData.baseUrl+'/Pst/poster_map', 
      data: {
        // 或许可以改为根据地理位置信息提供服务
        page: 1,
        limit: 50,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        var ls = res.data.data.row;
        const v = new Promise((resolve, reject) => {
          resolve(ls)
        })
        v.then((res) => {
          console.log('res type', res)
          that.createMarker(res)
        })
      }
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
      marker.id = marker.id;
      marker.userid = marker.userid;
      marker.longitude = marker.longtitude;
      marker.width = 40;
      marker.height = 40;
      if (marker.type == 1) {
        // share
        marker.iconPath = '/img/markshare.png';
      } else {
        // lost
        marker.iconPath = '/img/markslect.png';
      }
    }
    currentMarker = currentMarker.concat(markers);
    // console.log('ms ss', currentMarker)
    that.setData({
      markers: currentMarker
    })
  },

  /**
   * 选择地址
   */
  chooseAddress: function () {
    var that = this;
    wx.navigateTo({
      url: '../chooseAddress/chooseAddress?city=' + that.data.centerAddressBean.address_component.city + '&street=' + that.data.centerAddressBean.address_component.street,
    })
  },

  /**
   * 版本更新
   */
  checkUpdate: function () {
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager();
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        consoleUtil.log('onCheckForUpdate----------------->');
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
    console.log("city", this.data.city);
    // consoleUtil.log(qqmapsdk);
    qqmapsdk.getSuggestion({
      keyword: searchValue,
      region: that.data.city,
      // region: "四川省成都市郫都区",
      // region_fix: 1,
      // policy: 1,
      success: function (res) {
        // console.log("232", res.data);
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
    var that=this
    // console.log("点击地点",e.currentTarget.dataset.idx);
    var index = e.currentTarget.dataset.idx
    // console.log('address index ',this.data.resultList[index])
    var location = this.data.resultList[index].location
    // console.log('lat lng',location.lat,location.lng)
    // that.updateCenterLocation(location.lat, location.lng);
    app.globalData.location = location
    this.setData({
      latitude: location.lat,
      longitude: location.lng
    })
    // that.getCenterLocation()
    // that.regeocodingAddress();
    // that.queryMarkerInfo();
    this.setData({
      resultList:"",
      inputAddress:''
    })
  },

  /**
   * 删除输入内容
   */
  deleteInput: function () {
    // that = this
    // console.log("点击");
    this.setData({
      inputAddress: '',
      resultList: ''
    })
    // that.suggestionSearch(that.data.street);
  },

  /**
   * item点击事件,将地址回调到地图页面
   */
  itemAddressClick: function (e) {
    var that = this;
    consoleUtil.log(e);
    consoleUtil.log(e.currentTarget.id);
    var item = that.data.resultList[Number(e.currentTarget.id)];
    consoleUtil.log(item);
    //将数据设置到地图页面
    var pages = getCurrentPages();
    var prePage = pages[pages.length - 2];
    prePage.setData({
      callbackAddressInfo: item
    })
    wx.navigateBack({

    })
  },
})