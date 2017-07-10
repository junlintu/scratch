var qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');
var app = getApp();
Page({
  data: {
    solitaireTitle:'',
    solitaireDescription:''
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this;
    app.getUserInfo();
  },
  formSubmit: function(e) {
    qcloud.request({
      // 要请求的地址
      url: 'https://45555718.qcloud.la/makesolitaire',

      // 请求之前是否登陆，如果该项指定为 true，会在请求之前进行登录
      login: true,
      method: 'POST',
      data: {
        title: e.detail.value.solitaireTitle,
        description: e.detail.value.solitaireDescription
      },
      success(result) {
        console.log('request success', result);
        wx.redirectTo({
          url: '../solitaire/solitaire?solitaireid=' + result.data.data.id,
        })
      },

      fail(error) {
        console.log('request fail', error);
      },

      complete() {
        console.log('request complete');
      }
    });
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    
  },
  formReset: function() {
    console.log('form发生了reset事件')
  }
})