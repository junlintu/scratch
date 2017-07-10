const qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');
Page({
    data:{
        solitaire:[],
        solitaireId:'',
        solitaireContent:''
    },
    onLoad: function (options){
      console.log('onLoad')
      // var that = this
      // 调用应用实例的方法获取全局数据
      // app.getUserInfo(function (userInfo) {
      //   //更新数据
      //   console.log(userInfo);
        this.setData({
          solitaireId: options.solitaireid
        });
        var that = this;
        app.getUserInfo(function (userInfo) {
          that.setData({
            userInfo: userInfo
          });
        });
    }, 
    onShow: function () {
      console.log('onShow');
      if(this.data.solitaire.length == 0) {
        this.getSolitaire();
      }
    },
    onShareAppMessage: function () {
        return {
        title: solitaire.solitaire_cici[0].title,
        path: 'pages/solitaire/solitaire',
        success: function(res) {
        // 转发成功
        },
        fail: function(res) {
        // 转发失败
        }
        }
    },
    bindSolitaireContent: function(e){
      this.setData({
        solitaireContent: e.detail.value
      })
    },
    getSolitaire: function() {
      var that = this;
      qcloud.request({
        // 要请求的地址
        url: 'https://45555718.qcloud.la/solitaire?solitaireId=' + this.data.solitaireId,

        // 请求之前是否登陆，如果该项指定为 true，会在请求之前进行登录
        login: true,
        method: 'GET',
        success(result) {
          console.log('request success', result);
          that.setData({
            solitaire: result.data.data.solitaire
          });

        },

        fail(error) {
          console.log('request fail', error);
        },

        complete() {
          console.log('request complete');
        }
      });
    },
    toSolitaire: function(e){
      var that = this;
      qcloud.request({
        // 要请求的地址
        url: 'https://45555718.qcloud.la/makecontent',

        // 请求之前是否登陆，如果该项指定为 true，会在请求之前进行登录
        login: true,
        method: 'POST',
        data: {
          solitaireId: that.data.solitaireId,
          solitaireContent: e.detail.value.solitaireContent
        },
        success(result) {
          console.log('request success', result);
          that.setData({
            solitaire: result.data.data.solitaire
          });
          

        },

        fail(error) {
          console.log('request fail', error);
        },

        complete() {
          console.log('request complete');
        }
      });
    },
    deleteSolitaire: function() {
      var that = this;
      qcloud.request({
        // 要请求的地址
        url: 'https://45555718.qcloud.la/removecontent',

        // 请求之前是否登陆，如果该项指定为 true，会在请求之前进行登录
        login: true,
        method: 'POST',
        data: {
          solitaireId: that.data.solitaireId
        },
        success(result) {
          console.log('request success', result);
          that.setData({
            solitaire: result.data.data.solitaire
          });


        },

        fail(error) {
          console.log('request fail', error);
        },

        complete() {
          console.log('request complete');
        }
      });
    }
})