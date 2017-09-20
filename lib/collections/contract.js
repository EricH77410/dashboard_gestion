
LiveDataContract = new Mongo.Collection('live_data');

LiveDataContract.getTotalActiveContract = function(){
  var data = LiveDataContract.find({},{sort: {qte: 1}}).fetch()[0].data;
  var totalContracts = 0;
  for (var i=0; i<data.length; i++){
    totalContracts = totalContracts + data[i].qte;
  }
  return totalContracts;
}
