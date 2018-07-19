
LiveDataContract = new Mongo.Collection('live_data');
Contract = new Mongo.Collection('contract');

LiveDataContract.getTotalActiveContract = function(){
  var data = LiveDataContract.find({},{sort: {qte: 1}}).fetch()[0].data;
  var totalContracts = 0;
  if (data) {
    for (var i=0; i<data.length; i++){
      totalContracts = totalContracts + data[i].qte;
    }
  }

  return totalContracts;
  
}

Contract.getCustomerDataSeries = function(){
  var dataSeries = [];
  var objectReturn = {};
  var tabData = [];
  var dataTmp = {}
  dataTmp.data = [];
  var data = Contract.find({}).fetch();

  data.forEach(function(item){
    if(item.annee != "2013") {
      tabData.push(item.mois.substring(0,3)+item.annee.substring(2))
      dataTmp.data.push(item.qty);
    }

  });
  dataTmp.name = "Ctr"
  dataSeries.push(dataTmp);

  objectReturn = {
    series: dataSeries,
    title: {text: "Total contract"},
    xAxis: {categories: tabData},
    chart: {type: 'line'},
    yAxis: {title: {text: 'Contrat'}}
  };

  return objectReturn;
}
