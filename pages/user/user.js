// pages/user/user.js
Page({
  data: {
    avatarUrl:'',
    nickName:'未知',
    movies:[]
  },
  onLoad: function (options) {
    wx.getUserInfo({
      success:(res)=>{
        this.setData({
          nickName: res.userInfo.nickName,
          avatarUrl: res.userInfo.avatarUrl
        })
      }
    })
    
  },

  onShow() {
    let history = wx.getStorageSync('history')
    // console.log(history)
    if (history) {
      this.setData({
        movies: history.slice(0, 2)
      })
    }
  },
  gotoShare(){
    wx.navigateTo({
      url: '../share/share',
    })
  },
  gotoHistory(){
    wx.navigateTo({
      url: '../history/history',
    })
  }
})