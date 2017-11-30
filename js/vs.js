$(function(){
  console.log("hi")


var myChart = echarts.init(document.getElementById('center_left'));
  
var geoCoordMap = {    
    '山东': [117.024967,36.682785],
    '安徽': [117.563205,31.765229],
    '江苏': [118.595978,32.976494]
};  
var initMapDate = [  
   {'name':'山东','map_x':'116.932939','map_y':'35.8336','value':'10325位用户'},
   {'name':'安徽','map_x':'117.611472','map_y':'32.792215','value':'9847位用户'},
   {'name':'江苏','map_x':'118.595978','map_y':'32.976494','value':'6488位用户'} 
]; 

var color = ['#a6c84c', '#ffa022', '#46bee9'];  
var convertData = function (data) {  
    var res = [];  
    for (var i = 0; i < data.length; i++) {  
        var dataItem = data[i];  
        var fromCoord = [dataItem[1].map_x,dataItem[1].map_y];
        var toCoord = geoCoordMap[dataItem[0].name]; 
        if (fromCoord && toCoord) {  
            res.push({  
                fromName: dataItem[1].shop_name,  
                toName: dataItem[0].name,  
                coords: [fromCoord, toCoord],
                name: dataItem[1].shop_name+"至"+dataItem[0].name+"仓库",  
                value: [dataItem.cust_address] 
            });  
        }  
    }  
    return res;  
};
var convertData1 = function (toCo,data) {  
    var res = [];  
    for (var i = 0; i < data.length; i++) {  
        var dataItem = data[i];  
        var fromCoord = [dataItem.map_x,dataItem.map_y];
        var toCoord = toCo.map; 
        if (fromCoord && toCoord) {  
            res.push({  
                fromName: dataItem.shop_name,  
                toName: toCo.name,  
                coords: [fromCoord, toCoord],
                name: dataItem.shop_name+"至"+toCo.name+"仓库",  
                value: [dataItem.cust_address] 
            });  
        }  
    }  
    return res;  
}; 
if (!Array.prototype.forEach) {  
    Array.prototype.forEach = function(callback, thisArg) {  
        var T, k;  
        if (this == null) {  
            throw new TypeError(" this is null or not defined");  
        }  
        var O = Object(this);  
        var len = O.length >>> 0; // Hack to convert O.length to a UInt32  
        if ({}.toString.call(callback) != "[object Function]") {  
            throw new TypeError(callback + " is not a function");  
        }  
        if (thisArg) {  
            T = thisArg;  
        }  
        k = 0;  
        while (k < len) {  
            var kValue;  
            if (k in O) {  
                kValue = O[k];  
                callback.call(T, kValue, k, O);  
            }  
            k++;  
        }  
    };  
}

var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';  

var JNData = [],HFData=[],JSData=[];


var bmapStyle={
                    styleJson: [
                    {
                              'featureType': 'land',     //调整土地颜色
                              'elementType': 'geometry',
                              'stylers': {
                                        'color': '#081734'
                              }
                    },
                    {
                              'featureType': 'building',   //调整建筑物颜色
                              'elementType': 'geometry',
                              'stylers': {
                                        'color': '#04406F',
                                        'visibility': 'off'
                              }
                    },
                   {
                              'featureType': 'building',   //调整建筑物标签是否可视
                              'elementType': 'labels',
                              'stylers': {
                              'visibility': 'off'
                              }
                    },
                    {
                              'featureType': 'highway',     //调整高速道路颜色
                              'elementType': 'geometry',
                              'stylers': {
                              'color': '#015B99'
                              }
                    },
                    {
                              'featureType': 'highway',    //调整高速名字是否可视
                              'elementType': 'labels',
                              'stylers': {
                              // 'visibility': 'off'
                              }
                    },
                    {
                              'featureType': 'arterial',   //调整一些干道颜色
                              'elementType': 'geometry',
                              'stylers': {
                              'color':'#003051'
                              }
                    },
                    {
                              'featureType': 'arterial',
                              'elementType': 'labels',
                              'stylers': {
                              'visibility': 'off'
                              }
                    },
                    {
                              'featureType': 'green',
                              'elementType': 'geometry',
                              'stylers': {
                              'visibility': 'off'
                              }
                    },
                    {
                              'featureType': 'water',
                              'elementType': 'geometry',
                              'stylers': {
                                        'color': '#044161'
                              }
                    },
                    {
                              'featureType': 'subway',    //调整地铁颜色
                              'elementType': 'geometry.stroke',
                              'stylers': {
                              'color': '#003051',
                              'visibility': 'off'
                              }
                    },
                    {
                              'featureType': 'subway',
                              'elementType': 'labels',
                              'stylers': {
                              'visibility': 'off'
                              }
                    },
                    {
                              'featureType': 'railway',
                              'elementType': 'geometry',
                              'stylers': {
                              'visibility': 'off'
                              }
                    },
                    {
                              'featureType': 'railway',
                              'elementType': 'labels',
                              'stylers': {
                              'visibility': 'off'
                              }
                    },
                    {
                              'featureType': 'all',     //调整所有的标签的边缘颜色
                              'elementType': 'labels.text.stroke',
                              'stylers': {
                                        'color': '#313131',
                              }
                    },
                    {
                              'featureType': 'all',     //调整所有标签的填充颜色
                              'elementType': 'labels.text.fill',
                              'stylers': {
                                        'color': '#FFFFFF',
                              }
                    },
                    {
                              'featureType': 'manmade',   
                              'elementType': 'geometry',
                              'stylers': {
                              'visibility': 'off'
                              }
                    },
                    {
                              'featureType': 'manmade',
                              'elementType': 'labels',
                              'stylers': {
                              'visibility': 'off'
                              }
                    },
                    {
                              'featureType': 'local',
                              'elementType': 'geometry',
                              'stylers': {
                              'visibility': 'off'
                              }
                    },
                    {
                              'featureType': 'local',
                              'elementType': 'labels',
                              'stylers': {
                              'visibility': 'off'
                              }
                    },
                    {
                              'featureType': 'subway',
                              'elementType': 'geometry',
                              'stylers': {
                                        'lightness': -65,
                                        'visibility': 'off'
                              }
                    },
                    {
                              'featureType': 'railway',
                              'elementType': 'all',
                              'stylers': {
                                        'lightness': -40,
                                        'visibility': 'off'
                              }
                    },
                    {
                              'featureType': 'boundary',
                              'elementType': 'geometry',
                              'stylers': {
                                        'color': '#8b8787',
                                        'weight': '1',
                                        'lightness': -29
                              }
                    }]
                  };

    var toObj={};
    var toObj1={};
    var toObj2={};
    toObj.name='济南';
    toObj1.name='合肥';
    toObj2.name='江苏';

var vmapZoom=14;        //地图缩放等级

    var initMapStart=false;
    var afterMapStart=false;
    var initMapClick=null;
    var series = [];
    var mapData=null;
    var mapData1=null;
    var mapDatas=null;
var bmapCenter=[117.188107,34.271553];  //地图中心点

var selectedAddress=null,addrGeo = new BMap.Geocoder();

//设置江苏安徽山东的数据为空++

console.log(new BMap.Geocoder(),"???????++++++++++++++++++++")  //百度地图的一个对象++++++++++++

var jsData=null,sdData=null,ahData=null;

//加载静态数据

$.ajax({
    type: "get",
    url: "js/vmapDatah.json",
    dataType : "json",
    success: function(data){

        hfData=data;     //拿到合肥的数据+++


        // console.log("合肥的数据+++",hfData)
    },
    error:function(XMLHttpRequest, textStatus, errorThrown){
       console.log(XMLHttpRequest);
       console.log(textStatus);
       console.log(errorThrown);
    }

 });

//开始描绘江苏数据+++++++++++++++++++++++++++++++++++++++++++++++

var drawJiangsu=function(){

    initMapStart=false;

    afterMapStart=true;

    series=[];

    //这里分别声明了两个数组和两个常量++++++++++++++++++++++

    var jsGroup1=[],jsGroup2=[];

    var gap=1,gap1=1;

    $.ajax({

      type: "get",
      async:false,
      url: "js/jsData.json",
      success: function(data){

          jsData=data;       //拿到江苏的数据++

          console.log("江苏的数据+++",jsData)

      },

      error:function(XMLHttpRequest, textStatus, errorThrown){
      console.log(XMLHttpRequest);
      console.log(textStatus);
      console.log(errorThrown);
      }

    });

    while(gap<1000){

      var dataArray1=[];

      gap=gap+60;

      dataArray1.push(toObj2);          //  把一个空对象push到dataArray1中+++++++++++++++++++++++++ dataArray1=[{}]

       // console.log(jsData[60],"++++++++++++++++++++++++++++++++++++++++随机抽出来几个数据")

      dataArray1.push(jsData[gap]);     //将随机抽出来的数据，加入到dataArray1中++++++

      JSData.push(dataArray1);         // 然后把这些数据作为江苏的数据++++，之后再描绘连线图表+++
        //370行，可以查看+++++++++++

    }
//
    var randomCust=[];                  //声明一个随机数组++++++++++++++


    for(var z=0;z<100;z++){

        var orderStart=Math.random()*2000;

        var step=Math.random()*100;

        var nums=parseInt(orderStart+step); //将两个随机数加起来向上取整数+++++++++++++++++

        randomCust.push(jsData[nums]);         //随机取出jsData中的数据，然后push到randomCust中+++++++++++

        //这里的作用暂时未知++++++++

    }

    var mapgroup1=[],mapgroup2=[],mapgroup3=[];     //声明了三个空数组

    for(var j=0;j<300;j++){

        mapgroup1.push(jsData[j]);  //这里频繁的对江苏的数据进行操作，随机生成几个数组

    };

    for(var k=300;k<800;k++){
        mapgroup2.push(jsData[k]);
    };

    for(var l=800;l<jsData.length;l++){
        mapgroup3.push(jsData[l]);
    };

   // JSData.push(dataArray1);         // 346行把随机数据赋值到JSdata中，然后把这些数据作为江苏的数据++++，之后再描绘连线图表+++

    [['江苏', JSData]].forEach(function (item, i){

        console.log(item,i,"what???",item[0] )           //这里是JSData就是你需要联动描绘线条的点

        series.push(
               {
                    name: '下单用户',  
                    type: 'effectScatter',   
                    coordinateSystem: 'bmap',  
                    zlevel: 10,  
                    rippleEffect: {  
                        brushType: 'fill',
                        scale:5 
                    },  
                    label: {  
                        normal: {  
                            show: false,  
                            position: 'right',  
                            formatter: '{b}'  
                        }  
                    },  
                    symbolSize: 7, 
                    effect : {
                        show: true,
                        shadowBlur : 0
                    }, 
                    itemStyle: {
                        normal: {
                            color: '#FA8695',
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    }, 
                    data: randomCust.map(function (dataItem) {
                        console.log()
                        //这里是 将起止点联系起来++++
                        return {

                            name: dataItem.shop_name,  
                            value: [dataItem.map_x,dataItem.map_y].concat([dataItem.cust_address])

                            //concat将两个数组联系起来+++++

                        };  
                    })         
              }

//              {  
//                  name: item[0],  
//                  type: 'lines',  
//                  coordinateSystem: 'bmap',  
//                  zlevel: 1,  
//                  effect: {  
//                      show: true,  
//                      period: 16,  
//                      trailLength: 0.3,  
//                      color: '#fff',      //移动点的拖尾+++
//                      symbolSize: 5       //移动点的大小
//                  },  
//                  lineStyle: {             //迁移路线的宽度颜色，透明度相关配置
//                      normal: {  
//                          color: color[i],  
//                          width: 0,  
//                          curveness: 0.2  
//                      }  
//                  },  
//                  data: convertData(item[1])  
//              },  
//              {  
//                  name: item[0] ,  
//                  type: 'lines',  
//                  coordinateSystem: 'bmap',  
//                  zlevel: 2,  
//                  effect: {  
//                      show: true,  
//                      period: 6,  
//                      trailLength: 0,  
//                      symbol: planePath,  
//                      symbolSize: 0  
//                  },  
//                  lineStyle: {  
//                      normal: {  
//                          color: color[i],  
//                          width: 2,  
//                          opacity: 0.4,  
//                          curveness: 0.2  
//                      }  
//                  },  
//                  data: convertData(item[1])  
//               }
             );

         });



      series.push(

         {
              name: '盱眙仓库',  
              type: 'effectScatter',  
              coordinateSystem: 'bmap',  
              zlevel: 11,  
              rippleEffect: {  
                  brushType: 'fill',
                  scale:5 
              },  
              label: {  
                  normal: {  
                      show: false,  
                      position: 'right',  
                      formatter: '{b}'  
                  }  
              },  
              symbolSize: 25, 
              effect : {
                  show: true,
                  shadowBlur : 0
              }, 
              itemStyle: {
                  normal: {
                      color: '#32EBED',
                      shadowBlur: 10,
                      shadowColor: '#333'
                  }
              }, 
              data:[{  
                  label: {
                      text: '盱眙仓库',
                      normal:{
                        show:true,
                        textStyle:{
                          color:'#FFF',
                          fontSize:16
                        },
                        position: 'inside'
                      },
                  },
                  name: '盱眙仓库',  
                  value: [118.595978,32.976494]
              }]
          },
          {  
              name: '新沂仓库',  
              type: 'effectScatter',  
              coordinateSystem: 'bmap',  
              zlevel: 11,  
              rippleEffect: {  
                  brushType: 'fill',
                  scale:5 
              },  
              label: {  
                  normal: {  
                      show: false,  
                      position: 'right',  
                      formatter: '{b}'  
                  }  
              },  
              symbolSize: 25, 
              effect : {
                  show: true,
                  shadowBlur : 0
              }, 
              itemStyle: {
                  normal: {
                      color: '#9DD3F2',
                      shadowBlur: 10,
                      shadowColor: '#333'
                  }
              }, 
              data:[{  
                  label: {
                      text: '新沂仓库',
                      normal:{
                        show:true,
                        textStyle:{
                          color:'#FFF',
                          fontSize:16
                        },
                        position: 'inside'
                      },
                  },
                  name: '新沂仓库',  
                  value: [118.241233,34.377846]
              }]
         },

          {
              name: '新春兴冶炼厂',  
              type: 'effectScatter',  
              coordinateSystem: 'bmap',  
              zlevel: 3,  
              rippleEffect: {  
                  brushType: 'fill',
                  scale:5 
              },  
              label: {  
                  normal: {  
                      show: false,  
                      position: 'right',  
                      formatter: '{b}'  
                  }  
              },  
              symbolSize: 25, 
              effect : {
                  show: true,
                  shadowBlur : 0
              }, 
              itemStyle: {
                  normal: {
                      color: '#CB8EFA',
                      shadowBlur: 10,
                      shadowColor: '#333'
                  }
              }, 
              data:[{  
                  label: {
                      text: '新春兴冶炼厂',
                      normal:{
                        show:true,
                        textStyle:{
                          color:'#FFF',
                          fontSize:16
                        },
                        position: 'inside'
                      },
                  },
                  name: '新春兴冶炼厂',  
                  value: [117.90306,34.402946]
              }]
          },
          {  
              name: "仓库至冶炼厂",  
              type: 'lines',  
              coordinateSystem: 'bmap',  
              zlevel: 4,  
              effect: {  
                  show: true,  
                  period: 6,  
                  trailLength: 0.3,  
                  color: '#FC626C',  
                  symbolSize: 8  
              },  
              lineStyle: {  
                  normal: {   
                      width: 0,  
                      curveness: 0.2  
                  }  
              },  
              data: [
                {  
                    fromName: "江苏仓库",  
                    toName: "新春兴冶炼厂",  
                    coords: [[118.595978,32.976494], [117.90306,34.402946]],
                    name: "江苏仓库"+"至"+"新春兴冶炼厂",  
                    value: null
                }
              ] 
          },  
          {  
              name: "仓库至冶炼厂",    
              type: 'lines',  
              coordinateSystem: 'bmap',  
              zlevel: 5,  
              effect: {  
                  show: true,  
                  period: 6,  
                  trailLength: 0,  
                  symbol: planePath,  
                  symbolSize: 0  
              },  
              lineStyle: {  
                  normal: {  
                      color: "#FFF5C9",  
                      width: 8,  
                      opacity: 0.4,  
                      curveness: 0.2  
                  }  
              },  
              data: [
                {  
                    fromName: "江苏仓库",  
                    toName: "新春兴冶炼厂",  
                    coords: [[118.595978,32.976494], [117.90306,34.402946]],
                    name: "江苏仓库"+"至"+"新春兴冶炼厂",  
                    value: null
                }
              ]  
          },
          {  
              name: "仓库至冶炼厂",  
              type: 'lines',  
              coordinateSystem: 'bmap',  
              zlevel: 6,  
              effect: {  
                  show: true,  
                  period: 6,  
                  trailLength: 0.3,  
                  color: '#FC626C',  
                  symbolSize: 8  
              },  
              lineStyle: {  
                  normal: {   
                      width: 0,  
                      curveness: 0.2  
                  }  
              },  
              data: [
                {  
                    fromName: "江苏仓库",  
                    toName: "新春兴冶炼厂",  
                    coords: [[118.241233,34.377846], [117.90306,34.402946]],
                    name: "江苏仓库"+"至"+"新春兴冶炼厂",  
                    value: null
                }
              ] 
          },  
          {  
              name: "仓库至冶炼厂",    
              type: 'lines',  
              coordinateSystem: 'bmap',  
              zlevel: 7,  
              effect: {  
                  show: true,  
                  period: 6,  
                  trailLength: 0,  
                  symbol: planePath,  
                  symbolSize: 0  
              },  
              lineStyle: {  
                  normal: {  
                      color: "#FFF5C9",  
                      width: 8,  
                      opacity: 0.4,  
                      curveness: 0.2  
                  }  
              },  
              data: [
                {  
                    fromName: "江苏仓库",  
                    toName: "新春兴冶炼厂",  
                    coords: [[118.241233,34.377846], [117.90306,34.402946]],
                    name: "江苏仓库"+"至"+"新春兴冶炼厂",  
                    value: null
                }
              ]  
          },
          {  
                name: '江苏用户',  
//                type: 'effectScatter',  
                type: 'scatter', 
                coordinateSystem: 'bmap',  
                zlevel: 20,
//                rippleEffect: {  
//                    brushType: 'fill',
//                    scale:5 
//                },  
                label: {  
                    normal: {  
                        show: false,  
                        position: 'right',  
                        formatter: '{b}'  
                    }  
                },  
                symbolSize: 10,
//                effect : {
//                    show: true,
//                    shadowBlur : 0
//                }, 
//                itemStyle: {
//                    normal: {
//                        color: '#96B651',
//                        shadowBlur: 10,
//                        shadowColor: '#333'
//                    }
//                }, 
                large: true,
                itemStyle: {
                    normal: {
                        shadowBlur: 20,
                        shadowColor: 'rgba(37, 140, 249, 0.8)',
                        color: 'rgba(37, 140, 249, 0.8)'
                    }
                },
                data: mapgroup1.map(function (dataItem) {
                   //这里是大量的散点数据++++++++++++++++++
                     console.log([dataItem.map_x,dataItem.map_y].concat([dataItem.cust_address]),"+++++++++++++++++++++++++++++++++++++++++")
                    return {  
                        name: dataItem.shop_name,  
                        value: [dataItem.map_x,dataItem.map_y,600].concat([dataItem.cust_address])

                    };  
                })         
          },
          {  
              name: '江苏用户',  
              type: 'scatter', 
              coordinateSystem: 'bmap',  
              zlevel: 2,    
              label: {  
                  normal: {  
                      show: false,  
                      position: 'right',  
                      formatter: '{b}'  
                  }  
              },  
              symbolSize: 10, 
              large: true,
              itemStyle: {
                  normal: {
                      shadowBlur: 20,
                      shadowColor: 'rgba(255, 255, 255, 0.2)',
                      color: "rgba(255, 255, 255, 0.2)"
                      // 'rgba(255, 255, 255, 0.8)'
                  }
              },
              data: mapgroup2.map(function (dataItem) {  
                  return {  
                      name: dataItem.shop_name,  
                      value: [dataItem.map_x,dataItem.map_y].concat([dataItem.cust_address])
                  };  
              })         
        },
          {
            name: '江苏用户',   
            type: 'scatter', 
            coordinateSystem: 'bmap',  
            zlevel: 2,  
            label: {  
                normal: {  
                    show: false,  
                    position: 'right',  
                    formatter: '{b}'  
                }  
            },  
            symbolSize: 10, 
            large: true,
            itemStyle: {
                normal: {
                    shadowBlur: 20,
                    shadowColor: 'rgba(14, 241, 242, 0.8)',
                    color: 'rgba(14, 241, 242, 0.8)'
                }
            },
            data: mapgroup3.map(function (dataItem) {  
                return {  
                    name: dataItem.shop_name,  
                    value: [dataItem.map_x,dataItem.map_y].concat([dataItem.cust_address])
                };  
            })         
      }

        //这里某一个具体的仓库和具体的冶炼厂，就是一个具体的数据，（经纬度），
          //仓库至冶炼厂是写了两个具体的点===name是鼠标放置时候信息。

          //这里某一地区的用户，他这里分成了三个中户，
          //普通用户，下单用户，其他用户


      );
    console.log(mapgroup1.map,"????啥玩意")
      var option = {  
          backgroundColor: '#404a59',  
          title : {  
              // text: '模拟迁徙',  
              // subtext: '数据纯属虚构',  
              left: 'center',  
              textStyle : {  
                  color: '#fff'  
              }  
          },  
          tooltip : {  
              position: function (pos, params, dom, rect, size) {
                  // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧
                  // var obj = {top: 200};
                  var obj;
                  obj[['top', 'bottom'][+(pos[1] < size.viewSize[1] / 2)]] = 5;
                  obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                  return obj;
              },
              trigger: 'item' 
          },   
          bmap: {  
              center: bmapCenter,  
              zoom: vmapZoom,  
              roam: true,
              mapStyle: bmapStyle
          },  
          series: series  
      };

      myChart.clear();   
      myChart.setOption(option,true);



      var bmap=myChart.getModel().getComponent("bmap").getBMap();

      // myChart.on('click', function (params) {
      //     console.log(params);
      // });

      var steps=1;
      while(steps<5500){
        try //非IE
        {
            steps=steps+10;
            var temp=jsData[steps];
          var tempX=temp.map_x; 
            var tempY=temp.map_y; 
              var point1=new BMap.Point(118.595978,32.976494);
              var point2=new BMap.Point(118.241233,34.377846);
              var pointB = new BMap.Point(tempX,tempY);
              var len1 = bmap.getDistance(point1,pointB).toFixed(2);
              var len2 = bmap.getDistance(point2,pointB).toFixed(2);
              if(len1<60000){
                jsGroup1.push(jsData[steps]); 
              }
              if(len2<60000){
                jsGroup2.push(jsData[steps]); 
              }
         
        }
        catch(e)//IE
        {
          console.log(steps);
        }
      }
      setTimeout(function(){  
        series=[];
          var toCo1={},toCo2={};
          toCo1.name="须臾仓库";
          toCo1.map=[118.595978,32.976494];
          toCo2.name="新沂仓库";
          toCo2.map=[118.241233,34.377846];
              [['江苏', JSData]].forEach(function (item, i){  
                  series.push(
                         {  
                              name: '下单用户',  
                              type: 'effectScatter',   
                              coordinateSystem: 'bmap',  
                              zlevel: 10,  
                              rippleEffect: {  
                                  brushType: 'fill',
                                  scale:5 
                              },  
                              label: {  
                                  normal: {  
                                      show: false,  
                                      position: 'right',  
                                      formatter: '{b}'  
                                  }  
                              },  
                              symbolSize: 7, 
                              effect : {
                                  show: true,
                                  shadowBlur : 0
                              }, 
                              itemStyle: {
                                  normal: {
                                      color: '#FA8695',

                                      //这里是下单用户+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                                      shadowBlur: 10,
                                      shadowColor: '#333'
                                  }
                              }, 
                              data: randomCust.map(function (dataItem) {  
                                  return {  
                                      name: dataItem.shop_name,  
                                      value: [dataItem.map_x,dataItem.map_y].concat([dataItem.cust_address])
                                  };  
                              })         
                        },
                        {  
                            name: item[0],  
                            type: 'lines',  
                            coordinateSystem: 'bmap',  
                            zlevel: 12,  
                            effect: {  
                                show: true,  
                                period: 16,  
                                trailLength: 0.3,  
                                color: '#fff',  
                                symbolSize: 5  
                            },  
                            lineStyle: {  
                                normal: {  
                                    color: color[i],  
                                    width: 0,  
                                    curveness: 0.2  
                                }  
                            },  
                            data: convertData1(toCo1,jsGroup1)  
                        },  
                        {  
                            name: item[0] ,  
                            type: 'lines',  
                            coordinateSystem: 'bmap',  
                            zlevel: 13,  
                            effect: {  
                                show: true,  
                                period: 6,  
                                trailLength: 0,  
                                symbol: planePath,  
                                symbolSize: 0  
                            },  
                            lineStyle: {  
                                normal: {  
                                    color: color[i],  
                                    width: 2,  
                                    opacity: 0.4,  
                                    curveness: 0.2  
                                }  
                            },  
                            data: convertData1(toCo1,jsGroup1)  
                         },
                         {  
                            name: item[0],  
                            type: 'lines',  
                            coordinateSystem: 'bmap',  
                            zlevel: 14,  
                            effect: {  
                                show: true,  
                                period: 16,  
                                trailLength: 0.3,  
                                color: '#fff',  
                                symbolSize: 5  
                            },  
                            lineStyle: {  
                                normal: {  
                                    color: color[i],  
                                    width: 0,  
                                    curveness: 0.2  
                                }  
                            },  
                            data: convertData1(toCo2,jsGroup2)  
                        },  
                        {  
                            name: item[0] ,  
                            type: 'lines',  
                            coordinateSystem: 'bmap',  
                            zlevel: 15,  
                            effect: {  
                                show: true,  
                                period: 6,  
                                trailLength: 0,  
                                symbol: planePath,  
                                symbolSize: 0  
                            },  
                            lineStyle: {  
                                normal: {  
                                    color: color[i],  
                                    width: 2,  
                                    opacity: 0.4,  
                                    curveness: 0.2  
                                }  
                            },  
                            data: convertData1(toCo2,jsGroup2)  
                         }
                         //这里是描绘什么数据的,某个点到仓库的数据+++++++++++++

                       ); 
                   });
                 console.log(convertData1(toCo1,jsGroup1) ,"这些线数据+++++");

                series.push(
                  {  
                        name: '盱眙仓库',  
                        type: 'effectScatter',  
                        coordinateSystem: 'bmap',  
                        zlevel: 31,  
                        rippleEffect: {  
                            brushType: 'fill',
                            scale:5 
                        },  
                        label: {  
                            normal: {  
                                show: false,  
                                position: 'right',  
                                formatter: '{b}'  
                            }  
                        },  
                        symbolSize: 25, 
                        effect : {
                            show: true,
                            shadowBlur : 0
                        }, 
                        itemStyle: {
                            normal: {
                                color: '#32EBED',
                                shadowBlur: 10,
                                shadowColor: '#333'
                            }
                        }, 
                        data:[{  
                            label: {
                                text: '盱眙仓库',
                                normal:{
                                  show:true,
                                  textStyle:{
                                    color:'#FFF',
                                    fontSize:16
                                  },
                                  position: 'inside'
                                },
                            },
                            name: '盱眙仓库',  
                            value: [118.595978,32.976494]
                        }]
                    },
                    {  
                        name: '新沂仓库',  
                        type: 'effectScatter',      //这些都是点的数据。具体到某一个仓库
                        coordinateSystem: 'bmap',  
                        zlevel: 31,  
                        rippleEffect: {  
                            brushType: 'fill',
                            scale:5 
                        },  
                        label: {  
                            normal: {  
                                show: false,  
                                position: 'right',  
                                formatter: '{b}'  
                            }  
                        },  
                        symbolSize: 25, 
                        effect : {
                            show: true,
                            shadowBlur : 0
                        }, 
                        itemStyle: {
                            normal: {
                                color: '#9DD3F2',
                                shadowBlur: 10,
                                shadowColor: '#333'
                            }
                        }, 
                        data:[{  
                            label: {
                                text: '新沂仓库',
                                normal:{
                                  show:true,
                                  textStyle:{
                                    color:'#FFF',
                                    fontSize:16
                                  },
                                  position: 'inside'
                                },
                            },
                            name: '新沂仓库',  
                            value: [118.241233,34.377846]
                        }]
                   },
                   {  
                        name: '新春兴冶炼厂',  
                        type: 'effectScatter',  
                        coordinateSystem: 'bmap',  
                        zlevel: 31,  
                        rippleEffect: {  
                            brushType: 'fill',
                            scale:5 
                        },  
                        label: {  
                            normal: {  
                                show: false,  
                                position: 'right',  
                                formatter: '{b}'  
                            }  
                        },  
                        symbolSize: 25, 
                        effect : {
                            show: true,
                            shadowBlur : 0
                        }, 
                        itemStyle: {
                            normal: {
                                color: '#CB8EFA',
                                shadowBlur: 10,
                                shadowColor: '#333'
                            }
                        }, 
                        data:[{  
                            label: {
                                text: '新春兴冶炼厂',
                                normal:{
                                  show:true,
                                  textStyle:{
                                    color:'#FFF',
                                    fontSize:16
                                  },
                                  position: 'inside'
                                },
                            },
                            name: '新春兴冶炼厂',  
                            value: [117.90306,34.402946]
                        }]
                    },
                    {  
                        name: "仓库至冶炼厂",  //具体到某一个仓库到冶炼厂
                        type: 'lines',  
                        coordinateSystem: 'bmap',  
                        zlevel: 4,  
                        effect: {  
                            show: true,  
                            period: 6,  
                            trailLength: 0.3,  
                            color: '#FC626C',  
                            symbolSize: 8  
                        },  
                        lineStyle: {  
                            normal: {   
                                width: 0,  
                                curveness: 0.2  
                            }  
                        },  
                        data: [
                          {  
                              fromName: "江苏仓库",  
                              toName: "新春兴冶炼厂",  
                              coords: [[118.595978,32.976494], [117.90306,34.402946]],
                              name: "江苏仓库"+"至"+"新春兴冶炼厂",  
                              value: null
                          }
                        ] 
                    },  
                    {  
                        name: "仓库至冶炼厂",    
                        type: 'lines',  
                        coordinateSystem: 'bmap',  
                        zlevel: 5,  
                        effect: {  
                            show: true,  
                            period: 6,  
                            trailLength: 0,  
                            symbol: planePath,  
                            symbolSize: 0  
                        },  
                        lineStyle: {  
                            normal: {  
                                color: "#FFF5C9",  
                                width: 8,  
                                opacity: 0.4,  
                                curveness: 0.2  
                            }  
                        },  
                        data: [
                          {  
                              fromName: "江苏仓库",  
                              toName: "新春兴冶炼厂",  
                              coords: [[118.595978,32.976494], [117.90306,34.402946]],
                              name: "江苏仓库"+"至"+"新春兴冶炼厂",  
                              value: null
                          }
                        ]  
                    },
                    {  
                        name: "仓库至冶炼厂",  
                        type: 'lines',  
                        coordinateSystem: 'bmap',  
                        zlevel: 6,  
                        effect: {  
                            show: true,  
                            period: 6,  
                            trailLength: 0.3,  
                            color: '#FC626C',  
                            symbolSize: 8  
                        },  
                        lineStyle: {  
                            normal: {   
                                width: 0,  
                                curveness: 0.2  
                            }  
                        },  
                        data: [
                          {  
                              fromName: "江苏仓库",  
                              toName: "新春兴冶炼厂",  
                              coords: [[118.241233,34.377846], [117.90306,34.402946]],
                              name: "江苏仓库"+"至"+"新春兴冶炼厂",  
                              value: null
                          }
                        ] 
                    },  
                    {  
                        name: "仓库至冶炼厂",    
                        type: 'lines',  
                        coordinateSystem: 'bmap',  
                        zlevel: 7,  
                        effect: {  
                            show: true,  
                            period: 6,  
                            trailLength: 0,  
                            symbol: planePath,  
                            symbolSize: 0  
                        },  
                        lineStyle: {  
                            normal: {  
                                color: "#FFF5C9",  
                                width: 8,  
                                opacity: 0.4,  
                                curveness: 0.2  
                            }  
                        },  
                        data: [
                          {  
                              fromName: "江苏仓库",  
                              toName: "新春兴冶炼厂",  
                              coords: [[118.241233,34.377846], [117.90306,34.402946]],
                              name: "江苏仓库"+"至"+"新春兴冶炼厂",  
                              value: null
                          }
                        ]  
                    },
                    {  
                          name: '江苏用户',  
//                        type: 'effectScatter',  
                          type: 'scatter',          //这些是某一种点，比如下单用户，正常用户，还有一些其他没有下单的用户++++++++
                          coordinateSystem: 'bmap',  
                          zlevel: 2,  
//                        rippleEffect: {  
//                            brushType: 'fill',
//                            scale:5 
//                        },  
                          label: {  
                              normal: {  
                                  show: false,  
                                  position: 'right',  
                                  formatter: '{b}'  
                              }  
                          },  
                          symbolSize: 10, 
//                        effect : {
//                            show: true,
//                            shadowBlur : 0
//                        }, 
//                        itemStyle: {
//                            normal: {
//                                color: '#96B651',
//                                shadowBlur: 10,
//                                shadowColor: '#333'
//                            }
//                        }, 
                          large: true,
                          itemStyle: {
                              normal: {
                                  shadowBlur: 20,
                                  shadowColor: 'rgba(37, 140, 249, 0.8)',
                                  color: 'rgba(37, 140, 249, 0.8)'
                              }
                          },
                          data: mapgroup1.map(function (dataItem) {         //data这里的数据等接上实际数据以后就是不需要再用虚拟数据了
                              return {  
                                  name: dataItem.shop_name,  
                                  value: [dataItem.map_x,dataItem.map_y].concat([dataItem.cust_address])
                              };  
                          })         
                    },
                    {  
                        name: '江苏用户',  
                        type: 'scatter', 
                        coordinateSystem: 'bmap',  
                        zlevel: 2,    
                        label: {  
                            normal: {  
                                show: false,  
                                position: 'right',  
                                formatter: '{b}'  
                            }  
                        },  
                        symbolSize: 10, 
                        large: true,
                        itemStyle: {
                            normal: {
                                shadowBlur: 20,
                                shadowColor: 'rgba(255, 255, 255, 0.8)',
                                color: 'rgba(255, 255, 255, 0.8)'
                            }
                        },
                        data: mapgroup2.map(function (dataItem) {  
                            return {
                                name: dataItem.shop_name,  
                                value: [dataItem.map_x,dataItem.map_y].concat([dataItem.cust_address])
                            };  
                        })         
                  },
                  {  
                      name: '江苏用户',   
                      type: 'scatter', 
                      coordinateSystem: 'bmap',  
                      zlevel: 2,  
                      label: {  
                          normal: {  
                              show: false,  
                              position: 'right',  
                              formatter: '{b}'  
                          }  
                      },  
                      symbolSize: 10, 
                      large: true,
                      itemStyle: {
                          normal: {
                              shadowBlur: 20,
                              shadowColor: 'rgba(14, 241, 242, 0.8)',
                              color: 'rgba(14, 241, 242, 0.8)'
                          }
                      },
                      data: mapgroup3.map(function (dataItem) {  
                          return {  
                              name: dataItem.shop_name,  
                              value: [dataItem.map_x,dataItem.map_y].concat([dataItem.cust_address])
                          };  
                      })         
                }
                );

                var option = {
                    backgroundColor: '#404a59',  
                    title : {  
                        // text: '模拟迁徙',  
                        // subtext: '数据纯属虚构',  
                        left: 'center',  
                        textStyle : {  
                            color: '#fff'  
                        }  
                    },  
                    tooltip : {  
                        position: function (pos, params, dom, rect, size) {
                            // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧
                            // var obj = {top: 200};
                            var obj;
                            obj[['top', 'bottom'][+(pos[1] < size.viewSize[1] / 2)]] = 5;
                            obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                            return obj;
                        },
                        trigger: 'item' 
                    },   
                    bmap: {  
                        center: bmapCenter,  
                        zoom: vmapZoom,  
                        roam: true,
                        mapStyle: bmapStyle
                    },  
                    series: series  
                }; 
                myChart.clear();   
                myChart.setOption(option,true);

                var bmap=myChart.getModel().getComponent("bmap").getBMap();//这里应该是将echarts的暴露给baiduMap，
          //baiduMap可以调用"zoomend"API

          //对地图缩放进行控制+++++++++++++++

                bmap.addEventListener("zoomend", function(){
                    console.log("缩放开始，重绘地图+++++");

                    if(this.getZoom()<8&&afterMapStart==true){
                       myChart.clear();
                       setTimeout(function(){

                         series=[];
                         drawAll(mapInfoDatas);
                         initMap();

                       },100);
                    }  
                   });
                //检查点1
      },100);
  }

//江苏数据描绘完成++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


//开始描绘安徽
var drawAnhui=function(){
    initMapStart=false;
    afterMapStart=true;
    series=[];
    var gap=1;
    $.ajax({
      type: "get",
      async:false,
      url: "js/ahData.json",
      success: function(data){
         ahData=data;
      },
      error:function(XMLHttpRequest, textStatus, errorThrown){
      console.log(XMLHttpRequest);
      console.log(textStatus);
      console.log(errorThrown);
      }
    });

    while(gap<1000){
      var dataArray1=[];
      gap=gap+60;
      dataArray1.push(toObj1);
      dataArray1.push(ahData[gap]);
      HFData.push(dataArray1);
    }
    var randomCust=[];

    for(var z=0;z<300;z++){
        var orderStart=Math.random()*2000;
        var step=Math.random()*100;
        var nums=parseInt(orderStart+step);
        randomCust.push(ahData[nums]);
    }

    console.log(randomCust);

    //随机生成一部分数组

    var mapgroup1=[],mapgroup2=[],mapgroup3=[];

    for(var j=0;j<300;j++){
      mapgroup1.push(ahData[j]);
    };

    for(var k=300;k<800;k++){
      mapgroup2.push(ahData[k]);
    };

    for(var l=800;l<ahData.length;l++){
      mapgroup3.push(ahData[l]);
    };

    [['合肥', HFData]].forEach(function (item, i){  
        series.push(
                {  
                    name: '下单用户',  
                    type: 'effectScatter',   
                    coordinateSystem: 'bmap',  
                    zlevel: 10,  
                    rippleEffect: {  
                        brushType: 'fill',
                        scale:5 
                    },  
                    label: {  
                        normal: {  
                            show: false,  
                            position: 'right',  
                            formatter: '{b}'  
                        }  
                    },  
                    symbolSize: 7, 
                    effect : {
                        show: true,
                        shadowBlur : 0
                    }, 
                    itemStyle: {
                        normal: {
                            color: '#FA8695',
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    }, 
                    data: randomCust.map(function (dataItem) {  
                        return {  
                            name: dataItem.shop_name,  
                            value: [dataItem.map_x,dataItem.map_y].concat([dataItem.cust_address])
                        };  
                    })         
              }
//
              ); 
          });

      series.push(
        {  
              name: '蚌埠仓库',  
              type: 'effectScatter',  
              coordinateSystem: 'bmap',  
              zlevel: 31,  
              rippleEffect: {  
                  brushType: 'fill',
                  scale:5 
              },  
              label: {  
                  normal: {  
                      show: false,  
                      position: 'right',  
                      formatter: '{b}'  
                  }  
              },  
              symbolSize: 25, 
              effect : {
                  show: true,
                  shadowBlur : 0
              }, 
              itemStyle: {
                  normal: {
                      color: '#32EBED',
                      shadowBlur: 10,
                      shadowColor: '#333'
                  }
              }, 
              data:[{  
                  label: {
                      text: '蚌埠仓库',
                      normal:{
                        show:true,
                        textStyle:{
                          color:'#FFF',
                          fontSize:16
                        },
                        position: 'inside'
                      },
                  },
                  name: '蚌埠仓库',  
                  value: [117.209238,32.962369]
              }]
          },
          {  
              name: '宿州仓库',  
              type: 'effectScatter',  
              coordinateSystem: 'bmap',  
              zlevel: 31,  
              rippleEffect: {  
                  brushType: 'fill',
                  scale:5 
              },  
              label: {  
                  normal: {  
                      show: false,  
                      position: 'right',  
                      formatter: '{b}'  
                  }  
              },  
              symbolSize: 25, 
              effect : {
                  show: true,
                  shadowBlur : 0
              }, 
              itemStyle: {
                  normal: {
                      color: '#9DD3F2',
                      shadowBlur: 10,
                      shadowColor: '#333'
                  }
              }, 
              data:[{  
                  label: {
                      text: '宿州仓库',
                      normal:{
                        show:true,
                        textStyle:{
                          color:'#FFF',
                          fontSize:16
                        },
                        position: 'inside'
                      },
                  },
                  name: '宿州仓库',  
                  value: [116.997584,33.612819]
              }]
         },
        {  
              name: '合肥仓库',  
              type: 'effectScatter',  
              coordinateSystem: 'bmap',  
              zlevel: 31,  
              rippleEffect: {  
                  brushType: 'fill',
                  scale:5 
              },  
              label: {  
                  normal: {  
                      show: false,  
                      position: 'right',  
                      formatter: '{b}'  
                  }  
              },  
              symbolSize: 25, 
              effect : {
                  show: true,
                  shadowBlur : 0
              }, 
              itemStyle: {
                  normal: {
                      color: '#FAAA74',
                      shadowBlur: 10,
                      shadowColor: '#333'
                  }
              }, 
              data:[{  
                  label: {
                      text: '合肥仓库',
                      normal:{
                        show:true,
                        textStyle:{
                          color:'#FFF',
                          fontSize:16
                        },
                        position: 'inside'
                      },
                  },
                  name: '合肥仓库',  
                  value: [117.563205,31.765229]
              }]
          },
         {  
              name: '界首冶炼厂',  
              type: 'effectScatter',  
              coordinateSystem: 'bmap',  
              zlevel: 31,  
              rippleEffect: {  
                  brushType: 'fill',
                  scale:5 
              },  
              label: {  
                  normal: {  
                      show: false,  
                      position: 'right',  
                      formatter: '{b}'  
                  }  
              },  
              symbolSize: 25, 
              effect : {
                  show: true,
                  shadowBlur : 0
              }, 
              itemStyle: {
                  normal: {
                      color: '#CB8EFA',
                      shadowBlur: 10,
                      shadowColor: '#333'
                  }
              }, 
              data:[{  
                  label: {
                      text: '界首冶炼厂',
                      normal:{
                        show:true,
                        textStyle:{
                          color:'#FFF',
                          fontSize:16
                        },
                        position: 'inside'
                      },
                  },
                  name: '界首冶炼厂',  
                  value: [115.398643,33.226193]
              }]
          },
          {  
              name: "仓库至冶炼厂",  
              type: 'lines',  
              coordinateSystem: 'bmap',  
              zlevel: 4,  
              effect: {  
                  show: true,  
                  period: 6,  
                  trailLength: 0.3,  
                  color: '#FC626C',  
                  symbolSize: 8  
              },  
              lineStyle: {  
                  normal: {   
                      width: 0,  
                      curveness: 0.2  
                  }  
              },  
              data: [
                {  
                    fromName: "安徽仓库",  
                    toName: "界首冶炼厂",  
                    coords: [[117.209238,32.962369], [115.398643,33.226193]],
                    name: "安徽仓库"+"至"+"界首冶炼厂",  
                    value: null
                }
              ] 
          },  
          {  
              name: "仓库至冶炼厂",    
              type: 'lines',  
              coordinateSystem: 'bmap',  
              zlevel: 5,  
              effect: {  
                  show: true,  
                  period: 6,  
                  trailLength: 0,  
                  symbol: planePath,  
                  symbolSize: 0  
              },  
              lineStyle: {  
                  normal: {  
                      color: "#FFF5C9",  
                      width: 8,  
                      opacity: 0.4,  
                      curveness: 0.2  
                  }  
              },  
              data: [
                {  
                    fromName: "安徽仓库",  
                    toName: "界首冶炼厂",  
                    coords: [[117.209238,32.962369], [115.398643,33.226193]],
                    name: "安徽仓库"+"至"+"界首冶炼厂",  
                    value: null
                }
              ]  
          },
          {  
              name: "仓库至冶炼厂",  
              type: 'lines',  
              coordinateSystem: 'bmap',  
              zlevel: 6,  
              effect: {  
                  show: true,  
                  period: 6,  
                  trailLength: 0.3,  
                  color: '#FC626C',  
                  symbolSize: 8  
              },  
              lineStyle: {  
                  normal: {   
                      width: 0,  
                      curveness: 0.2  
                  }  
              },  
              data: [
                {  
                    fromName: "安徽仓库",  
                    toName: "界首冶炼厂",  
                    coords: [[116.997584,33.612819], [115.398643,33.226193]],
                    name: "安徽仓库"+"至"+"界首冶炼厂",  
                    value: null
                }
              ] 
          },  
          {  
              name: "仓库至冶炼厂",    
              type: 'lines',  
              coordinateSystem: 'bmap',  
              zlevel: 7,  
              effect: {  
                  show: true,  
                  period: 6,  
                  trailLength: 0,  
                  symbol: planePath,  
                  symbolSize: 0  
              },  
              lineStyle: {  
                  normal: {  
                      color: "#FFF5C9",  
                      width: 8,  
                      opacity: 0.4,  
                      curveness: 0.2  
                  }  
              },  
              data: [
                {  
                    fromName: "安徽仓库",  
                    toName: "界首冶炼厂",  
                    coords: [[116.997584,33.612819], [115.398643,33.226193]],
                    name: "安徽仓库"+"至"+"界首冶炼厂",  
                    value: null
                }
              ]  
          },
          {  
              name: "仓库至冶炼厂",  
              type: 'lines',  
              coordinateSystem: 'bmap',  
              zlevel: 8,  
              effect: {  
                  show: true,  
                  period: 6,  
                  trailLength: 0.3,  
                  color: '#FC626C',  
                  symbolSize: 8  
              },  
              lineStyle: {  
                  normal: {   
                      width: 0,  
                      curveness: 0.2  
                  }  
              },  
              data: [
                {  
                    fromName: "安徽仓库",  
                    toName: "界首冶炼厂",  
                    coords: [[117.563205,31.765229], [115.398643,33.226193]],
                    name: "安徽仓库"+"至"+"界首冶炼厂",  
                    value: null
                }
              ] 
          },  
          {  
              name: "仓库至冶炼厂",    
              type: 'lines',  
              coordinateSystem: 'bmap',  
              zlevel: 9,  
              effect: {  
                  show: true,  
                  period: 6,  
                  trailLength: 0,  
                  symbol: planePath,  
                  symbolSize: 0  
              },  
              lineStyle: {  
                  normal: {  
                      color: "#FFF5C9",  
                      width: 8,  
                      opacity: 0.4,  
                      curveness: 0.2  
                  }  
              },  
              data: [
                {  
                    fromName: "安徽仓库",  
                    toName: "界首冶炼厂",  
                    coords: [[117.563205,31.765229], [115.398643,33.226193]],
                    name: "安徽仓库"+"至"+"界首冶炼厂",  
                    value: null
                }
              ]  
          },
          {  
                name: '合肥用户',  
//                type: 'effectScatter',  
                type: 'scatter', 
                coordinateSystem: 'bmap',  
                zlevel: 2,  
//                rippleEffect: {  
//                    brushType: 'fill',
//                    scale:5 
//                },  
                label: {  
                    normal: {  
                        show: false,  
                        position: 'right',  
                        formatter: '{b}'  
                    }  
                },  
                symbolSize: 10, 
//                effect : {
//                    show: true,
//                    shadowBlur : 0
//                }, 
//                itemStyle: {
//                    normal: {
//                        color: '#96B651',
//                        shadowBlur: 10,
//                        shadowColor: '#333'
//                    }
//                }, 
                large: true,
                itemStyle: {
                    normal: {
                        shadowBlur: 20,
                        shadowColor: 'rgba(37, 140, 249, 0.8)',
                        color: 'rgba(37, 140, 249, 0.8)'
                    }
                },
                data: mapgroup1.map(function (dataItem) {  
                    return {  
                        name: dataItem.shop_name,  
                        value: [dataItem.map_x,dataItem.map_y].concat([dataItem.cust_address])
                    };  
                })         
          },
          {  
              name: '合肥用户',  
              type: 'scatter', 
              coordinateSystem: 'bmap',  
              zlevel: 2,    
              label: {  
                  normal: {  
                      show: false,  
                      position: 'right',  
                      formatter: '{b}'  
                  }  
              },  
              symbolSize: 10, 
              large: true,
              itemStyle: {
                  normal: {
                      shadowBlur: 20,
                      shadowColor: 'rgba(255, 255, 255, 0.8)',
                      color: 'rgba(255, 255, 255, 0.8)'
                  }
              },
              data: mapgroup2.map(function (dataItem) {  
                  return {  
                      name: dataItem.shop_name,  
                      value: [dataItem.map_x,dataItem.map_y].concat([dataItem.cust_address])
                  };  
              })         
        },
        {  
            name: '合肥用户',   
            type: 'scatter', 
            coordinateSystem: 'bmap',  
            zlevel: 2,  
            label: {  
                normal: {  
                    show: false,  
                    position: 'right',  
                    formatter: '{b}'  
                }  
            },  
            symbolSize: 10, 
            large: true,
            itemStyle: {
                normal: {
                    shadowBlur: 20,
                    shadowColor: 'rgba(14, 241, 242, 0.8)',
                    color: 'rgba(14, 241, 242, 0.8)'
                }
            },
            data: mapgroup3.map(function (dataItem) {  
                return {  
                    name: dataItem.shop_name,  
                    value: [dataItem.map_x,dataItem.map_y].concat([dataItem.cust_address])
                };  
            })         
      }
      );

      var option = {  
          backgroundColor: '#404a59',  
          title : {  
              // text: '模拟迁徙',  
              // subtext: '数据纯属虚构',  
              left: 'center',  
              textStyle : {  
                  color: '#fff'  
              }  
          },  
          tooltip : {  
              position: function (pos, params, dom, rect, size) {
                  // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧
                  // var obj = {top: 200};
                  var obj;
                  obj[['top', 'bottom'][+(pos[1] < size.viewSize[1] / 2)]] = 5;
                  obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                  return obj;
              },
              trigger: 'item' 
          },   
          bmap: {  
              center: bmapCenter,  
              zoom: vmapZoom,  
              roam: true,
              mapStyle: bmapStyle
          },  
          series: series  
      }; 
      myChart.clear();   
      myChart.setOption(option,true);

      var bmap=myChart.getModel().getComponent("bmap").getBMap();

      var steps=1;
      var ahGroup1=[],ahGroup2=[],ahGroup3=[];

      while(steps<9800){
        try //非IE
        {
            steps=steps+20;
            var temp=ahData[steps];
          var tempX=temp.map_x; 
            var tempY=temp.map_y; 
              var point1=new BMap.Point(117.209238,32.962369);
              var point2=new BMap.Point(116.997584,33.612819);
              var point3=new BMap.Point(117.563205,31.765229);
              var pointB = new BMap.Point(tempX,tempY);
              var len1 = bmap.getDistance(point1,pointB).toFixed(2);
              var len2 = bmap.getDistance(point2,pointB).toFixed(2);
              var len3 = bmap.getDistance(point3,pointB).toFixed(2);
              if(len1<60000){
                ahGroup1.push(ahData[steps]); 
              }
              if(len2<60000){
                ahGroup2.push(ahData[steps]); 
              }
              if(len3<60000){
                ahGroup3.push(ahData[steps]); 
              }
         
        }
        catch(e)//IE
        {
          console.log(steps);
        }
      }

      console.log(ahGroup1.length);
      console.log(ahGroup2.length);
      console.log(ahGroup3.length);

      setTimeout(function(){
          series=[];
          var toCo1={},toCo2={},toCo3={};
          toCo1.name="蚌埠仓库";
          toCo1.map=[117.209238,32.962369];
          toCo2.name="宿州仓库";
          toCo2.map=[116.997584,33.612819];
          toCo3.name="合肥仓库";
          toCo3.map=[117.563205,31.765229];
           [['合肥', HFData]].forEach(function (item, i){  
        series.push(
                {  
                    name: '下单用户',  
                    type: 'effectScatter',   
                    coordinateSystem: 'bmap',  
                    zlevel: 10,  
                    rippleEffect: {  
                        brushType: 'fill',
                        scale:5 
                    },  
                    label: {  
                        normal: {  
                            show: false,  
                            position: 'right',  
                            formatter: '{b}'  
                        }  
                    },  
                    symbolSize: 7, 
                    effect : {
                        show: true,
                        shadowBlur : 0
                    }, 
                    itemStyle: {
                        normal: {
                            color: '#FA8695',
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    }, 
                    data: randomCust.map(function (dataItem) {  
                        return {  
                            name: dataItem.shop_name,  
                            value: [dataItem.map_x,dataItem.map_y].concat([dataItem.cust_address])
                        };  
                    })         
              },
              {  
                  name: item[0],  
                  type: 'lines',  
                  coordinateSystem: 'bmap',  
                  zlevel: 15,  
                  effect: {  
                      show: true,  
                      period: 16,  
                      trailLength: 0.3,  
                      color: '#fff',  
                      symbolSize: 5  
                  },  
                  lineStyle: {  
                      normal: {  
                          color: color[i],  
                          width: 0,  
                          curveness: 0.2  
                      }  
                  },  
                  data: convertData1(toCo1,ahGroup1)
              },  
              {  
                  name: item[0] ,  
                  type: 'lines',  
                  coordinateSystem: 'bmap',  
                  zlevel: 16,  
                  effect: {  
                      show: true,  
                      period: 6,  
                      trailLength: 0,  
                      symbol: planePath,  
                      symbolSize: 0  
                  },  
                  lineStyle: {  
                      normal: {  
                          color: color[i],  
                          width: 2,  
                          opacity: 0.4,  
                          curveness: 0.2  
                      }  
                  },  
                  data: convertData1(toCo1,ahGroup1)  
                 },
                               {  
                  name: item[0],  
                  type: 'lines',  
                  coordinateSystem: 'bmap',  
                  zlevel: 17,  
                  effect: {  
                      show: true,  
                      period: 16,  
                      trailLength: 0.3,  
                      color: '#fff',  
                      symbolSize: 5  
                  },  
                  lineStyle: {  
                      normal: {  
                          color: color[i],  
                          width: 0,  
                          curveness: 0.2  
                      }  
                  },  
                  data: convertData1(toCo2,ahGroup2)
              },  
              {  
                  name: item[0] ,  
                  type: 'lines',  
                  coordinateSystem: 'bmap',  
                  zlevel: 18,  
                  effect: {  
                      show: true,  
                      period: 6,  
                      trailLength: 0,  
                      symbol: planePath,  
                      symbolSize: 0  
                  },  
                  lineStyle: {  
                      normal: {  
                          color: color[i],  
                          width: 2,  
                          opacity: 0.4,  
                          curveness: 0.2  
                      }  
                  },  
                  data: convertData1(toCo2,ahGroup2)  
                 },              {  
                  name: item[0],  
                  type: 'lines',  
                  coordinateSystem: 'bmap',  
                  zlevel: 19,  
                  effect: {  
                      show: true,  
                      period: 16,  
                      trailLength: 0.3,  
                      color: '#fff',  
                      symbolSize: 5  
                  },  
                  lineStyle: {  
                      normal: {  
                          color: color[i],  
                          width: 0,  
                          curveness: 0.2  
                      }  
                  },  
                  data: convertData1(toCo3,ahGroup3)
              },  
              {  
                  name: item[0] ,  
                  type: 'lines',  
                  coordinateSystem: 'bmap',  
                  zlevel: 20,  
                  effect: {  
                      show: true,  
                      period: 6,  
                      trailLength: 0,  
                      symbol: planePath,  
                      symbolSize: 0  
                  },  
                  lineStyle: {  
                      normal: {  
                          color: color[i],  
                          width: 2,  
                          opacity: 0.4,  
                          curveness: 0.2  
                      }  
                  },  
                  data: convertData1(toCo3,ahGroup3)  
                 }
              ); 
          });
      series.push(
        {  
              name: '蚌埠仓库',  
              type: 'effectScatter',  
              coordinateSystem: 'bmap',  
              zlevel: 11,  
              rippleEffect: {  
                  brushType: 'fill',
                  scale:5 
              },  
              label: {  
                  normal: {  
                      show: false,  
                      position: 'right',  
                      formatter: '{b}'  
                  }  
              },  
              symbolSize: 25, 
              effect : {
                  show: true,
                  shadowBlur : 0
              }, 
              itemStyle: {
                  normal: {
                      color: '#32EBED',
                      shadowBlur: 10,
                      shadowColor: '#333'
                  }
              }, 
              data:[{  
                  label: {
                      text: '蚌埠仓库',
                      normal:{
                        show:true,
                        textStyle:{
                          color:'#FFF',
                          fontSize:16
                        },
                        position: 'inside'
                      },
                  },
                  name: '蚌埠仓库',  
                  value: [117.209238,32.962369]
              }]
          },
          {  
              name: '宿州仓库',  
              type: 'effectScatter',  
              coordinateSystem: 'bmap',  
              zlevel: 11,  
              rippleEffect: {  
                  brushType: 'fill',
                  scale:5 
              },  
              label: {  
                  normal: {  
                      show: false,  
                      position: 'right',  
                      formatter: '{b}'  
                  }  
              },  
              symbolSize: 25, 
              effect : {
                  show: true,
                  shadowBlur : 0
              }, 
              itemStyle: {
                  normal: {
                      color: '#9DD3F2',
                      shadowBlur: 10,
                      shadowColor: '#333'
                  }
              }, 
              data:[{  
                  label: {
                      text: '宿州仓库',
                      normal:{
                        show:true,
                        textStyle:{
                          color:'#FFF',
                          fontSize:16
                        },
                        position: 'inside'
                      },
                  },
                  name: '宿州仓库',  
                  value: [116.997584,33.612819]
              }]
         },
        {  
              name: '合肥仓库',  
              type: 'effectScatter',  
              coordinateSystem: 'bmap',  
              zlevel: 11,  
              rippleEffect: {  
                  brushType: 'fill',
                  scale:5 
              },  
              label: {  
                  normal: {  
                      show: false,  
                      position: 'right',  
                      formatter: '{b}'  
                  }  
              },  
              symbolSize: 25, 
              effect : {
                  show: true,
                  shadowBlur : 0
              }, 
              itemStyle: {
                  normal: {
                      color: '#FAAA74',
                      shadowBlur: 10,
                      shadowColor: '#333'
                  }
              }, 
              data:[{  
                  label: {
                      text: '合肥仓库',
                      normal:{
                        show:true,
                        textStyle:{
                          color:'#FFF',
                          fontSize:16
                        },
                        position: 'inside'
                      },
                  },
                  name: '合肥仓库',  
                  value: [117.563205,31.765229]
              }]
          },
         {  
              name: '界首冶炼厂',  
              type: 'effectScatter',  
              coordinateSystem: 'bmap',  
              zlevel: 3,  
              rippleEffect: {  
                  brushType: 'fill',
                  scale:5 
              },  
              label: {  
                  normal: {  
                      show: false,  
                      position: 'right',  
                      formatter: '{b}'  
                  }  
              },  
              symbolSize: 25, 
              effect : {
                  show: true,
                  shadowBlur : 0
              }, 
              itemStyle: {
                  normal: {
                      color: '#CB8EFA',
                      shadowBlur: 10,
                      shadowColor: '#333'
                  }
              }, 
              data:[{  
                  label: {
                      text: '界首冶炼厂',
                      normal:{
                        show:true,
                        textStyle:{
                          color:'#FFF',
                          fontSize:16
                        },
                        position: 'inside'
                      },
                  },
                  name: '界首冶炼厂',  
                  value: [115.398643,33.226193]
              }]
          },
          {  
              name: "仓库至冶炼厂",  
              type: 'lines',  
              coordinateSystem: 'bmap',  
              zlevel: 4,  
              effect: {  
                  show: true,  
                  period: 6,  
                  trailLength: 0.3,  
                  color: '#FC626C',  
                  symbolSize: 8  
              },  
              lineStyle: {  
                  normal: {   
                      width: 0,  
                      curveness: 0.2  
                  }  
              },  
              data: [
                {  
                    fromName: "安徽仓库",  
                    toName: "界首冶炼厂",  
                    coords: [[117.209238,32.962369], [115.398643,33.226193]],
                    name: "安徽仓库"+"至"+"界首冶炼厂",  
                    value: null
                }
              ] 
          },  
          {  
              name: "仓库至冶炼厂",    
              type: 'lines',  
              coordinateSystem: 'bmap',  
              zlevel: 5,  
              effect: {  
                  show: true,  
                  period: 6,  
                  trailLength: 0,  
                  symbol: planePath,  
                  symbolSize: 0  
              },  
              lineStyle: {  
                  normal: {  
                      color: "#FFF5C9",  
                      width: 8,  
                      opacity: 0.4,  
                      curveness: 0.2  
                  }  
              },  
              data: [
                {  
                    fromName: "安徽仓库",  
                    toName: "界首冶炼厂",  
                    coords: [[117.209238,32.962369], [115.398643,33.226193]],
                    name: "安徽仓库"+"至"+"界首冶炼厂",  
                    value: null
                }
              ]  
          },
          {  
              name: "仓库至冶炼厂",  
              type: 'lines',  
              coordinateSystem: 'bmap',  
              zlevel: 6,  
              effect: {  
                  show: true,  
                  period: 6,  
                  trailLength: 0.3,  
                  color: '#FC626C',  
                  symbolSize: 8  
              },  
              lineStyle: {  
                  normal: {   
                      width: 0,  
                      curveness: 0.2  
                  }  
              },  
              data: [
                {  
                    fromName: "安徽仓库",  
                    toName: "界首冶炼厂",  
                    coords: [[116.997584,33.612819], [115.398643,33.226193]],
                    name: "安徽仓库"+"至"+"界首冶炼厂",  
                    value: null
                }
              ] 
          },  
          {  
              name: "仓库至冶炼厂",    
              type: 'lines',  
              coordinateSystem: 'bmap',  
              zlevel: 7,  
              effect: {  
                  show: true,  
                  period: 6,  
                  trailLength: 0,  
                  symbol: planePath,  
                  symbolSize: 0  
              },  
              lineStyle: {  
                  normal: {  
                      color: "#FFF5C9",  
                      width: 8,  
                      opacity: 0.4,  
                      curveness: 0.2  
                  }  
              },  
              data: [
                {  
                    fromName: "安徽仓库",  
                    toName: "界首冶炼厂",  
                    coords: [[116.997584,33.612819], [115.398643,33.226193]],
                    name: "安徽仓库"+"至"+"界首冶炼厂",  
                    value: null
                }
              ]  
          },
          {  
              name: "仓库至冶炼厂",  
              type: 'lines',  
              coordinateSystem: 'bmap',  
              zlevel: 8,  
              effect: {  
                  show: true,  
                  period: 6,  
                  trailLength: 0.3,  
                  color: '#FC626C',  
                  symbolSize: 8  
              },  
              lineStyle: {  
                  normal: {   
                      width: 0,  
                      curveness: 0.2  
                  }  
              },  
              data: [
                {  
                    fromName: "安徽仓库",  
                    toName: "界首冶炼厂",  
                    coords: [[117.563205,31.765229], [115.398643,33.226193]],
                    name: "安徽仓库"+"至"+"界首冶炼厂",  
                    value: null
                }
              ] 
          },  
          {  
              name: "仓库至冶炼厂",    
              type: 'lines',  
              coordinateSystem: 'bmap',  
              zlevel: 9,  
              effect: {  
                  show: true,  
                  period: 6,  
                  trailLength: 0,  
                  symbol: planePath,  
                  symbolSize: 0  
              },  
              lineStyle: {  
                  normal: {  
                      color: "#FFF5C9",  
                      width: 8,  
                      opacity: 0.4,  
                      curveness: 0.2  
                  }  
              },  
              data: [
                {  
                    fromName: "安徽仓库",  
                    toName: "界首冶炼厂",  
                    coords: [[117.563205,31.765229], [115.398643,33.226193]],
                    name: "安徽仓库"+"至"+"界首冶炼厂",  
                    value: null
                }
              ]  
          },
          {  
                name: '合肥用户',  
//                type: 'effectScatter',  
                type: 'scatter', 
                coordinateSystem: 'bmap',  
                zlevel: 2,  
//                rippleEffect: {  
//                    brushType: 'fill',
//                    scale:5 
//                },  
                label: {  
                    normal: {  
                        show: false,  
                        position: 'right',  
                        formatter: '{b}'  
                    }  
                },  
                symbolSize: 10, 
//                effect : {
//                    show: true,
//                    shadowBlur : 0
//                }, 
//                itemStyle: {
//                    normal: {
//                        color: '#96B651',
//                        shadowBlur: 10,
//                        shadowColor: '#333'
//                    }
//                }, 
                large: true,
                itemStyle: {
                    normal: {
                        shadowBlur: 20,
                        shadowColor: 'rgba(37, 140, 249, 0.8)',
                        color: 'rgba(37, 140, 249, 0.8)'
                    }
                },
                data: mapgroup1.map(function (dataItem) {  
                    return {  
                        name: dataItem.shop_name,  
                        value: [dataItem.map_x,dataItem.map_y].concat([dataItem.cust_address])
                    };  
                })         
          },
          {  
              name: '合肥用户',  
              type: 'scatter', 
              coordinateSystem: 'bmap',  
              zlevel: 2,    
              label: {  
                  normal: {  
                      show: false,  
                      position: 'right',  
                      formatter: '{b}'  
                  }  
              },  
              symbolSize: 10, 
              large: true,
              itemStyle: {
                  normal: {
                      shadowBlur: 20,
                      shadowColor: 'rgba(255, 255, 255, 0.8)',
                      color: 'rgba(255, 255, 255, 0.8)'
                  }
              },
              data: mapgroup2.map(function (dataItem) {  
                  return {  
                      name: dataItem.shop_name,  
                      value: [dataItem.map_x,dataItem.map_y].concat([dataItem.cust_address])
                  };  
              })         
        },
        {  
            name: '合肥用户',   
            type: 'scatter', 
            coordinateSystem: 'bmap',  
            zlevel: 2,  
            label: {  
                normal: {  
                    show: false,  
                    position: 'right',  
                    formatter: '{b}'  
                }  
            },  
            symbolSize: 10, 
            large: true,
            itemStyle: {
                normal: {
                    shadowBlur: 20,
                    shadowColor: 'rgba(14, 241, 242, 0.8)',
                    color: 'rgba(14, 241, 242, 0.8)'
                }
            },
            data: mapgroup3.map(function (dataItem) {  
                return {  
                    name: dataItem.shop_name,  
                    value: [dataItem.map_x,dataItem.map_y].concat([dataItem.cust_address])
                };  
            })         
      }
      );
      var option = {  
          backgroundColor: '#404a59',  
          title : {  
              // text: '模拟迁徙',  
              // subtext: '数据纯属虚构',  
              left: 'center',  
              textStyle : {  
                  color: '#fff'  
              }  
          },  
          tooltip : {  
              position: function (pos, params, dom, rect, size) {
                  // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧
                  // var obj = {top: 200};
                  var obj;
                  obj[['top', 'bottom'][+(pos[1] < size.viewSize[1] / 2)]] = 5;
                  obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                  return obj;
              },
              trigger: 'item' 
          },   
          bmap: {  
              center: bmapCenter,  
              zoom: vmapZoom,  
              roam: true,
              mapStyle: bmapStyle
          },  
          series: series  
      }; 
      myChart.clear();   
      myChart.setOption(option,true);
      var bmap=myChart.getModel().getComponent("bmap").getBMap();
      bmap.addEventListener("zoomend", function(){    
          if(this.getZoom()<8&&afterMapStart==true){
           myChart.clear();
             setTimeout(function(){
               drawAll(mapInfoDatas);
               initMap();
             },100);
          }  
         });
      },100);
      // myChart.on('click', function (params) {
      //     console.log(params);
      // });
  }


    //开始描绘济南+++++++++++++++++++++++
    //加载山东的数据+++++++++++++++++++++++++++

 var drawJinan=function(){
    initMapStart=false;
    afterMapStart=true;
    series=[];
    $.ajax({
      type: "get",
      async:false,
      url: "js/shandongData.json",
      success: function(data){
        sdData=data;
      },
      error:function(XMLHttpRequest, textStatus, errorThrown){
      console.log(XMLHttpRequest);
      console.log(textStatus);
      console.log(errorThrown);
      }
    });

    for(var i=0;i<50;i++){
      var dataArray=[];
      dataArray.push(toObj);
      dataArray.push(sdData[i]);
      JNData.push(dataArray);
    }

     //随机生成一部分数组+++++++++++++++++++++++++

    var randomCust=[];

    for(var z=0;z<100;z++){
        var orderStart=Math.random()*2000;
        var step=Math.random()*100;
        var nums=parseInt(orderStart+step);
        randomCust.push(sdData[nums]);
    }
    var mapgroup1=[],mapgroup2=[],mapgroup3=[];
    for(var j=0;j<500;j++){
      mapgroup1.push(sdData[j]);
    };
    for(var k=500;k<1400;k++){
      mapgroup2.push(sdData[k]);
    }; 
    for(var l=1400;l<sdData.length;l++){
      mapgroup3.push(sdData[l]);
    };

    series.push(
            {  
                name: '下单用户',  
                type: 'effectScatter',   
                coordinateSystem: 'bmap',  
                zlevel: 10,  
                rippleEffect: {  
                    brushType: 'fill',
                    scale:5 
                },  
                label: {  
                    normal: {  
                        show: false,  
                        position: 'right',  
                        formatter: '{b}'  
                    }  
                },  
                symbolSize: 7, 
                effect : {
                    show: true,
                    shadowBlur : 0
                }, 
                itemStyle: {
                    normal: {
                        color: '#FA8695',
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                }, 
                data: randomCust.map(function (dataItem) {  
                    return {  
                        name: dataItem.shop_name,  
                        value: [dataItem.map_x,dataItem.map_y].concat([dataItem.cust_address])
                    };  
                })         
          },
         // {  
         //      name: '济南仓库',  
         //      type: 'effectScatter',  
         //      coordinateSystem: 'bmap',  
         //      zlevel: 3,  
         //      rippleEffect: {  
         //          brushType: 'fill',
         //          scale:5 
         //      },  
         //      label: {  
         //          normal: {  
         //              show: false,  
         //              position: 'right',  
         //              formatter: '{b}'  
         //          }  
         //      },  
         //      symbolSize: 25, 
         //      effect : {
         //          show: true,
         //          shadowBlur : 0
         //      }, 
         //      itemStyle: {
         //          normal: {
         //              color: '#5FF7C9',
         //              shadowBlur: 10,
         //              shadowColor: '#333'
         //          }
         //      }, 
         //      data:[{  
         //          label: {
         //              text: '济南仓库',
         //              normal:{
         //                show:true,
         //                textStyle:{
         //                  color:'#FFF',
         //                  fontSize:16
         //                },
         //                position: 'inside'
         //              },
         //          },
         //          name: '济南仓库',  
         //          value: [117.024967,36.682785]
         //      }]
         //  },
           {  
                name: '济南用户',  
//                type: 'effectScatter', 
                type: 'scatter',  
                coordinateSystem: 'bmap',  
                zlevel: 2,  
//                rippleEffect: {  
//                    brushType: 'fill',
//                    scale:5 
//                },  
                label: {  
                    normal: {  
                        show: false,  
                        position: 'right',  
                        formatter: '{b}'  
                    }  
                },  
                symbolSize: 10, 
//                effect : {
//                    show: true,
//                    shadowBlur : 0
//                }, 
//                itemStyle: {
//                    normal: {
//                        color: '#E7DC5A',
//                        shadowBlur: 10,
//                        shadowColor: '#333'
//                    }
//                },
                large: true,
                itemStyle: {
                    normal: {
                        shadowBlur: 20,
                        shadowColor: 'rgba(255, 255, 255, 0.8)',
                        color: 'rgba(255, 255, 255, 0.8)'
                    }
                },
                data: mapgroup3.map(function (dataItem) {  
                    return {  
                        name: dataItem.shop_name,  
                        value: [dataItem.map_x,dataItem.map_y].concat([dataItem.cust_address])
                    };  
                })  
            },
            {  
                name: '济南用户',  
                type: 'scatter',  
                coordinateSystem: 'bmap',  
                zlevel: 2,  
                label: {  
                    normal: {  
                        show: false,  
                        position: 'right',  
                        formatter: '{b}'  
                    }  
                },  
                symbolSize: 10, 
                large: true,
                itemStyle: {
                    normal: {
                        shadowBlur: 20,
                        shadowColor: 'rgba(14, 241, 242, 0.8)',
                        color: 'rgba(14, 241, 242, 0.8)'
                    }
                },
                data: mapgroup2.map(function (dataItem) {  
                    return {  
                        name: dataItem.shop_name,  
                        value: [dataItem.map_x,dataItem.map_y].concat([dataItem.cust_address])
                    };  
                })  
            },
            {  
                name: '济南用户',  
                type: 'scatter',  
                coordinateSystem: 'bmap',  
                zlevel: 2,    
                label: {  
                    normal: {  
                        show: false,  
                        position: 'right',  
                        formatter: '{b}'  
                    }  
                },  
                symbolSize: 10, 
                large: true,
                itemStyle: {
                    normal: {
                        shadowBlur: 20,
                        shadowColor: 'rgba(37, 140, 249, 0.8)',
                        color: 'rgba(37, 140, 249, 0.8)'
                    }
                },
                data: mapgroup1.map(function (dataItem) {  
                    return {  
                        name: dataItem.shop_name,  
                        value: [dataItem.map_x,dataItem.map_y].concat([dataItem.cust_address])
                    };  
                })  
            }
      );
      //描绘济南
      var option = {  
          backgroundColor: '#404a59',  
          title : {  
              // text: '模拟迁徙',  
              // subtext: '数据纯属虚构',  
              left: 'center',  
              textStyle : {  
                  color: '#fff'  
              }  
          },  
          tooltip : {  
              position: function (pos, params, dom, rect, size) {
                  // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧
                  // var obj = {top: pos[1],left :pos[0]};
                  var obj;
                  obj[['top', 'bottom'][+(pos[1] < size.viewSize[1] / 2)]] = 5;
                  obj[['left', 'right'][+(pos[0] < size.viewSize[1] / 2)]] = 5;
                  return obj;
              },
              trigger: 'item' 
          },   
          bmap: {  
              center: bmapCenter,  
              zoom: vmapZoom,  
              roam: true,
              mapStyle: bmapStyle
          },  
          series: series  
      };

      myChart.clear();   
      myChart.setOption(option,true);


      var bmap=myChart.getModel().getComponent("bmap").getBMap();

      bmap.addEventListener("zoomend", function(){

          console.log("地图缩放了+++++++++++++++++++++++++++")

       if(this.getZoom()<8&&afterMapStart==true){
        myChart.clear();
          setTimeout(function(){
          drawAll(mapInfoDatas);
            initMap();
          },100);
       }


      })
  };


function initMap(){
    initMapStart=true;
    afterMapStart=false;
    for(var i=0;i<initMapDate.length;i++){
      series.push(
       {  
          name: initMapDate[i].name+'用户',  
          type: 'effectScatter',  
          coordinateSystem: 'bmap',  
          zlevel: 3,  
          rippleEffect: {  
              brushType: 'fill',
              scale:5 
          },  
          label: {  
              normal: {  
                  show: false,  
                  position: 'right',  
                  formatter: '{b}'  
              }  
          },  
          symbolSize: 45, 
          effect : {
              show: true,
              shadowBlur : 0
          }, 
          itemStyle: {
              normal: {
                  color: color[i],
                  shadowBlur: 10,
                  shadowColor: '#333'
              }
          }, 
          data:[{  
              label: {
                  text: initMapDate[i].name+'用户',
                  normal:{
                    show:true,
                    textStyle:{
                      color:'#FFF',
                      fontSize:16
                    },
                    position: 'inside'
                  },
              },
              name: initMapDate[i].name,  
              value: [initMapDate[i].map_x,initMapDate[i].map_y].concat([initMapDate[i].value])
          }]
      }
    );
  }
  var option = {  
    backgroundColor: '#404a59',  
    title : {  
        // text: '模拟迁徙',  
        // subtext: '数据纯属虚构',  
        left: 'center',  
        textStyle : {  
            color: '#fff'  
        }  
    },  
    tooltip : {  
        trigger: 'item',
        formatter: '{b0}:{c0}<br />' 
    },   
    bmap: {  
        center: [117.188107,34.271553],  
        zoom: 8,  
        roam: true,
        mapStyle: bmapStyle
    },  
    series: series  
  };   
  myChart.clear();  
  myChart.setOption(option,true);
  var bmap=myChart.getModel().getComponent("bmap").getBMap();
             var myGeo = new BMap.Geocoder();
       myGeo.getPoint("江苏  连云港市", function (point) {
         console.log(point);
       })
//  myChart.on('click', function (params) {
//      initMapClick=params.name;
//      if(initMapStart==true){
//        if(params.name=="济南"){
//          vmapZoom=13;
//          bmapCenter=[117.024967,36.682785];
//          getUsersDatas(25,drawJinan);
//        }else if(params.name=="合肥"){
//            vmapZoom=7;
//            bmapCenter=[117.563205,31.765229];
//            getUsersDatas(22,drawAnhui);
//         }else{
//            vmapZoom=7;
//            bmapCenter=[118.595978,32.976494];
//            getUsersDatas(20,drawJiangsu);
//         }
//      }
//  });
  myChart.on('dblclick', function (params) {
      initMapClick=params.name;
      if(initMapStart==true){
        if(params.name=="山东"){
          vmapZoom=9;
          bmapCenter=[117.024967,36.682785];
          getUsersDatas(25,drawJinan);
        }else if(params.name=="安徽"){
          vmapZoom=9;
          bmapCenter=[117.209238,32.962369];
          getUsersDatas(22,drawAnhui);
        }else{
            vmapZoom=9;
            bmapCenter=[118.241233,34.377846];
          getUsersDatas(20,drawJiangsu);
        }
    }
  });
//  bmap.addEventListener("zoomend", function(){   
//   if(this.getZoom()>6&&initMapStart==true&&initMapClick!="济南"){
//      series=[];
//      drawAnhui();
//   };    
//  });
 };


//描绘所有的+++，地图缩放时候就会重绘地图++++++++++++

var drawAll=function(mapInfoDatas){
  var mids1=[],mids2=[],mids3=[];
  var datas=mapInfoDatas.rows;
  for(var i=0;i<8000;i++){
    mids1.push(datas[i]);
  }
  for(var j=8000;j<14000;j++){
    mids2.push(datas[j]);
  }
  for(var k=14000;k<datas.length;k++){
    mids3.push(datas[k]);
  }
    series=[];
    series.push(
     {  
             name: '全国用户',  
             type: 'scatter', 
             coordinateSystem: 'bmap',  
             zlevel: 2,  
             label: {  
                 normal: {  
                     show: false,  
                     position: 'right',  
                     formatter: '{b}'  
                 }  
             },  
             symbolSize: 5, 
             large: true,
             itemStyle: {
                 normal: {
                     shadowBlur: 20,
                  shadowColor: 'rgba(193, 255, 229, 0.8)',
                  color: 'rgba(193, 255, 229, 0.8)'
                 }
             },
             data: mids1.map(function (dataItem) {  
                 return {  
                     name: dataItem.shop_name,  
                     value: [dataItem.map_x,dataItem.map_y].concat([dataItem.cust_address])
                 };  
             })         
       },
       {  
              name: '全国用户',  
              type: 'scatter', 
              coordinateSystem: 'bmap',  
              zlevel: 2,  
              label: {  
                  normal: {  
                      show: false,  
                      position: 'right',  
                      formatter: '{b}'  
                  }  
              },  
              symbolSize: 5, 
              large: true,
              itemStyle: {
                  normal: {
                      shadowBlur: 20,
                   shadowColor: 'rgba(255, 255, 255, 0.8)',
                   color: 'rgba(255, 255, 255, 0.8)'
                  }
              },
              data: mids2.map(function (dataItem) {  
                  return {  
                      name: dataItem.shop_name,  
                      value: [dataItem.map_x,dataItem.map_y].concat([dataItem.cust_address])
                  };  
              })         
        },                
        {  
             name: '全国用户',  
             type: 'scatter', 
             coordinateSystem: 'bmap',  
             zlevel: 2,  
             label: {  
                 normal: {  
                     show: false,  
                     position: 'right',  
                     formatter: '{b}'  
                 }  
             },  
             symbolSize: 5, 
             large: true,
             itemStyle: {
                 normal: {
                     shadowBlur: 20,
                  shadowColor: 'rgba(14, 241, 242, 0.8)',
                  color: 'rgba(14, 241, 242, 0.8)'
                 }
             },
             data: mids3.map(function (dataItem) {  
                 return {  
                     name: dataItem.shop_name,  
                     value: [dataItem.map_x,dataItem.map_y].concat([dataItem.cust_address])
                 };  
             })         
       }
     );
};



var getUsersDatas=function(idx,func){//获取用户数据
    console.log("11")
  var feedBack=func;
    var param=idx;
  var datas={};
  datas.op="search";
  datas.page=1;
  datas.rows=1000000;
  if(param!=null && param!=undefined){
    datas.areaId=param;
  }
  feedBack();
//    $.ajax({
//      async:true,
//        type:"POST",
//        url:'../customer/searchCustomer',
//        headers: {'Content-Type': 'application/json;charset=utf-8'},
//        data:datas,
//        dataType:'json',
//        success:function(data) {
//          mapDatas=data.rows;
//          if(feedBack!=null&&feedBack!=undefined){
//            series=[];
//            feedBack();
//          }
//            if(param==null){
//              mapInfoDatas=data;
//              drawAll(mapInfoDatas);
//                initMap();
//            }
//        },
//        error:function(n){
//          console.log(n);
//        }
//      });


};
//getUsersDatas(null,null);


var firstDone=function(){


  $.ajax({
   type: "get",
   url: "js/vmapData.json",
   dataType : "json",
   success: function(data){

      var mapData=data,mapData1=null;
      var nums=parseInt(data.length/200);

      $.ajax({
       type: "get",
       url: "js/vmapDatah.json",
       dataType : "json",
       success: function(data){
          mapData1=data;            //这里应该是重绘地图，存疑++++++++++++++++++++++++++++
          initMap();
       },
       error:function(XMLHttpRequest, textStatus, errorThrown){
          console.log(XMLHttpRequest);
          console.log(textStatus);
          console.log(errorThrown);
       }
      });

    }
  });
}


firstDone();




//initMap();
      //省市区选择列表

  var getProvince=function(){//获取省
    $.ajax({
      async:false,
        type:"GET",
        url:'../performance/getAllProvince',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        dataType:'json',
        success:function(data) {
          var datas=eval("("+data.province+")");
          for(var i=0;i<datas.length;i++){
            var op=document.createElement("li");
            op.setAttribute("id",datas[i].provinceId); 
            op.appendChild(document.createTextNode(datas[i].provinceName));
            $("#vMap_slcPane").find("ul").append(op);
          }
            $(function(){
              $("#vMap_slcPane").find("li").each(function(){
                $(this).click(function(){
                  slcP=selectedAddress=$(this).html();
                  provinceIds=$(this).attr("id");
                  console.log(provinceIds);
                  if(selectedAddress=="山东省"){
                      vmapZoom=9;
                      bmapCenter=[117.024967,36.682785];
                      getUsersDatas(25,drawJinan);
                    }else if(selectedAddress=="安徽省"){
                      vmapZoom=9;
                      bmapCenter=[117.209238,32.962369];
                      getUsersDatas(22,drawAnhui);
                    }else{
                      vmapZoom=9;
                      bmapCenter=[118.241233,34.377846];
                      getUsersDatas(20,drawJiangsu);
                  }
                  $("#vprovince").find("label").html(slcP);
                  $("#vcity").find("label").html('市');
                  $("#vMap_slcPane").animate({"height":0},500);
                  vsp=null;
                });
              });  
            });
        },
        error:function(n){
          console.log(n);
        }
      });
  };
  var getCity=function(Id){//获取市
     $.ajax({
        type:"POST",
        async:false,
        url:'../performance/getCityByProvinceId',
        headers: {Accept: "application/json; charset=utf-8"},
        data:
        {
          provinceId : Id
        },
        dataType:'json',
        success:function(data) {
        var datas=eval("("+data.city+")");
        for(var i=0;i<datas.length;i++){
          var op=document.createElement("li"); 
          op.setAttribute("id",datas[i].cityId); 
          op.appendChild(document.createTextNode(datas[i].cityName));
          $("#vMap_slcPane").find("ul").append(op);
        }
              $("#vMap_slcPane").find("li").each(function(){
                $(this).click(function(){
                  slcC=$(this).html();
                  $("#vcity").find("label").html(slcC);
                  $("#vMap_slcPane").animate({"height":0},500);
                  vsp=null;
                  if(slcC=="济南市"){
                    bmapCenter=[117.024967,36.682785];
                    setTimeout(function(){
                      vmapZoom=13;
                      drawJinan();
                    },500);
                  }
                });
              });
        },
        error:function(n){
          console.log(n);
        }
      });
};
$("#vMap_slcPane").animate({"height":0},1000);
var vsp=null,slcP=null,slcC=null,provinceIds=null;//判断是否出现选择面板
  function slcPaneToggle(slc){
    var vMapSlcLi=($("#vMap_slcPane").width()-100)/5;
    var vMapSlcLiRow=$("#vMap_slcPane li").length%5==0?parseInt($("#vMap_slcPane li").length/5):parseInt($("#vMap_slcPane li").length/5)+1;
    $("#vMap_slcPane ul").css({"width":$("#vMap_slcPane").width()+26,"height":$("#vMap_slcPane ul").height()+26});
    $("#vMap_slcPane li").css({"width":vMapSlcLi});
      if(vsp!=slc){
          $("#vMap_slcPane").show();
          if(($("#vMap_slcPane li").height()+20)*vMapSlcLiRow<200){
              $("#vMap_slcPane").animate({"height":($("#vMap_slcPane li").height()+20)*vMapSlcLiRow},500);
          }else{
              $("#vMap_slcPane").animate({"height":200},500);
          }
          vsp=slc;
      }else{
          $("#vMap_slcPane").animate({"height":0},500);
          vsp=null;
          $("#vMap_slcPane").hide();
      }
  }
  $(".vMap_con1_slc li").each(function(){
    $(this).click(function(){
        var slc=$(this).attr("id");
        $("#vMap_slcPane").find("ul").empty();
        if(slc=="vprovince"){
          getProvince();
        }else if(slc=="vcity" && provinceIds!=null){
          getCity(provinceIds);
        }
        slcPaneToggle(slc);
//        }else if(slc=="vcity"&&slcP=="安徽省"){
//          $("#vMap_slcPane").find("ul").append("<li>合肥市</li>");
//          $("#vMap_slcPane").find("li").each(function(){
//             $(this).click(function(){
//              slcC=$(this).html();
//              $("#vcity").find("label").html(slcC);
//              $("#vMap_slcPane").animate({"height":0},500);
//              vsp=null;
//              bmapCenter=[117.563205,31.765229];
//              setTimeout(function(){
//                vmapZoom=14;
//                drawAnhui();
//              },500);
//             });
//          });
//        }
    });
 });

});