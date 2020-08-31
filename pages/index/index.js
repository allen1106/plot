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
      {"name": "天使之眼", "img": "/imgs/index/1.jpg", "nav": "/pages/contacts/contacts"},
      {"name": "小区公告", "img": "/imgs/index/2.jpg", "nav": "/pages/contacts/contacts"},
      {"name": "便民电话", "img": "/imgs/index/3.jpg", "nav": "/pages/contacts/contacts"},
      {"name": "生活缴费", "img": "/imgs/index/4.jpg", "nav": "/pages/contacts/contacts"},
      {"name": "维修报事", "img": "/imgs/index/5.jpg", "nav": "/pages/contacts/contacts"},
      {"name": "业主论坛", "img": "/imgs/index/6.jpg", "nav": "/pages/contacts/contacts"},
      {"name": "社区商城", "img": "/imgs/index/7.jpg", "nav": "/pages/contacts/contacts"},
      {"name": "联系物业", "img": "/imgs/index/8.jpg", "nav": "/pages/contacts/contacts"},
    ],
    announceList: [
      {
        "title": "一键查询小区周边疫情，和院上的超方便功能！",
        "img": "/imgs/index/1.jpg",
        "hits": 42009,
        "date": "2020-08-20"
      },
    ],
    searchHandler: null,
    latestItemList: [],
    bindTapHandler: utils.navToItemDetail
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})