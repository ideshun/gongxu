// pages/detail/detail.js
Page({
  data: {
    isLike: false,
    goods : [],
    cont:'',

    // banner
    imgUrls: [
      "http://img.article.pchome.net/00/14/48/94/hyhyhy-2006-10-26-31000-01.jpg",
      "//goss1.vcg.com/creative/vcg/800/version23/VCG41530249080.jpg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537415129383&di=0bfe97fe45dda1c1ed89c2fccf633334&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01a93059475fdda8012193a32dc89c.jpg%401280w_1l_2o_100sh.png",
      "//goss1.vcg.com/creative/vcg/800/version23/VCG41529654716.jpg",
      "//goss2.vcg.com/creative/vcg/800/version23/VCG41529654782.jpg"
    ],
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //  滑动动画时长1s

    // 商品详情介绍
    detailImg: [
      "//goss1.vcg.com/creative/vcg/800/version3/c1e24465966b493cb9248c1746611503.jpg",
      "//goss.vcg.com/creative/vcg/800/version3/49ccca9a73734b888ff80dfd1fc14905.jpg",
      "//goss3.vcg.com/creative/vcg/800/version3/01b9613a242a4e2bbe64f766411d8e17.jpg",
      "//goss1.vcg.com/creative/vcg/800/version3/0ae5392bf30c41288fff2c1c8b85af82.jpg",
      "//goss1.vcg.com/creative/vcg/400/new/1ecc43177a7a480a8957559c6c719ecb.jpg",
      "//goss3.vcg.com/creative/vcg/400/new/2496399ee16646d7bd2c0a2a9999feba.jpg",
    ],
  },
  //预览图片
  previewImage: function (e) {
    var current = e.target.dataset.src;

    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.imgUrls // 需要预览的图片http链接列表  
    })
  },
  // 收藏
  addLike() {
    this.setData({
      isLike: !this.data.isLike
    });
  },
  //联系客服
  tel: function () {
    let that = this;
    wx.makePhoneCall({
      phoneNumber: '18340087612',
    })
  },

  // 跳到购物车
  toCar() {
    wx.switchTab({
      url: '/pages/cart/cart'
    })
  },
  // 立即购买
  immeBuy(e) {
    // console.log(e);
    var itemid = e.currentTarget.dataset.itemid;
    var catid = e.currentTarget.dataset.catid;
    var price = e.currentTarget.dataset.price;
    var a= '1'; //商品数量
    wx.navigateTo({
      url: '/pages/goods_order/goods_order?a='+a+'&itemid='+itemid+'&catid='+catid+'&price='+price
    })
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (e) {
    // console.log(e);
    var that = this;
    wx.request({
      url: 'https://mall.zdcom.net.cn/api/weixin/mall.php',
      method: 'GET',
      data: {
        flag: 'wx',
        mid: e.mid,
        itemid: e.itemid,
        type_a: 'goods_show'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        // console.log(res.data);
        that.setData({
          goods : res.data,  
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