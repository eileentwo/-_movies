// pages/share/share.js
Page({
  data: {
    imgSrc: 'https://www.newfq.com/assets/wx/movie-trailer/QRcode.png'
  },
  saveQRCode(){
    const imgSrc = this.data.imgSrc
    wx.downloadFile({
      url:imgSrc,
      success:(res)=>{
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
        })
      }
    })
  }
})