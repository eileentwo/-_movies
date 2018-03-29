// pages/history/history.js
import cfg from "../../common/config/index.js"
Page({
  data: {
    movies:[],
    page:1,
    size:6,
    loading:true
  },
  onShow (options) {
    this.setData({
      page:1,
      movies:[]
    })
    this.loadMovies()
  },
  loadMovies() {
    let { page, size } = this.data
    let history = wx.getStorageSync('history');

    let data = []
    if (history) {
      for (let i = (page-1)*size; i <page*size;i++){
        if (history[i]) {
          data.push(history[i])
        }
      }
      this.getHistory(data)
    }
   
  },
  getHistory(data) {
    console.log(data)
    this.setData( {loading:true} )
    const movies = this.data.movies

    for(let i=0; i<data.length;i+=2){
      movies.push([data[i],data[i+1] ? data[i+1]:null])
    }
    
    this.setData({
      movies: movies,
      loading:false
    })
  },
  gotoDetail(e){
    const id = e.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: `../movieDetail/movieDetail?id=`+id,
    })
  },
  scrollHandle(){
    const { page } = this.data
    this.setData({
      page:page+1
    })
    this.loadMovies()
  }


})