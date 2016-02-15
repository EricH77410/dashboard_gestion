/**
 * Created by Eric Hamimi on 15/02/2016.
 */

// get the service code
getServiceLabel = function(index){
    var contrat = Services.findOne({idservices: index});
    return contrat.code;
}

// Function revenu by month
getRevByMonth = function(sMois, sAnnee){
    var request = Revenus.find({annee: sAnnee, mois: sMois}).fetch();
    var rev = 0;
    for (var i=0; i<request.length; i++){
        rev = rev + parseFloat(request[i].montant);
    }
    return rev;
}

// Function revenu by contract
getRevByContract = function(sCodeContrat, sAnnee, sMois){
    var request = Revenus.find({annee: sAnnee, mois: sMois, code: sCodeContrat}).fetch();
    var rev = 0;
    for (var i=0; i<request.length; i++){
        rev = rev + parseFloat(request[i].montant);
    }
    return rev;
}

// Fill the data_rev array
getDataRev = function(tabAnnee){
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
}