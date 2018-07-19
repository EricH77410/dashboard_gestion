Template.Sms.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('sms');
    });
});

var HighchartsSMS = require('highcharts');

// Load module after Highcharts is loaded
//require('highcharts/modules/exporting')(HighchartsSMS);

var annee = '2018';
var tabAnnees = ['2016','2017','2018'];

Template.Sms.helpers({
    smsYear: function() {
        return annee
    },
});

Template.Sms.events({
   'blur #sms-year':function () {
       console.log('chg')
   },
    'submit form': function (e) {
        e.preventDefault();
        annee = $('#sms-year').val()
        var data = getChartDataSms();
        Meteor.defer(function() {
            HighchartsSMS.chart('sms-chart', data);
        });
    }
});

Template.SmsGraph.helpers({
    createChartSms: function() {        
        var data = getChartDataSms();
        Meteor.defer(function() {
            HighchartsSMS.chart('sms-chart', data);
        });
    }
});

Template.SmsCompareGraph.helpers({
    smsCompare: function (){
        var tabData = [];
        for (var i=0; i<tabAnnees.length; i++) {
            tabData.push(Sms.getDataByYear(tabAnnees[i]));
        }
        var series = getSeries(tabData);

        var data = getChartSmsCompare(series);

        Meteor.defer(function(){
            HighchartsSMS.chart('sms-chart-compare', data)
        })
    }
});

getChartDataSms = function() {
    var tabData = [];
    var tmp = Sms.getDataByYear(annee);

    tmp.forEach(function(item){
        var arr = [];
        arr.push(item.mois);
        arr.push(item.qty);
        tabData.push(arr);
    });

    objectReturn = {
        chart:{
            type: 'column'
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Annee '+annee
            }
        },
        series: [{
            name: 'Quantité SMS '+annee,
            data: tabData,
        }
        ],
        title: { text: "Quantité commandé" }
    };
    return objectReturn;
}

getChartSmsCompare = function(tabSeries){

    var objectChart =  {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Comparaison'
        },
        xAxis: {
            categories: [
                'Jan',
                'Fev',
                'Mar',
                'Avr',
                'Mai',
                'Jun',
                'Jul',
                'Aou',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Quantité SMS'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.2f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: tabSeries
    };

    //getSeries(tabData)
    return objectChart;
}

getSeries = function(arrData){
    var series = [];
    for (var i=0; i<arrData.length; i++){
        var objSerie = {}
        objSerie.name = tabAnnees[i];
        objSerie.data = [];
        for (var j=0; j<arrData[i].length; j++){
            objSerie.data.push(arrData[i][j].qty)
        }
        series.push(objSerie);

    }

    return series;
}

renderChart = function() {
   return  [{
        name: tabAnnees[0],
        data: [tabData[0][0].qty,tabData[0][1].qty,tabData[0][2].qty,tabData[0][3].qty,tabData[0][4].qty,tabData[0][5].qty,tabData[0][6].qty,tabData[0][7].qty,tabData[0][8].qty,tabData[0][9].qty,tabData[0][10].qty,tabData[0][11].qty]

    }, {
        name: tabAnnees[1],
        data: [tabData[1][0].qty,tabData[1][1].qty,tabData[1][2].qty,tabData[1][3].qty,tabData[1][4].qty,tabData[1][5].qty,tabData[1][6].qty,tabData[1][7].qty,tabData[1][8].qty,tabData[1][9].qty,tabData[1][10].qty,tabData[1][11].qty]

    }, {
        name: tabAnnees[2],
        data: [tabData[2][0].qty,tabData[2][1].qty,tabData[2][2].qty,tabData[2][3].qty,tabData[2][4].qty,tabData[2][5].qty,tabData[2][6].qty,tabData[2][7].qty,tabData[2][8].qty,tabData[2][9].qty,tabData[2][10].qty,tabData[2][11].qty]

    }]
}

