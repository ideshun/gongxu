

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

const http = 'https://mall.zdcom.net.cn/api/weixin/';
const url_mall = http+'mall.php';
module.exports = {
  toTabPage,
  url_mall: url_mall,
  // url_mall: url_mall,
}


