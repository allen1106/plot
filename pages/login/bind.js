// pages/login/bind.js
var api = require("../../utils/api.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    communityList: [],
    choosed: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var info = {
      'code': options.c,
      'avatarUrl': options.a,
      'gender': options.g,
      'nickName': options.n,
    }
    that.setData({
      userInfo: info
    })
    api.phpRequest({
      url: 'village.php',
      success: function (res) {
        console.log(res)
        that.setData({
          communityList: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  bindCommunityPicker: function (e) {
    this.setData({
      choosed: e.detail.value
    })
  },

  register: function (e) {
    var that = this
    var value = e.detail.value
    var tipMsg = ""
    if (!value.realname) { tipMsg="姓名不能为空" }
    if (!value.tel) { tipMsg="电话不能为空" }
    if (that.data.choosed == -1) { tipMsg="请选择您的小区" }
    if (tipMsg) {
      wx.showToast({
        title: tipMsg,
        icon: 'none',
      })
      return
    }
    var data = {
      'realname': value.realname,
      'tel': value.tel,
      'village_id': that.data.communityList[that.data.choosed].id,
      'avatar_url': that.data.userInfo.avatarUrl,
      'gender': that.data.userInfo.gender,
      'nickname': that.data.userInfo.nickName,
      'code': that.data.userInfo.code
    }
    console.log("提交数据")
    console.log(data)
    api.phpRequest({
      url: 'bind.php',
      method: 'Post',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      data: data,
      success: function(res){
        var status = Number(res.data.status)
        console.log(res);
        switch (status) {
          case 1:
            wx.setStorageSync('userId', res.data.userid)
            wx.setStorageSync('userBind', 1)
            wx.showToast({
              title: '注册成功',
              icon: 'success',
            })
            wx.navigateBack({
              delta: 2
            })
            break
          case 2:
            wx.showToast({
              title: '此业主不存在',
              icon: 'none',
            })
            break
          case 3:
            wx.showToast({
              title: '此业主已绑定其他微信',
              icon: 'none',
            })
            break
          default:
            wx.showToast({
              title: '绑定失败',
              icon: 'none',
            })
        }
      },
      fail: function(){
        wx.showToast({
          title: '网络异常',
          icon: 'none',
        })
        this.onLoad();
      }
    })
  }
})