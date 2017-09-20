
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
  return moment(str).format('DD/MM/YYYY');
});

UI.registerHelper('getServiceName', function(catno){
  return getServiceName(catno);
});

UI.registerHelper('formatTel', function (sTel) {
	var newTel = sTel.split(" ");
	newTel = newTel[0].slice(0,13);
	
	return newTel;
	}
)