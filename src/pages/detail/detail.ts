//detail.js
//获取应用实例
import { IMyApp } from "../../app";

const app = getApp<IMyApp>();

Page({
  data: {
    cloudRoot:
      app.globalData.config.cloud[app.globalData.config.debug ? "dev" : "prod"]
        .cloudRoot,
    marker: {} as any,
    imgUrls: [
      "cloud://enanyuan-6db383.656e-enanyuan-6db383-1257936504/images/南苑/0.jpg"
    ],
    logoUrl: "",
    enablePanorama: app.globalData.config.panorama.active
  },
  previewImage(e: any) {
    wx.previewImage({
      current: this.data.imgUrls[e.target.dataset.id],
      urls: this.data.imgUrls
    });
  },
  navigateTo(e: any) {
    switch (e.target.id) {
      case "address":
      case "navigate":
        wx.openLocation({
          latitude: Number(this.data.marker.latitude),
          longitude: Number(this.data.marker.longitude),
          name: this.data.marker.name
          // scale: 15
        });
        break;
      case "phone":
        wx.makePhoneCall({
          phoneNumber: this.data.marker.contact.phone
        });
        break;
      case "panorama":
        wx.navigateTo({
          url: `/pages/web-view/web-view?id=${this.data.marker.panorama}`
        });
        break;
      default:
        break;
    }
  },
  onLoad(options: any) {
    console.log(options);
    let marker: any;
    let imgUrls: any = [];
    switch (options.id) {
      case "school":
        marker =
          app.globalData.markers[app.globalData.markers.length - 1].data[0];
        break;
      default:
        if (!options.index) {
          for (const m of app.globalData.markers) {
            for (const i of m.data) {
              if (i.id == options.id) {
                marker = i;
                break;
              }
            }
          }
        } else {
          marker = app.globalData.markers[options.index].data.filter(
            (m: any) => m.id == options.id
          )[0];
        }
        break;
    }
    for (let i = 0; i < marker.images; i++) {
      imgUrls.push(
        this.data.cloudRoot +
          "images/" +
          (marker.short_name || marker.name) +
          "/" +
          i +
          ".jpg"
      );
    }
    this.setData!({
      marker,
      imgUrls,
      logoUrl: marker.logo
        ? this.data.cloudRoot + "logo/" + marker.logo + ".jpg"
        : ""
    });
  }
});
