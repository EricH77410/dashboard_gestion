/**
 * Created by Eric Hamimi on 05/04/2016.
 */
Revenus       = new Mongo.Collection('revenus');

Revenus.getDataByMonth = function(month, year){
    return Revenus.find({mois: month, annee: year});
}

Revenus.getDataByYear = function (year) {
    return Revenus.find({annee: year});
}

Revenus.getDataByCode = function (code, year, month){
    return Revenus.find({idservices: code, annee: year, mois: month});
}

Revenus.getDataHomeContract = function (month, year) {
    return Revenus.find({ $or:
        [   { catno: "5152467" },
            { catno: "5152459" },
            { catno: "5152459" },
            { catno: "5185574" },
            { catno: "5185582" },
            { catno: "5185566" },
            { catno: "5185608" },
            { catno: "5185616" },
            { catno: "5185590" }
        ], mois: month, annee: year}, {sort: {catno: 1}}).fetch();
}

Revenus.getDataHomeService = function (month, year) {
    return Revenus.find({$or :
    [
        { catno: "5174149" },
        { catno: "5174156" },
        { catno: "5174164" },
        { catno: "5174172" },
        { catno: "5174180" },
        { catno: "5174198" },
        { catno: "5160890" }
    ], mois: month, annee: year}, {sort: {catno: 1}}).fetch();
}