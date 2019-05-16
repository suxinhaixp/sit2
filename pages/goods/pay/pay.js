Page({
    data:{
        resultType:"",
        resultContent:""
    },
    onLoad:function(options){
      
        var resultType=options.resultType;
        if(resultType=="success"){
            this.setData({
                resultType:"success",
                resultContent:"支付成功",
                url:'../../order/list/list?status=tosend'
            });
        }
    },
    detail:function(){
      const app = getApp();
      var openId = app.globalData.openid;
      var orderId = app.globalData.orderId;
      var title = '您的订单是：' + orderId;
           wx.showModal({
             title: title,
             content: '订单',
           })
    
    }
});