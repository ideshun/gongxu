// page/component/new-pages/cart/cart.js
// 默认请求第一页
var numbers = 1;
var bool = true; 
const app = getApp();
Page({
  data: {
    show_edit: "block",
    edit_name: "编辑",
    edit_show: "none",
    // list: [],               // 购物车列表
    // hasList: false,          // 列表是否有数据
    // 默认展示数据
   // hasList: true,
    // 金额
    totalPrice: 0, // 总价，初始为0
    // 全选状态
    selectAllStatus: false, // 全选状态，默认全选
  },
  onLoad() {
    wx.showToast({
      title: '加载中',
      icon: "loading",
      duration: 1000
    })

    // 价格方法
    this.loaddata();
    
  },
  onShow() {

  },
  loaddata:function(){
    var that = this;
    var openid = wx.getStorageSync('openid');
    wx.request({
      url: 'https://mall.zdcom.net.cn/mall/wxapi.php',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        carlist: "1",
        openid: openid,
      },
      success: function (res) {
        that.setData({
          list: res.data
        });
        that.count_price();
      }
    })
  },
  /**
   * 当前商品选中事件
   */
  selectList(e) {
    var that = this;
    // 获取选中的radio索引
    var index = e.currentTarget.dataset.index;
    // 获取到商品列表数据
    var list = that.data.list; 
    // 默认全选
    that.data.selectAllStatus = true;
    // 循环数组数据，判断----选中/未选中[selected]
    list[index].selected = !list[index].selected;
    // 如果数组数据全部为selected[true],全选
    for (var i = list.length - 1; i >= 0; i--) {
      if (!list[i].selected) {
        that.data.selectAllStatus = false;
        break;
      }
    }
    // 重新渲染数据
    that.setData({
      list: list,
      selectAllStatus: that.data.selectAllStatus
    })
    // 调用计算金额方法
    that.count_price();
  },
  // 编辑
  btn_edit: function () {
    var that = this;
    if (bool) {
      that.setData({
        edit_show: "block",
        edit_name: "取消",
        show_edit: "none"
      })
      bool = false;
    } else {
      that.setData({
        edit_show: "none",
        edit_name: "编辑",
        show_edit: "block"
      })
      bool = true;
    }

  },
  // 删除
  deletes: function (e) {
    var that = this;
    var openid = wx.getStorageSync('openid');
    // 获取索引
    const index = e.currentTarget.dataset;
    console.log(index);
    // 获取商品列表数据
    wx.request({
      url: 'https://mall.zdcom.net.cn/mall/wxapi.php',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        delcar: "1",
        id: index.id,
        openid: openid
      },
      success: function (rese) {
        console.log(88888);
        if (rese.data=='ok'){
          /**wx.showToast({
            title: "删除成功",
            icon: "success",
            durantion: 2000
          })**/
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 2000,
            success: function () {
              /**setTimeout(function () {
                //要延时执行的代码
                wx.switchTab({
                  url: '/pages/logs/logs'
                })
              }, 2000) //延迟时间**/
              if (getCurrentPages().length != 0) {
                //刷新当前页面的数据
                getCurrentPages()[getCurrentPages().length - 1].onLoad()
              }

            }
          })
        }
      }
    })

  },



  /**
   * 购物车全选事件
   */
  selectAll(e) {
    // 全选ICON默认选中
    let selectAllStatus = this.data.selectAllStatus;
    // true  -----   false
    selectAllStatus = !selectAllStatus;
    // 获取商品数据
    let list = this.data.list;
    // 循环遍历判断列表中的数据是否选中
    for (let i = 0; i < list.length; i++) {
      list[i].selected = selectAllStatus;
    }
    // 页面重新渲染
    this.setData({
      selectAllStatus: selectAllStatus,
      list: list
    });
    // 计算金额方法
    this.count_price();
  },

  /**
   * 绑定加数量事件
   */
  btn_add(e) {
    // 获取点击的索引
    const index = e.currentTarget.dataset.index;
    // 获取商品数据
    let list = this.data.list;
    // 获取商品数量
    let num = list[index].num;
    // 点击递增
    num = num + 1;
    list[index].num = num;
    // 重新渲染 ---显示新的数量
    this.setData({
      list: list
    });
    // 计算金额方法
    this.count_price();
  },
  canvas: function (object) {
    let _this = this;
    let realWidth, realHeight;
    //创建节点选择器
    var query = wx.createSelectorQuery();
    //选择id
    query.select('#mycanvas').boundingClientRect()
    query.exec(function (res) {
      //res就是 该元素的信息 数组
      realWidth = res[0].width;
      realHeight = res[0].height;
      console.log('realHeight', realHeight);
      console.log('realWidth', realWidth);
      const ctx = wx.createCanvasContext('mycanvas');
      ctx.drawImage("../../images/ctx-bg.jpg", 0, 0, realWidth, realHeight);
      ctx.drawImage(_this.data.canvasUserPic, (realWidth * 0.099), (realHeight * 0.052), (realWidth * 0.091), (realWidth * 0.091));
      ctx.setFontSize(12);
      ctx.setFillStyle("#a38874");
      ctx.fillText(object.date, (realWidth * 0.201), (realHeight * 0.076));
      ctx.setFontSize(14);
      ctx.setFillStyle("#a38874");
      ctx.fillText("农历" + object.lunar, (realWidth * 0.201), (realHeight * 0.099));
      ctx.drawImage("../../images/swiper-bg.png", (realWidth * 0.099), (realHeight * 0.112), (realWidth * 0.8), (realHeight * 0.60));
      ctx.drawImage(_this.data.canvasShowImg, (realWidth * 0.099), (realHeight * 0.112), (realWidth * 0.8), (realHeight * 0.30));
      ctx.drawImage("../../images/swiper-detail.png", (realWidth * 0.099), (realHeight * 0.395), (realWidth * 0.8), (realHeight * 0.03));
      ctx.setFontSize(16);
      ctx.setFillStyle("#8d7665");

      ctx.setTextAlign('center')
      ctx.fillText(object.title1, realWidth / 2, _this.calculateWH(2, 620, realWidth, realHeight));
      ctx.fillText(object.title2, realWidth / 2, _this.calculateWH(2, 666, realWidth, realHeight));

      ctx.drawImage("../../images/swiper-line.png", (realWidth - realWidth * 0.71) / 2, (realHeight * 0.528), (realWidth * 0.71), (realHeight * 0.0195));
      ctx.drawImage("../../images/luckpic.png", _this.calculateWH(1, 267, realWidth, realHeight), _this.calculateWH(2, 763, realWidth, realHeight), _this.calculateWH(1, 204, realWidth, realHeight), _this.calculateWH(2, 60, realWidth, realHeight));
      ctx.setFontSize(12);
      ctx.fillText(object.luck_title, realWidth / 2, _this.calculateWH(2, 880, realWidth, realHeight));
      ctx.drawImage("../../images/code.jpg", _this.calculateWH(1, 229, realWidth, realHeight), _this.calculateWH(2, 989, realWidth, realHeight), _this.calculateWH(1, 292, realWidth, realHeight), _this.calculateWH(1, 292, realWidth, realHeight))
      ctx.draw();

      setTimeout(function () {
        wx.canvasToTempFilePath({
          canvasId: 'mycanvas',
          success: function (res) {
            var tempFilePath = res.tempFilePath;
            _this.setData({
              canvasUrl: tempFilePath
            })
            if (tempFilePath !== '') {
              _this.setData({
                isShowCav: false
              });
              wx.hideLoading();
              wx.previewImage({
                current: _this.data.canvasUrl, // 当前显示图片的http链接  
                urls: [_this.data.canvasUrl], // 需要预览的图片http链接列表  
              })
            }
          },
          fail: function (res) {
            console.log(res);
          }
        });
      }, 500);
    })
  },//下载图片
  onShow1: function (object) {
    let _this = this;
    _this.setData({
      isShowCav: true
    })
    wx.downloadFile({
      url: object.avatarurl,
      success: function (sres) {
        _this.setData({
          canvasUserPic: sres.tempFilePath
        });
        wx.downloadFile({
          url: object.show_img,
          success: function (sres1) {
            _this.setData({
              canvasShowImg: sres1.tempFilePath
            });
            _this.canvas(object);
          }
        })
      }
    })
  },
  /**
   * 绑定减数量事件
   */
  btn_minus(e) {
    //   // 获取点击的索引
    const index = e.currentTarget.dataset.index;
    // const obj = e.currentTarget.dataset.obj;
    // console.log(obj);
    // 获取商品数据
    let list = this.data.list;
    // 获取商品数量
    let num = list[index].num;
    // 判断num小于等于1  return; 点击无效
    if (num <= 1) {
      return false;
    }
    // else  num大于1  点击减按钮  数量--
    num = num - 1;
    list[index].num = num;
    // 渲染页面
    this.setData({
      list: list
    });
    // 调用计算金额方法
    this.count_price();
  },
  // 提交订单
  btn_submit_order: function () {
    var that = this;
    console.log(that.data.totalPrice);

    // 调起支付
    // wx.requestPayment(
    //   {
    //     'timeStamp': '',
    //     'nonceStr': '',
    //     'package': '',
    //     'signType': 'MD5',
    //     'paySign': '',
    //     'success': function (res) { },
    //     'fail': function (res) { },
    //     'complete': function (res) { }
    //   })
    wx.showModal({
      title: '提示',
      content: '合计金额-' + that.data.totalPrice + "暂未开发",
    })
  },
  pay: function (res) {
    var order = res.currentTarget.dataset;
    // console.log(app.globalData);
    // kaishi
    var that = this;
    wx.request({
      url: 'https://mall.zdcom.net.cn/api/weixin/mall16.php',
      method: 'GET',
      data: {
        flag: 'wx',
        mid: 16,
        itemid: order.itemid,
        type_a: 'wx_pay_car',
        addr: app.globalData.City,
        price: order.price,
        title: '购物车支付',
        truename: app.globalData.Nickname,
        //note: order.note,
       // mobile: order.mobile,
        a: 1,
        openid: app.globalData.Openid,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //  console.log(res.data);      
        //end
        //订单生成成功 未支付
        //aaaaaaaa
        wx.request({
          url: 'https://mall.zdcom.net.cn/api/weixin/mall16.php',
          dataType: "json",
          method: "get",
          data: {
            flag: 'wx',
            mid: 16,
            type_a: 'getSign',
            'package': "prepay_id=" + res.data.prepay_id,

          },
          success: function (resa) {
            var signData = resa.data;
            // console.log(resa.data);
            //bbbbbb
            wx.requestPayment({
              'timeStamp': signData.timeStamp,
              'nonceStr': signData.nonceStr,
              'package': signData.package,
              'signType': 'MD5',
              'paySign': signData.sign,
              'success': function (successret) {
                //console.log('支付成功1111');
                //获取支付用户的信息
                // wx.getStorage({
                //   key: 'userInfo',
                //   success: function (getuser) {
                //加入订单表做记录
                wx.request({
                  url: 'https://mall.zdcom.net.cn/api/weixin/mall16.php',
                  data: {
                    flag: 'wx',
                    "type_a": "success_order",
                    "orderid": res.data.orderid
                  },
                  success: function (lastreturn) {
                    if (lastreturn.data == '1') {
                      wx.showToast({
                        // title: res.data.msg,
                        title: '下单成功',
                        icon: 'success',
                        duration: 1500
                      })
                      setTimeout(function () {
                        wx.hideToast()
                      }, 2000)
                      wx.navigateTo({
                        url: '/pages/personal/A-order/index'
                      })

                    }
                    //   }
                    // })
                  },
                })
              }, 'fail': function (res) {
                console.log(res);
              }
            })
          }
        })  //cccc

      }
    })
    //end

  },
  // 收藏
  btn_collert: function (event) {
    console.log(event.target.dataset.mid);
    var openid = wx.getStorageSync('openid');
    var mdata = event.target.dataset;
    wx.request({
      url: 'https://mall.zdcom.net.cn/mall/wxapi.php',
      method: 'POST',
      header: {
        //'content-type': 'application/json'
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        addlike: "1",
        openid:openid,
        img: mdata.img,
        itemid: mdata.mid,
        title: mdata.title,
        price: mdata.price
      },
      success: function (res) {
        console.log(res.data);
        if (res.data == 'ok') {
          wx.showToast({
            title: "收藏成功",
            icon: "success",
            durantion: 2000
          })
        } else if (res.data == 'errorcf'){
          wx.showToast({
            title: "重复收藏！",
            icon: "none",
            durantion: 2000
          })
        }else {
          wx.showToast({
            title: "收藏失败！",
            icon: "none",
            durantion: 2000
          })
        }
      },fail:function(res){
        wx.showToast({
          title: "收藏失败！",
          icon: "none",
          durantion: 2000
        })
      }
    })


    /**wx.showToast({
      title: '收藏暂未开发',
      duration: 2000
    })**/
  },
  /**
   * 计算总价
   */
  count_price:function() {
    // 获取商品列表数据
    let list = this.data.list;
    console.log(list);
    // 声明一个变量接收数组列表price
    let total = 0;
    let itemid='';
    // 循环列表得到每个数据
    for (let i = 0; i < list.length; i++) {
      // 判断选中计算价格
      if (list[i].selected) {
        // 所有价格加起来 count_money
        total += 1 * list[i].price;
        itemid += list[i].itemid+",";
      }
    }
   // console.log(itemid);
    // 最后赋值到data中渲染到页面
   this.setData({
     totalPrice: total.toFixed(2),
     itemid: itemid
    });
  },
  // 下拉刷新
  // onPullDownRefresh: function () {
  //   // 显示顶部刷新图标  
  //   wx.showNavigationBarLoading();
  //   var that = this;

  //   console.log(that.data.types_id);
  //   console.log(that.data.sel_name);
  //   wx.request({
  //     url: host + '请求后台数据地址',
  //     method: "post",
  //     data: {
  //       // 刷新显示最新数据
  //       page: 1,
  //     },
  //     success: function (res) {

  //       // console.log(res.data.data.datas);
  //       that.setData({
  //         list: res.data.data.datas
  //       })
  //     }
  //   })

  //   // 隐藏导航栏加载框  
  //   wx.hideNavigationBarLoading();
  //   // 停止下拉动作  
  //   wx.stopPullDownRefresh();

  // },

  // 加载更多
  // onReachBottom: function () {
  //   var that = this;
  //   // 显示加载图标  
  //   wx.showLoading({
  //     title: '正在加载中...',
  //   })
  //   numbers++;

  //   // 页数+1  
  //   wx.request({
  //     url: host + '后台数据地址',
  //     method: "post",
  //     data: {
  //     // 分页
  //       page: numbers,
  //     },
  //     // 请求头部  
  //     header: {
  //       'content-type': 'application/json'
  //     },
  //     success: function (res) {
  //       // 回调函数 

  //       var num = res.data.data.datas.length;
  //       // console.log(num);
  //       // 判断数据长度如果不等于0，前台展示数据，false显示暂无订单提示信息
  //       if (res.data.data.status == 0) {

  //         for (var i = 0; i < res.data.data.datas.length; i++) {
  //           that.data.list.push(res.data.data.datas[i]);
  //         }
  //         // 设置数据  
  //         that.setData({
  //           list: that.data.list
  //         })

  //       } else {
  //         wx.showToast({ title: '没有更多了', icon: 'loading', duration: 2000 })
  //       }


  //       // 隐藏加载框  
  //       wx.hideLoading();
  //     }
  //   })

  // },

})
