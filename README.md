# weather
##### 天气预报小程序

- 天气数据来自于和风天气提供的免费接口的常规天气数据（https://dev.heweather.com/docs/api/weather）  

- 城市搜索使用的是腾讯位置服务提供的[微信小程序JavaScript SDK](https://lbs.qq.com/qqmap_wx_jssdk/index.html)


#  项目结构
``` bash

|- pages/  --------------------- 项目源代码
    |- city  ---------------  城市搜索页面
    |- images ------------ -- 本地图片文件
    |- weather  ------------- 天气预报主页
|- utils/  --------------------- 项目源代码
    |- api  ---------------  接口封装
    |- city ---------------  常见城市信息列表
    |- qqmap-wx-jssdk  ------------- 腾讯位置服务插件
    |- img-cofig  ------------------ 天气状态以及生活指数
    |- util  ------------- 时间状态封装
|- app.js  --------------------- 小程序逻辑
|- app.json  ------------------- 小程序公共配置
|- app.wxss  ------------------- 小程序公共样式表
|- README.md  ------------------ 帮助说明文档

```


# 实现功能

 - 定位与搜索均可获得天气信息
 - 包括实时天气信息，未来24小时（逐3小时），未来3天天气 （备注：如使用自己的申请账号的key的话，需要升级为开发者，普通用户不提供  未来24小时（逐3小时）数据 ）

# 使用说明  
  - 需要在微信开发小程序后台设置几个后台服务域名，否则运行会报错, 比如以下几个请求地址都加上：  
   - https://apis.map.qq.com  腾讯地图API  
   - https://free-api.heweather.net  ， 和风天气API
  - 备注：如果设置域名后无法调用接口，请点击开发者工具右上角 详情 - 项目设置 -  域名信息 处的刷新按钮



# 扫码体验原作者的作品  
![mina-qrcode](/images/mini-weather.jpg) 


