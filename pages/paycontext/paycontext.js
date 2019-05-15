Page({
  data: {
    infoMess:'',
    userName: '',
    userN: '',
    phone:'',
    phoneN:'',
    buyercarinfo:'',
    carcarry:'',
    items:[],
  },
  //用户名和密码输入框事件
  userNameInput: function (e) {
    this.setData({
      userN: e.detail.value
    })
  },
  phoneInput: function (e) {
    this.setData({
      phoneN: e.detail.value
    })
  },
  //登录按钮点击事件，调用参数要用：this.data.参数；
  //设置参数值，要使用this.setData({}）方法
  buyBtnClick: function () {
    if (this.data.userN.length == 0 || this.data.phoneN.length == 0) {
      this.setData({
        infoMess: '温馨提示：姓名和手机不能为空！',
      })
      console.log(this.data.infoMess);
      wx.showModal({
        title: '温馨提示：姓名和手机不能为空！',
        content: '中银食堂欢迎你！',
        showCancel: false,
        confirmColor: '#007aff',
      })
    } else {
      this.setData({
        infoMess: '',
        userName:this.data.userN,
        phone:this.data.phoneN
      })
      const instance = getApp();
      var name = this.data.userName;
      var phone = this.data.phone;
      console.log(phone);
      var openid = instance.globalData.openid;
      var items =[];
      for(var i = 0;i<this.data.carcarry.length;i++){
        var id = this.data.carcarry[i].id;
        var productQuantity = this.data.carcarry[i].num ;
        var obj = { productId: id, 
          productQuantity: productQuantity }
          items.push(obj);
      }
      console.log(items);
      var info ={
       
      }
      wx.request({
        url: 'http://localhost:8080/sell/buyer/order/create',
        method:'POST',
        header: {
          'content-type': 'application/json'
        },
        data:{
          name: name,
          phone: phone,
          address: '不需要',
          openid: openid,
          items: items,
        },
        success: function(res){
          console.log(res);
          const oneinstance = getApp();
          oneinstance.globalData.orderId=res.data.data.orderId;
          console.log(oneinstance.globalData.orderId);
        var resultType = "success";
          wx.redirectTo({
            url: '../goods/pay/pay?resultType=' + resultType,
          })
        }
      })
    }
  },
  //返回按钮点击事件
  returnBtnClick: function (e) {
    wx.navigateBack({
     url: '../goods/goods',
   })
  },
  onLoad: function () {
    const instance = getApp();
    this.setData({
      carcarry: instance.globalData.carinfo,
    })
  }
})