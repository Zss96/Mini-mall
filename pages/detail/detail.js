// pages/detail/detail.js
import { getDetailData, GoodsBaseInfo, ShopInfo, getRecommends } from '../../service/detail.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iid: '',
    topImg: [],
    baseInfo: {},
    shopInfo: {},
    detailInfo: {},
    itemParams: {},
    commentInfo: {},
    recommends: {},
    showBackTop: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      iid: options.iid
    })
    // console.log(options.iid)
    getDetailData(options.iid).then( res=>{
      console.log(res)
      const data = res.data.result
      console.log(data)
      const topImage = data.itemInfo.topImages
      const baseInfo = new GoodsBaseInfo(data.itemInfo, data.columns, data.shopInfo.services)
      const shopInfo = new ShopInfo(data.shopInfo)
      const detailInfo =data.detailInfo 
      const itemParams = data.itemParams
      let commentInfo = {}
      if (data.rate && data.rate.cRate > 0) {
        commentInfo = data.rate.list[0]
      }
      console.log(itemParams)
      this.setData({
        topImg: topImage,
        baseInfo:baseInfo,
        shopInfo: shopInfo,
        detailInfo: detailInfo,
        itemParams: itemParams,
        commentInfo: commentInfo
      })
    })

    getRecommends().then(res => {
      // console.log(res)
      this.setData({
        recommends: res.data.data.list
      })
    })
  },

  onPageScroll(options) {
    const scrollTop = options.scrollTop;
    this.setData({
      showBackTop: scrollTop >= 1000
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

  },
  onAddCart() {
    // console.log('加入购物车')
    //1.获取商品对象
    const obj = {}
    obj.iid = this.data.iid;
    obj.imageURL = this.data.topImg[0];
    obj.title = this.data.baseInfo.title;
    obj.desc = this.data.baseInfo.desc;
    obj.price = this.data.baseInfo.realPrice;

    // 2.加入到购物车列表
    app.addToCart(obj)

    // 3.加入成功提示
    wx.showToast({
      title: '加入购物车成功',
    })
  }
})