 // pages/goods_order/goods_order.js
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
    var e = this;
    // console.log(options);
    var itemid = options.itemid;
    var catid = options.catid;
    var price = options.price;
    var a = options.a;
    wx.request({
      url: 'http://mall.zdcom.net.cn/api/weixin/mall.php',
      method: 'GET',
      data: {
        flag: 'wx',
        mid: 26,
        a: a, //商品数量
        itemid: itemid,
        type_a: 'now_buy',
        user: 'admin',
        catid : catid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        // console.log(res.data);
      
        //kaishi
        // 页面初始化 options为页面跳转所带来的参数
        
        e.setData({
         
      order:{
           
        order_no:'SA02201703052988',
           
        create_time:'2017.03.05 18:30',
          
        order_foods:[{
       
            foods_img:res.data.goods_arr.thumb,
          
            foods_name: res.data.goods_arr.title,
          
            foods_price: res.data.goods_arr.price,
          
            foods_weight: res.data.goods_arr.unit,
          
            foods_num: res.data.goods.a,
            itemid: res.data.goods_arr.itemid,
            catid : res.data.goods_arr.catid,
            mid: 26
        }],
        
        order_sum: res.data.goods_arr.price,
          
        customer:{
           
          customer_name: res.data.addr[0].truename,
           
          customer_address: res.data.addr[0].address,
           
          receiver: res.data.addr[0].truename,
          
          phone: res.data.addr[0].mobile   

        },
        remarks:'喝假酒喝怕了，请快点...'

      }
        //jieshu

      })
      }
    });
  },
  // 订单提交
  formSubmit:function(e){
    console.log(e.detail.value);
    var order = e.detail.value;
    // wx.showToast({

    //   title: '手机号码或密码不得为空!',

    //   icon: 'loading',

    //   duration: 1500

    // })

    // setTimeout(function () {

    //   wx.hideToast()

    // }, 2000)
   
// kaishi
    var that = this;
    wx.request({
      url: 'http://mall.zdcom.net.cn/api/weixin/mall.php',
      method: 'GET',
      data: {
        flag: 'wx',
        mid: order.mid,
        itemid: order.itemid,
        type_a: 'wx_pay',
        addr: order.addr ,
        price: order.price ,
        title: order.title ,
        truename: order.truename ,
        note: order.note ,
        mobile: order.mobile,
        a: order.a 
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res);
        //订单生成成功 未支付
        wx.requestPayment({
          timeStamp: 1,
          nonceStr: 1,
          package: 1,
          signType: 'MD5',
          paySign: 1,
          'success': function (successret) {
            console.log('支付成功');
            //获取支付用户的信息
            wx.getStorage({
              key: 'userInfo',
              success: function (getuser) {
                //加入订单表做记录
                wx.request({
                  url: url + 'Wx_AddOrder',
                  data: {
                    uname: 1,
                    goods: 1,
                    price: 1,
                    openid: 1,
                  },
                  success: function (lastreturn) {
                    console.log("存取成功");
                  }
                })
              },
            })
          }, 'fail': function (res) {
            console.log('失败啦~~~~~');
          }
        })

      }
    })
    //end

  },

// end
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