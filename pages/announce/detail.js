// pages/announce/detail.js
var api = require("../../utils/api.js")
var WxParse = require('../../wxParse/wxParse.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    info: null,
    article: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var userId = wx.getStorageSync('userId')
    var villageId = wx.getStorageSync('villageId')
    var id = options.id
    api.phpRequest({
      url: 'newslist.php',
      data: {
        'userid': userId,
        'village_id': villageId,
        'id': id || that.data.id
      },
      success: function (res) {
        that.setData({
          info: res.data
        }, () => {
          that.data.info.content = that.data.info.content.replace(/src="(.*?)"/g, 'src="' + api.IMG_HOST + '$1"')
          WxParse.wxParse('article', 'html', that.data.info.content, that, 5)
        })
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})