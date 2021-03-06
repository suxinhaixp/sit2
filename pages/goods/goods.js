// pages/goods/goods.js
Page({
    data: {
        goods: [{}],
        vegprice: [{}],
        toView: '0',
        scrollTop: 100,
        foodCounts: 0,
        totalPrice: 0,// 总价格
        totalCount: 0, // 总商品数
        carArray: [],
        minPrice: 20,//起送價格
        payDesc: '',
        goodtext: '欢迎您来用餐',//配送費
        fold: true,
        selectFoods: [{ price: 0, count: 0 }],
        cartShow: 'none',
        status: 0,
        allorderdetial:null,
        allorder:[{}],
            },
    selectMenu: function (e) {
        var index = e.currentTarget.dataset.itemIndex;
        this.setData({
            toView: 'order' + index.toString()
        })
        console.log(this.data.toView);
    },
    //移除商品
    decreaseCart: function (e) {
        var index = e.currentTarget.dataset.itemIndex;
        var parentIndex = e.currentTarget.dataset.parentindex;
        this.data.goods[parentIndex].foods[index].Count--
        var num = this.data.goods[parentIndex].foods[index].Count;
        var name = this.data.goods[parentIndex].foods[index].name;
        var id = this.data.goods[parentIndex].foods[index].id;
        var mark = 'a' + index + 'b' + parentIndex
        var price = this.data.goods[parentIndex].foods[index].price;
        var obj = { price: price, num: num, mark: mark, name: name, id: id,index: index, parentIndex: parentIndex };
      var carArray1=this.data.carArray.filter(item => item.mark != mark); 
      if (obj.num > 0) {
        carArray1.push(obj);
      }
        console.log(carArray1);
        this.setData({
            carArray: carArray1,
            goods: this.data.goods
        })
        console.log(this.data.goods)
        this.calTotalPrice()
        this.setData({
            payDesc: this.payDesc(),
        })
        //关闭弹起
        var count1 = 0
        for (let i = 0; i < carArray1.length; i++) {
            if (carArray1[i].num == 0) {
                count1++;
            }
        }
        //console.log(count1)
        if (count1 == carArray1.length) {
            if (num == 0) {
                this.setData({
                    cartShow: 'none'
                })
            }
        }
    },
    decreaseShopCart: function (e) {
        console.log('减除一个');
        this.decreaseCart(e);
    },
    //添加到购物车
    addCart(e) {
        var index = e.currentTarget.dataset.itemIndex;
        var parentIndex = e.currentTarget.dataset.parentindex;
        this.data.goods[parentIndex].foods[index].Count++;
        var mark = 'a' + index + 'b' + parentIndex
        var id = this.data.goods[parentIndex].foods[index].id;
        var price = this.data.goods[parentIndex].foods[index].price;
        var num = this.data.goods[parentIndex].foods[index].Count;
        var name = this.data.goods[parentIndex].foods[index].name;
        var obj = { price: price, num: num, mark: mark, name: name, id: id,index: index, parentIndex: parentIndex };
      var carArray1 = this.data.carArray.filter(item => item.mark != mark)  
          carArray1.push(obj);
        console.log(carArray1);
        this.setData({
            carArray: carArray1,
            goods: this.data.goods
        })
        this.calTotalPrice();
        this.setData({
            payDesc: this.payDesc()
        })
    },
    addShopCart: function (e) {
        this.addCart(e);
    },
    //计算总价
    calTotalPrice: function () {
        var carArray = this.data.carArray;
        var totalPrice = 0;
        var totalCount = 0;
        for (var i = 0; i < carArray.length; i++) {
            totalPrice += carArray[i].price * carArray[i].num;
            totalCount += carArray[i].num
        }
        this.setData({
            totalPrice: totalPrice,
            totalCount: totalCount,
            //payDesc: this.payDesc()
        });
    },
    //绿色按钮
    payDesc() {
        if (this.data.totalPrice === 0) {
            return '请点餐';
        }  else {
            return '去结算';
        }
    },
    //結算
    pay() {
      const appInstance = getApp()
      appInstance.globalData.carinfo=this.data.carArray;
      console.log(appInstance.globalData.carinfo)
      if (appInstance.globalData.carinfo.length != 0){
      wx.navigateTo({
        url:'../paycontext/paycontext',
      })
      }
    },
    //彈起購物車
    toggleList: function () {
        if (!this.data.totalCount) {
            return;
        }
        this.setData({
            fold: !this.data.fold,
        })
        var fold = this.data.fold
        //console.log(this.data.fold);
        this.cartShow(fold)
    },
    cartShow: function (fold) {
        console.log(fold);
        if (fold == false) {
            this.setData({
                cartShow: 'block',
            })
        } else {
            this.setData({
                cartShow: 'none',
            })
        }
        console.log(this.data.cartShow);
    },
    tabChange: function (e) {
        var showtype = e.target.dataset.type;
        this.setData({
            status: showtype,
        });
    },
    onLoad: function (options) {
      const appInstance = getApp()
      console.log(appInstance.globalData)
        // 页面初始化 options为页面跳转所带来的参数
        let that=this
        this.setData({
            payDesc: this.payDesc()
        });
        wx.request({
          url: 'https://suxinhaixp.xyz/sell/buyer/product/list',
          method: 'GET',
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
          
            console.log(res.data)
            that.setData({
              goods: res.data.data,
            });
            appInstance.globalData.goods=res.data.data;
            console.log(appInstance.globalData)
          }
        })

 


    },
    onReady: function () {
        // 页面渲染完成
    },
    onShow: function () {
        // 页面显示
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    }
    ,
    empty:function(){
      const appInstance = getApp()
      this.setData({
        carArray: [],
        goods: appInstance.globalData.goods
      })
      console.log(this.data);
      this.calTotalPrice();
      this.setData({
        payDesc: this.payDesc()
      })
      var count1 = 0;
      if (count1 == this.data.carArray.length) {
        if (this.data.num == 0) {
          that.setData({
            cartShow: 'none'
          })
        }
      }
      console.log(this.data.totalCount);
    },
    allorder:function(){
      const app = getApp();
      let that= this;
      var openid = app.globalData.openid; 
        wx.request({
          url: 'https://suxinhaixp.xyz/sell/buyer/order/list',
          method:'GET',
          data:{
            openid:openid,
          },
          success:function(res){
            var info = res.data.data;
            that.setData({
              allorder: info,
            })
            console.log(that.data.allorder);
          }
        })
    },
    vegpr:function(){
      let that = this;
      wx.request({
        url: 'https://suxinhaixp.xyz/sell/spider',
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {

          that.setData({
            vegprice: res.data.Veg_price
          })
          console.log(that.data.vegprice);
        }
      })
    },
    result:function(e){
      console.log(e.currentTarget.dataset.item);
      var orderId = e.currentTarget.dataset.item;
      wx.navigateTo({
        url: '../result/result?orderId='+orderId,
      })
    },
  getUserInfo: function () {
    var that = this
    wx.getSetting({
      success(res) {
        console.log(res);
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              
            }
          })
        }
        else {
          
        }
      }
    })
  },

})
