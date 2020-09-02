// pages/login/login.js
var api = require("../../utils/api.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bindInfo: false,
    userInfo: null
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

  bindNavToBind: function () {
    var {code, avatarUrl, gender, nickName} = this.data.userInfo
    var url = `/pages/login/bind?c=${code}&a=${avatarUrl}&g=${gender}&n=${nickName}`
    wx.navigateTo({
      url: url
    })
  },

  login: function (e) {
    var that = this
    wx.login({
      success (res) {
        if (res.code) {
          e.detail.userInfo.code = res.code
          that.setData({
            userInfo: e.detail.userInfo
          })
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
              if (res.data.bind === 1) {
                wx.setStorageSync('userId', res.data.userid)
                wx.setStorageSync('userBind', res.data.bind)
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