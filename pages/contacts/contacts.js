// pages/contacts/contacts.js
var api = require("../../utils/api.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    contactList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var userId = wx.getStorageSync('userId')
    api.phpRequest({
      url: 'phone.php',
      data: {
        'userid': userId
      },
      success: function (res) {
        that.setData({
          contactList: res.data
        })
      }
    })
  },

  bindCall: function (e) {
    var phone = e.currentTarget.dataset.tel
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})