// pages/movieDetail/movieDetail.js
import cfg from '../../common/config/index.js'
// 引入JS文件
Page({
  data: {
    movie:{},
    time:''
  },
  /*
   * options可获取上一页面传递过来的数据
   */
  onLoad: function (options) {
    const id = options.id
    
   wx.showLoading({
     title: '',
   })
   wx.request({
     url: `${cfg.domain}/detail/${id}`,
     success:(res)=>{
        const movie = res.data.data
        this.setData({movie:movie})
        wx.hideLoading()
        
     }
   })
  }
})