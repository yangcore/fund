exports.pie= function(data){
    return {
        backgroundColor: '#f7faff',
        title: {
            x: 'center',
            y: 'center',
            textStyle: {
                fontWeight: 'normal',
                fontSize: 16
            }
        },
        legend: {
            orient: 'vertical',
            bottom: '5%',
            right: "1%",
            selectedMode:false,
            textStyle: {
                color: "#ababab"
            },
            data: ['股票型', '债券型', '混合型', '货币型', 'QDII', "ETF",'拍活期']
        },
        series: [{
            type: 'pie',
            hoverAnimation: true,
            selectedOffset: 5,
            center: ['50%', '50%'],
            radius: ['75%', '88%'],
            color: ['#86D560', '#AF89D6', '#59ADF3', '#FF999A', '#FFCC67', "#ffe894",'#ff6600'],
            label: {
                normal: {
                    show: false
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: data
        }]
    }
}