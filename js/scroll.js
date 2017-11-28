(function () {


var app =angular.module("myApp",[]);
app.controller("myEchart",function($scope){
    // 数据可以根据自己使用情况更换
    $scope.datasetData = [
        {option : "这个是第一条数据"},
        {option : "这个是第二条数据"},
        {option : "这个是第三条数据"},
        {option : "这个是第四条数据"},
        {option : "这个是第五条数据"},
        {option : "这个是第六条数据"}
    ]
})
    .directive("slideFollow",function($timeout){
        return {
            restrict : 'E',
            replace : true,
            scope : {
                id : "@",
                datasetData : "="
            },
            template : "<li ng-repeat = 'data in datasetData'>{{data.option}}</li>",
            link : function(scope,elem,attrs) {
                $timeout(function(){
                    var className = $("." + $(elem).parent()[0].className);
                    var i = 0,sh;
                    var liLength = className.children("li").length;
                    var liHeight = className.children("li").height() + parseInt(className.children("li").css('border-bottom-width'));
                    className.html(className.html() + className.html());

                    // 开启定时器
                    sh = setInterval(slide,4000);

                    function slide(){
                        if (parseInt(className.css("margin-top")) > (-liLength * liHeight)) {
                            i++;
                            className.animate({
                                marginTop : -liHeight * i + "px"
                            },"slow");
                        } else {
                            i = 0;
                            className.css("margin-top","0px");
                        }
                    }

                    // 清除定时器
                    className.hover(function(){
                        clearInterval(sh);
                    },function(){
                        clearInterval(sh);
                        sh = setInterval(slide,4000);
                    })


                },0)

            }
        }
    })
})()