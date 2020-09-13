// pages/monitor/monitor.js
var api = require("../../utils/api.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    videoList: [
      // {'name': '1号监控', 'src': 'http://hls01open.ys7.com/openlive/f01018a141094b7fa138b9d0b856507b.hd.m3u8'},
      // {'name': '2号监控', 'src': 'https://v-cdn.zjol.com.cn/276982.mp4'},
      // {'name': '3号监控', 'src': 'ezopen://open.ys7.com/20375192/1.hd.live'},
      // {'name': '4号监控', 'src': 'http://hls01open.ys7.com/openlive/f01018a141094b7fa138b9d0b856507b.hd.m3u8'},
      // {'name': '5号监控', 'src': 'http://hls01open.ys7.com/openlive/f01018a141094b7fa138b9d0b856507b.hd.m3u8'},
      // {'name': '6号监控', 'src': 'http://hls01open.ys7.com/openlive/f01018a141094b7fa138b9d0b856507b.hd.m3u8'}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var userId = wx.getStorageSync('userId')
    var villageId = wx.getStorageSync('villageId')
    api.phpRequest({
      url: 'video.php',
      data: {
        'userid': userId,
        'village_id': villageId
      },
      success: function (res) {
        that.setData({
          videoList: res.data
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

  swichNav: function (e) {
    var current = e.currentTarget.dataset.current
    this.setData({
      currentTab: current
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})