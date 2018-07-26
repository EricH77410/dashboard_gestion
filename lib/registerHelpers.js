
//var accounting = require('accounting-js');

var users = ['JVelicitat','JPetit', 'JSchecroun','DYu','EHamimi']

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

UI.registerHelper('getLogin', function(log){
  switch(log){
    case '76601922':
      return users[2]
    case 'PB10419':
      return users[0]
    case 'PB10367':
      return users[1]
    case '19007526':
      return users[3]
    case 'PB10288':
      return users[4]
    default:
        console.log('Not found: ',log)
      return '';
  }
})

UI.registerHelper('formatTel', function (sTel) {
  if (sTel){
    var newTel = sTel.split(" ");
    newTel = newTel[0].slice(0,13);
    return newTel;
  }

	}
)