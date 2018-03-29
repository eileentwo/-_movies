// pages/subjectList/subjectList.js
import cfg from '../../common/config/index.js'
// 引入JS文件
Page({
  data: {
    movies:[],
    page:1,
    size:6,
    loading:true,
    type:''
  },
  onLoad: function (options) {
    const {type}=options

    this.setData({
      type:type
    })
    this.loadMovies()   //加载电影数据
  },
  loadMovies() {
    const size = this.data.size
    const type = this.data.type
    const page = this.data.page
    this.setData({ loading: true })
   
    wx.request({
      url: `${cfg.domain}/list?type=${type}&page=${page}&size=${size}`,
      success: (res) => {
        const {data} = res.data
        const movies = this.data.movies
        for (let i = 0; i < data.length; i +=2) {
          movies.push([data[i], data[i + 1] ? data[i + 1] : null])
        }
        this.setData({
          movies:movies,
          loading: false
        })
        wx.hideLoading()
      }
    })
  },
  scrollHandle() {
    const page = this.data
    this.setData({
      page: page + 1
    })
    this.loadMovies()
  },
  saveData(data){
    // console.log(data)
    let history = wx.getStorageSync('history') || []
    
    history = history.filter((item) => {
      return item._id !== data._id
    })
    history.unshift(data)

    wx.setStorageSync('history', history)
  },
  gotoDetail(e) {
    const { movieData } = e.currentTarget.dataset
    const { _id } = movieData
    this.saveData(movieData)
    // 利用id跳转传递数据
    wx.navigateTo({
      url: '../movieDetail/movieDetail?id=' + _id,
    })
  }
})