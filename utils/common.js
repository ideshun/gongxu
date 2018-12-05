
var http = 'https://mall.zdcom.net.cn/api/weixin/';
let toTabPage= function (e) {
  let toIndex = e.currentTarget.dataset.index;
  let toPage;
  switch (toIndex) {
    case "0":
      toPage = "/pages/A-index/A-index";
      break;
    case "1":
      toPage = "/pages/A-follow/A-follow";
      break;
    case "2":
      toPage = "/pages/A-financing/A-financing";
      break;
    case "3":
      toPage = "/pages/A-centrality/A-centrality";
      break;
  }
  console.log("toPage", toPage)
  wx.redirectTo({
    url: toPage
  })
} 
module.exports.url_mall = http;
// url:链接地址
// mid：模块id
// type_a:请求方法名称
// prarm：参数
function toRequest(url, mid, type_a, openid,orderid){
  const resa = '';
//   wx.request({
//     url: url, //仅为示例，并非真实的接口地址
//     data: {
//       flag    : 'wx',
//       mid     : mid,
//       type_a  : type_a,
//       openid  : openid,
//       orderid : orderid
//     },
//     method:'GET',
//     header: {
//       'content-type': 'application/json' // 默认值
//     },
//     success: function (res) {
//       resa = res
//       // console.log(res.data)
//     }
//   });
//   return resa;
}
module.exports = {
  toTabPage,
  toRequest: toRequest,
  // url_mall: url_mall
}


