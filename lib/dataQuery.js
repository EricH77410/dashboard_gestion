
/*
  Query on mongo db
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
         rev = rev + request[i].montant; //parseFloat(request[i].montant).toFixed(2);
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

 getRevByYear = function(sAnnee){
   var rev = 0;
   var req = Revenus.find({annee: sAnnee}).fetch();
   for (var i = 0 ; i < req.length ; i++){
     rev = rev + req[i].montant //parseFloat(req[i].montant).toFixed(2);
   }
   return parseFloat(rev).toFixed(2);
 }

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
