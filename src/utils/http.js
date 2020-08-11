// http.js:
const http = (url, data) => {
  return new Promise(function(resolve, reject) {
    wx.request({
      url: `${url}`,
      method: "GET",
      data: data,
      success: function(res) {
        if (res.statusCode != 200) {
          reject({ error: "服务器忙，请稍后重试", code: 500 });
          return;
        }
        resolve(res.data);
      },
      fail: function(res) {
        // fail调用接口失败
        reject({ error: "网络错误", code: 0 });
      },
      complete: function(res) {
        // complete
      }
    });
  });
};

module.exports = http;
