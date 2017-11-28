(function () {
    angular.module("myApp",[])
        .controller("secData",secData);
    secData.$inject=["$scope"];
    function secData($scope) {
        $scope.a = 1;
        console.log($scope.a,"+++++++++++++++++++++++");
        console.log("mycharts+++++++++++++");
        //一直报错解析不了App,出现两次了+++++++++++++++++++
        //因为末尾没有执行这个闭包++mad
        console.log($(window).height(),$(window).width(),"+++++++++++++++++打印浏览器宽高")

        //第一个无缝滚送
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
                setTimeout(orderMove,1000);
            });
           /* $("#vasset").find("li").eq(0).animate({"margin-top":-moveH},1000,function(){
                $(this).css({"margin-top":0}).appendTo($("#vasset").find("ul"));
                setTimeout(orderMove,1000);
            });*/
        }
        $.ajax({
            type: "get",
            url: "js/listData.json",
            dataType : "json",
            success: function(data){
                //这里我在取数据的时候一直报错，原因是JSON数据多了一个点。尼玛；
                for(var i=0;i<data.length;i++){
                    console.log("++++++++++++++++++")
                  /*  if(data[i].type=="新订单"){
                        var type_li="<li>"+data[i].type+"</li>";
                        $("#vtype").find("ul").append(type_li);
                    }else{
                        var type_li="<li class='vmap_new'>"+data[i].type+"</li>";
                        $("#vtype").find("ul").append(type_li);
                    }*/
                    var type_li="<li class='vmap_new'>"+data[i].inde+"</li>";
                    $("#vtype").find("ul").append(type_li);
                    $("#vshop").find("ul").append("<li>"+data[i].area+"</li>");
                    $("#vton").find("ul").append("<li>"+data[i].ton+"</li>");
                    // $("#vasset").find("ul").append("<li>"+data[i].price+"</li>");
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
//车辆仓库之类的柱状图
        var myChart = echarts.init(document.getElementById('data_search'));
        // app.title = '坐标轴刻度与标签对齐';

        var option = {
            color: ['#4BACC6'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                top:"3%",
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : ['数量', '仓库', '车辆'],
                    axisTick: {
                        // alignWithLabel: true     //X轴刻度和柱状图对其
                    },
                    axisLine:{              //这个属性是改变坐标轴X轴颜色，和字体颜色
                        lineStyle:{
                            color:'white',
                            width:1,//这里是为了突出显示加上的,这里是X轴宽度
                        }
                    },
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    axisLine:{              //这个属性是改变坐标轴X轴颜色，和字体颜色
                        lineStyle:{
                            color:'white',
                            width:1,//这里是为了突出显示加上的,这里是X轴宽度
                        }
                    },
                    splitLine: {        //这里设置的是分割线条的颜色
                        lineStyle: {
                            color: "#434455"
                        }
                    }
                }
            ],
            series : [
                {
                    name:'直接访问',
                    type:'bar',
                    barWidth: '60%',
                    data:[25, 31, 79, 100,],
                    itemStyle : { normal: {label : {show: true,color:"#CFCFD0"}
                    //让柱状图上显示数据
                    }}
                },

            ]
        };


        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }

        //16个仓库的圆环图

        var myChart2 = echarts.init(document.getElementById('warehouse_A'));
        // app.title = '环形图';

        var  option2 = {
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
                    fontSize:"10"
                },
                /*subtext:'副标题',
            　　//副标题文本样式
            　　subtextStyle:{}*/
            },
            grid: {
                left: '0%',
                right: '3%',
                bottom: '5',
                top:"3%",
                containLabel: true
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
                           /* formatter:function(){
                                return "19%"
                            },*/
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

                    ]
                }
            ]
        };
        if (option2 && typeof option2 === "object") {
            myChart2.setOption(option2, true);
        }
        //第二个
        var myChart3 = echarts.init(document.getElementById('warehouse_B'));
        // app.title = '环形图';

        var  option3 = {
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
                    fontSize:"10"
                },
                /*subtext:'副标题',
            　　//副标题文本样式
            　　subtextStyle:{}*/
            },
            grid: {
                left: '0%',
                right: '3%',
                bottom: '5',
                top:"3%",
                containLabel: true
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
                            /* formatter:function(){
                                 return "19%"
                             },*/
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

                    ]
                }
            ]
        };
        if (option3 && typeof option3 === "object") {
            myChart3.setOption(option3, true);
        }
        //第三个
        var myChart4 = echarts.init(document.getElementById('warehouse_C'));
        // app.title = '环形图';

        var  option4 = {
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
                    fontSize:"10"
                },
                /*subtext:'副标题',
            　　//副标题文本样式
            　　subtextStyle:{}*/
            },
            grid: {
                left: '0%',
                right: '3%',
                bottom: '5',
                top:"3%",
                containLabel: true
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
                            /* formatter:function(){
                                 return "19%"
                             },*/
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

                    ]
                }
            ]
        };
        if (option4 && typeof option4 === "object") {
            myChart4.setOption(option4, true);
        }
