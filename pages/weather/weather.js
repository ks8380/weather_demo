//获取应用实例
const app = getApp();
// 当前时间 对应的时间段  
const util = require('../../utils/util.js');
const api = require('../../utils/api.js')
const imgCofig = require('../../utils/img-cofig.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    backgroundImg: 'sunny',
    userInfo: {},
    time: util.greet(new Date()),
    address: '定位中...',
    weatherNow: {
      tmp: '',        //温度
      cond_txt: '',   //实况天气
      cond_code: 999, //实况天气
      wind_dir: '',   //风向
      wind_sc: '',    //风力
      hum: '',        //湿度
      pres: '',       //大气压强
      pcpn: '',       //降水量
      loc: ''         //更新时间
    },
    hourlyWeather: [[], []],  // 全天24H数据
    dailyWeather: [],         // 3天数据 
    lifestyle: [],            // 生活指数

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取用户
    wx.getUserInfo({
      success: res => {
        console.log(res,"res")
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: app.globalData.userInfo
        })
      }
    })
    console.log(options.city, "66")

    //手动选择其他城市
    if (options.city) {
      let city = JSON.parse(options.city)
      this.setData({
        address: city.name
      })
      this.getWeather(city)
      return
    }

    // 获取定位
    this.getLocation();

  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 定位
  getLocation() {
    let that = this
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        // 获取地理位置
        api.getLocation(res)
        .then(res => {
          that.setData({
            address: res.address
          })
        })
        .catch(err => {
          that.setData({
            address: '定位失败，请手动选择'
          })
        })
        that.getWeather(res)
      }
    })
  },

  // 天气 
  getWeather(data){
    let that = this;
      // 获取实时天气
    api.getWeatherNow(data)
      .then(res => {
        that.setWeatherNow(res.data.HeWeather6[0])
        that.setBackgroundImg(that.data.weatherNow.cond_code)
      }),

    // 获取未来24小时
    api.getWeatherHourly(data)
      .then(res => {
        that.setWeatherHourly(res.data.HeWeather6[0].hourly)
      }),

    // 获取近3天
    api.getWeatherDaily(data)
      .then(res => {
        that.setWeatherDaily(res.data.HeWeather6[0].daily_forecast)
      })
    
    // 生活指数
    api.getWeatherLifestyle(data)
      .then(res => {
        that.setLifestyle(res.data.HeWeather6[0].lifestyle)
      })
  },
  // 实时信息  
  setWeatherNow(data) {
    this.setData({
      weatherNow: {
        tmp: data.now.tmp,
        cond_txt: data.now.cond_txt,
        cond_code: data.now.cond_code,
        wind_dir: data.now.wind_dir,
        wind_sc: data.now.wind_sc,
        hum: data.now.hum,
        pres: data.now.pres,
        pcpn: data.now.pcpn,
        loc: data.update.loc.substring(11, 16)
      }
    })
  },
  // 全天24小时天气情况 
  setWeatherHourly(data) {
    // 时间截取
    data.map(item => {
      item.time = item.time.substring(11, 16)
    })
    // 设置hourlyWeather 数组数据 
    this.setData({
      hourlyWeather: [data.slice(0, 4), data.slice(4)]
    })
  },
  setWeatherDaily(data){
    // 获取后三天的数据  数据拉取的是近7天的数据（包含今天）
    data = data.slice(1, 4);
    data.map(item => {
      item.date = item.date.split('-').slice(1).join('/')
    })
    this.setData({
      dailyWeather: data
    })
  },

  //生活指数
  setLifestyle(data) {
    data.forEach(item => {
      item.typeTxt = imgCofig.lifestyleImgList[item.type].txt
    })
    this.setData({
      lifestyle: data
    })
  },

  // 设置背景底图  根据cond_code  进行判断是何种天气
  setBackgroundImg(code) {
    let list = imgCofig.bgImgList
    let obj = {}
    obj = list.find(item => {
      return item.codes.includes(parseInt(code))
    })
    this.setData({
      backgroundImg: obj.name
    })
  },


})