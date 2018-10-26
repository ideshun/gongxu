//AJAX主体函数
const API_URL ='';
function fetchApi(type, params, method) {
  return Promise(function (resolve, reject, notify) {
    wx.request({
      url: API_URL + '/' + type,
      data: params,
      header: { 'Content-Type': 'application/json' },
      method: method,
      success: resolve,
      fail: reject
    })
  })
}
module.exports = {
  fetchApi
}