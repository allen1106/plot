// pages/announce/announce.js
var api = require("../../utils/api.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    catId: 11,
    announceList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var userId = wx.getStorageSync('userId')
    var villageId = wx.getStorageSync('villageId')
    var catId = options.catid
    wx.setNavigationBarTitle({
      title: catId == 12 ? "防控疫情专区" : "小区公告",
    })
    api.phpRequest({
      url: 'news.php',
      data: {
        'userid': userId,
        'village_id': villageId,
        'cat_id': catId || that.data.catId
      },
      success: function (res) {
        that.setData({
          announceList: res.data
        })
      }
    })
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

  bindNavToDetail: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/announce/detail?id=' + id,
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})