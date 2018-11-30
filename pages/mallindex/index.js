Page({
  data: {
    inputShowed: false,
    inputVal: "",
    imgUrls: [
      '../../img/banner.png',
      '../../img/banner.png',
      '../../img/banner.png'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 2000,
    duration: 1000,
    new_product:'新品',
    be_list:'●上市',
    NEW:'NEW',
    frist_start:'新品首发',
    details:"看新奇好物 必来新品首发",
    index_list:[
      {
      sele:'精选',
      good_thing:'●好物',
      enlist:'SELECTED',
      ch_more:'更多 > '
      }
    ],
    // dibu
    curIdx: 0,
    // 猜你喜欢
    index_nr:[
      {
        inr_img:'//m.360buyimg.com/mobilecms/s750x750_jfs/t19444/17/1789226249/226262/a29defc/5ad6e7acNff359cf8.jpg!q80.dpg.webp',
        inr_text:'1金丝猴 麦丽素23g*36包 夹心巧克力80后儿时怀旧零食',
        inr_morey:'￥46',
        classname: 'con_rnblo',
        id:'f1'
      },
      {
        inr_img: '//m.360buyimg.com/mobilecms/s750x750_jfs/t19444/17/1789226249/226262/a29defc/5ad6e7acNff359cf8.jpg!q80.dpg.webp',
        inr_text: '2金丝猴 麦丽素23g*36包 夹心巧克力80后儿时怀旧零食',
        inr_morey: '￥46',
        id: 'f2'
      },
      {
        inr_img: '//m.360buyimg.com/mobilecms/s750x750_jfs/t19444/17/1789226249/226262/a29defc/5ad6e7acNff359cf8.jpg!q80.dpg.webp',
        inr_text: '3金丝猴 麦丽素23g*36包 夹心巧克力80后儿时怀旧零食',
        inr_morey: '￥46',
        classname: 'con_rnblo',
        id: 'f3'
      },
      {
        inr_img: '//m.360buyimg.com/mobilecms/s750x750_jfs/t19444/17/1789226249/226262/a29defc/5ad6e7acNff359cf8.jpg!q80.dpg.webp',
        inr_text: '4金丝猴 麦丽素23g*36包 夹心巧克力80后儿时怀旧零食',
        inr_morey: '￥46',
        id: 'f4'
      }
    ],
    // 新品上市
    indfor:[
      {
        infor_img:'https://img20.360buyimg.com/babel/s170x180_jfs/t21349/360/1755580299/52413/1a64294b/5b343135N0558156b.jpg!q90!cc_170x180',
        classname: 'con_tanle',
        id:'e1'

      },
      {
        infor_img: 'https://img20.360buyimg.com/babel/s170x180_jfs/t26050/163/827798784/67428/73766733/5b7d2757N70e590fa.jpg!q90!cc_170x180',
        classname: 'con_tanle',
        id: 'e2'

      },
      {
        infor_img: 'https://img11.360buyimg.com/babel/s350x180_jfs/t24520/189/521738463/62534/6e2b5f41/5b343182N43cd5ece.jpg!q90!cc_350x180',
        classname: 'con_tanbg',
        id: 'e3'

      },
      {
        infor_img: 'https://img30.360buyimg.com/babel/s170x180_jfs/t1/4606/3/6757/80448/5ba33830E7a3f32fb/8e554fa6876d57af.jpg!q90!cc_170x180',
        classname: 'con_tanle',
        id: 'e4'

      },
      {
        infor_img: 'https://img10.360buyimg.com/babel/s170x180_jfs/t1/4338/1/7083/56650/5ba48bb0Eaaa09e79/9e6ba3a44cf1d48d.jpg!q90!cc_170x180',
        classname: 'con_tanle',
        id: 'e5'

      },
      {
        infor_img: 'https://img11.360buyimg.com/babel/s170x180_jfs/t1/2390/33/6581/45671/5ba34aa0E7f6773c9/18f5925600cce3a0.jpg!q90!cc_170x180',
        classname: 'con_tanle',
        id: 'e6'

      },
      {
        infor_img: 'https://img12.360buyimg.com/babel/s170x180_jfs/t1/5321/20/2215/74145/5b961295E05a4de69/a96b6b26cf5cf7bd.jpg!q90!cc_170x180',
        classname: 'con_tanle con_rnone',
        id: 'e7'

      }
    ],
    // 精品好物
    jpfor: [
      {
        jpfor_img: 'https://img20.360buyimg.com/babel/s350x180_jfs/t1/2882/22/6978/66609/5ba484dfEeccc826f/a1fa7d1b1fb91116.jpg!q90!cc_350x180',
        classname: 'con_tanbg1 con_rnblo',
        id: 'j1'

      },
      {
        jpfor_img: 'https://img11.360buyimg.com/babel/s170x180_jfs/t1/5298/11/2729/60597/5b973913E6b51df14/88c78d4db16e27fb.jpg!q90!cc_170x180',
        classname: 'con_tanle',
        id: 'j2'

      },
      {
        jpfor_img: 'https://img11.360buyimg.com/babel/s170x180_jfs/t1/5414/23/7068/54847/5ba49cf0E701f6f90/fde9e8202a644537.jpg!q90!cc_170x180',
        classname: 'con_tanle con_rnone',
        id: 'j3'

      },
      {
        jpfor_img: 'https://img30.360buyimg.com/babel/s170x180_jfs/t26755/251/247221171/79139/24ddda9/5b914c2aNeac807bd.jpg!q90!cc_170x180',
        classname: 'con_tanle',
        id: 'j4'

      },
      {
        jpfor_img: 'https://img13.360buyimg.com/babel/s170x180_jfs/t1/404/22/7177/75405/5ba45e72E4075fb1b/61166d065f4f0445.jpg!q90!cc_170x180',
        classname: 'con_tanle',
        id: 'j5'

      },
      {
        jpfor_img: 'https://img13.360buyimg.com/babel/s170x180_jfs/t23998/27/1009560461/57611/2bcf791f/5b4c43a8Ndb67446f.jpg!q90!cc_170x180',
        classname: 'con_tanle',
        id: 'j6'

      },
      {
        jpfor_img: 'https://img10.360buyimg.com/babel/s170x180_jfs/t23272/158/1009314516/67198/8dad32ab/5b4c4450N40d9c9ad.jpg!q90!cc_170x180',
        classname: 'con_tanle con_rnone',
        id: 'j7'

      }
    ],
    // 为你推荐
    tjfor: [
      {
        tjfor_img: 'https://img14.360buyimg.com/babel/s350x180_jfs/t22660/197/997998956/85092/652504db/5b4c45bfNcfd19212.jpg!q90!cc_350x180',
        classname: 'con_tanbg1 con_rnblo',
        id: 't1'

      },
      {
        tjfor_img: 'https://img13.360buyimg.com/babel/s350x180_jfs/t1/5444/17/5185/171339/5b9e53e5Eeb832fd9/4cdeec4cd8ad7239.jpg!q90!cc_350x180',
        classname: 'con_tanbg1',
        id: 't2'

      },
      {
        tjfor_img: 'https://img20.360buyimg.com/babel/s350x180_jfs/t26602/58/383065544/159551/cd1cd918/5b909dfbNdbc902df.jpg!q90!cc_350x180',
        classname: 'con_tanbg1 con_rnblo',
        id: 't3'

      },
      {
        tjfor_img: 'https://img11.360buyimg.com/babel/s350x180_jfs/t1/2037/22/8400/136931/5ba8ec80E26ab3f43/56a502682d252518.jpg!q90!cc_350x180',
        classname: 'con_tanbg1',
        id: 't4'

      }
    ]
  },
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://mall.zdcom.net.cn/mall/wxapi.php',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        wxlist: "1"
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          taglist: res.data
        });

      }
    })
  },
  showInput: function () {
    
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  swimage: function (e) {
    console.log(e);
    let idd = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../neiye/neiye?id='+idd
    })
  },
  // 底部导航 

  fenLei:function(){
    wx.navigateTo({
      url:"../fenlei/fenlei"
    })
  },
  gouWuChe: function () {
    wx.navigateTo({
      url: "../logs/logs"
    })
  }
});