/**
 * Created by pb10288 on 18/02/2016.
 */

var options = {
    ///Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : true,

    //String - Colour of the grid lines
    scaleGridLineColor : "rgba(0,0,0,.05)",

    //Number - Width of the grid lines
    scaleGridLineWidth : 1,

    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: true,

    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: true,

    //Boolean - Whether the line is curved between points
    bezierCurve : true,

    //Number - Tension of the bezier curve between points
    bezierCurveTension : 0.4,

    //Boolean - Whether to show a dot for each point
    pointDot : true,

    //Number - Radius of each point dot in pixels
    pointDotRadius : 4,

    //Number - Pixel width of point dot stroke
    pointDotStrokeWidth : 1,

    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
    pointHitDetectionRadius : 20,

    //Boolean - Whether to show a stroke for datasets
    datasetStroke : true,

    //Number - Pixel width of dataset stroke
    datasetStrokeWidth : 2,

    //Boolean - Whether to fill the dataset with a colour
    datasetFill : true,

    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
}
var tabColor = ["rgba(255,0,0,0.3)","rgba(0,0,255,0.3)","rgba(255,255,0,0.4)"];

// Fonction pour le chart
initChart = function(donneeChart){
    var ctx = $('#chart-compare').get(0).getContext("2d");
    var data ={
        labels: tabMonth,
        datasets:[{
            label: '1st',
            fillColor: "rgba(255,0,0,0.3)",
            strokeColor: "rgba(255,0,0,0.3)",
            pointColor: "rgba(255,0,0,0.3)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(255,0,0,0.5)",
            data: []
        },
            {
                label: "2nd",
                fillColor: "rgba(0,0,255,0.3)",
                strokeColor: "rgba(0,0,255,0.3)",
                pointColor: "rgba(0,0,255,0.3)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(0,0,255,0.5)",
                data: []
            },
            {
                label: "3rd",
                fillColor: "rgba(255,255,0,0.4)",
                strokeColor: "rgba(255,255,0,0.4)",
                pointColor: "rgba(255,255,0,0.4)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(0,255,0,1)",
                data: []
            }]
    };

    for (var h=0; h<12; h++){
        data.datasets[0].data.push(donneeChart[h]);
    }
    for (var i = 12; i<24; i++){
        data.datasets[1].data.push(donneeChart[i]);
    }
    for (var j = 24; j<donneeChart.length; j++){
        data.datasets[2].data.push(donneeChart[j]);
    }

    var newchart = new Chart(ctx).Line(data,options);
}
