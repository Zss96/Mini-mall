// pages/home/childCpns/w-recommend/w-recommend.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    recommends: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isLoad:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleImageLoad() {
     if(!this.data.isLoad){
      //  console.log('图片加载完成')
       this.triggerEvent('imageload')
       //这样改数据页面不刷新
       this.data.isLoad = true 
     }
    }
  }
})
