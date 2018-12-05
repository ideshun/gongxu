//app.js
App({
  globalData: {
    Nickname: '',
    AvatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaELpXkiaVqqXSicaQvOjOLaCaS3NnCFPqLyLq7GREWvVImPjJtql8EI2ibps0yDKRbPmztYxyIibDicUXKg/132",
    City: '',
    Openid: "",
    Province: '',
    url:'https://mall.zdcom.net.cn/api/weixin/'
  },
  onLaunch: function () {
    //let that = this;
    //that.checkLoginStatus();
    //this.login();
    var e = this;
    wx.login({
      success: function (res) {
        //console.log(res);
        if (res.code) {
          //console.log(9999),
          wx.getUserInfo({ //得到rawData, signatrue, encryptData
            success: function (data) {
              //console.log(data);
              var rawData = data.rawData;
              var signature = data.signature;
              var encryptedData = data.encryptedData;
              var iv = data.iv;
              //发起网络请求
              wx.request({
                url: 'https://mall.zdcom.net.cn/api/wxapp/login.php',
                method: 'GET',
                data: {
                  'flag': 'wx',
                  'code': res.code,
                  'signature': signature,
                  'iv': iv,
                  'encryptedData': encryptedData,
                  'rawData': rawData
                },
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success: function (res1) {
                  // console.log(6666);
                  //console.log(res1);
                  e.globalData.Nickname = res1.data.nickName,
                    e.globalData.AvatarUrl = res1.data.avatarUrl,
                    e.globalData.Province = res1.data.province,
                    e.globalData.City = res1.data.city,
                    e.globalData.Openid = res1.data.openId,
                    e.globalData.Country = res1.data.country,
                    e.globalData.Gender = res1.data.gender,
                    e.globalData.Language = res1.data.language,
                    // e.globalData.Timestamp = res1.data.watermark.timestamp
                  //console.log(e);
                  wx.setStorageSync('openid', e.globalData.Openid);
                  wx.setStorageSync('is_login',1);
                }
              })

            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },
  showInfo: function (info = 'error', icon = 'none') {
    wx.showToast({
      title: info,
      icon: icon,
      duration: 1500,
      mask: true
    });
  }



})