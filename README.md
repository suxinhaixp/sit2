## 微信小程序自定义 tabbar
由于之前[博客](http://evenyao.com/2018/11/22/103-%E5%80%BC%E5%BE%97%E8%AE%B0%E5%BD%95%E7%9A%84%20(%E4%BA%94)/)讲得比较杂乱，后来重新整理了一下代码结构，新建了一个 `Demo` 小程序。

### 其他
如果您希望制作可以左右滑动的带 `swiper` 效果的 `tabbar`，可以查看另外一个 [`Demo`](https://github.com/evenyao/wx-swiper-tabbar)

### 文件构成
具体结构如图:

![](https://img-1257191344.cos.ap-chengdu.myqcloud.com/tabbar-diy.jpg)

### 加载显示

如果希望每次点击 `icon` 都刷新页面，将 `index.wxml` 的 `hidden` 变为 `wx:if`，逻辑和 `hidden` 相反即可。具体差异见下方。

#### 加载一次
```html
<view hidden="{{currentTab == 0? false: true}}">
  <component_index/>
</view>
<view hidden="{{currentTab == 1? false: true}}">
  <component_car/>
</view>
<view hidden="{{currentTab == 2? false: true}}">
  <component_my/>
</view>
```

#### 每次点击加载
```html
<view wx:if="{{currentTab == 0}}">
  <component_index/>
</view>
<view wx:if="{{currentTab == 1}}">
  <component_car/>
</view>
<view wx:if="{{currentTab == 2}}">
  <component_my/>
</view>
```


### 实现效果

![image](https://img-1257191344.cos.ap-chengdu.myqcloud.com/demo-see.gif)

如果这个 `Demo` 能够帮助到您。请不要吝惜您的 `Star` 😊。

