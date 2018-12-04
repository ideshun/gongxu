// pages/fenlei/fenlei.js
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },
  switchRightTab: function (e) {
    var that = this;
    // console.log(123);
    // 获取item项的id，和数组的下标值
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    console.log(id);
    wx.request({
      url: 'https://mall.zdcom.net.cn/mall/wxapi.php',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        wxlist: "1",
        wxcatid: id
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          taglist: res.data,
          catname: res.data.catname
        });

      }
    })
    // 把点击到的某一项，设为当前index
    /**this.setData({
      curNav: id,
      curIndex: index
    })**/

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  onLoaddata:function(){
    var that = this;
    wx.request({
      url: 'https://mall.zdcom.net.cn/mall/wxapi.php',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        wxcx: "1"
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          catlist: res.data
        });

      }
    }),
      wx.request({
        url: 'https://mall.zdcom.net.cn/mall/wxapi.php',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          wxlist: "1"
        },
        success: function (res) {
          console.log(res.data);
          that.setData({
            taglist: res.data
          });

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
    this.onLoaddata();
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

  },
  // 底部导航 

  shouYe: function () {
    wx.navigateTo({
      url: "../mallindex/index"
    })
  },
  gouWuChe: function () {
    wx.navigateTo({
      url: "../logs/logs"
    })

  }
})