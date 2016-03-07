/**
 * Created by Eric Hamimi on 15/02/2016.
 */

// get the service code
getServiceLabel = function(index){
    var contrat = Services.findOne({idservices: index});
    return contrat.code;
};

// Function revenu by month
getRevByMonth = function(sMois, sAnnee){
    var request = Revenus.find({annee: sAnnee, mois: sMois}).fetch();
    var rev = 0;
    for (var i=0; i<request.length; i++){
        rev = rev + parseFloat(request[i].montant);
    }
    return rev.toFixed(2);
};

// Function revenu by contract, month and year
getRevByContract = function(idContrat, sAnnee, sMois){
    var request = Revenus.find({annee: sAnnee, mois: sMois, idservices: idContrat}).fetch();
    var rev = 0;
    for (var i=0; i<request.length; i++){
        rev = rev + parseFloat(request[i].montant).toFixed(2);
    }
    return parseFloat(rev).toFixed(2);
};

// Fill the data_rev array
getDataRev = function(tabAnnee){
    data_rev =[];
    for(var i=0; i<tabAnnee.length; i++){
        var req = Revenus.find({annee: tabAnnee[i]}).fetch();
        for (var j=0; j<req.length; j++){
            data_rev.push({
                mois: req[j].mois,
                annee: req[j].annee,
                code: getServiceLabel(req[j].idservices),
                montant: req[j].montant
            });
        }
    }
    Session.set('data', data_rev);
    var tot = getTotalData_Rev();
    Session.set('total', tot);
};

getDataYear = function(sYear){
    data_year = [];
    var rev = 0;
    var sCode = '';
    var req = Services.find({}).fetch();

    for (var i=0; i<req.length; i++){
        rev =0;
        sCode = req[i].code;

        for (var j=0; j<tabMois.length; j++){
            rev = rev + parseFloat(getRevByContract(req[i].idservices,sYear,tabMois[j]));
        }

        console.log(sCode + ' -> ' + parseFloat(rev).toFixed(2));

        if (rev > 0){
            data_year.push({
                code: sCode,
                annee: sYear,
                montant: parseFloat(rev).toFixed(2)
            });
        }
    }

    Session.set('data', data_year);
    Session.set('total',getTotalData_Rev());
}

getPourcentageRev = function(rev){
    var p = 100*(rev) / Session.get('total')
    return p.toFixed(2);
};

getDataRevByMonth = function(sAnnee, sMonth){

    data_rev =[];
    var req = Revenus.find({annee: sAnnee, mois: sMonth}).fetch();
    for (var i=0; i<req.length; i++ ){
        data_rev.push({
            code: getServiceLabel(req[i].idservices),
            montant: req[i].montant,
            annee: req[i].annee,
            mois: req[i].mois
        });
    }

    Session.set('data', data_rev);
    var tot = getTotalData_Rev();
    Session.set('total', tot);
}

getTotalData_Rev = function(){
    var total = 0;
    var data = Session.get('data');
    for (var i=0; i<data.length; i++){
        total = total+parseFloat(data[i].montant);
    }
    return parseFloat(total).toFixed(2);
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



