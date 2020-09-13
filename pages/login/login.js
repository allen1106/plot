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
    var {openId, avatarUrl, gender, nickName} = this.data.userInfo
    var url = `/pages/login/bind?o=${openId}&a=${avatarUrl}&g=${gender}&n=${nickName}`
    wx.navigateTo({
      url: url
    })
  },

  login: function (e) {
    var that = this
    wx.login({
      success (res) {
        if (res.code) {
          console.log(res)
          console.log(e.detail)
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
              e.detail.userInfo.openId = res.data.openid
              that.setData({
                userInfo: e.detail.userInfo
              })
              if (res.data.bind === 1) {
                wx.setStorageSync('userId', res.data.userid)
                wx.setStorageSync('villageId', res.data.village_id)
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