//第四个
        var myChart5 = echarts.init(document.getElementById('warehouse_D'));
        // app.title = '环形图';

        var  option5 = {
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
                    fontSize:"10"
                },
                /*subtext:'副标题',
            　　//副标题文本样式
            　　subtextStyle:{}*/
            },
            grid: {
                left: '0%',
                right: '3%',
                bottom: '5',
                top:"3%",
                containLabel: true
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
                            /* formatter:function(){
                                 return "19%"
                             },*/
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

                    ]
                }
            ]
        };
        if (option5 && typeof option5 === "object") {
            myChart5.setOption(option5, true);
        }
        //第五个
        var myChart6 = echarts.init(document.getElementById('warehouse_E'));
        // app.title = '环形图';

        var  option6 = {
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
                    fontSize:"10"
                },
                /*subtext:'副标题',
            　　//副标题文本样式
            　　subtextStyle:{}*/
            },
            grid: {
                left: '0%',
                right: '3%',
                bottom: '5',
                top:"3%",
                containLabel: true
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
                            /* formatter:function(){
                                 return "19%"
                             },*/
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

                    ]
                }
            ]
        };
        if (option6 && typeof option6 === "object") {
            myChart6.setOption(option6, true);
        }
        //第六个
        var myChart7 = echarts.init(document.getElementById('warehouse_F'));
        // app.title = '环形图';

        var  option7 = {
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
                    fontSize:"10"
                },
                /*subtext:'副标题',
            　　//副标题文本样式
            　　subtextStyle:{}*/
            },
            grid: {
                left: '0%',
                right: '3%',
                bottom: '5',
                top:"3%",
                containLabel: true
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
                            /* formatter:function(){
                                 return "19%"
                             },*/
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

                    ]
                }
            ]
        };
        if (option7 && typeof option7 === "object") {
            myChart7.setOption(option7, true);
        }
        //第七个
        var myChart8 = echarts.init(document.getElementById('warehouse_G'));
        // app.title = '环形图';

        var  option8 = {
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
                    fontSize:"10"
                },
                /*subtext:'副标题',
            　　//副标题文本样式
            　　subtextStyle:{}*/
            },
            grid: {
                left: '0%',
                right: '3%',
                bottom: '5',
                top:"3%",
                containLabel: true
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
                            /* formatter:function(){
                                 return "19%"
                             },*/
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

                    ]
                }
            ]
        };
        if (option8 && typeof option8 === "object") {
            myChart8.setOption(option8, true);
        }
        //第八个
        var myChart9 = echarts.init(document.getElementById('warehouse_H'));
        // app.title = '环形图';

        var  option9 = {
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
                    fontSize:"10"
                },
                /*subtext:'副标题',
            　　//副标题文本样式
            　　subtextStyle:{}*/
            },
            grid: {
                left: '0%',
                right: '3%',
                bottom: '5',
                top:"3%",
                containLabel: true
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
                            /* formatter:function(){
                                 return "19%"
                             },*/
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

                    ]
                }
            ]
        };
        if (option9 && typeof option9 === "object") {
            myChart9.setOption(option9, true);
        }
        //第九个
        var myChart10 = echarts.init(document.getElementById('warehouse_I'));
        // app.title = '环形图';

        var  option10 = {
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
                    fontSize:"10"
                },
                /*subtext:'副标题',
            　　//副标题文本样式
            　　subtextStyle:{}*/
            },
            grid: {
                left: '0%',
                right: '3%',
                bottom: '5',
                top:"3%",
                containLabel: true
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
                            /* formatter:function(){
                                 return "19%"
                             },*/
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

                    ]
                }
            ]
        };
        if (option10 && typeof option10 === "object") {
            myChart10.setOption(option10, true);
        }
        //第十个
        var myChart11 = echarts.init(document.getElementById('warehouse_J'));
        // app.title = '环形图';

        var  option11 = {
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
                    fontSize:"10"
                },
                /*subtext:'副标题',
            　　//副标题文本样式
            　　subtextStyle:{}*/
            },
            grid: {
                left: '0%',
                right: '3%',
                bottom: '5',
                top:"3%",
                containLabel: true
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
                            /* formatter:function(){
                                 return "19%"
                             },*/
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

                    ]
                }
            ]
        };
        if (option11 && typeof option11 === "object") {
            myChart11.setOption(option11, true);
        }
        //第十一个
        var myChart12 = echarts.init(document.getElementById('warehouse_K'));
        // app.title = '环形图';

        var  option12 = {
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
                    fontSize:"10"
                },
                /*subtext:'副标题',
            　　//副标题文本样式
            　　subtextStyle:{}*/
            },
            grid: {
                left: '0%',
                right: '3%',
                bottom: '5',
                top:"3%",
                containLabel: true
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
                            /* formatter:function(){
                                 return "19%"
                             },*/
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

                    ]
                }
            ]
        };
        if (option12 && typeof option12 === "object") {
            myChart12.setOption(option12, true);
        }
        //四十二个
        var myChart13 = echarts.init(document.getElementById('warehouse_L'));
        // app.title = '环形图';

        var  option13 = {
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
                    fontSize:"10"
                },
                /*subtext:'副标题',
            　　//副标题文本样式
            　　subtextStyle:{}*/
            },
            grid: {
                left: '0%',
                right: '3%',
                bottom: '5',
                top:"3%",
                containLabel: true
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
                            /* formatter:function(){
                                 return "19%"
                             },*/
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
                        {value:95, name:'直接访问'},
                        {value:210, name:'邮件营销'},

                    ]
                }
            ]
        };
        if (option13 && typeof option13 === "object") {
            myChart13.setOption(option13, true);
        }
        //第十三个
        var myChart14 = echarts.init(document.getElementById('warehouse_M'));
        // app.title = '环形图';

        var  option14 = {
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
                    fontSize:"10"
                },
                /*subtext:'副标题',
            　　//副标题文本样式
            　　subtextStyle:{}*/
            },
            grid: {
                left: '0%',
                right: '3%',
                bottom: '5',
                top:"3%",
                containLabel: true
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
                            /* formatter:function(){
                                 return "19%"
                             },*/
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

                    ]
                }
            ]
        };
        if (option14 && typeof option14 === "object") {
            myChart14.setOption(option14, true);
        }
        //第十四个
        var myChart15 = echarts.init(document.getElementById('warehouse_N'));
        // app.title = '环形图';

        var  option15 = {
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
                    fontSize:"10"
                },
                /*subtext:'副标题',
            　　//副标题文本样式
            　　subtextStyle:{}*/
            },
            grid: {
                left: '0%',
                right: '3%',
                bottom: '5',
                top:"3%",
                containLabel: true
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
                            /* formatter:function(){
                                 return "19%"
                             },*/
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
                        {value:265, name:'直接访问'},
                        {value:110, name:'邮件营销'},

                    ]
                }
            ]
        };
        if (option15 && typeof option15 === "object") {
            myChart15.setOption(option15, true);
        }
        //第十五个
        var myChart16 = echarts.init(document.getElementById('warehouse_O'));
        // app.title = '环形图';

        var  option16 = {
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
                    fontSize:"10"
                },
                /*subtext:'副标题',
            　　//副标题文本样式
            　　subtextStyle:{}*/
            },
            grid: {
                left: '0%',
                right: '3%',
                bottom: '5',
                top:"3%",
                containLabel: true
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
                            /* formatter:function(){
                                 return "19%"
                             },*/
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
                        {value:155, name:'直接访问'},
                        {value:310, name:'邮件营销'},

                    ]
                }
            ]
        };
        if (option16 && typeof option16 === "object") {
            myChart16.setOption(option16, true);
        }
        //第十六个
        var myChart17 = echarts.init(document.getElementById('warehouse_P'));
        // app.title = '环形图';

        var  option17 = {
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
                    fontSize:"10"
                },
                /*subtext:'副标题',
            　　//副标题文本样式
            　　subtextStyle:{}*/
            },
            grid: {
                left: '0%',
                right: '3%',
                bottom: '5',
                top:"3%",
                containLabel: true
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
                            /* formatter:function(){
                                 return "19%"
                             },*/
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
                        {value:35, name:'直接访问'},
                        {value:310, name:'邮件营销'},

                    ]
                }
            ]
        };
        if (option17 && typeof option17 === "object") {
            myChart17.setOption(option17, true);
        }



