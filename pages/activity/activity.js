// pages/index/index.js
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
      url: 'https://mall.zdcom.net.cn/api/weixin/mall.php',
      method: 'GET',
      data: {
        flag: 'wx',
        mid: options.mid,
        type_a:'list_a', //商品数量
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
      console.log(res.data);
      e.setData({
        'res':res.data
          })
       }
    }) 
  },
  clk: function(e) {
    var itemid;
    var mid;
   itemid =  e.currentTarget.dataset.itemid,
   mid = e.currentTarget.dataset.mid
   wx.navigateTo({
     url: '../show/show',
   })
    
  // url:'../show/show?itemid='+itemid+'&mid='+mid;
   
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