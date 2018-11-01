// pages/activity/signUp/signUp.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showTopTips: false,
    date: "2016-09-01",
    time: "12:01",
  },
  showTopTips: function () {
    var that = this;
    this.setData({
      showTopTips: true
    });
    setTimeout(function () {
      that.setData({
        showTopTips: false
      });
    }, 3000);
  },
  subEct: function () {
    let _this = this
    var values;
    values = e.detail.value;
    console.log(values);
    _this.setData({ disabled: true });
    wx.request({
      url: 'http://mall.zdcom.net.cn/api/weixin/mall.php',
      data: {
        'flag': 'wx',
        'type_a': 'add_exhibit',
        'truename': values.detial,
        // 'postcode' : e.detail.value.postcode,
        'mobile': values.phone,
        'addr': values.detail,
        'username': 'admin'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        if (res.data.error != '') {
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 2000
          })
        }
      }
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