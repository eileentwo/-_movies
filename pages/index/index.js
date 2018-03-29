import cfg from '../../common/config/index.js'
/*
import 参数 from 路径 在JS中的做法
*/
Page({
  data: {
    movies: [],
    page: 1,
    size: 6,
    loading: true
  },

  onLoad(options) {
    this.loadMovies()
  },

  saveData(data) {
    // 获取本地缓存的数据
    let history = wx.getStorageSync('history') || []
    //返回history里没有的数据
    history = history.filter((item) => {
      return item._id !== data._id
    })
    //将接收的数据加入到history里来
    history.unshift(data) 
    //存储现有的历史记录
    wx.setStorageSync('history', history)
  },

  loadMovies() {
    const { size, page } = this.data
    this.setData({
      loading: true
    })
    wx.request({
      url: `${cfg.domain}/list?page=${page}&size=${size}`,
      /* ${cfg.domain}指引入的链接  */
      success: (res) => {
        // console.log(res)
        const { data } = res.data
        const movies = this.data.movies || []
        for (let i = 0; i < data.length; i += 2) {
          movies.push([data[i], data[i + 1] ? data[i + 1] : null])
        }
        this.setData({
          movies,
          loading: false
        })
      }
    })
  },

  scrollHandle() {
    const { page } = this.data

    this.setData({
      page: page + 1
    })
    this.loadMovies()
  },

  gotoDetail(e) {
    const { movieData } = e.currentTarget.dataset
    const { _id } = movieData

    this.saveData(movieData)
    
    wx.navigateTo({
      url: '../movieDetail/movieDetail?id=' + _id
    })
  }
})