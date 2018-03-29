// pages/subject/subject.js
Page({
  data: {
    types:[{
      name:"犯罪",
      img:"/images/Crime.jpg"
    }, {
      name: "动作",
      img: "/images/active.jpg"
      }, {
        name: "动画",
        img: "/images/cartoon.jpg"
    }, {
      name: "喜剧",
      img: "/images/comedy.jpg"
      }, {
        name: "科幻",
        img: "/images/science.jpg"
    }, {
        name: "悬疑",
      img: "/images/crux.jpg"
    }]
  },
  typeHandler(e){
    const type = e.currentTarget.dataset.type
    wx.navigateTo({
      url: '../subjectList/subjectList?type=' +type,
    })
  }
})