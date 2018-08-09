/**
 * Created by Eric Hamimi on 15/02/2016.
 */

getHomeDataSeries = function() {
    var dataSeries = [];
    var dataActual = {};
    var dataPrevious = {};
    dataActual.data = [];
    dataPrevious.data = [];
    var objectReturn = {};
    var tabContract = [];

    var actual = Revenus.getDataHomeContract(Session.get('month'), Session.get('actualYear'));
    var previous = Revenus.getDataHomeContract(Session.get('month'), Session.get('previousYear'));

    // A revoir : si un élément de previous n'existe pas dans actual alors, il n'est pas pris en compte
    // pour la comparason ...
    actual.forEach(function(item) {
        var ind = previous.map(function(catno) { return catno.catno }).indexOf(item.catno);
        tabContract.push(getServiceLabel(item.idservices));
        if (ind != -1) {
            dataActual.data.push(parseFloat(item.montant));
            dataPrevious.data.push(parseFloat(previous[ind].montant));
        } else {
            dataActual.data.push(parseFloat(item.montant));
            dataPrevious.data.push(0);
        }
    });

    dataActual.name = Session.get('month') + ' ' + Session.get('actualYear');
    dataPrevious.name = Session.get('month') + ' ' + Session.get('previousYear');

    dataSeries.push(dataActual);
    dataSeries.push(dataPrevious);

    objectReturn = {
        series: dataSeries,
        title: { text: "Revenu comparison" },
        xAxis: { categories: tabContract }, // contract
        chart: { type: 'bar' },
        yAxis: { title: { text: 'Revenu' } }
    };

    return objectReturn;
}

getHomeTotal = function(tableau) {
    var total = 0;
    var data = Session.get(tableau);
    for (var i = 0; i < data.length; i++) {
        total = total + parseFloat(data[i].montant);
    }
    return parseFloat(total).toFixed(2);
}

// Get the serie for chart
getDataSeries = function(tabYear) {
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

    for (var h = 0; h < tabMois.length; h++) {
        dataObject1.data.push(parseFloat(getRevByMonth(tabMois[h], tabYear[0])));
    }
    dataSeries.push(dataObject1);

    for (var i = 0; i < tabMois.length; i++) {
        dataObject2.data.push(parseFloat(getRevByMonth(tabMois[i], tabYear[1])));
    }
    dataSeries.push(dataObject2);

    for (var j = 0; j < tabMois.length; j++) {
        dataObject3.data.push(parseFloat(getRevByMonth(tabMois[j], tabYear[2])));
    }
    dataSeries.push(dataObject3);
    //return dataSeries;
    Session.set('chartData', dataSeries);
}

getTotalData_Rev = function() {
    var total = 0;
    var data = Session.get('data');
    for (var i = 0; i < data.length; i++) {
        total = total + parseFloat(data[i].montant);
    }
    return parseFloat(total).toFixed(2);
}

getTotal = function(data) {
    var total = 0;
    for (var i = 0; i < data.length; i++) {
        total = total + parseFloat(data[i].montant);
    }
    return parseFloat(total).toFixed(2);
}

getPourcentageRev = function(rev) {
    var p = 100 * (rev) / Session.get('total')
    return p.toFixed(2);
};

getPurcentage = function(a, b) {
    var result = 100 * (a) / b;
    return result.toFixed(2);
}

getRevForChart = function(tabAnnees) {
    var tabRetour = [];

    for (var i = 0; i < tabAnnees.length; i++) {
        for (j = 0; j < tabMois.length; j++) {
            tabRetour.push(getRevByMonth(tabMois[j], tabAnnees[i]));
        }
    }
    return tabRetour;
}

getPourcentageEcart = function(a, b) {
    var result = (a - b) / b;
    return result.toFixed(2);
}

// ==============
// PRICE INCREASE
// ==============
priceInc = function(init_price) {
    var newPrice = (init_price * 6) / 100;
    return newPrice.toFixed(2);
}

priceVatIncluded = function(price) {
    var VatPrice = parseFloat((price * 20) / 100);
    var returnPrice = parseFloat(VatPrice) + parseFloat(price);
    return returnPrice.toFixed(2);
}

sortObjectTable = function(data, triBy, desc) {
    var t = triBy;

    var newArray = data.sort(function(a, b) {
        var tri = desc;

        if (tri) {
            return a.montant - b.montant;
        } else {
            return b.montant - a.montant;
        }
    });
    return newArray;
}

getMoisEnLettre = function(num_mois) {
    // Retourne le mois en lettre (mois actuel - 1)
    var ind = 0;
    if (num_mois > 1) {
        ind = num_mois - 1
    } else if (num_mois === 0) {
        ind = 11
    }
    return tabMois[ind];
}

getMoisEnLettre_next = function(num) {
    var ind = 0;
    if (num != 11) {
        ind = num + 1;
    }
    return tabMois[ind];
}

set_ActualYear = function(value) {

}

set_PreviouYear = function() {

}

getYearFromDate = function(date) {
    return date.getFullYear();
}

getQty = function(data) {
    var qty = 0;
    for (var i = 0; i < data.length; i++) {
        qty = qty + data[i].qty;
    }
    return qty;
}

getFormatedDate = function(d) {
    const a = d.substring(6)
    const m = d.substring(3,5)
    const j= d.substring(0,2)
    return a+m+j;
}

getSumFromTab = function(tab){
  var total = 0
  if(tab){
    tab.forEach(function(item){
      total += parseFloat(item.montant)
    })
  }
  return total.toFixed(2);
}