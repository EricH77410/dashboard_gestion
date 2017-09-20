/**
 * Created by Eric Hamimi on 05/04/2016.
 */
Revenus = new Mongo.Collection('revenus');

Revenus.getDataByMonth = function(month, year) {
    return Revenus.find({ mois: month, annee: year });
}

Revenus.getDataByYear = function(year) {
    return Revenus.find({ annee: year });
}

Revenus.getDataByCode = function(code, year, month) {
    return Revenus.find({ idservices: code, annee: year, mois: month });
}

Revenus.getDataHomeContract = function(month, year) {
    return Revenus.find({
        $or: [{ catno: "5152467" },
            { catno: "5152459" },
            { catno: "5152459" },
            { catno: "5185574" },
            { catno: "5185582" },
            { catno: "5185566" },
            { catno: "5185608" },
            { catno: "5185616" },
            { catno: "5185590" }
        ],
        mois: month,
        annee: year
    }, { sort: { catno: 1 } }).fetch();
}

Revenus.getDataContractYear = function(year) {
    var rev = 0;
    var qty = 0;
    var mois = "";
    var cat = "";
    var data = [];
    //var single = {};

    var tabContrat = ["5152467", "5152459", "5185574", "5185582", "5185566", "5185608", "5185616", "5185590"];

    // On va grouper les cat# pour l'annee
    for (var j = 0; j < tabContrat.length; j++) {
        cat = tabContrat[j];
        qty = 0;
        rev = 0;

        var tmp = Revenus.find({ catno: tabContrat[j], annee: year }).fetch();

        for (var i = 0; i < tmp.length; i++) {
            qty = qty + tmp[i].qty;
            rev = rev + parseFloat(tmp[i].montant);
        }
        rev = parseFloat(rev);
        //rev = rev.toFixed(2);

        data.push({
            annee: year,
            catno: cat,
            qty: qty,
            montant: rev
        });
    }

    return data
}

Revenus.getDataHomeService = function(month, year) {
    return Revenus.find({
        $or: [
            { catno: "5174149" },
            { catno: "5174156" },
            { catno: "5174164" },
            { catno: "5174172" },
            { catno: "5174180" },
            { catno: "5174198" },
            { catno: "5160890" }
        ],
        mois: month,
        annee: year
    }, { sort: { catno: 1 } }).fetch();
}

Revenus.getDataServiceYear = function(year) {
    var rev = 0;
    var qty = 0;
    var mois = "";
    var cat = "";
    var data = [];
    //var single = {};

    var tabContrat = ["5174149", "5174156", "5174164", "5174172", "5174180", "5174198", "5160890"];

    // On va grouper les cat# pour l'annee
    for (var j = 0; j < tabContrat.length; j++) {
        cat = tabContrat[j];
        qty = 0;
        rev = 0;

        var tmp = Revenus.find({ catno: tabContrat[j], annee: year }).fetch();

        for (var i = 0; i < tmp.length; i++) {
            qty = qty + tmp[i].qty;
            rev = rev + parseFloat(tmp[i].montant);
        }
        rev = parseFloat(rev);

        data.push({
            annee: year,
            catno: cat,
            qty: qty,
            montant: rev
        });
    }

    return data
}