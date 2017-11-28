(function () {
   angular.module("myApp",[])
       .controller("house",house);
   house.$inject=["$scope"];
   function house($scope) {
       $scope.a  = 1;
       console.log("++++++",$scope.a)
       var myChart = echarts.init(document.getElementById('warehouse_A'));
       // app.title = '环形图';

      var  option = {
           title: {
               text: '总资产',
               // subtext: '2000000.00',
               x: 'center',
               y: 'center',
               textStyle:{
                   //文字颜色
                   color:'white',
                   /*//字体风格,'normal','italic','oblique'
                   fontStyle:'normal',
                   //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                   fontWeight:'bold',
                   //字体系列
                   // fontFamily:'sans-serif'
                   //字体大小*/
                   fontSize:"60"
               },
               /*subtext:'副标题',
           　　//副标题文本样式
           　　subtextStyle:{}*/
           },

           tooltip: {
               trigger: 'item',
               formatter: "{a} <br/>{b}: {c} ({d}%)",
               show:false
           },
           legend: {
               orient: 'vertical',
               x: 'left',
               // data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
           },
           series: [
               {
                   name:'访问来源',
                   type:'pie',
                   radius: ['50%', '70%'],
                   avoidLabelOverlap: true,
                   hoverAnimation:true,//是否开启hover时的放大效果，
                   silent:true,        //鼠标放置时不在有显示效果，默认false
                   label: {
                       normal: {
                           show: false,
                           position: 'center',
                           formatter:function(){
                               return "19%"
                           },
                           textStyle:{
                               color:"red"
                           }

                       },
                       emphasis: {
                           show: true,
                           textStyle: {
                               fontSize: '30',
                               fontWeight: 'bold'
                           }
                       }
                   },
                   labelLine: {
                       normal: {
                           show: false
                       }
                   },
                   data:[
                       {value:335, name:'直接访问'},
                       {value:310, name:'邮件营销'},
                       {value:234, name:'联盟广告'},
                       {value:135, name:'视频广告'},
                       {value:1548, name:'搜索引擎'}
                   ]
               }
           ]
       };
       if (option && typeof option === "object") {
           myChart.setOption(option, true);
       }
   }

})()