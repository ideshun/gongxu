let App = getApp();

Page({
  data: {
    list: [],
    default_id: null,
  },

  onLoad: function(options) {
    // 当前页面参数
    this.data.options = options;
  },

  onShow: function() {
    // 获取收货地址列表
    this.getAddressList();
  },

  /**
   * 获取收货地址列表
   */
  getAddressList: function(e) {
    var e = this
    wx.request({
      url: 'https://mall.zdcom.net.cn/api/weixin/mall.php', //仅为示例，并非真实的接口地址
      method: 'GET',
      data: {
        flag: 'wx',
        type_a: 'addr_list',
        username:'admin'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        e.setData({ //此时OK
          list: res.data
        }) 
      }
    });
    
  },

  /**
   * 添加新地址
   */
  createAddress: function() {
    wx.navigateTo({
      url: './create'
    });
  },

  /**
   * 编辑地址
   */
  editAddress: function(e) {
    wx.navigateTo({
      url: "./detail?address_id=" + e.currentTarget.dataset.id
    });
  },

  /**
   * 移除收货地址
   */
  removeAddress: function(e) {
    let _this = this,
      address_id = e.currentTarget.dataset.id;
    wx.showModal({
      title: "提示",
      content: "您确定要移除当前收货地址吗?",
      success: function(t) {
        App._post_form('address/delete', {
          address_id
        }, function(result) {
          if (result.code === 1) {
            _this.getAddressList();
          } else {
            App.showError(result.msg);
          }
        });
      }
    });
  },

  /**
   * 设置为默认地址
   */
  setDefault: function(e) {
    let _this = this,
      address_id = e.detail.value;
    _this.setData({
      default_id: parseInt(address_id)
    });
    App._post_form('address/setDefault', {
      address_id
    }, function(result) {
      if (result.code === 1) {
        _this.data.options.from === 'flow' && wx.navigateBack();
      } else {
        App.showError(result.msg);
      }
    });
    return false;
  },

});