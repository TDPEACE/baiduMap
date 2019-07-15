(function () {
    // 'use strict';

angular.module("myApp",[])
    .controller("myEchart",myEchart);
    myEchart.$inject=["$scope"];

function myEchart($scope) {

    $scope.a = 1;
    console.log($scope.a,"+++++++++")


    var dom = document.getElementById("day_order");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    app.title = '嵌套环形图';


    option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            // data:['直达'+20,'营销广告','搜索引擎','邮件营销','联盟广告','视频广告','百度','谷歌','必应','其他']
        },
        color:[ '#6B4C91','#9787AE'],
        series: [
            {
                name:'访问来源',
                type:'pie',
                selectedMode: 'single',
                radius: [0, '70%'],
                startAngle:60,

                label: {
                    normal: {
                        position:'inner',
                        color:"white"
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    {value:100, name:'本日下单'+7+"%", selected:true},

                    {value:1548}
                ]
            },

        ],

    };
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
    // 月订单率
    var dom2 = document.getElementById("month_order");
    var myChart2 = echarts.init(dom2);
    var app2 = {};
    var a = 38;
    option2 = null;
    app.title = '嵌套环形图';
    option2 = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            // data:['直达'+20,'营销广告','搜索引擎','邮件营销','联盟广告','视频广告','百度','谷歌','必应','其他']
        },
        color:[ '#d87320','#E89C70'],
        series: [
            {
                name:'访问来源',
                type:'pie',
                selectedMode: 'single',
                radius: [0, '70%'],
                startAngle:90,
                borderColor: 'pink',
                label: {
                    normal: {
                        position: 'inner',
                        color:"white"

                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    {value:900, name:'本月下单'+a+"%", selected:true},

                    {value:1548}
                ]
            },

        ],

    };
    if (option2 && typeof option2 === "object") {
        myChart2.setOption(option2, true);
    }
//下单用户和用户推广趋势、
    var dom3 = document.getElementById("top_right");
    var myChart3 = echarts.init(dom3);
    var app3 = {};
    option3 = null;
    option3 = {
        title: {
            // text: '最近40天下单用户及店铺推广数据趋势'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            // data:['下单量趋势','推广量趋势'],
            x: 'right', // 'center' | 'left' | {number},
            y: 'top', // 'center' | 'bottom' | {number}
            textStyle:{
                color:"#BD4F4E"
            }
        },
        grid: {
            left: '0%',
            right: '0%',
            bottom: '0%',
            containLabel: true
        },
       /* toolbox: {        下载为图片的小按钮
            feature: {
                saveAsImage: {}
            }
        },*/
        xAxis: {
            type: 'category',
            boundaryGap: false, //底部坐标轴是否在中间显示
            axisLine:{              //这个属性是改变坐标轴X轴颜色，和字体颜色
                lineStyle:{
                    color:'white',
                    width:1,//这里是为了突出显示加上的,这里是X轴宽度
                }
            },
            data: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14',
            '15','16','17','18','19','20','21','22','23','24','25','26','27','28',
            '29','30','1','2','3','4','5','6','7','8','9','10']
        },
        yAxis: {
            type: 'value',

            min:0,
            max:600,
            splitNumber:6,
            splitLine: {        //这里设置的是分割线条的颜色
                lineStyle: {
                    color: "#4B75AD"
                }
            }
        },
        series: [
            {
                name:'下单量趋势',
                type:'line',
                // stack: '总量',     不注释掉会显示为所有的加和
                itemStyle:{     //这里是为了改变折线线条颜色
                    normal:{
                        lineStyle:{
                            color:"#4F81BD"
                        }
                    }
                },
                data:[50, 52,63, 65, 67, 51, 41, 24, 57, 68, 46,
                      69, 59, 44, 66, 54, 69, 63,91, 42, 69, 58, 41,
                      53, 59, 53, 61, 69, 59, 60, 95, 54, 69,58,55,
                      53,68,69,59,57]
            },

            {
                name:'推广量趋势',
                type:'line',
                itemStyle:{     //这里是为了改变线条颜色
                    normal:{
                        lineStyle:{
                            color:"#BD4F4E"
                        }
                    }
                },
                // stack: '总量',
                data:[20, 15, 10,  12, 11,20, 32, 15, 24, 30,
                      20, 22, 34, 19, 14, 20, 34, 20, 32, 21,
                      34, 26, 27, 24, 26, 17, 28, 10, 19, 29,
                      24, 29, 34, 20, 32, 31, 34, 26, 27, 24]
            },

        ]
    };

    if (option3 && typeof option3 === "object") {
        myChart3.setOption(option3, true);
    }
    //新增门店数量
    var myChart4 = echarts.init(document.getElementById('one'));
    var count = 360;
    var data = [];
    for (var i = 0; i < count; i++) {
        data.push([1, i]);
    }
    option4 = {
        color: ['red'],
        title: {
            text: '新增门店186',
            textStyle:{
                color:'#ffffff',
                fontSize:13,
                fontWeight:'normal',
                fontFamily:'华文细黑',
            },
            x: '14%',       //title的位置
            y: '40%'
        },
        visualMap: [{
            show: false,
            dimension: 1,
            min: 0,
            max: count,
            inRange: {
                color: ["#BCAEDE","#E88787"],
            }
        }],
        series: [{
            type: 'pie',
            radius : ['65%', '75%'],
            center: ['50%', '50%'],
            silent: true,
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: data
        }]
    }
    if (option4 && typeof option4 === "object") {
        myChart4.setOption(option4, true);
    }
    //柱状图
    var dom5 = document.getElementById("two");
    var myChart5 = echarts.init(dom5);
    var app5 = {};
    option5 = null;
    app.title = '累计门店';

    option5 = {
        /* title: {
             text: '世界人口总量',
             subtext: '数据来自网络'
         },*/
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'


            }
        },
        legend: {
            // data: ['2011年']
        },
        grid: {
            top:'1%',
            left: '1%',    //Y轴距离包住图表盒子的位置
            right: '1%',    //图表距离Y轴右边的位置，值越小距离越近
            bottom: '1%',  // bottom:图表底部距离上面的位置，值越大距离上面越近，不会改变上面top的位置
            // top:"1%",       //top表示图表距离上面的距离，当为%时，是往下压的，也可以为数字；
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            splitLine: {        //这里设置的是分割线条的颜色
                lineStyle: {
                    color: "#2f3042"
                }
            }
        },
        yAxis: {
            type: 'category',
            data: ['1','2','3','4','5','6'],
            /* min:0,
             max:600,
             splitNumber:6,*/
        },
        series: [
            {
                name: '2011年',
                type: 'bar',
                data: [103, 239, 294, 170, 144, 230],
                itemStyle:{
                    normal:{
                        color:'#34B2D4'
                    }
                },
                barCategoryGap:"1",  //柱状图之间的距离
                barWidth:2,       //柱状图的宽度
            },

        ]
    };
    if (option5 && typeof option5 === "object") {
        myChart5.setOption(option5, true);
    }
    //每日订单总额[万]
    var dom6 = document.getElementById("all_sale");
    var myChart6 = echarts.init(dom6);
    var app6 = {};
    option6 = null;
    option6 = {
        title: {
            // text: '折线图堆叠'
        },
       /* tooltip: {
            trigger: 'axis'
        },*/
        legend: {
            // data:['邮件营销']
        },
        grid: {
            left: '0%',
            right: '4%',
            bottom: '5',
            top:"30",
            containLabel: true
        },
       /* toolbox: {
            feature: {
                saveAsImage: {}//去掉下载按钮
            }
        },*/
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一','周二','周三','周四','周五','周六','周日'],
            axisLabel: {       //这里是改变X轴上坐标轴字体的颜色
                textStyle: {
                    color: '#CFCFD0',
                    fontSize:'16'
                },
            }

        },
        yAxis: {
            type: 'value',
            splitLine: {        //这里设置的是分割线条的颜色
                lineStyle: {
                    color: "#38394A"
                }
            },
            axisLabel: {       //这里是改变Y轴上坐标轴字体的颜色
                textStyle: {
                    color: '#CFCFD0',
                    fontSize:'16'
                },
            }
        },
        series: [
            {
                name:'邮件营销',
                type:'line',
                // stack: '总量',
                data:[120.25, 132.52, 101.65, 134.6, 190.66, 130, 210],
                itemStyle : { normal: {label : {show: true,color:"#CFCFD0"},
                    lineStyle:{color:"#b84D4B"}

                }}   //让每个点上显示数值
            },

        ]
    };
    if (option6 && typeof option6 === "object") {
        myChart6.setOption(option6, true);
    }
    var dom7 = document.getElementById("all_weight");
    var myChart7 = echarts.init(dom7);
    var app7 = {};
    option7 = null;
    option7 = {
        title: {
            // text: '折线图堆叠'
        },
        /* tooltip: {
             trigger: 'axis'
         },*/
        legend: {
            // data:['邮件营销']
        },
        grid: {
            left: '0%',
            right: '4%',
            bottom: '0%',
            top:"30",
            containLabel: true
        },
        /* toolbox: {
             feature: {
                 saveAsImage: {}//去掉下载按钮
             }
         },*/
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一','周二','周三','周四','周五','周六','周日'],
            axisLabel: {       //这里是改变X轴上坐标轴字体的颜色
                textStyle: {
                    color: '#CFCFD0',
                    fontSize:'16'
                },
            }

        },
        yAxis: {
            type: 'value',
            splitLine: {        //这里设置的是分割线条的颜色
                lineStyle: {
                    color: "#38394A"
                }
            },
            axisLabel: {       //这里是改变Y轴上坐标轴字体的颜色
                textStyle: {
                    color: '#CFCFD0',
                    fontSize:'16'
                },
            }
        },
        series: [
            {
                name:'邮件营销',
                type:'line',
                // stack: '总量',
                data:[120.25, 132.52, 101.65, 134.6, 190.66, 130, 210],
                itemStyle : { normal: {label : {show: true,color:"#CFCFD0"},
                    lineStyle:{color:"#4F81BD"}

                }}   //让每个点上显示数值
            },

        ]
    };
    if (option7 && typeof option7 === "object") {
        myChart7.setOption(option7, true);
    }
    //无缝滚动
    function orderMove(){
        var moveH=$(".vMap_con2_order li").height();
        $("#vtype").find("li").eq(0).animate({"margin-top":-moveH},1000,function(){
            $(this).css({"margin-top":0}).appendTo($("#vtype").find("ul"));
        });
        $("#vshop").find("li").eq(0).animate({"margin-top":-moveH},1000,function(){
            $(this).css({"margin-top":0}).appendTo($("#vshop").find("ul"));
        });
        $("#vton").find("li").eq(0).animate({"margin-top":-moveH},1000,function(){
            $(this).css({"margin-top":0}).appendTo($("#vton").find("ul"));
        });
        $("#vasset").find("li").eq(0).animate({"margin-top":-moveH},1000,function(){
            $(this).css({"margin-top":0}).appendTo($("#vasset").find("ul"));
            setTimeout(orderMove,1000);
        });
    }
    $.ajax({
        type: "get",
        url: "js/vmapRoll.json",
        dataType : "json",
        success: function(data){
            for(var i=0;i<data.length;i++){
                if(data[i].type=="新订单"){
                    var type_li="<li>"+data[i].type+"</li>";
                    $("#vtype").find("ul").append(type_li);
                }else{
                    var type_li="<li class='vmap_new'>"+data[i].type+"</li>";
                    $("#vtype").find("ul").append(type_li);
                }
                $("#vshop").find("ul").append("<li>"+data[i].shop_name+"</li>");
                $("#vton").find("ul").append("<li>"+data[i].ton+"</li>");
                $("#vasset").find("ul").append("<li>"+data[i].price+"</li>");
            }
            orderMove();
            // playCam();
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log(XMLHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
    var myChart8 = echarts.init(document.getElementById('three'));
    var count = 360;
    var data = [];
    for (var i = 0; i < count; i++) {
        data.push([1, i]);
    }
    option8 = {
        color: ['red'],
        title: {
            text: '新增订单251',
            textStyle:{
                color:'#ffffff',
                fontSize:13,
                fontWeight:'normal',
                fontFamily:'华文细黑',
            },
            x: '14%',       //title的位置
            y: '40%'
        },
        visualMap: [{
            show: false,
            dimension: 1,
            min: 0,
            max: count,
            inRange: {
                color: ["#BCAEDE","#E88787"],
            }
        }],
        series: [{
            type: 'pie',
            radius : ['65%', '75%'],
            center: ['50%', '50%'],
            silent: true,
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: data
        }]
    }
    if (option8 && typeof option8 === "object") {
        myChart8.setOption(option8, true);
    }

    //第二个柱状图
    var dom9 = document.getElementById("four");
    var myChart9 = echarts.init(dom9);
    var app9 = {};
    option9 = null;
    app.title = '累计门店';

    option9 = {
        /* title: {
             text: '世界人口总量',
             subtext: '数据来自网络'
         },*/
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'


            }
        },
        legend: {
            // data: ['2011年']
        },
        grid: {
            top:'1%',
            left: '1%',    //Y轴距离包住图表盒子的位置
            right: '1%',    //距离Y轴右边的位置，值越小距离越近
            bottom: '1%',  // bottom:图表距离上面的位置，值越大距离上面越近
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            splitLine: {        //这里设置的是分割线条的颜色
                lineStyle: {
                    color: "#2f3042"
                }
            }
        },
        yAxis: {
            type: 'category',
            data: ['1','2','3','4','5','6'],
            /* min:0,
             max:600,
             splitNumber:6,*/
        },
        series: [
            {
                name: '2011年',
                type: 'bar',
                data: [103, 239, 294, 170, 144, 230],
                itemStyle:{
                    normal:{
                        color:'#67488A'
                    }
                },
                barCategoryGap:"1",  //柱状图之间的距离
                barWidth:2,       //柱状图的宽度
            },

        ]
    };
    if (option9 && typeof option9 === "object") {
        myChart9.setOption(option9, true);
    }


}
})();