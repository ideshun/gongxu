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
        // console.log(res.code)
        if (res.code) {
          wx.getUserInfo({ //得到rawData, signatrue, encryptData
            success: function (data) {
            //  console.log(data);
              var rawData = data.rawData;
              var signature = data.signature;
              var encryptedData = data.encryptedData;
              var iv = data.iv;

              //发起网络请求
              wx.request({
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
                  //console.log(res1);
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