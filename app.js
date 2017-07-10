//app.js
// require('./lib/es6-promise-min').polyfill();
var Promise = require('./lib/es6-promise-min').Promise;
// var WXBizDataCrypt = require('./WXBizDataCrypt');
var qcloud = require('./vendor/qcloud-weapp-client-sdk/index');
var config = require('./config');
var appId = 'wx669fe67ea0fb1958';
// 显示繁忙提示
var showBusy = text => wx.showToast({
  title: text,
  icon: 'loading',
  duration: 10000
});

// 显示成功提示
var showSuccess = text => wx.showToast({
  title: text,
  icon: 'success'
});

// 显示失败提示
var showModel = (title, content) => {
  wx.hideToast();

  wx.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false
  });
};
App({
  onLaunch: function () {

    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
    qcloud.setLoginUrl(config.service.loginUrl);
    showBusy('正在登录');

    // 登录之前需要调用 qcloud.setLoginUrl() 设置登录地址，不过我们在 app.js 的入口里面已经调用过了，后面就不用再调用了
    qcloud.login({
      success:function success(result) {
        console.log('登录成功', result);
      },

      fail:function fail(error) {
        console.log('登录失败', error);
      }
    });
    // this.globalData.userInfo = Session.get().userInfo;
  },
  getUserInfo:function(cb){
    // var pc = new WXBizDataCrypt(appId, sessionKey)

    // var data = pc.decryptData(encryptedData, iv)
    // var that = this
    if (this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo);
    }else{
      this.doRequest(cb);
      // typeof cb == "function" && cb(getApp().globalData.userInfo);
      
    }
  },
  doRequest:function(cb) {
    showBusy('正在请求');
    var that = this;
    // qcloud.request() 方法和 wx.request() 方法使用是一致的，不过如果用户已经登录的情况下，会把用户的会话信息带给服务器，服务器可以跟踪用户
    qcloud.request({
      // 要请求的地址
      url: config.service.requestUrl,

      // 请求之前是否登陆，如果该项指定为 true，会在请求之前进行登录
      login: true,

      success(result) {
        showSuccess('请求成功完成');
        console.log('request success', result);
        that.globalData.userInfo = result.data.data.userInfo;
        typeof cb == "function" && cb(getApp().globalData.userInfo);
      },

      fail(error) {
        showModel('请求失败', error);
        console.log('request fail', error);
      },

      complete() {
        console.log('request complete');
      }
    });
  },
  globalData:{
    userInfo: null
  }
})