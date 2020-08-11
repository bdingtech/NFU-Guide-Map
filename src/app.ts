//app.ts
export interface IMyApp {
  globalData: {
    userInfo?: wx.UserInfo;
    markers: any[];
    config: any;
    cloudRoot: string;
  };
}

import config from "./config/index";

App<IMyApp>({
  onLaunch() {
    wx.setBackgroundFetchToken({
      token: "xxx"
    });
    wx.getBackgroundFetchData({
      fetchType: "pre",
      success(res) {
        // console.log(res.fetchedData); // 缓存数据
        // console.log(res.timeStamp); // 客户端拿到缓存数据的时间戳
        // console.log(res.path); // 页面路径
        // console.log(res.query); // query 参数
        // console.log(res.scene); // 场景值
      }
    });
    if (config.debug) {
      wx.setEnableDebug({
        enableDebug: true
      });
    } else {
      wx.cloud.init({
        env: config.cloud.id,
        traceUser: true
      });
      this.globalData.cloudRoot = config.cloud.cloudRoot;
    }
    this.globalData.config = config;

    // 展示本地存储能力
    // var logs: number[] = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
  },
  globalData: {
    config,
    markers: [],
    cloudRoot: ""
  }
});
