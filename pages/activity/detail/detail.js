// pages/activity/detail/detail.js
const ss = require('../../../utils/time.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var e = this
    console.log(options.mid);
    wx.request({
      url: 'http://mall.zdcom.net.cn/api/weixin/mall.php',
      method: 'GET',
      data: {
        flag: 'wx',
        mid: options.mid,
        type_a: 'show', 
        itemid: options.itemid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        e.setData({
          'res'     : res.data,
          'formdate': ss.formatTime(res.data.fromtime, 'Y/M/D'),
          'totime'  :   ss.formatTime(res.data.totime, 'Y/M/D'),
        })
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