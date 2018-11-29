//app.js
App({
  globalData: {
    Nickname: '',
    AvatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaELpXkiaVqqXSicaQvOjOLaCaS3NnCFPqLyLq7GREWvVImPjJtql8EI2ibps0yDKRbPmztYxyIibDicUXKg/132",
    City: '',
    Openid: "",
    Province: '',
  },
  is_login : '',

  bindGetUserInfo(e) {
    // console.log(e.detail.userInfo)
  },

  onLaunch: function () {
    var e = this
    wx.login({
      success: function (res) {
        // console.log(res.code)
        if (res.code) {
          wx.getUserInfo({ //得到rawData, signatrue, encryptData
            success: function (data) {
              // console.log(data);
              var rawData = data.rawData;
              var signature = data.signature;
              var encryptedData = data.encryptedData;
              var iv = data.iv;
    
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
                    e.globalData.Nickname = data.userInfo.nickName,
                    e.globalData.AvatarUrl = data.userInfo.avatarUrl,
                    e.globalData.Province = data.userInfo.province,
                    e.globalData.City = data.userInfo.city,
                    e.globalData.Openid = res1.data.openid,
                    e.globalData.is_login = 1,
                    wx.setStorageSync('openid', res1.data.openid);
                    wx.setStorageSync('is_login', '1'); 
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