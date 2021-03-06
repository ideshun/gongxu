// pages/activity/release/release.js
var app = getApp();
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
    files: [],
    // db_files:'',
  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // console.log(res);
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
    var that = this; 
    //上传图片
    let file = this.data.files;
  //  console.log(file);
    if (file == '') {
      wx.showToast({
        title: '请上传活动封面！',
        icon: 'none'
      });
    } else {
      // console.log(file);
      // this.fileUpload('image',file); 
      // 上传
      wx.uploadFile({
        url: 'https://mall.zdcom.net.cn/api/weixin/mall.php',
        filePath: 'mall.zdcom.net.cn/file/upload/',
        name: 'file',
        method: 'GET',
        filePath: file[0],
        data: {
          flag: 'wx',
          type_a: 'upload_file',
        },
        success: function (resa) {

                var values;
                values = e.detail.value; 
                that.setData({ disabled: true });
                wx.request({
                  url: 'https://mall.zdcom.net.cn/api/weixin/mall.php',
                  method:'GET',
                  data: {
                    'flag': 'wx',
                    'type_a': 'add_exhibit',
                    'mid': 8,
                    'catid': 22,
                    'title': values.title,
                    'username': values.username,
                    'truename': values.truename,
                    // 'catid': values.catid,
                    'fromtime': values.fromtime,
                    'totime': values.totime,
                    'hallname': values.hallname,
                    'telephone': values.telephone,
                    'address': values.address,
                    'thumb': resa.data,
                    'wx': values.wx,
                    'qq': values.qq,
                    'sponsor': values.sponsor,
                    'content': values.content,
                    'openid': app.globalData.Openid, //暂用
                  },
                  header: {
                    'content-type': 'application/json' // 默认值
                  },
                  success: function (res) {
                    console.log(res)
                    if (res.data == 1) {
                      wx.showToast({
                        title: '发布成功',
                        icon: 'success',
                        duration: 2000
                      })
                      wx.navigateTo({ 
                      url: '../activity?mid=8'
                      })
                    }
                  }
              })

        }
      });


      //结束
    }

  },
  /**
    * 图片上传
    */
  fileUpload: function (path,file) {
    let that = this;
    wx.uploadFile({
      url: 'https://mall.zdcom.net.cn/api/weixin/mall.php',
      filePath: 'mall.zdcom.net.cn/file/upload/',
      name: 'file',
      method: 'GET',
      filePath: file[0],
      data: {
        flag : 'wx',
        type_a: 'upload_file',
      },
      success: function (res) {
        // console.log(res);
        // that.setData({
        //   db_files : res.data
        // })
        
        // that.formSubmitDo(post);
      }
    });
  },

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