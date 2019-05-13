//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    let that = this;
    var appid =that.globalData.appid;
    var secret =that.globalData.secret;
    wx.login({
      
      success: function (res) {
        if (res.code) {
          // 发起网络请求
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&grant_type=authorization_code&js_code=' + res.code,
            header: {
              'content-type': 'application/json'
            },
            method: 'GET',
            data: {
              // grant_type: authorization_code
            },
            success: function (now) {
              that.globalData.openid=now.data.openid;
              console.log(that.globalData.openid);
            }
          })
        }
      }
    })
  },
  globalData:{
    userInfo:null,
    goods:null,
    appid: 'wxb234425ad5818014',
    secret: 'f30d6164517fbe6f20feb3cd29aad4bd',
    openid:null
  }
})