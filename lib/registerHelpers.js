UI.registerHelper('money', function(montant){
  return accounting.formatMoney(montant, "€", 2,".", ",");
});

UI.registerHelper('purcentage', function(a, b){
  return getPurcentage(a, b);
});

UI.registerHelper('formatDate', function(str){
  return moment(str).format('DD/MM/YYYY');
});
