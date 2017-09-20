Customer       = new Mongo.Collection('customer');

Customer.get_number_by_month = function(month, year) {
    return Customer.find({mois: month, annee: year});
}

Customer.getCustomerDataSeries = function(){
  var dataSeries = [];
  var objectReturn = {};
  var tabData = [];
  var dataTmp = {}
  dataTmp.data = [];
  var data = Customer.find({}).fetch();

  data.forEach(function(item){
      tabData.push(item.mois.substring(0,3)+item.annee.substring(2))
      dataTmp.data.push(item.active);
  });
  dataTmp.name = "Act"
  dataSeries.push(dataTmp);

  objectReturn = {
      series: dataSeries,
      title: {text: "Dental offices with contract"},
      xAxis: {categories: tabData},
      chart: {type: 'line'},
      yAxis: {title: {text: 'Active'}}
  };

  return objectReturn;
}
