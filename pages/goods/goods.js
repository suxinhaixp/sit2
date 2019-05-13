// pages/goods/goods.js
Page({
    data: {
        goods: [
     {

     }
        ],
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
        var mark = 'a' + index + 'b' + parentIndex
        var price = this.data.goods[parentIndex].foods[index].price;
        var obj = { price: price, num: num, mark: mark, name: name, index: index, parentIndex: parentIndex };
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
        var price = this.data.goods[parentIndex].foods[index].price;
        var num = this.data.goods[parentIndex].foods[index].Count;
        var name = this.data.goods[parentIndex].foods[index].name;
        var obj = { price: price, num: num, mark: mark, name: name, index: index, parentIndex: parentIndex };
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
        if (this.data.totalPrice < this.data.minPrice) {
            return;
        }
        // window.alert('支付' + this.totalPrice + '元');
        //确认支付逻辑
        var resultType = "success";
        wx.redirectTo({
            url: '../goods/pay/pay?resultType=' + resultType
        })
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
          url: 'http://127.0.0.1:8080/sell/buyer/product/list',
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
    }
})
