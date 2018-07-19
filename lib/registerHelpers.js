
//var accounting = require('accounting-js');

UI.registerHelper('money', function(montant){
  //console.log(accounting.formatMoney(montant, { symbol: "€", precision: 2, thousand: ".", decimal: "," });
  //console.log(acconting.formatMoney(montant,"€",2));
  return accounting.formatMoney(montant, "€", 2,".", ",");
});

UI.registerHelper('purcentage', function(a, b){
  return getPurcentage(a, b);
});

UI.registerHelper('formatDate', function(str){
  if (str) {
    return moment(str).format('DD/MM/YYYY');
  } else {
    return ''
  }

});

UI.registerHelper('dateForInput', function(dt){
  var year, day, month;
  if (dt){
    year = dt.substring(0,4);
    month = dt.substr(4,2);
    day = dt.substr(6,2);
    return year+'-'+month+'-'+day
  } else {
    return ''
  }
});

UI.registerHelper('getServiceName', function(catno){
  return getServiceName(catno);
});

UI.registerHelper('sum', function(a,b){
   return a + b;
});

UI.registerHelper('formatTel', function (sTel) {
	var newTel = sTel.split(" ");
	newTel = newTel[0].slice(0,13);
	
	return newTel;
	}
)