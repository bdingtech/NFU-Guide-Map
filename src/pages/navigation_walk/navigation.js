import { AMapWX } from "../../libs/amap-wx.js";
import { Config } from "../../libs/config.js";

Page({
  data: {
    markers: [],
    distance: "",
    cost: "",
    polyline: [],
    latitude: null,
    longitude: null,
    slatitude: "",
    slongitude: "",
    elatitude: "",
    elongitude: ""
  },
  onLoad: function(option) {
    this.setData({
      elatitude: option.latitude,
      elongitude: option.longitude
    });
    let that = this;
    wx.getLocation({
      type: "gcj02",
      success(res) {
        that.setData({
          slatitude: res.latitude,
          slongitude: res.longitude,
          latitude: res.latitude,
          longitude: res.longitude,
          markers: [
            {
              iconPath: "../../assets/images/markers/mapicon_navi_s.png",
              latitude: res.latitude,
              longitude: res.longitude,
              width: "23",
              height: "33"
            },
            {
              iconPath: "../../assets/images/markers/mapicon_navi_e.png",
              latitude: that.data.elatitude,
              longitude: that.data.elongitude,
              width: "24",
              height: "34"
            }
          ]
        });
        that.getWalkingRoute(
          that.data.slatitude,
          that.data.slongitude,
          that.data.elatitude,
          that.data.elongitude
        );
      }
    });
  },
  getWalkingRoute: function(slatitude, slongitude, elatitude, elongitude) {
    const key = Config.key;
    const myAmapFun = new AMapWX({ key: key });
    let _this = this;
    myAmapFun.getWalkingRoute({
      origin: `${slongitude},${slatitude}`,
      destination: `${elongitude},${elatitude}`,
      success: function(data) {
        const points = [];
        if (data.paths && data.paths[0] && data.paths[0].steps) {
          const steps = data.paths[0].steps;
          for (let i = 0; i < steps.length; i++) {
            const poLen = steps[i].polyline.split(";");
            for (let j = 0; j < poLen.length; j++) {
              points.push({
                longitude: parseFloat(poLen[j].split(",")[0]),
                latitude: parseFloat(poLen[j].split(",")[1])
              });
            }
          }
        }
        _this.setData({
          polyline: [
            {
              points: points,
              color: "#0091ff",
              width: 6
            }
          ]
        });
        if (data.paths[0] && data.paths[0].distance) {
          _this.setData({
            distance: data.paths[0].distance + "米"
          });
        }
        if (data.paths[0] && data.paths[0].duration) {
          _this.setData({
            cost: parseInt(data.paths[0].duration / 60) + "分钟"
          });
        }
      },
      fail: function(info) {}
    });
  },
  goDetail: function() {
    wx.navigateTo({
      url: "../navigation_walk_detail/navigation"
    });
  },
  goToCar: function(e) {
    wx.redirectTo({
      url: "../navigation_car/navigation"
    });
  },
  goToBus: function(e) {
    wx.redirectTo({
      url: "../navigation_bus/navigation"
    });
  },
  goToRide: function(e) {
    wx.redirectTo({
      url: "../navigation_ride/navigation"
    });
  },
  goToWalk: function(e) {
    wx.redirectTo({
      url: "../navigation_walk/navigation"
    });
  }
});
