// pages/personal/personal.js
var app = getApp();
import { toTabPage } from "../../utils/common.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    byname: 'app.globalData.Nickname',
    nickName: app.globalData.Nickname,
    obtain: '获得了0次赞，发布了0条口碑',
    avatarUrl: app.globalData.AvatarUrl,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var e = this;
    e.setData({
      byname: app.globalData.Nickname,
    })
    console.log(app.globalData.Nickname);
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
  // tab切换
  toTabPage: function (e) {
    toTabPage(e)
  },

  //个人信息
  toMyInfo: function () {
    let that = this;
    wx.navigateTo({
      url: `/pages/personal/A-myInfo/A-myInfo`,
    })
  },

  // //完善资料
  // toMyData: function () {
  //   let that = this;
  //   wx.navigateTo({
  //     url: `/pages/personal/A-myData/A-myData`,
  //   })
  // },

  //我的消息
  toMyMessage: function () {
    let that = this;
    wx.navigateTo({
      url: `/pages/personal/A-myMessage/A-myMessage`,
    })
  },

  //我的订单
  toMyConsume: function () {
    let that = this;
    wx.navigateTo({
      url: `/pages/personal/A-address/index`,
    })
  },

  //我的收获地址
  toMyMap: function () {
    let that = this;
    wx.navigateTo({
      url: `/pages/personal/A-myMap/A-myMap`,
    })
  },


  //我的设置
  toMySetting: function () {
    let that = this;
    wx.navigateTo({
      url: `/pages/personal/A-mySetting/A-mySetting`,
    })
  },

  //联系客服
  tel: function () {
    let that = this;
    wx.makePhoneCall({
      phoneNumber: '18340087612',
    })
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