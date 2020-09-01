// pages/login/login.js
var api = require("../../utils/api.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bindInfo: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  bindNavBack: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  login: function (e) {
    var that = this
    wx.login({
      success (res) {
        if (res.code) {
          console.log(res.code)
          console.log(e.detail.userInfo)
          api.phpRequest({
            url: 'login.php',
            data: {
              code: res.code,
              avatar_url: e.detail.userInfo.avatarUrl,
              gender: e.detail.userInfo.gender,
              nickname: e.detail.userInfo.nickName
            },
            success: function (res) {
              console.log(res)
              wx.setStorageSync('userId', res.data.userid)
              wx.setStorageSync('userBind', res.data.bind)
              if (res.data.bind === 1) {
                wx.navigateBack({
                  delta: 1
                })
              } else {
                that.setData({
                  bindInfo: true
                })
              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
})