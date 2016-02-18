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

// Function revenu by contract
getRevByContract = function(idContrat, sAnnee, sMois){
    var request = Revenus.find({annee: sAnnee, mois: sMois, idservices: idContrat}).fetch();
    var rev = 0;
    for (var i=0; i<request.length; i++){
        rev = rev + parseFloat(request[i].montant).toFixed(2);
    }
    console.log(rev.toFixed(2));
    return rev.toFixed(2);
};

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
};

getDataRevByMonth = function(sAnnee, sMonth){

    data_rev =[];
    var req = Revenus.find({annee: sAnnee, mois: sMonth}).fetch();
    for (var i=0; i<req.length; i++ ){
        data_rev.push({
            code: getServiceLabel(req[i].idservices),
            montant: req[i].montant.toFixed(2),
            annee: req[i].annee,
            mois: req[i].mois
        });
    }
}

getTotalData_Rev = function(){
    var total = 0;
    var data = Session.get('data');
    for (var i=0; i<data.length; i++){
        total = total+data[i].montant;
    }
    return total.toFixed(2);
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

