//index.js
//获取应用实例
var app = getApp();
// var request = require('../../lib/session-request.js');
// 引入 QCloud 小程序增强 SDK
var qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');

// 引入配置
var config = require('../../config');


Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    solitaire: {},
    mysolitaire:{}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../makesolitaire/makesolitaire'
    })
  },
  onLoad: function(){
    console.log('onLoad');
    var that = this;
    app.getUserInfo(function(userInfo){
      that.setData({
        userInfo:userInfo
      });
    });
  },
  onShow: function () {
    console.log('onShow');
    var that = this;
    qcloud.request({
      // 要请求的地址
      url: 'https://45555718.qcloud.la/solitaire',

      // 请求之前是否登陆，如果该项指定为 true，会在请求之前进行登录
      login: true,
      method: 'GET',
      success(result) {
        console.log('request success', result);
        that.setData({
          //userInfo: result.data.data.userInfo,
          mysolitaire: result.data.data.mysolitaire,
          solitaire: result.data.data.solitaire
        });
        getApp().getUserInfo(function(u){
          console.log(u);
        })
      },

      fail(error) {
        console.log('request fail', error);
      },

      complete() {
        console.log('request complete');
      }
    });
    
    
  },
  goSolitaire: function(e) {
    wx.navigateTo({
      url: '../solitaire/solitaire?solitaireid=' + e.currentTarget.dataset.solitaireid
    })
  }
})
