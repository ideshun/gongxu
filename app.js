//app.js
App({
  globalData: {
    Nickname: '',
    AvatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaELpXkiaVqqXSicaQvOjOLaCaS3NnCFPqLyLq7GREWvVImPjJtql8EI2ibps0yDKRbPmztYxyIibDicUXKg/132",
    City: '',
    Openid: "",
    Province: ''
  },

  onLaunch: function () {
    var e = this
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log(res);
          wx.getUserInfo({ //得到rawData, signatrue, encryptData
            success: function (data) {
              // console.log(data);
              var rawData = data.rawData;
              var signature = data.signature;
              var encryptedData = data.encryptedData;
              var iv = data.iv;
              // console.log(data);
              //发起网络请求
              wx.request({
                url: 'http://mall.zdcom.net.cn/api/weixin/login.php',
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
                  // console.log(res1);
                  e.globalData.Nickname = res1.data.nickName,
                    e.globalData.AvatarUrl = res1.data.avatarUrl,
                    e.globalData.Province = res1.data.province,
                    e.globalData.City = res1.data.city,
                    e.globalData.Openid = res1.data.openId
                  // console.log(res1);
                   wx.setStorageSync('openid', e.globalData.Openid);
                }
              })

            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  }


  
})