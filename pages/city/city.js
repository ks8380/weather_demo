// pages/city/city.js
const app = getApp()
const api = require('../../utils/api.js')
const city = require('../../utils/city.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityList: [],  // 默认城市列表
    showCity: true,
    suggestion: [],
    city: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      cityList: city.city
    })
  },
  // 页面定位
  goWeather() {
    wx.navigateTo({
      url: '../weather/weather'
    })
  },

  //选择城市
  chooseCity(event) {
    let data = event.currentTarget.dataset.loc
    let city = {
      longitude: data.location.lng,
      latitude: data.location.lat,
      name: data.fullname ? data.fullname : data.title
    }
    city = JSON.stringify(city)
    wx.navigateTo({
      url: '../weather/weather?city=' + city
    });
  },

  getSuggestion(e) {
    if (!e.detail.value) {
      wx.showToast({
        title: '请输入查询地址',
        icon: 'none',
        duration: 2000
      })
      return
    }
    api.getSuggestion(e.detail.value)
      .then(res => {
        this.setData({
          city: res.data[0] ? res.data[0].city : '无匹配地址',
          suggestion: res.data,
          showCity: false
        })
      })
  },

  // 根据城市名获取纬度
  getcity() {
    api.geocoder(this.data.city)
      .then(res => {
        let city = {
          longitude: res.result.location.lng,
          latitude: res.result.location.lat,
          name: this.data.city
        }
        city = JSON.stringify(city)
        wx.navigateTo({
          url: '../weather/weather?city=' + city
        });
      })
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




})