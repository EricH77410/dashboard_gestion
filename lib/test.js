testGetPurcentage = function(a, b){
  var p = 100 * (a) / b;
  return p;
}

getAnnee = function(date){
  var ret = date.getFullYear();
  return ret;
}

getPremiereLettre = function (str){
  return str.charAt(0).toUpperCase()+str.slice(1);
}
