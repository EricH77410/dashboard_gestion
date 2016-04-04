Template.compare.onCreated(function(){
  var self = this;
  self.autorun(function(){
    self.subscribe('revenus');
  });
});

Template.compare.helpers({
    createChart: function () {
        var dataSeries = [];
        // Use Meteor.defer() to create chart after DOM is ready:
        Meteor.defer(function () {

            getDataSeries([$('#year1').val(), $('#year2').val(), $('#year3').val()]);

            dataSeries = Session.get('chartData');

            Highcharts.chart('chart',
                {
                    series: dataSeries,
                    title: {text: "Revenu comparison"},
                    xAxis: {categories: tabMonth},
                    chart: {type: 'spline'},
                    yAxis: {title: {text: 'Revenu'}}
                });
        });
    }
});

Template.compare.events({
    'click .upd': function (e) {

        getDataSeries([$('#year1').val(), $('#year2').val(), $('#year3').val()]);

        dataSeries = Session.get('chartData');

        Highcharts.chart('chart',
            {
                series: dataSeries,
                title: {text: "Revenu comparison"},
                xAxis: {categories: tabMonth},
                chart: {type: 'spline'},
                yAxis: {title: {text: 'Revenu'}}
            });
    }
});
