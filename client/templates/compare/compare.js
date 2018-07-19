var Highcharts = require('highcharts');

// Load module after Highcharts is loaded
//require('highcharts/modules/exporting')(Highcharts);

Template.compare.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('revenus');
    });
});

Template.compare.helpers({
    createChart: function() {
        var dataSeries = [];
        // Use Meteor.defer() to create chart after DOM is ready:
        Meteor.defer(function() {

            getDataSeries([$('#year1').val(), $('#year2').val(), $('#year3').val()]);            
            console.log('rendu graph');
            dataSeries = Session.get('chartData');

            Highcharts.chart('chart', {
                series: dataSeries,
                title: { text: "Revenu comparison" },
                xAxis: { categories: tabMonth },
                chart: { type: 'spline' },
                yAxis: { title: { text: 'Revenu' } }
            });
        });
    }
});

Template.DataCompare.helpers({
    data: function() {    
        var y1 = $("#year1").val();
        var y2 = $("#year2").val();
        var y3 = $("#year3").val();  
        
        if (y1) {
            getReportYearCompare([y1,y2,y3]);
        } else {         
            getReportYearCompare([2016,2017,2018]);
        }

        return Session.get('data_compare');        
    },
    ecart: function() {
        var data = Session.get('data_compare');
        var ob = {};
        var diff = [];

        diff.push(getPourcentageEcart(data[0].totalRev, data[1].totalRev));
        diff.push(getPourcentageEcart(data[0].totalRev, data[2].totalRev));
        diff.push(getPourcentageEcart(data[1].totalRev, data[0].totalRev));
        diff.push(getPourcentageEcart(data[1].totalRev, data[2].totalRev));
        diff.push(getPourcentageEcart(data[2].totalRev, data[0].totalRev));
        diff.push(getPourcentageEcart(data[2].totalRev, data[1].totalRev));

        console.log(diff);

        return diff;
    }

});

Template.DataCompare.events({
    'click .js-detail-view': function(evt) {
        var id = evt.target.id;
        var data = Session.get('data_compare');
        for (var i = 0; i < data.length; i++) {
            if (data[i].annee == id) {
                console.log(data[i]);
            }
        }
        if (evt.target.text == 'Hide details') {
            evt.target.text = 'See year details';
        } else {
            evt.target.text = 'Hide details';
        }
    }
});


Template.compare.events({
    'blur .year_input': function() {
        getDataSeries([$('#year1').val(), $('#year2').val(), $('#year3').val()]);
        getReportYearCompare([$('#year1').val(), $('#year2').val(), $('#year3').val()]);
        dataSeries = Session.get('chartData');

        Highcharts.chart('chart', {
            series: dataSeries,
            title: { text: "Revenu comparison" },
            xAxis: { categories: tabMonth },
            chart: { type: 'spline' },
            yAxis: { title: { text: 'Revenu' } }
        });
    }
})