//左边中间，用户类型
        var myChartA = echarts.init(document.getElementById('userStyle'));
        optionA = {
            color: ['#356DB2'],
            title : {
                // text: '某地区蒸发量和降水量',
                // subtext: '纯属虚构'
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                // data:['蒸发量','降水量']
            },
            grid: {         //控制Echarts图的位置
                left: '3%',
                right: '4%',
                top:"1%",
                bottom: '3%',
                containLabel: true
            },
            // toolbox: {
            //     show : true,
            //     feature : {
            //         dataView : {show: true, readOnly: false},
            //         magicType : {show: true, type: ['line', 'bar']},
            //         restore : {show: true},
            //         saveAsImage : {show: true}
            //     }
            // },
            // calculable : true,
            xAxis : [
                {
                    type : 'category',
                    data : ['体验','僵尸','沉睡','静默','交易','活跃','功能机',],
                    axisLine:{              //这个属性是改变坐标轴X轴颜色，和字体颜色
                        lineStyle:{
                            color:'white',
                            width:1,//这里是为了突出显示加上的,这里是X轴宽度
                        }
                    },
                }
            ],
            yAxis : [
                {
                    type : 'value'
                },

            ],
            series : [
                {
                    name:'用户类型',
                    type:'bar',
                    data:[100, 49, 70, 232, 256, 767, 136],
                    markPoint : {
                        data : [
                            {type : 'max', name: '最大值'},
                            {type : 'min', name: '最小值'}
                        ]
                    },
                    markLine : {
                        data : [
                            {type : 'average', name: '平均值'}
                        ]
                    }
                },
                // {
                //     name:'降水量',
                //     type:'bar',
                //     data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                //     markPoint : {
                //         data : [
                //             {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183},
                //             {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
                //         ]
                //     },
                //     markLine : {
                //         data : [
                //             {type : 'average', name : '平均值'}
                //         ]
                //     }
                // }
            ]
        };


        if (optionA && typeof optionA === "object") {
            myChartA.setOption(optionA, true);
        }
        //左边中间地推排名

        var myChartA2 = echarts.init(document.getElementById('rank'));


        var optionA = {
            title: {
                // text: '回收员排名',
                textStyle:{
                    color:["#FFF"],
                    fontSize:18
                }
            },
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
//	        top:25,
//	        right:5,
                align:'left',
                itemWidth:10,
                itemHeight:10,
                itemGap:5,
                textStyle:{
                    color:["#FFF"],          fontSize:14
                },
                data: [
                    {name:'僵尸',icon: 'square',textStyle: {fontSize: 10}},
                    {name:'沉睡',icon: 'square',textStyle: {fontSize: 10}},
                    {name:'静默',icon: 'square',textStyle: {fontSize: 10}},
                    {name:'交易',icon: 'square',textStyle: {fontSize: 10}},
                    {name:'活跃',icon: 'square',textStyle: {fontSize: 10}}
                ]
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                top:"12%",
                containLabel: true
            },
            xAxis:  {
                type: 'value',
                position: 'top',
                nameTextStyle: {
                    color: '#fff',
                    fontSize: 14
                },
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#eee'
                    }
                }
            },
            yAxis: {
                type: 'category',
                nameTextStyle: {
                    color: '#fff',
                    fontSize: 14
                },
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#eee'
                    }
                },
                data: ['李文森','董新廷','杨彪','张伟','张昆明','杨玉洋','范俊朋']
            },
            series: [
                {
                    name: '僵尸',
                    type: 'bar',
                    stack: '地推排名',
                    color: ['#ADB9D3'],
                    barMaxWidth : 10,
//		            label: {
//		                normal: {
//		                    show: true,
//		                    position: 'insideRight'
//		                }
//		            },
                    data: [33, 32, 32, 35, 52, 30, 44]
                },
                {
                    name: '沉睡',
                    type: 'bar',
                    stack: '地推排名',
                    color: ['#DA9496'],
                    barMaxWidth : 10,
//		            label: {
//		                normal: {
//		                    show: true,
//		                    position: 'insideRight'
//		                }
//		            },
                    data: [124, 136, 105, 138, 94, 235, 215]
                },
                {
                    name: '静默',
                    type: 'bar',
                    stack: '地推排名',
                    color: ['#D7E0C5'],
                    barMaxWidth : 10,
//		            label: {
//		                normal: {
//		                    show: true,
//		                    position: 'insideRight'
//		                }
//		            },
                    data: [230, 192, 201, 244, 301, 340, 320]
                },
                {
                    name: '交易',
                    type: 'bar',
                    stack: '地推排名',
                    color: ['#C0B4CC'],
                    barMaxWidth : 10,
//		            label: {
//		                normal: {
//		                    show: true,
//		                    position: 'insideRight'
//		                }
//		            },
                    data: [1170, 1232, 1221, 1174, 1201, 1351, 1432]
                },
                {
                    name: '活跃',
                    type: 'bar',
                    stack: '地推排名',
                    color: ['#C2D8E3'],
                    barMaxWidth : 10,
//		            label: {
//		                normal: {
//		                    show: true,
//		                    position: 'insideRight'
//		                }
//		            },
                    data: [818, 837, 908, 926, 1288, 1330, 1324]
                }
            ]
        };
        myChartA2.setOption(optionA);


        //左边底部第一个关键运营数据

        var myChartA3 = echarts.init(document.getElementById('operationData'));
        optionA3 = {
            title: {
                // text: '未来一周气温变化',
                // subtext: '纯属虚构'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['日活','签到',"下单"],
                textStyle:{
                    color:"white"
                }
            },
            grid: {
                left: '2%',
                right: '4%',
                bottom: '3%',
                top:"20%",
                containLabel: true
            },
            xAxis:  {
                type: 'category',
                boundaryGap: false,
                data: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','1','2','3','4','5','6','7','8','9','10']
                ,
                axisLine:{              //这个属性是改变坐标轴X轴颜色，和字体颜色
                    lineStyle:{
                        color:'white',
                        // width:1,//这里是为了突出显示加上的,这里是X轴宽度
                    }
                },
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value}.00'    //这是啥？？？？
                },
                axisLine:{              //这个属性是改变坐标轴X轴颜色，和字体颜色
                    lineStyle:{
                        color:'white',
                        // width:1,//这里是为了突出显示加上的,这里是X轴宽度
                    }
                },
            },
            series: [
                {
                    name:'日活',
                    type:'line',
                    itemStyle : {
                        normal : {
                            lineStyle:{
                                color:'#199ED8'
                            }
                        }
                    } ,
                    data:[21, 31, 49, 53, 52, 30, 21, 45, 33, 52, 43, 51, 65, 43, 42, 53, 60,51, 45, 53, 52, 43, 41, 45, 43, 42, 53, 60,51, 65, 53, 52, 53, 50,33, 52, 43, 21, 65, 43],
                    markPoint: {
                        data: [
                            {type: 'max', name: '最大值'},
                            {type: 'min', name: '最小值'}
                        ]
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
                    }
                },
                {
                    name:'签到',
                    type:'line',
                    itemStyle : {
                        normal : {
                            lineStyle:{
                                color:'#78904E'
                            }
                        }
                    } ,
                    data:[ 21, 45, 33, 52, 43, 51, 65, 43, 42, 53, 60,51, 45, 53, 52, 43, 41, 45, 43, 52, 43, 41, 45, 43, 42, 53, 60,51, 65, 53, 52, 53, 50,33, 52, 43, 21, 65, 41],
                    markPoint: {
                        data: [
                            {type: 'max', name: '最大值'},
                            {type: 'min', name: '最小值'}
                        ]
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
                    }
                },
                {
                    name:'下单',
                    type:'line',
                    itemStyle : {
                        normal : {
                            lineStyle:{
                                color:'#446B98'
                            }
                        }
                    } ,
                    data:[21, 32, 22, 45, 23, 32, 40, 32, 45, 33, 42, 30, 42, 35, 43,32, 40, 32, 25, 33, 32, 30, 32, 35, 33, 42, 30, 42, 35, 43, 32, 40, 32, 35, 33, 32, 30,50],
                    markPoint: {
                        data: [
                            {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
                        ]
                    },

                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'},
                            [{
                                symbol: 'none',
                                x: '90%',
                                yAxis: 'max'
                            }, {
                                symbol: 'circle',
                                label: {
                                    normal: {
                                        position: 'start',
                                        formatter: '最大值'
                                    }
                                },
                                type: 'max',
                                name: '最高点'
                            }]
                        ]
                    }
                }
            ]
        };

        myChartA3.setOption(optionA3);


        //左边底部大的无缝滚动

        function orderMove2(){
            var moveH=$(".vMap_con2_order li").height();
            $("#vtype2").find("li").eq(0).animate({"margin-top":-moveH},1000,function(){
                $(this).css({"margin-top":0}).appendTo($("#vtype2").find("ul"));
            });
            $("#vshop2").find("li").eq(0).animate({"margin-top":-moveH},1000,function(){
                $(this).css({"margin-top":0}).appendTo($("#vshop2").find("ul"));
            });
            $("#vton2").find("li").eq(0).animate({"margin-top":-moveH},1000,function(){
                $(this).css({"margin-top":0}).appendTo($("#vton2").find("ul"));
                // setTimeout(orderMove,1000);
            });
             $("#vtel2").find("li").eq(0).animate({"margin-top":-moveH},1000,function(){
                 $(this).css({"margin-top":0}).appendTo($("#vtel2").find("ul"));
                 // setTimeout(orderMove,1000);
             });
            $("#urecive2").find("li").eq(0).animate({"margin-top":-moveH},1000,function(){
                $(this).css({"margin-top":0}).appendTo($("#urecive2").find("ul"));
            });
            $("#utime2").find("li").eq(0).animate({"margin-top":-moveH},1000,function(){
                $(this).css({"margin-top":0}).appendTo($("#utime2").find("ul"));
            });
            $("#uqualify").find("li").eq(0).animate({"margin-top":-moveH},1000,function(){
                $(this).css({"margin-top":0}).appendTo($("#uqualify").find("ul"));
                setTimeout(orderMove2,1000);
            });
        }
        $.ajax({
            type: "get",
            url: "js/vmapRollTwo.json",
            dataType : "json",
            success: function(data){
                //这里我在取数据的时候一直报错，原因是JSON数据多了一个点。尼玛；
                for(var i=0;i<data.length;i++){
                    console.log("++++++++++++++++++")
                    /*  if(data[i].type=="新订单"){
                          var type_li="<li>"+data[i].type+"</li>";
                          $("#vtype").find("ul").append(type_li);
                      }else{
                          var type_li="<li class='vmap_new'>"+data[i].type+"</li>";
                          $("#vtype").find("ul").append(type_li);
                      }*/
                    var shop_num="<li >"+data[i].shop_num+"</li>";
                    $("#vtype2").find("ul").append(shop_num);
                    $("#vshop2").find("ul").append("<li class='vmap_new'>"+data[i].ton+"</li>");
                    $("#vton2").find("ul").append("<li class='vmap_new'>"+data[i].price+"</li>");

                    $("#vtel2").find("ul").append("<li>"+data[i].telnum+"</li>");
                    $("#urecive2").find("ul").append("<li>"+data[i].ruser+"</li>");
                    $("#utime2").find("ul").append("<li>"+data[i].order_time+"</li>");
                    $("#uqualify").find("ul").append("<li>"+data[i].uqualify+"</li>");
                }
                orderMove2();  //暂时关闭
                // playCam();
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
                console.log(XMLHttpRequest);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });


        //中间部分

        var myChartA4 = echarts.init(document.getElementById('customers'));
        optionA4 = {
            color: ['#B6A2DE'],
            title : {
                // text: '某地区蒸发量和降水量',
                // subtext: '纯属虚构'
            },
            tooltip : {
                trigger: 'axis',
               // formatter: "{a} {b}: {c} ({d}%)"      改变data的数据格式++++++
            },
            legend: {
                // data:['蒸发量','降水量']
            },
            grid: {         //控制Echarts图的位置
                left: '3%',
                right: '4%',
                top:"1%",
                bottom: '3%',
                containLabel: true
            },
            // toolbox: {
            //     show : true,
            //     feature : {
            //         dataView : {show: true, readOnly: false},
            //         magicType : {show: true, type: ['line', 'bar']},
            //         restore : {show: true},
            //         saveAsImage : {show: true}
            //     }
            // },
            // calculable : true,
            xAxis : [
                {
                    type : 'category',
                    data : ['15天','30天','45天','55天','75天','90天','105天',],
                    axisLine:{              //这个属性是改变坐标轴X轴颜色，和字体颜色
                        lineStyle:{
                            color:'#0187c9',
                            width:1,//这里是为了突出显示加上的,这里是X轴宽度
                        }
                    },
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    axisLine:{              //这个属性是改变坐标轴X轴颜色，和字体颜色
                        lineStyle:{
                            color:'#0187c9',
                            width:1,//这里是为了突出显示加上的,这里是X轴宽度
                        }
                    },
                },

            ],
            series : [
                {
                    name:'用户类型',
                    type:'bar',
                    data:[100, 49, 70, 232, 256, 767, 136],
                    markPoint : {
                        data : [
                            {type : 'max', name: '最大值'},
                            {type : 'min', name: '最小值'}
                        ]
                    },
                    markLine : {
                        data : [
                            {type : 'average', name: '平均值'}
                        ]
                    }
                },
                // {
                //     name:'降水量',
                //     type:'bar',
                //     data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                //     markPoint : {
                //         data : [
                //             {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183},
                //             {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
                //         ]
                //     },
                //     markLine : {
                //         data : [
                //             {type : 'average', name : '平均值'}
                //         ]
                //     }
                // }
            ]
        };


        if (optionA4 && typeof optionA4 === "object") {
            myChartA4.setOption(optionA4, true);
        }

        //中间部分第二个
        var myChartA5 = echarts.init(document.getElementById('customers_num'));
        optionA5 = {
            color: ['#C0504D'],
            title : {
                // text: '某地区蒸发量和降水量',
                // subtext: '纯属虚构'
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                // data:['蒸发量','降水量']
            },
            grid: {         //控制Echarts图的位置
                left: '3%',
                right: '4%',
                top:"1%",
                bottom: '3%',
                containLabel: true
            },
            // toolbox: {
            //     show : true,
            //     feature : {
            //         dataView : {show: true, readOnly: false},
            //         magicType : {show: true, type: ['line', 'bar']},
            //         restore : {show: true},
            //         saveAsImage : {show: true}
            //     }
            // },
            // calculable : true,
            xAxis : [
                {
                    type : 'category',
                    data : ['10','20','30','40','50','60','70',80,90,100],
                    axisLine:{              //这个属性是改变坐标轴X轴颜色，和字体颜色
                        lineStyle:{
                            color:'#0187c9',
                            width:1,//这里是为了突出显示加上的,这里是X轴宽度
                        }
                    },
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    axisLine:{              //这个属性是改变坐标轴X轴颜色，和字体颜色
                        lineStyle:{
                            color:'#0187c9',
                            width:1,//这里是为了突出显示加上的,这里是X轴宽度
                        }
                    },
                },

            ],
            series : [
                {
                    name:'用户类型',
                    type:'bar',
                    data:[660, 49, 70, 232, 256, 177, 136,100,150,180],
                    markPoint : {
                        data : [
                            {type : 'max', name: '最大值'},
                            {type : 'min', name: '最小值'}
                        ]
                    },
                    markLine : {
                        data : [
                            {type : 'average', name: '平均值'}
                        ]
                    },
                    barWidth:20,       //柱状图的宽度
                },
                // {
                //     name:'降水量',
                //     type:'bar',
                //     data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                //     markPoint : {
                //         data : [
                //             {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183},
                //             {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
                //         ]
                //     },
                //     markLine : {
                //         data : [
                //             {type : 'average', name : '平均值'}
                //         ]
                //     }
                // }
            ]
        };

        if (optionA5 && typeof optionA5 === "object") {
            myChartA5.setOption(optionA5, true);
        }

        //中间部分第三个
        var myChartA6 = echarts.init(document.getElementById('customers_chi'));
        optionA6 = {
            color: ['#FFD502'],
            title : {
                // text: '某地区蒸发量和降水量',
                // subtext: '纯属虚构'
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                // data:['蒸发量','降水量']
            },
            grid: {         //控制Echarts图的位置
                left: '3%',
                right: '4%',
                top:"1%",
                bottom: '3%',
                containLabel: true
            },
            // toolbox: {
            //     show : true,
            //     feature : {
            //         dataView : {show: true, readOnly: false},
            //         magicType : {show: true, type: ['line', 'bar']},
            //         restore : {show: true},
            //         saveAsImage : {show: true}
            //     }
            // },
            // calculable : true,
            xAxis : [
                {
                    type : 'category',
                    data : ['10','20','30','40','50','60','70',80,90,100],
                    axisLine:{              //这个属性是改变坐标轴X轴颜色，和字体颜色
                        lineStyle:{
                            color:'#0187c9',
                            width:1,//这里是为了突出显示加上的,这里是X轴宽度
                        }
                    },
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    axisLine:{              //这个属性是改变坐标轴X轴颜色，和字体颜色
                        lineStyle:{
                            color:'#0187c9',
                            width:1,//这里是为了突出显示加上的,这里是X轴宽度
                        }
                    },
                },

            ],
            series : [
                {
                    name:'用户类型',
                    type:'bar',
                    data:[660, 49, 70, 232, 256, 177, 136,100,150,180],
                    markPoint : {
                        data : [
                            {type : 'max', name: '最大值'},
                            {type : 'min', name: '最小值'}
                        ]
                    },
                    markLine : {
                        data : [
                            {type : 'average', name: '平均值'}
                        ]
                    },
                    barWidth:20,       //柱状图的宽度
                },
                // {
                //     name:'降水量',
                //     type:'bar',
                //     data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                //     markPoint : {
                //         data : [
                //             {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183},
                //             {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
                //         ]
                //     },
                //     markLine : {
                //         data : [
                //             {type : 'average', name : '平均值'}
                //         ]
                //     }
                // }
            ]
        };

        if (optionA6 && typeof optionA6 === "object") {
            myChartA6.setOption(optionA6, true);
        }
        //中间第四个
        var myChartA7 = echarts.init(document.getElementById('customers_price'));
        optionA7 = {
            color: ['#5061DF'],
            title : {
                // text: '某地区蒸发量和降水量',
                // subtext: '纯属虚构'
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                // data:['蒸发量','降水量']
            },
            grid: {         //控制Echarts图的位置
                left: '3%',
                right: '4%',
                top:"1%",
                bottom: '3%',
                containLabel: true
            },
            // toolbox: {
            //     show : true,
            //     feature : {
            //         dataView : {show: true, readOnly: false},
            //         magicType : {show: true, type: ['line', 'bar']},
            //         restore : {show: true},
            //         saveAsImage : {show: true}
            //     }
            // },
            // calculable : true,
            xAxis : [
                {
                    type : 'category',
                    data : ['10','20','30','40','50','60','70',80,90,100],
                    axisLine:{              //这个属性是改变坐标轴X轴颜色，和字体颜色
                        lineStyle:{
                            color:'#0187c9',
                            width:1,//这里是为了突出显示加上的,这里是X轴宽度
                        }
                    },
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    axisLine:{              //这个属性是改变坐标轴X轴颜色，和字体颜色
                        lineStyle:{
                            color:'#0187c9',
                            width:1,//这里是为了突出显示加上的,这里是X轴宽度
                        }
                    },
                },

            ],
            series : [
                {
                    name:'用户类型',
                    type:'bar',
                    data:[660, 49, 70, 232, 256, 177, 136,100,150,180],
                    markPoint : {
                        data : [
                            {type : 'max', name: '最大值'},
                            {type : 'min', name: '最小值'}
                        ]
                    },
                    markLine : {
                        data : [
                            {type : 'average', name: '平均值'}
                        ]
                    },
                    barWidth:20,       //柱状图的宽度
                },
                // {
                //     name:'降水量',
                //     type:'bar',
                //     data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                //     markPoint : {
                //         data : [
                //             {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183},
                //             {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
                //         ]
                //     },
                //     markLine : {
                //         data : [
                //             {type : 'average', name : '平均值'}
                //         ]
                //     }
                // }
            ]
        };

        if (optionA5 && typeof optionA7 === "object") {
            myChartA7.setOption(optionA7, true);
        }
        //右边上面第一个图
        var myChartB = echarts.init(document.getElementById('place_order'));
        optionB = {
            // title: {
            //     text: '堆叠区域图'
            // },
            // tooltip : {                  //不知道这个地方是啥？？+++
            //     trigger: 'axis',
            //     axisPointer: {
            //         type: 'cross',
            //         label: {
            //             backgroundColor: 'red'
            //         }
            //     }
            // },
            legend: {
                // data:['加权平均价','回收总重量']
            },
            // toolbox: {
            //     feature: {
            //         saveAsImage: {}
            //     }
            // },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                top:"5%",
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    axisLine:{              //这个属性是改变坐标轴X轴颜色，和字体颜色
                        lineStyle:{
                            color:'white',
                            width:1,//这里是为了突出显示加上的,这里是X轴宽度
                        }
                    },
                    data: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','1','2','3','4','5','6','7','8','9','10']

                },
           /*     {           //这里    在  X轴对面添加一个Y轴，可以设置单位
                    type: 'category',
                    scale: true,
                    name: '预购量',
                    max: 200,
                    min: 0,
                    // boundaryGap: [0.2, 0.2],         ???????????
                    axisLine:{              //这个属性是改变坐标轴X轴颜色，和字体颜色
                        lineStyle:{
                            color:'white',
                            width:1,//这里是为了突出显示加上的,这里是X轴宽度
                        }
                    },
                },*/
            ],
            yAxis : [
                {
                    type : 'value',
                    min:0,
                    max:600,
                    splitNumber:6,
                    splitLine: {        //这里设置的是分割线条的颜色
                        lineStyle: {
                            color: "#4B75AD"
                        }
                    },
                    axisLine:{              //这个属性是改变坐标轴X轴颜色，和字体颜色
                        lineStyle:{
                            color:'white',
                            width:1,//这里是为了突出显示加上的,这里是X轴宽度
                        }
                    },

                },
                {           //这里    在  Y轴对面添加一个Y轴，可以设置单位
                    type: 'value',
                    scale: true,
                    name: '预购量',
                    max: 200,
                    min: 0,
                    // boundaryGap: [0.2, 0.2],
                    axisLine:{              //这个属性是改变坐标轴X轴颜色，和字体颜色
                        lineStyle:{
                            color:'white',
                            width:1,//这里是为了突出显示加上的,这里是X轴宽度
                        }
                    },
                },
            ],
            series : [
                {
                    name:'加权平均价',
                    type:'line',
                    stack: '总量1',
                    itemStyle:{     //这里是为了改变折线线条颜色
                        normal:{
                            lineStyle:{
                                color:"#C0504D"
                            }
                        }
                    },
                    label: {                //这里控制的是折线图上显示数据量，以及显示位置

                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    // areaStyle: {normal: {}}, //让折线图有内部填充色
                    data:[250, 252,263, 165, 267, 201, 241, 224, 257, 168, 246, 169, 259, 244, 166, 154, 169, 163,191, 242, 169, 158, 241, 253, 259, 253, 261, 169, 159, 260, 195, 254, 269,258,155,253,268,269,159,157]

                },
                {
                    name:'回收总重量',
                    type:'line',
                    stack: '总量2',
                    itemStyle:{     //这里是为了改变折线线条颜色
                        normal:{
                            lineStyle:{
                                color:"#5A8fd1"
                            }
                        }
                    },
                    // label: {
                    //     normal: {
                    //         show: true,
                    //         position: 'top'
                    //     }
                    // },
                    areaStyle: {normal: {color:"#5A8fd1"}},
                    data:[220, 215, 210,  132, 121,220, 232, 215, 224, 290, 220, 222,234, 219, 214, 220, 234, 220, 232, 221, 234, 226, 227, 224, 226, 217, 228, 310, 219, 229, 224, 229, 234, 220, 232, 231, 234, 226, 227, 224]

                }
            ]
        };


        if (optionB && typeof optionB === "object") {
            myChartB.setOption(optionB, true);
        }
        //右边上面第二个图
        var myChartB2 = echarts.init(document.getElementById('warehouse_weight'));
        optionB2 = {
            // title: {
            //     text: '堆叠区域图'
            // },
            // tooltip : {                  //不知道这个地方是啥？？+++
            //     trigger: 'axis',
            //     axisPointer: {
            //         type: 'cross',
            //         label: {
            //             backgroundColor: 'red'
            //         }
            //     }
            // },
            legend: {
                // data:['加权平均价','回收总重量']
            },
            // toolbox: {
            //     feature: {
            //         saveAsImage: {}
            //     }
            // },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                top:"5%",
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    axisLine:{              //这个属性是改变坐标轴X轴颜色，和字体颜色
                        lineStyle:{
                            color:'white',
                            width:1,//这里是为了突出显示加上的,这里是X轴宽度
                        }
                    },
                    data: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','1','2','3','4','5','6','7','8','9','10']

                },

            ],
            yAxis : [
                {
                    type : 'value',
                    min:0,
                    max:600,
                    splitNumber:6,
                    splitLine: {        //这里设置的是分割线条的颜色
                        lineStyle: {
                            color: "#4B75AD"
                        }
                    },
                    axisLine:{              //这个属性是改变坐标轴X轴颜色，和字体颜色
                        lineStyle:{
                            color:'white',
                            width:1,//这里是为了突出显示加上的,这里是X轴宽度
                        }
                    },

                },

            ],
            series : [
                /*{
                    name:'加权平均价',
                    type:'line',
                    stack: '总量1',
                    itemStyle:{     //这里是为了改变折线线条颜色
                        normal:{
                            lineStyle:{
                                color:"#C0504D"
                            }
                        }
                    },
                    label: {                //这里控制的是折线图上显示数据量，以及显示位置

                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    // areaStyle: {normal: {}}, //让折线图有内部填充色
                    data:[250, 252,263, 165, 267, 201, 241, 224, 257, 168, 246, 169, 259, 244, 166, 154, 169, 163,191, 242, 169, 158, 241, 253, 259, 253, 261, 169, 159, 260, 195, 254, 269,258,155,253,268,269,159,157]

                },*/
                {
                    name:'回收总重量',
                    type:'line',
                    stack: '总量2',
                    itemStyle:{     //这里是为了改变折线线条颜色
                        normal:{
                            lineStyle:{
                                color:"#5A8fd1"
                            }
                        }
                    },
                    // label: {
                    //     normal: {
                    //         show: true,
                    //         position: 'top'
                    //     }
                    // },
                    areaStyle: {normal: {color:"#5A8fd1"}},
                    data:[220, 215, 210,  132, 121,220, 232, 215, 224, 290, 220, 222,234, 219, 214, 220, 234, 220, 232, 221, 234, 226, 227, 224, 226, 217, 228, 310, 219, 229, 224, 229, 234, 220, 232, 231, 234, 226, 227, 224]

                }
            ]
        };


        if (optionB2 && typeof optionB2 === "object") {
            myChartB2.setOption(optionB2, true);
        }
        //底部左边第一个图
        var myChartB3 = echarts.init(document.getElementById('splashes'));
        var dataAll = [
            [
                [174.0, 65.6], [175.3, 71.8], [193.5, 80.7], [186.5, 72.6], [187.2, 78.8],
                [181.5, 74.8], [184.0, 86.4], [184.5, 78.4], [175.0, 62.0], [184.0, 81.6],
                [180.0, 76.6], [177.8, 83.6], [192.0, 90.0], [176.0, 74.6], [174.0, 71.0],
                [184.0, 79.6], [192.7, 93.8], [171.5, 70.0], [173.0, 72.4], [176.0, 85.9],
                [176.0, 78.8], [180.5, 77.8], [172.7, 66.2], [176.0, 86.4], [173.5, 81.8],
                [178.0, 89.6], [180.3, 82.8], [180.3, 76.4], [164.5, 63.2], [173.0, 60.9],
                [183.5, 74.8], [175.5, 70.0], [188.0, 72.4], [189.2, 84.1], [172.8, 69.1],
                [170.0, 59.5], [182.0, 67.2], [170.0, 61.3], [177.8, 68.6], [184.2, 80.1],
                [186.7, 87.8], [171.4, 84.7], [172.7, 73.4], [175.3, 72.1], [180.3, 82.6],
                [182.9, 88.7], [188.0, 84.1], [177.2, 94.1], [172.1, 74.9], [167.0, 59.1],
                [169.5, 75.6], [174.0, 86.2], [172.7, 75.3], [182.2, 87.1], [164.1, 55.2],
                [163.0, 57.0], [171.5, 61.4], [184.2, 76.8], [174.0, 86.8], [174.0, 72.2],
                [177.0, 71.6], [186.0, 84.8], [167.0, 68.2], [171.8, 66.1], [182.0, 72.0],
                [167.0, 64.6], [177.8, 74.8], [164.5, 70.0], [192.0, 101.6], [175.5, 63.2],
                [171.2, 79.1], [181.6, 78.9], [167.4, 67.7], [181.1, 66.0], [177.0, 68.2],
                [174.5, 63.9], [177.5, 72.0], [170.5, 56.8], [182.4, 74.5], [197.1, 90.9],
                [180.1, 93.0], [175.5, 80.9], [180.6, 72.7], [184.4, 68.0], [175.5, 70.9],
                [180.6, 72.5], [177.0, 72.5], [177.1, 83.4], [181.6, 75.5], [176.5, 73.0],
                [175.0, 70.2], [174.0, 73.4], [165.1, 70.5], [177.0, 68.9], [192.0, 102.3],
                [176.5, 68.4], [169.4, 65.9], [182.1, 75.7], [179.8, 84.5], [175.3, 87.7],
                [184.9, 86.4], [177.3, 73.2], [167.4, 53.9], [178.1, 72.0], [168.9, 55.5],
                [157.2, 58.4], [180.3, 83.2], [170.2, 72.7], [177.8, 64.1], [172.7, 72.3],
                [165.1, 65.0], [186.7, 86.4], [165.1, 65.0], [174.0, 88.6], [175.3, 84.1],
                [185.4, 66.8], [177.8, 75.5], [180.3, 93.2], [180.3, 82.7], [177.8, 58.0],
                [177.8, 79.5], [177.8, 78.6], [177.8, 71.8], [177.8, 116.4], [163.8, 72.2],
                [188.0, 83.6], [198.1, 85.5], [175.3, 90.9], [166.4, 85.9], [190.5, 89.1],
                [166.4, 75.0], [177.8, 77.7], [179.7, 86.4], [172.7, 90.9], [190.5, 73.6],
                [185.4, 76.4], [168.9, 69.1], [167.6, 84.5], [175.3, 64.5], [170.2, 69.1],
                [190.5, 108.6], [177.8, 86.4], [190.5, 80.9], [177.8, 87.7], [184.2, 94.5],
                [176.5, 80.2], [177.8, 72.0], [180.3, 71.4], [171.4, 72.7], [172.7, 84.1],
                [172.7, 76.8], [177.8, 63.6], [177.8, 80.9], [182.9, 80.9], [170.2, 85.5],
                [167.6, 68.6], [175.3, 67.7], [165.1, 66.4], [185.4, 102.3], [181.6, 70.5],
                [172.7, 95.9], [190.5, 84.1], [179.1, 87.3], [175.3, 71.8], [170.2, 65.9],
                [193.0, 95.9], [171.4, 91.4], [177.8, 81.8], [177.8, 96.8], [167.6, 69.1],
                [167.6, 82.7], [180.3, 75.5], [182.9, 79.5], [176.5, 73.6], [186.7, 91.8],
                [188.0, 84.1], [188.0, 85.9], [177.8, 81.8], [174.0, 82.5], [177.8, 80.5],
                [171.4, 70.0], [185.4, 81.8], [185.4, 84.1], [188.0, 90.5], [188.0, 91.4],
                [182.9, 89.1], [176.5, 85.0], [175.3, 69.1], [175.3, 73.6], [188.0, 80.5],
                [188.0, 82.7], [175.3, 86.4], [170.5, 67.7], [179.1, 92.7], [177.8, 93.6],
                [175.3, 70.9], [182.9, 75.0], [170.8, 93.2], [188.0, 93.2], [180.3, 77.7],
                [177.8, 61.4], [185.4, 94.1], [168.9, 75.0], [185.4, 83.6], [180.3, 85.5],
                [174.0, 73.9], [167.6, 66.8], [182.9, 87.3], [160.0, 72.3], [180.3, 88.6],
                [167.6, 75.5], [186.7, 101.4], [175.3, 91.1], [175.3, 67.3], [175.9, 77.7],
                [175.3, 81.8], [179.1, 75.5], [181.6, 84.5], [177.8, 76.6], [182.9, 85.0],
                [177.8, 102.5], [184.2, 77.3], [179.1, 71.8], [176.5, 87.9], [188.0, 94.3],
                [174.0, 70.9], [167.6, 64.5], [170.2, 77.3], [167.6, 72.3], [188.0, 87.3],
                [174.0, 80.0], [176.5, 82.3], [180.3, 73.6], [167.6, 74.1], [188.0, 85.9],
                [180.3, 73.2], [167.6, 76.3], [183.0, 65.9], [183.0, 90.9], [179.1, 89.1],
                [170.2, 62.3], [177.8, 82.7], [179.1, 79.1], [190.5, 98.2], [177.8, 84.1],
                [180.3, 83.2], [180.3, 83.2]
            ]

        ];

        var markLineOpt = {
            animation: false,
            label: {
                normal: {
                    // formatter: 'y = 0.5 * x + 3',
                    textStyle: {
                        align: 'left'
                    }
                }
            },
            lineStyle: {
                normal: {
                    type: 'solid'
                }
            },

            data: [[{
                coord: [140, 0],
                symbol: 'none'
            }, {
                coord: [200, 200],
                symbol: 'none'
            }]]
        };

        optionB3 = {
            title: {
                // text: 'Anscombe\'s quartet',
                // x: 'center',
                // y: 0
            },
            // grid: [
            //     // {x: '1%', y: '1%'}, // width: '38%', height: '38%' 图标的位置
            //
            // ],
            grid:{
                top:'5%',
                left: '8%',    //Y轴距离包住图表盒子的位置
                right: '3%',    //图表距离Y轴右边的位置，值越小距离越近
                bottom: '20%',  // bottom:图表底部距离上面的位置，值越大距离上面越近，不会改变上面top的位置
            },
            tooltip: {              //鼠标放置时提示信息
                // formatter: 'Group {a}: ({c})'        鼠标放置到点上时，提示信息前缀  类似A（A：++）
            },
            xAxis: [
                {gridIndex: 0, min: 140, max: 200,

                    axisLine:{              //这个属性是改变坐标轴X轴颜色，和字体颜色
                        lineStyle:{
                            color:'white',
                            width:1,//这里是为了突出显示加上的,这里是X轴宽度
                        }
                    },
                    splitLine: {        //这里设置的是分割线条的颜色
                        lineStyle: {
                            color: "#4B75AD"
                        }
                    },
                },


            ],
            yAxis: [
                {gridIndex: 0, min: 0, max: 200,splitNumber:10,
                    axisLine:{              //这个属性是改变坐标轴X轴颜色，和字体颜色
                        lineStyle:{
                            color:'white',
                            width:1,//这里是为了突出显示加上的,这里是X轴宽度
                        }
                    },
                    splitLine: {        //这里设置的是分割线条的颜色
                        lineStyle: {
                            color: "#4B75AD"
                        }
                    },
                },

            ],
            series: [
                {
                    name: '下单量与收单量对比',
                    type: 'scatter',
                    xAxisIndex: 0,
                    yAxisIndex: 0,
                    data: dataAll[0],
                    markLine: markLineOpt
                },
                // {
                //     name: 'II',
                //     type: 'scatter',
                //     xAxisIndex: 1,
                //     yAxisIndex: 1,
                //     data: dataAll[1],
                //     markLine: markLineOpt
                // },
                // {
                //     name: 'III',
                //     type: 'scatter',
                //     xAxisIndex: 2,
                //     yAxisIndex: 2,
                //     data: dataAll[2],
                //     markLine: markLineOpt
                // },
                // {
                //     name: 'IV',
                //     type: 'scatter',
                //     xAxisIndex: 3,
                //     yAxisIndex: 3,
                //     data: dataAll[3],
                //     markLine: markLineOpt
                // }
            ]
        };


        if (optionB3 && typeof optionB3 === "object") {
            myChartB3.setOption(optionB3, true);
        }


        //订单基本数据一订单回收率
        var myChartR = echarts.init(document.getElementById('recyle'));
        // app.title = '环形图';

        var  optionR = {
            title: {
                text: '64'+"%",
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
                    fontSize:"25"
                },
                /*subtext:'副标题',
            　　//副标题文本样式
            　　subtextStyle:{}*/
            },
            grid: {
                left: '0%',
                right: '3%',
                bottom: '5',
                top:"3%",
                containLabel: true
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
                            /* formatter:function(){
                                 return "19%"
                             },*/
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
                        {value:305, name:'直接访问'},
                        {value:1080, name:'邮件营销'},

                    ]
                }
            ]
        };
        if (optionR && typeof optionR === "object") {
            myChartR.setOption(optionR, true);
        }


        //订单去效率
        var myChartR2 = echarts.init(document.getElementById('cancle'));
        // app.title = '环形图';

        var  optionR2 = {
            title: {
                text: '4'+"%",
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
                    fontSize:"25"
                },
                /*subtext:'副标题',
            　　//副标题文本样式
            　　subtextStyle:{}*/
            },
            grid: {
                left: '0%',
                right: '3%',
                bottom: '5',
                top:"3%",
                containLabel: true
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
                            /* formatter:function(){
                                 return "19%"
                             },*/
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
                        {value:95, name:'直接访问'},
                        {value:1080, name:'邮件营销'},

                    ]
                }
            ]
        };
        if (optionR2 && typeof optionR2 === "object") {
            myChartR2.setOption(optionR2, true);
        }
        //订单基本数据二
        var myChartD = echarts.init(document.getElementById('logistics'));
        // app.title = '坐标轴刻度与标签对齐';

        // app.title = '坐标轴刻度与标签对齐';

        var optionD = {
            color: ['#456999'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                top:"3%",
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : ['单位', '吨数',],
                    axisTick: {
                        // alignWithLabel: true     //X轴刻度和柱状图对其
                    },
                    axisLine:{              //这个属性是改变坐标轴X轴颜色，和字体颜色
                        lineStyle:{
                            color:'white',
                            width:1,//这里是为了突出显示加上的,这里是X轴宽度
                        }
                    },
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    axisLine:{              //这个属性是改变坐标轴X轴颜色，和字体颜色
                        lineStyle:{
                            color:'white',
                            width:1,//这里是为了突出显示加上的,这里是X轴宽度
                        }
                    },
                    splitLine: {        //这里设置的是分割线条的颜色
                        lineStyle: {
                            color: "#434455"
                        }
                    }
                }
            ],
            series : [
                {
                    name:'数量',
                    type:'bar',
                    barWidth: '60%',
                    data:[8, 6,],
                    itemStyle : { normal: {label : {show: true,color:"#CFCFD0"}
                        //让柱状图上显示数据
                    }}
                },

            ]
        };


        if (optionD && typeof optionD === "object") {
            myChartD.setOption(optionD, true);
        }



        //揽收及时性统计

        var myChartE = echarts.init(document.getElementById('express'));


      var  optionE = {
            color: ['#3398DB'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '10%',
                top:"3%",
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : ['一天内', '两天内', '三天内', '逾一天', '逾二天', '逾三天', '以上'],
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLine:{              //这个属性是改变坐标轴X轴颜色，和字体颜色
                        lineStyle:{
                            color:'white',
                            width:1,//这里是为了突出显示加上的,这里是X轴宽度
                        }
                    },
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    axisLine:{              //这个属性是改变坐标轴X轴颜色，和字体颜色
                        lineStyle:{
                            color:'white',
                            width:1,//这里是为了突出显示加上的,这里是X轴宽度
                        }
                    },
                }
            ],
            series : [
                {
                    name:'直接访问',
                    type:'bar',
                    barWidth: '60%',
                    data:[10, 52, 200, 134, 190, 130, 220],
                    itemStyle:{             //改变柱子的颜色
                        normal:{
                            //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                            color: function (params){
                                var colorList = ['#9BBB59','#9BBB59','#9BBB59','#C0504D'];
                                return colorList[params.dataIndex];
                            }
                        },

                    }


                },

            ]
        };



        if (optionE && typeof optionE === "object") {
            myChartE.setOption(optionE, true);
        }

    }
    $(function () {
        var camVideo=["img/vmap/cam/1.mp4","img/vmap/cam/2.mp4","img/vmap/cam/3.mp4","img/vmap/cam/4.mp4"];
        var camera=document.getElementById("cam");
        var camCount =0
        camera.addEventListener("ended",function () {
            console.log("1")
            camCount++;
            var cv='<source src='+camVideo[camCount]+' type="video/mp4">'
            $("#cam").empty().append(cv);
            camera.load();
            if (camCount==4){
                camCount = 0;
                camCount++;
                var cv='<source src='+camVideo[camCount]+' type="video/mp4">'
                $("#cam").empty().append(cv);
                camera.load();
            }
        },false)
    })

})()
