// pages/calc/calc.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 尺寸
    windowHeight: 0,
    screenHeight: 0,
    statusBarHeight: 0,
    // sty: 'light',
    sty: 'dark', // 默认dark
    boxColor: '#000000',
    fontColor: '#ffffff',
    resSty: 'res-sty-dark',
    btnCtrlSty: 'btn-ctrl-sty-dark',
    btnNumSty: 'btn-num-sty-dark',
    btnEqualSty: 'btn-equal-sty-dark',     // =
    btnAddSty: 'btn-add-sty-dark',       // +
    btnSubtractSty: 'btn-subtract-sty-dark',  // -
    btnMultiplySty: 'btn-multiply-sty-dark',  // x
    btnDivideSty: 'btn-divide-sty-dark',    // ÷
    ac: 'AC',
    show: '0',
    storageNumNum: 0,  // 存储的数
    operator: '',   // 运算符
    showLen: 0,
    onceNum: false,
    error: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      windowHeight: app.globalData.windowHeight,
      screenHeight: app.globalData.screenHeight,
      statusBarHeight: app.globalData.statusBarHeight
    });
    this.changeSty();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

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

  changeSty: function () {
    if (this.data.sty == 'dark') {
      wx.setNavigationBarColor({
        frontColor: "#ffffff",
        backgroundColor: "#000000"
      });
      this.setData({
        boxColor: '#000000',
        fontColor: '#ffffff',
        resSty: 'res-sty-dark',
        btnCtrlSty: 'btn-ctrl-sty-dark',
        btnNumSty: 'btn-num-sty-dark',
        btnEqualSty: 'btn-equal-sty-dark',        // =
        btnAddSty: 'btn-add-sty-dark',            // +
        btnSubtractSty: 'btn-subtract-sty-dark',  // -
        btnMultiplySty: 'btn-multiply-sty-dark',  // x
        btnDivideSty: 'btn-divide-sty-dark'       // ÷

      });
    } else {  // light
      wx.setNavigationBarColor({
        frontColor: "#000000",
        backgroundColor: "#66ccff"
      });



    }
  },

  calculator: function (e) {
    var btn = e.target.dataset.val;
    var that = this;
    if (that.data.error == false) {
      if (!isNaN(btn)) {
        if (that.data.onceNum != false) {
          that.data.show = '0';
          that.data.showLen = 0;
          that.data.onceNum = false;
        }
        if (that.data.showLen < 10) {
          that.data.show += btn;
          if (that.data.show.toString().indexOf('.') == -1) {
            that.data.show = Number(that.data.show);
            that.data.show = that.data.show.toString();
          }
        }
      } else {
        switch (btn) {
          case '+':
          case '-':
          case '*':
          case '/':
          case '=':
            if (that.data.operator == '+') {
              that.data.show = Number(that.data.storageNum) + Number(that.data.show)
            } else if (that.data.operator == '-') {
              that.data.show = Number(that.data.storageNum) - Number(that.data.show)
            } else if (that.data.operator == '*') {

              console.log(Number(that.data.storageNum) * Number(that.data.show));
              console.log(Number(that.data.storageNum));
              console.log(Number(that.data.show));

              that.data.show = Number(that.data.storageNum) * Number(that.data.show)
            } else if (that.data.operator == '/') {
              that.data.show = Number(that.data.storageNum) / Number(that.data.show)
            }
            that.data.storageNum = that.data.show;
            that.data.operator = btn;
            
            that.data.onceNum = true;
            break;

          case '.':
            if (that.data.show.toString().indexOf('.') == -1) {
              that.data.show += btn;
            }
            that.data.onceNum = false;
            break;

          case 'minus':
            that.data.show = that.data.show * -1;
            break;

          case '%':
            that.data.show = that.data.show * 0.01;
            break;
        }
        that.data.show = that.data.show.toString();
        console.log(that.data.operator);

      }

      let decimal = 0;
      if (that.data.show.indexOf('.') != -1) {
        decimal = 1;
      }
      that.data.showLen = that.data.show.length - decimal;
      if (that.data.showLen > 10) {
        if (that.data.show.indexOf('.') != -1) {
          let fPoint = that.data.show.indexOf('.');
          let aPoint = that.data.showLen - fPoint;
          if (fPoint > 10) {
            that.data.show = '数值超出范围!';
            that.data.error = true;
          } else {
            let keepPoint = 10 - fPoint < aPoint ? 10 - fPoint : aPoint;
            that.data.show = Number(that.data.show).toFixed(keepPoint).toString();
          }
        } else {
          that.data.show = '数值超出范围!';
          that.data.error = true;
        }
      }
    }

    if (btn == 'clear') {
      that.data.storageNum = 0;
      that.data.show = '0';
      that.data.operator = '';
      that.data.error = false;
    }

    if (that.data.show == 'Infinity' || that.data.show == 'NaN') {
      that.data.show = '错误!';
      that.data.error = true;
    }

    that.setData({
      show: that.data.show
    })
  }
})
