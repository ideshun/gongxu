var sliderWidth = 80;
var WxParse = require('../../wxParse/wxParse.js');
// pages/neiye/neiye.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["商品", "详情"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    // lunbo
    inputShowed: false,
    inputVal: "",
    imgUrls: [],
    indicatorDots: true,
    autoplay: false,
    interval: 2000,
    duration: 1000,
    array: ['白色', '红色', '蓝色', '黑色'],
    index: 0,
    selected: true,
    selected1: false,
    selected2: false,
    // 详情
    xqimg:[
      '//img20.360buyimg.com/vc/jfs/t23383/106/179334099/72149/8d9e2674/5b285707Ned89707f.jpg!q70.dpg',
      '//img20.360buyimg.com/vc/jfs/t21991/363/1241911269/142494/ceb903f7/5b239421N5ddc6f35.jpg!q70.dpg',
      '//img20.360buyimg.com/vc/jfs/t24076/255/42560084/144913/aa896c72/5b239588N9461f91d.jpg!q70.dpg'
    ],
    detail:{}

  },

  chooseImg: function (e) {
    this.setData({ 
      curIdx: e.currentTarget.dataset.current 
      })  
      },

  selected: function (e) {
    this.setData({
      selected1: false,
      selected: true,
      selected2: false
    })
  },
  selected1: function (e) {
    this.setData({
      selected: false,
      selected1: true,
      selected2: false
    })
  },
  selected2: function (e) {
    this.setData({
      selected: false,
      selected1: false,
      selected2: true
    })
  },
  onshow:function(res){
    //console.log(res);
    //创建动画,
    var animation = wx.createAnimation({
      duration: 3000,
      timingFunction: 'ease-in-out'
    });
    this.animation = animation;
    animation.translateY(-336).step();
    this.setData({
      animationData: this.animation.export(),
      maskVisual: 'show'
    });
    var that = this;
    var cart = wx.getStorageSync('cart') || [];//判断cart存不存在
    var exist = cart.find(function (ele) {  //find遍历cart数组
      return ele.id === res.currentTarget.dataset.id;
    })
    if (exist){
      exist.num = parseInt(exist.num) + parseInt(res.currentTarget.dataset.num);//如果加入购物车的商品存在就增加数量
    }else{
      cart.push(res.currentTarget.dataset);
    }
     var mdata = res.currentTarget.dataset;
     var openid = wx.getStorageSync('openid');
     mdata.openid = openid;
    // console.log(mdata);
     console.log(mdata); 
     wx.request({
        url: 'http://mall.zdcom.net.cn/mall/wxapi.php',
        method: 'POST',
        header: {
          //'content-type': 'application/json'
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          addcar: "1",
          openid: mdata.openid,
          img: mdata.img,
          itemid: mdata.itemid,
          title: mdata.title,
          price: mdata.price
        },
        success: function (res) {
          console.log(res.data);
          if (res.data=='ok'){
            wx.showToast({
              title: "加入购物车成功",
              icon: "success",
              durantion: 2000
            })
          }else{
            wx.showToast({
              title: "失败！请检查登录！",
              icon: "none",
              durantion: 2000
            })
          }
        }
     })


   /** wx.setStorage({
      key: 'cart',
      data: cart,
      success: function (res) {
        //添加购物车的消息提示框
        wx.showToast({
          title: "加入购物车成功000",
          icon: "success",
          durantion: 2000
        })
      }
    })**/
    //购物车的图标右上方提示购物车中有多少商品
    var total = 0;
    cart.find(function (ele) {
      total += parseInt(ele.num);
    })
    this.setData({ cartNum: total });
  },

  // 选择器
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中.....',
    })
    console.log(options);
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    wx.request({
      url: 'http://mall.zdcom.net.cn/api/wxapp/mall.php', //仅为示例，并非真实的接口地址 
      method: 'GET',
      data: {
        flag:'wx',
        mid: 16,
        itemid: options.mid,
        type_a: 'show'
      },
      header: {
        // 'content-type': 'application/json' // 默认值
        'content-type':'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //console.log(123);
        let data = res.data;
        //console.log(data),
        that.setData({
          imgUrls:[
            data.thumb,
            data.thumb1,
            data.thumb2
          ],
          detail: data
        })
          wx.hideLoading();
      }
    })
    //点赞
    // 获取接收到的id值
    var getId = options.id;
    // 让接收到的id值传递到data:{}里面
    // this.setData({
    //   currentId: getId
    // });
    // 读取所有的文章列表点赞缓存状态
    var cache = wx.getStorageSync('cache_key');
    // 如果缓存状态存在
    if (cache) {
      // 拿到所有缓存状态中的1个
      var currentCache = cache[getId];
      // 把拿到的缓存状态中的1个赋值给data中的collection，如果当前文章没有缓存状态，currentCache 的值就是 false，如果当前文章的缓存存在，那么 currentCache 就是有值的，有值的说明 currentCache 的值是 true
      this.setData({
        collection: currentCache
      })
    } else {
      // 如果所有的缓存状态都不存在 就让不存在的缓存存在
      var cache = {};
      // 既然所有的缓存都不存在，那么当前这个文章点赞的缓存也不存在，我们可以把当前这个文章点赞的缓存值设置为 false
      cache[getId] = false;
      // 把设置的当前文章点赞放在整体的缓存中
      wx.setStorageSync('cache_key', cache);
    }
  },
  // 点击图片的点赞事件  这里使用的是同步的方式
  toCollect: function (event) {
    // 获取缓存，得到当前文章是否被点赞
    var cache = wx.getStorageSync('cache_key');
    // 获取当前文章是否被点赞的缓存
    var currentCache = cache[this.data.currentId];
    // 取反，点赞的变成未点赞 未点赞的变成点赞
    currentCache = !currentCache;
    // 更新cache中的对应的1个的缓存值，使其等于当前取反的缓存值
    cache[this.data.currentId] = currentCache;
    // 调用 showModal方法
    this.showModal(cache, currentCache);
  },
  showModal: function (cache, currentCache) {
    var that = this;
    wx.showModal({
      title: "点赞",
      content: currentCache ? "成功" : "取消",
      showCancel: false,
      // cancelText: "取消111",
      // cancelColor: "#000",
      confirmText: "知道啦",
      confirmColor: "#0f0",
      success: function (res) {
        console.log(res)
        if (res.confirm) {
          // 重新设置缓存
          wx.setStorageSync('cache_key', cache);
          // 更新数据绑定,从而切换图片
          that.setData({
            collection: currentCache
          })
        }
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

  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  }
})