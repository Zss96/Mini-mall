// pages/home/home.js
import { getMultiData, getGoodsData} from '../../service/home.js'

const types = ['pop','new','sell']
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    recommends: [],
    titles: ['流行', '新款', '精选'],
    goods: {
      'pop': {page: 0, list:[]},
      'new': { page: 0, list: [] },
      'sell': { page: 0, list: [] }
    },
    currentType: 'pop',
    showBackTop:false,
    isTabFixed: false,
    tabScrollTop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //1.发送网络请求轮播图和推荐数据
    this._getMultidata()

    //2.请求商品数据
    this._getGoodsdata('pop')
    this._getGoodsdata('new')
    this._getGoodsdata('sell')
  },
  //onShow:页面显示出来的回调函数
  //页面显示是否意味着所用的图片都是加载完成
  // onShow(){
  //   wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect => {
  //     console.log(rect)
  //   }).exec()
  // },
  //网络请求函数
  _getMultidata(){
    getMultiData().then(res => {
      console.log(res)
      //取出轮播图数据
      const banners = res.data.data.banner.list.map(item => {
        return item.image
      });
      const recommends = res.data.data.recommend.list;

      //将数据存在data中
      this.setData({
        banners: banners,
        recommends: recommends
      })
    }).catch(err => {
    })
  },
  _getGoodsdata(type){
    //1.获取页码
    const page = this.data.goods[type].page+1;
    getGoodsData(type,page).then(res => {
      // console.log(res)
      //2.1取出数据
      const list = res.data.data.list
      //2.2将数据设置到对应type的list中
      const oldList =this.data.goods[type].list
      oldList.push(...list)
      //2.3将数据设置到data的数组中
      const typeKey = `goods.${type}.list`
      const pageKey = `goods.${type}.page`
      this.setData({
        [typeKey]:oldList,
        [pageKey]:page
      })
    })
  },
  //事件监听函数
  handleTabClick(event) {
    //取出index
    const index= event.detail.index;
    // console.log(index)
    //设置currentType
    this.setData({
          currentType: types[index]
      }) 
  },
  handleImageLoad() {
    wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect => {
      console.log(rect)
      this.data.tabScrollTop = rect.top
      
    }).exec()
  },
  onReachBottom(){
      //上拉加载更多，请求新的数据
      this._getGoodsdata(this.data.currentType)
  },
  onPageScroll(options){
      const scrollTop = options.scrollTop;
    const tabscroll = this.data.tabScrollTop;
        this.setData({
          isTabFixed: scrollTop >= tabscroll,
          showBackTop: scrollTop >= 1000
        })   
  }
   
})
