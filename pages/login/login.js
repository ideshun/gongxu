// pages/login/login.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    avatarUrl: "https://mall.zdcom.net.cn/file/upload/images/boy.png",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var is_login = wx.getStorageSync('is_login');
    if (is_login == 1) {
      wx.switchTab({
        url: '/pages/index/index'
      })
    }
  },
  //授权申请
  bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {
      // console.log(app);
      //用户按了允许授权按钮
      var that = this;
      //插入登录的用户的相关信息到数据库
      wx.request({
        url: 'https://mall.zdcom.net.cn/api/weixin/login.php',
        data: {
          'wx_login': 1,
          openid: app.globalData.Openid,
          nickName: app.globalData.Nickname,
          avatarUrl: app.globalData.AvatarUrl,
          province: app.globalData.province,
          city: app.globalData.city,
        },
        header: {
          'content-type': 'application/json'
        },
        success: function(res) {
          //从数据库获取用户信息
          // that.queryUsreInfo();
          // console.log(res);
          // console.log(wx.getStorageSync('is_login'));
          console.log("插入小程序登录用户信息成功！");

        }
      });
      //授权成功后，跳转进入小程序首页
      wx.switchTab({
        url: '/pages/index/index'
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
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