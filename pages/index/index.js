// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    widthFix: 'widthFix',
    imgUrls: [
      '/image/banner.png',
    ],
    topCate: [{
      cateUrl: '/pages/activity/activity',
        cateIcon: '/icons/cate-icon1.png',
        mid: 25,
        text: '人才招聘'
      },
      {
        cateUrl: '/pages/activity/activity',
        cateIcon: '/icons/cate-icon2.png',
        mid:8,
        text: '热门活动'
      },
      {
        cateUrl: '/pages/mallindex/index',
        cateIcon: '/icons/cate-icon3.png',
        mid: 24,
        text: '在线商城'
      },
      {
        cateUrl: '/pages/activity/activity',
        cateIcon: '/icons/cate-icon4.png',
        mid: 24,
        text: '生活服务'
      }
    ],
    serviceItem: [],//热门服务
    cateTabItem: [
      '人才招聘',
      '二手闲置',
      '生活服务',
    ],
    serviceList: [], //全部
    recoMode: 'aspectFit', //保持纵横比缩放图片，使图片的长边能完全显示出来
    recoImg: '/image/reco.png',
    indicatorDots: true, //是否显示指示点
    indicatorColor: 'rgba(255,255,255,0.5)', //指示点颜色
    indicatorActiveColor: '#FFF', //当前选中的指示点颜色
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔
    duration: 500, //滑动动画时长
    circular: true, //是否采用衔接划动
    tabActive: 0, //先设置第一个是active
  },
  det:function(e){
    var mid =e.currentTarget.dataset.mid;
    var itemid = e.currentTarget.dataset.itemid;
    // console.log(mid+'---'+catid);
    wx.navigateTo({
      url: '../goods_show/goods_show?mid=' + mid + '&itemid=' + itemid
    })
  },


  tabClick: function(e) { //点击tab 设置 tabActive 的值
    this.setData({
      tabActive: e.currentTarget.dataset.current
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var e = this;
    // 热门服务
    wx.request({
      url: 'http://mall.zdcom.net.cn/api/weixin/mall.php', //仅为示例，并非真实的接口地址
      method:'GET',
      data: {
        flag: 'wx',
        mid: 24,
        type_a : 'list_a' 
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        e.setData({ //此时OK
          serviceItem: res.data
        })

        // console.log(res.data)
      }
    });
  //最新服务列表 全部
    wx.request({
      url: 'http://mall.zdcom.net.cn/api/weixin/mall.php', //仅为示例，并非真实的接口地址
      data: {
        flag: 'wx',
        mid: 24,
        order: 'edittime',
        type_a: 'all',
        pagesize : 4
  
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        e.setData({ //此时OK
          serviceList: res.data
        })
        // console.log(res.data)
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }



})