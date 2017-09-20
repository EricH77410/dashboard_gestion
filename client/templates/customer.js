var Highcharts = require('highcharts');
require('highcharts/modules/exporting')(Highcharts);

Template.customer.onCreated(function () {
   var self = this;
    self.autorun(function () {
       self.subscribe('customer');
    });
});

Template.customer.helpers({
  data: function(){
    return Customer.find({})
  }
});

Template.customerGraph.helpers({
  createChart: function(){
      var data = Customer.getCustomerDataSeries();
       Meteor.defer(function () {
       //setTimeout(function(){}, 1000)
      Highcharts.chart('chart', data);
      });
  }
});
