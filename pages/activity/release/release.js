// pages/activity/release/release.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityType: ["类别", "热门活动", "排名", "互助"],
    activityTypeIndex: 0,
    // 日期插件
    bdate: "2018-09-01",
    btime: "12:01",
    edate: "2018-09-01",
    etime: "12:01",
    files: []
  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  formSubmit:function(e){
    // console.log(e);
    var values;
    values = e.detail.value;
    console.log(values);
    this.setData({ disabled: true });
    wx.request({
      url: 'http://mall.zdcom.net.cn/api/weixin/mall.php',
      data: {
        'flag': 'wx',
        'type_a': 'add_exhibit',
        'mid': 8,
        'title': values.title,
        'username': values.username,
        'catid': values.catid,
        'fromtime': values.fromtime,
        'totime': values.totime,
        'hallname': values.hallname,
        'wx': values.wx,
        'qq': values.qq,
        'sponsor': values.sponsor,
        'content':content,
        'user':'admin' //暂用
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        if (res.data.error == 1) {
          wx.showToast({
            title: '报名成功',
            icon: 'success',
            duration: 2000
          })
        }
      }
  })
  }
  ,


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