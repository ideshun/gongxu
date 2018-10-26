// pages/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listTopImg: '/image/banner1.png',
    listTopText: '贯彻人才强省战略，建设网上人事管理和人才引进、人才开发平台。为各类专业技术和实用型人才提供培训指导、人事考试、技能鉴定、技能提升的全过程服务。',
    widthFix: 'widthFix',

    serviceList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var e = this;
    // 热门服务
    wx.request({
      url: 'http://mall.zdcom.net.cn/api/weixin/mall.php', //仅为示例，并非真实的接口地址
      data: {
        flag: 'wx',
        mid: e.mid,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
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
        pagesize: 4
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
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
    var fuwu = this;
    wx.request({
      url: 'http://mall.zdcom.net.cn/api/weixin/mall.php', //仅为示例，并非真实的接口地址
      data: {
        flag: 'wx',
        mid: 27
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        fuwu.setData({
          serviceItem: res.data
        })
        console.log(res);
      }
    })
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