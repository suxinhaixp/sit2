// pages/result/result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      orderId:null,
      detail:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that =this;
      var orderId =options.orderId;
      const app =getApp();
      var openid=app.globalData.openid;
      console.log(orderId);
      wx.request({
        url: 'https://suxinhaixp.xyz/sell/buyer/order/detail',
        method:'GET',
        data:{
          openid:openid,
          orderId:orderId,
        },
        success:function(e){
          console.log(e);
          that.setData({
            detail:e.data.data
                })
          console.log(that.data.detail);
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})