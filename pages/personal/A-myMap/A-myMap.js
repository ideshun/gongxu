// pages/personal/A-myMap/A-myMap.js
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
    wx.request({
      url: 'http://mall.zdcom.net.cn/api/weixin/mall.php',
      method: 'GET',
      data: {
        flag: 'wx',
        type_a: 'addr_list',
        user: 'admin'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
          console.log(res.data[0])
          e.setData({
            res:res.data[0]
          })
      }
    })
  },

  createAddress: function () {
    wx.navigateTo({
      url: '/pages/personal/A-address/create'
    });
  },

  /**
   * 编辑地址
   */
  editAddress: function (e) {
    wx.navigateTo({
      url: "./detail?address_id=" + e.currentTarget.dataset.id
    });
  },

  /**
   * 移除收货地址
   */
  removeAddress: function (e) {
    let _this = this,
      address_id = e.currentTarget.dataset.itemid;
      // console.log(address_id)
    wx.showModal({
      title: "提示",
      content: "您确定要移除当前收货地址吗?",
      success: function (t) {
          wx.request({
            url: 'http://mall.zdcom.net.cn/api/weixin/mall.php',
            method:'GET',
            header: {
              'content-type': 'application/json' // 默认值
            },
            data:{
              'type_a' : 'del_addr',
              'flag'   : 'wx',
              'itemid' : address_id,
            },
            success:function(res){
              // console.log(res)
                if(res.data == 1){
                  wx.showToast({
                    title: '删除成功',
                    icon: 'success',
                    duration: 2000
                  })
                }
            }

          })


        // App._post_form('address/delete', {
        //   address_id
        // }, function (result) {
        //   if (result.code === 1) {
        //     _this.getAddressList();
        //   } else {
        //     App.showError(result.msg);
        //   }
        // });
      }
    });
  },

  /**
   * 设置为默认地址
   */
  setDefault: function (e) {
    let _this = this,
      address_id = e.detail.value;
    _this.setData({
      default_id: parseInt(address_id)
    });
    App._post_form('address/setDefault', {
      address_id
    }, function (result) {
      if (result.code === 1) {
        _this.data.options.from === 'flow' && wx.navigateBack();
      } else {
        App.showError(result.msg);
      }
    });
    return false;
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