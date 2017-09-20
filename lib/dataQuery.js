/*
  Query on mongo db
 */

// get the service code
getServiceLabel = function(index) {
    var contrat = Services.findOne({ idservices: index });
    return contrat.code;
};

getServiceName = function(catno) {
    var ctr = Services.findOne({ catno: catno });
    return ctr.nom;
}

// Function revenu by month
getRevByMonth = function(sMois, sAnnee) {
    var request = Revenus.find({ annee: sAnnee, mois: sMois }).fetch();
    var rev = 0;
    for (var i = 0; i < request.length; i++) {
        rev = rev + parseFloat(request[i].montant);
    }
    return rev.toFixed(2);
};

// Function revenu by contract, month and year
getRevByContract = function(idContrat, sAnnee, sMois) {
    var request = Revenus.find({ annee: sAnnee, mois: sMois, idservices: idContrat }).fetch();
    var rev = 0;
    for (var i = 0; i < request.length; i++) {
        rev = rev + request[i].montant; //parseFloat(request[i].montant).toFixed(2);
    }
    return parseFloat(rev).toFixed(2);
};

// Fill the data_rev array
getDataRev = function(tabAnnee) {
    data_rev = [];
    for (var i = 0; i < tabAnnee.length; i++) {
        var req = Revenus.find({ annee: tabAnnee[i] }).fetch();
        for (var j = 0; j < req.length; j++) {
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

getDataYear = function(sYear) {
    data_year = [];
    var rev = 0;
    var sCode = '';
    var req = Services.find({}).fetch();

    for (var i = 0; i < req.length; i++) {
        rev = 0;
        sCode = req[i].code;

        for (var j = 0; j < tabMois.length; j++) {
            rev = rev + parseFloat(getRevByContract(req[i].idservices, sYear, tabMois[j]));
        }

        if (rev > 0) {
            data_year.push({
                code: sCode,
                annee: sYear,
                montant: parseFloat(rev).toFixed(2)
            });
        }
    }
    Session.set('data', data_year);
    Session.set('total', getTotalData_Rev());
}

getRevByYear = function(sAnnee) {
    var rev = 0;
    var req = Revenus.find({ annee: sAnnee }).fetch();
    for (var i = 0; i < req.length; i++) {
        rev = rev + parseFloat(req[i].montant); //parseFloat(req[i].montant).toFixed(2);
    }
    return parseFloat(rev).toFixed(2);
}

getDataRevByMonth = function(sAnnee, sMonth) {
    data_rev = [];
    var req = Revenus.find({ annee: sAnnee, mois: sMonth }).fetch();
    for (var i = 0; i < req.length; i++) {
        data_rev.push({
            code: getServiceLabel(req[i].idservices),
            montant: req[i].montant,
            annee: req[i].annee,
            mois: req[i].mois,
            qty: req[i].qty
        });
    }

    Session.set('data', data_rev);
    var tot = getTotalData_Rev();
    var contractQty = getContractQty();
    Session.set('total', tot);
    Session.set('contract_qty', contractQty);

    // Services
    Session.set("services_revenu", Revenus.getDataHomeService(sMonth, sAnnee));
    Session.set("services_qty", getQty(Session.get("services_revenu")));
    var total_service = getTotal(Session.get("services_revenu"));
    Session.set('total_service', total_service);

    // Contracts
    Session.set("contracts_revenu", Revenus.getDataHomeContract(sMonth, sAnnee));
    Session.set("contract_qty", getQty(Session.get("contracts_revenu")));
    var total_contract = getTotal(Session.get("contracts_revenu"));
    Session.set('total_contract', total_contract);
}

getReportYear = function(sAnnee) {

    var total = 0;

    // Services
    var dataService = Revenus.getDataServiceYear(sAnnee);

    Session.set("services_revenu", dataService);
    Session.set("services_qty", getQty(Session.get("services_revenu")));

    var total_service = getTotal(Session.get("services_revenu"));

    Session.set('total_service', total_service);

    // Contracts
    var dataContrat = Revenus.getDataContractYear(sAnnee);

    Session.set("contracts_revenu", dataContrat);
    Session.set("contract_qty", getQty(Session.get("contracts_revenu")));

    var total_contract = getTotal(Session.get("contracts_revenu"));
    Session.set('total_contract', total_contract);

    total = parseFloat(total_contract) + parseFloat(total_service);

    Session.set('total', total);
}

getReportYearCompare = function(tabAnnee) {
    var data = [];
    for (var i = 0; i < tabAnnee.length; i++) {
        var obj = {};
        var year = tabAnnee[i].toString();
        obj.annee = year;
        // Services
        var serv = Revenus.getDataServiceYear(year);
        obj.serviceRev = serv;
        obj.serviceQty = getQty(serv);
        obj.totalService = parseFloat(getTotal(serv));

        // Contrats
        var contrat = Revenus.getDataContractYear(year);
        obj.contratRev = contrat;
        obj.contratQty = getQty(contrat);
        obj.totalContrat = parseFloat(getTotal(contrat));

        obj.totalRev = obj.totalContrat + obj.totalService;
        data.push(obj);
    }
    Session.set('data_compare', data);
}

getContractQty = function() {
    var total = 0;
    var data = Session.get('data');
    var sCode = "";
    for (var i = 0; i < data.length; i++) {
        sCode = data[i].code;
        if (sCode.indexOf('OPT') == 0 || sCode.indexOf('LO039') == 0 || sCode.indexOf('Eco') == 0) {
            total = total + parseInt(data[i].qty);
            //console.log('tot : '+total);
        }
    }
    return parseInt(total);
}