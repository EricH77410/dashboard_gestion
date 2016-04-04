/**
 * Created by Eric Hamimi on 15/02/2016.
 */

// Get the serie for chart
getDataSeries = function(tabYear){
  var dataSeries = [];

  var dataObject1 = {};
  var dataObject2 = {};
  var dataObject3 = {};

  dataObject1.name = tabYear[0];
  dataObject2.name = tabYear[1];
  dataObject3.name = tabYear[2];

  dataObject1.data = [];
  dataObject2.data = [];
  dataObject3.data = [];

  for (var h=0; h<tabMois.length; h++){
      dataObject1.data.push(parseFloat(getRevByMonth(tabMois[h],tabYear[0])));
  }
  dataSeries.push(dataObject1);

  for (var i=0; i<tabMois.length; i++){
      dataObject2.data.push(parseFloat(getRevByMonth(tabMois[i],tabYear[1])));
  }
  dataSeries.push(dataObject2);

  for (var j=0; j<tabMois.length; j++){
      dataObject3.data.push(parseFloat(getRevByMonth(tabMois[j],tabYear[2])));
  }
  dataSeries.push(dataObject3);
  //return dataSeries;
    Session.set('chartData', dataSeries);
}

getTotalData_Rev = function(){
    var total = 0;
    var data = Session.get('data');
    for (var i=0; i<data.length; i++){
        total = total+parseFloat(data[i].montant);
    }
    return parseFloat(total).toFixed(2);
}

getPourcentageRev = function(rev){
    var p = 100*(rev) / Session.get('total')
    return p.toFixed(2);
};

getPurcentage = function(a,b){
  var result = 100 * (a) / b;
  return result.toFixed(2);
}

getRevForChart = function(tabAnnees){
    var tabRetour = [];

    for (var i=0; i<tabAnnees.length; i++){
        for (j=0; j<tabMois.length; j++){
            tabRetour.push(getRevByMonth(tabMois[j],tabAnnees[i]));
        }
    }
    return tabRetour;
}

// ==============
// PRICE INCREASE
// ==============
priceInc= function (init_price) {
    var newPrice = (init_price * 6) / 100;
    return newPrice.toFixed(2);
}

priceVatIncluded = function(price){
    var VatPrice = parseFloat((price * 20) / 100);
    var returnPrice = parseFloat(VatPrice)+parseFloat(price);
    return returnPrice.toFixed(2);
}

sortObjectTable = function(data, triBy, desc){
  var t = triBy;

  var newArray = data.sort(function(a,b){
    var tri = desc;

    if(tri){
      return a.montant - b.montant;
    } else {
      return b.montant - a.montant;
    }
  });
  return newArray;
}
