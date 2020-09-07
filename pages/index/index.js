// pages/index/index.js
var api = require("../../utils/api.js")
var utils = require("../../utils/util.js")
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    host: api.HTTP_HOST,
    background: ['/imgs/index/banner1.png', '/imgs/index/banner2.png'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    typeList: [
      {"name": "天使之眼", "img": "/imgs/index/1.jpg", "nav": "/pages/monitor/monitor", "bind": "bindNav"},
      {"name": "小区公告", "img": "/imgs/index/2.jpg", "nav": "/pages/announce/announce", "bind": "bindNav"},
      {"name": "便民电话", "img": "/imgs/index/3.jpg", "nav": "/pages/contacts/contacts", "bind": "bindNav"},
      // {"name": "生活缴费", "img": "/imgs/index/4.jpg", "nav": "/pages/contacts/contacts"},
      // {"name": "维修报事", "img": "/imgs/index/5.jpg", "nav": "/pages/contacts/contacts"},
      // {"name": "业主论坛", "img": "/imgs/index/6.jpg", "nav": "/pages/contacts/contacts"},
      // {"name": "社区商城", "img": "/imgs/index/7.jpg", "nav": "/pages/contacts/contacts"},
      {"name": "联系物业", "img": "/imgs/index/8.jpg", "nav": "/pages/contacts/contacts", "bind": "bindContact"},
    ],
    announceList: [],
    villageTel: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  onShow: function () {
    var that = this
    var userId = wx.getStorageSync('userId')
    var villageId = wx.getStorageSync('villageId')
    // 获取小区名称，显示在title上
    if (userId) {
      api.phpRequest({
        url: 'info.php',
        data: {
          'userid': userId
        },
        success: function (res) {
          wx.setNavigationBarTitle({
            title: res.data.village,
          })
        }
      })
    }
    if (userId && villageId) {
      // 获取轮播图列表
      api.phpRequest({
        url: 'adver.php',
        data: {
          'userid': userId,
          'village_id': villageId
        },
        success: function (res) {
          var bgs = []
          for (var i in res.data) { bgs.push(res.data[i].url) }
          that.setData({
            background: bgs
          })
        }
      })
      // 获取公告列表
      api.phpRequest({
        url: 'index_news.php',
        data: {
          'userid': userId,
          'village_id': villageId
        },
        success: function (res) {
          that.setData({
            announceList: res.data
          })
        }
      })
      // 获取物业电话
      api.phpRequest({
        url: 'village_tel.php',
        data: {
          'userid': userId,
          'village_id': villageId
        },
        success: function (res) {
          that.setData({
            villageTel: res.data.tel
          })
        }
      })
    }
  },

  bindNav: function (e) {
    var that = this
    var userId = wx.getStorageSync('userId')
    if (userId) {
      var navLink = e.currentTarget.dataset.nav
      wx.navigateTo({
        url: navLink
      })
    } else {
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }
  },

  bindContact: function (e) {
    var that = this
    wx.showModal({
      title: '联系物业',  
      showCancel: true,
      confirmText: '确认',
      success: function (res) {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: that.data.villageTel
          })
        }
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})